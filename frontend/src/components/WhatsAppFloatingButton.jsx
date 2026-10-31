export default function WhatsAppFloatingButton() {
  return (
    <a
      aria-label="Talk with Morning Star on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-4 text-white shadow-[0_8px_24px_rgba(0,0,0,0.24)] transition hover:scale-105 hover:bg-[#1FBD5B] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#001F3F]"
      href="https://wa.me/254723638257"
      rel="noopener noreferrer"
      target="_blank"
      title="Chat with us on WhatsApp"
    >
      <svg
        aria-hidden="true"
        className="size-6 shrink-0"
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <path d="M16.02 3.2A12.72 12.72 0 0 0 5.08 22.42L3.2 29.1l6.84-1.8a12.8 12.8 0 0 0 5.98 1.48h.01c7.02 0 12.74-5.71 12.74-12.73 0-3.4-1.32-6.6-3.73-9A12.64 12.64 0 0 0 16.02 3.2Zm0 23.43h-.01a10.64 10.64 0 0 1-5.42-1.49l-.39-.23-4.06 1.07 1.08-3.96-.25-.4a10.6 10.6 0 0 1-1.63-5.66c0-5.89 4.79-10.68 10.69-10.68 2.85 0 5.53 1.11 7.54 3.13a10.6 10.6 0 0 1 3.13 7.55c0 5.89-4.79 10.67-10.68 10.67Zm5.86-8c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.51-.16-.73.16-.21.32-.84 1.05-1.03 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.6-1.6-.96-.85-1.6-1.91-1.79-2.23-.19-.32-.02-.49.14-.65.15-.14.32-.38.48-.57.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.4-.26-.63-.52-.54-.72-.55h-.62c-.22 0-.57.08-.87.4-.3.32-1.14 1.11-1.14 2.71s1.17 3.14 1.33 3.36c.16.21 2.3 3.51 5.58 4.92.78.34 1.39.55 1.86.7.78.25 1.49.22 2.05.13.63-.1 1.9-.78 2.17-1.54.27-.76.27-1.41.19-1.54-.08-.14-.29-.22-.61-.38Z" />
      </svg>
      <span className="text-sm font-semibold">Talk with Us</span>
    </a>
  );
}
