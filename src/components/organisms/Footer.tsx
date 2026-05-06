import Image from "next/image";
import Link from "next/link";

const FooterSection = ({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) => (
  <div className="flex flex-col gap-4">
    <h3 className="font-semibold text-slate-900">{title}</h3>
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="text-sm text-slate-600 transition-colors hover:text-orange-500"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer = () => (
  <footer className="relative w-full border-t border-slate-200 bg-linear-to-br from-orange-50/50 via-white to-blue-50/50">
    <div className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 px-2 sm:px-0">
      <div className="py-16">
        {/* Main footer content */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2">
              <Image
                src="https://indiansinkorea.com/inspire/wp-content/uploads/2022/05/logo.png"
                alt="Indians in Korea"
                width={220}
                height={100}
                className="object-contain"
                priority
              />
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Building a vibrant community of Indians across Korea since 2002.
            </p>
          </div>

          {/* Navigation sections */}
          <FooterSection
            title="Community"
            links={[
              { label: "Find Your Tribe", href: "#" },
              { label: "All Communities", href: "#" },
              { label: "Events Calendar", href: "#" },
              { label: "Join IIK", href: "#" },
            ]}
          />

          <FooterSection
            title="Resources"
            links={[
              { label: "Gallery", href: "#" },
              { label: "Blog", href: "#" },
              { label: "FAQs", href: "#" },
              { label: "Contact", href: "#" },
            ]}
          />

          <FooterSection
            title="About"
            links={[
              { label: "Our Story", href: "#" },
              { label: "Board Members", href: "#" },
              { label: "Impact", href: "#" },
              { label: "Careers", href: "#" },
            ]}
          />

          {/* Contact & Social */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-slate-900">Connect</h3>
            <div className="flex flex-col gap-3 text-sm text-slate-600">
              <a
                href="mailto:hello@indiansinkorea.com"
                className="transition-colors hover:text-orange-500"
              >
                hello@indiansinkorea.com
              </a>
              <p>Seoul, South Korea</p>
            </div>
            <div className="mt-2 flex gap-3">
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition-all hover:bg-orange-500 hover:text-white"
                aria-label="Facebook"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition-all hover:bg-orange-500 hover:text-white"
                aria-label="Twitter"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a10.6 10.6 0 01-9.5 5M2 20s8 0 12-4" />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition-all hover:bg-orange-500 hover:text-white"
                aria-label="Instagram"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-slate-200 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            © 2002-{new Date().getFullYear()} Indians in Korea. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-slate-600 hover:text-orange-500"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-slate-600 hover:text-orange-500"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-slate-600 hover:text-orange-500"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
