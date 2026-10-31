# VPS production deployment

This project is prepared for one public origin: `https://morningstar-ef.org`. Nginx serves the built frontend and proxies `/api/` to the Node API on `127.0.0.1:5005`. Paystack returns visitors to `https://morningstar-ef.org/callback`.

## Before deployment

1. Point the DNS `A` records for `morningstar-ef.org` and `www.morningstar-ef.org` to the VPS public IPv4 address. Add `AAAA` records only if the VPS has working public IPv6.
2. Create a VPS user for the service, install a supported Node.js 20 or later LTS release, Nginx, and Certbot.
3. Keep MongoDB private. Use a managed MongoDB deployment with an IP allowlist, or bind the VPS MongoDB service to localhost and require authentication. Do not expose port 27017 publicly.
4. Open only SSH, HTTP, and HTTPS in the VPS firewall. The API listens on localhost and must not be publicly exposed.

## Place the application

Use this deployment path, which matches the supplied systemd and Nginx files. Create the unprivileged service account and directories first:

```sh
sudo useradd --system --create-home --home-dir /var/www/morningstar-ef.org --shell /usr/sbin/nologin msef
sudo install -d -o msef -g msef /var/www/morningstar-ef.org/backend /var/www/morningstar-ef.org/frontend
sudo chmod 0755 /var/www/morningstar-ef.org
sudo install -d -o root -g msef -m 0750 /etc/morningstar-ef
```

```text
/var/www/morningstar-ef.org/
  backend/
  frontend/
```

Copy the project there, excluding `.git/`, all `.env` files, `node_modules/`, `dist/`, and `legacy/`; do not transfer your local development secrets. Make static files readable by Nginx (directories `0755`, files `0644`). Run backend commands as the dedicated `msef` service user. Keep production secrets outside the repository in `/etc/morningstar-ef/backend.env`, owned by `root:msef` with mode `0640`.

## Configure the backend environment

Create `/etc/morningstar-ef/backend.env` with these production values and the real provider credentials:

```dotenv
NODE_ENV=production
PORT=5005
TRUST_PROXY=1
FRONTEND_ORIGIN=https://morningstar-ef.org
PUBLIC_SITE_URL=https://morningstar-ef.org
PUBLIC_API_URL=https://morningstar-ef.org/api
ADMIN_COOKIE_SAME_SITE=strict

MONGODB_URI=<private production MongoDB URI>
PAYSTACK_SECRET_KEY=<Paystack live secret key>
RESEND_API_KEY=<Resend API key>
RESEND_FROM_EMAIL="Stephen Rotich <info@morningstar-ef.org>"
CONTACT_RECIPIENT=s.rotich@morningstar-ef.org

ADMIN_EMAIL=<administrator email>
ADMIN_PASSWORD_HASH=<bcrypt hash generated with npm run admin:hash>
JWT_SECRET=<at least 32 random characters>

CLOUDINARY_CLOUD_NAME=<Cloudinary cloud name>
CLOUDINARY_API_KEY=<Cloudinary API key>
CLOUDINARY_API_SECRET=<Cloudinary API secret>
```

Generate `JWT_SECRET` with `openssl rand -hex 32`. Generate the administrator hash from `backend/` using `npm run admin:hash`. Do not copy a plaintext admin password into this environment file. Configure Resend with a verified `morningstar-ef.org` sending domain and verify the `info@morningstar-ef.org` sender. Use a Paystack **live** secret only after the account and live payment methods are ready. Set the Paystack dashboard webhook URL to `https://morningstar-ef.org/api/donations/webhook`; the handler checks the HMAC signature and confirms the reference, amount, and currency against Paystack before recording success. Production startup rejects incomplete origins, missing provider credentials, weak JWT secrets, missing proxy trust, and non-strict admin cookies.

## Build and install

```sh
sudo -u msef sh -c 'cd /var/www/morningstar-ef.org/backend && npm ci --omit=dev'

sudo -u msef sh -c 'cd /var/www/morningstar-ef.org/frontend && npm ci && VITE_API_BASE_URL=/api VITE_SITE_URL=https://morningstar-ef.org npm run build'
```

The frontend build creates `frontend/dist/`, including the sitemap and robots directives for the canonical domain. Never put Paystack, Resend, MongoDB, JWT, or Cloudinary secret values in frontend environment variables.

Install the service unit from the repository root:

```sh
sudo install -m 0644 msef-api.service /etc/systemd/system/msef-api.service
sudo systemctl daemon-reload
sudo systemctl enable --now msef-api
sudo systemctl status msef-api
```

The unit assumes Node is at `/usr/bin/node`. Check `command -v node` on the VPS and update `ExecStart` if the installed Node path differs.

## Configure HTTPS and Nginx

First install a temporary HTTP-only Nginx site and enable it:

```sh
sudo tee /etc/nginx/sites-available/morningstar-ef.org >/dev/null <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name morningstar-ef.org www.morningstar-ef.org;
    location /.well-known/acme-challenge/ { root /var/www/html; }
    location / { return 200 "TLS setup in progress"; add_header Content-Type text/plain; }
}
NGINX
sudo ln -s /etc/nginx/sites-available/morningstar-ef.org /etc/nginx/sites-enabled/morningstar-ef.org
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d morningstar-ef.org -d www.morningstar-ef.org
```

After Certbot has created the certificate, replace the temporary configuration with `nginx-morningstar-ef.org.conf` and reload Nginx:

```sh
sudo cp /var/www/morningstar-ef.org/nginx-morningstar-ef.org.conf /etc/nginx/sites-available/morningstar-ef.org
sudo nginx -t
sudo systemctl reload nginx
```

The supplied Nginx configuration redirects HTTP and `www` traffic to HTTPS at the root domain, serves the React routes with SPA fallback, adds browser security headers and a restrictive Content Security Policy, and proxies `/api/` to the loopback-only Node service. It replaces `X-Forwarded-For` with the actual peer address because Express trusts exactly one proxy. It assumes the certificate paths created by Certbot and the project path shown above.

## Verify after deployment

Check the service and public endpoints:

```sh
sudo systemctl status msef-api
sudo journalctl -u msef-api -n 100 --no-pager
curl -fsS https://morningstar-ef.org/api/health/ready
curl -fsS https://morningstar-ef.org/robots.txt
curl -fsS https://morningstar-ef.org/sitemap.xml
```

Then verify `/callback` loads, admin login works over HTTPS, image uploads reach Cloudinary, a Paystack test transaction verifies in test mode before changing to live credentials, and Resend sends contact, subscription, newsletter update, and donation receipt emails. Submit `https://morningstar-ef.org/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Search indexing is not immediate or guaranteed by deployment alone.

Back up MongoDB regularly and test restoring a backup. Keep OS packages, Node.js, Nginx, and dependencies updated. Review logs for failed Resend or Paystack requests after launch.
