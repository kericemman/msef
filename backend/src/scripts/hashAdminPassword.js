import bcrypt from "bcryptjs";

const { stdin, stdout } = process;
if (!stdin.isTTY || !stdout.isTTY) {
  console.error("Run `npm run admin:hash` from an interactive terminal.");
  process.exit(1);
}

stdout.write("Enter a new admin password (12+ characters): ");
stdin.setRawMode(true);
stdin.resume();
let password = "";
let finished = false;

async function finish() {
  if (finished) return;
  finished = true;
  stdin.setRawMode(false);
  stdin.pause();
  stdout.write("\n");
  if (password.length < 12) {
    console.error("Password must be at least 12 characters.");
    process.exitCode = 1;
    return;
  }
  const hash = await bcrypt.hash(password, 12);
  password = "";
  stdout.write(
    `Set this value as ADMIN_PASSWORD_HASH in backend/.env:\n${hash}\n`,
  );
}

stdin.on("data", (chunk) => {
  for (const character of chunk.toString()) {
    if (character === "\u0003") {
      stdin.setRawMode(false);
      stdout.write("\nCancelled.\n");
      process.exit(130);
    }
    if (character === "\r" || character === "\n") {
      void finish();
      break;
    }
    if (character === "\u007f" || character === "\b")
      password = password.slice(0, -1);
    else if (character >= " " && character <= "~") password += character;
  }
});
