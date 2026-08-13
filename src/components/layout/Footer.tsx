export default function Footer() {
  const productLinks = [
    { label: "Tools", href: "#tools" },
    { label: "Features", href: "#features" },
    { label: "Changelog", href: "#changelog" },
  ];

  const companyLinks = [
    { label: "About", href: "#about" },
    { label: "Privacy", href: "#privacy" },
    { label: "Terms", href: "#terms" },
  ];

  return (
    <footer className="border-t border-white/[0.06] py-12">
      <div className="mx-auto max-w-6xl px-[var(--spacing-margin-mobile)] md:px-[var(--spacing-margin-desktop)]">
        {/* Top Row */}
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          {/* Brand */}
          <div className="max-w-xs">
            <span className="text-lg font-bold tracking-tight text-white">
              ToolUndo
            </span>
            <p className="mt-3 text-sm leading-relaxed text-neutral-500">
              Browser-based tools, zero compromises.
              <br />
              <span className="text-neutral-600">
                നിന്റെ ഡാറ്റ, നിന്റെ കയ്യിൽ.
              </span>
            </p>
          </div>

          {/* Link Columns */}
          <div className="flex gap-16">
            {/* Product */}
            <div>
              <h4 className="text-label mb-4 uppercase text-neutral-500">
                Product
              </h4>
              <ul className="flex flex-col gap-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-neutral-500 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-label mb-4 uppercase text-neutral-500">
                Company
              </h4>
              <ul className="flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-neutral-500 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-sm text-neutral-500">
            &copy; 2024 ToolUndo. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 transition-colors duration-200 hover:text-white"
              aria-label="GitHub"
            >
              <span className="material-symbols-outlined text-[20px]">
                code
              </span>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 transition-colors duration-200 hover:text-white"
              aria-label="Discord"
            >
              <span className="material-symbols-outlined text-[20px]">
                forum
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
