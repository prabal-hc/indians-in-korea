import Image from "next/image";
import Link from "next/link";

// ─── Tricolor top bar ──────────────────────────────────────────────────────────
const TricolorBar = () => (
  <div className="flex h-[3px] w-full">
    <span className="flex-1 bg-[#FF9933]" />
    <span className="flex-1 bg-[#f5f0e8]" />
    <span className="flex-1 bg-[#138808]" />
  </div>
);

// ─── Mini inline flag ──────────────────────────────────────────────────────────
const InlineFlag = () => (
  <span className="inline-flex flex-col w-[14px] h-[10px] rounded-[2px] overflow-hidden flex-shrink-0">
    <span className="flex-1 bg-[#FF9933]" />
    <span className="flex-1 bg-[#f5f0e8]" />
    <span className="flex-1 bg-[#138808]" />
  </span>
);

// ─── Newsletter signup ─────────────────────────────────────────────────────────
const Newsletter = () => (
  <div className="rounded-[14px] border border-white/8 bg-white/4 p-4 sm:p-5 w-full sm:min-w-[260px] sm:max-w-[340px]">
    <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[#FF9933]">
      <svg
        className="inline-block mr-1.5 mb-0.5 h-3 w-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      Get in Touch
    </p>
    <p className="mb-3 text-[13px] leading-[1.5] text-[#8a9580]">
      Have questions or want to connect with the Indian community in Korea?
    </p>

    <a
      href="/contact"
      className="inline-flex items-center gap-2 rounded-[8px] bg-[#FF9933] px-4 py-2 text-[12px] font-bold text-[#1a0a00] transition-colors hover:bg-[#e8871f]"
    >
      <svg
        className="h-3.5 w-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
      Contact Us
    </a>
  </div>
);

// ─── Nav column ───────────────────────────────────────────────────────────────
type NavLink = { label: string; href: string; icon: React.ReactNode };

const NavColumn = ({ title, links }: { title: string; links: NavLink[] }) => (
  <div className="flex flex-col gap-[14px] sm:gap-[18px] py-6 sm:py-10">
    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#555]">
      {title}
    </p>
    <ul className="flex flex-col gap-2.5 sm:gap-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="group flex items-center gap-2 text-[13px] sm:text-[13.5px] text-[#a0a89a] transition-colors hover:text-[#FF9933]"
          >
            <span className="opacity-50 group-hover:opacity-100 transition-opacity">
              {link.icon}
            </span>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// ─── Icon chip ────────────────────────────────────────────────────────────────
const IconChip = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[8px] border border-[#FF9933]/12 bg-[#FF9933]/8 text-[#FF9933]">
    {children}
  </div>
);

// ─── Social button ────────────────────────────────────────────────────────────
const SocialBtn = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    aria-label={label}
    className="flex h-[34px] w-[34px] items-center justify-center rounded-[8px] border border-white/8 bg-white/5 text-[#8a9580] transition-all hover:border-[#FF9933]/30 hover:bg-[#FF9933]/12 hover:text-[#FF9933]"
  >
    {children}
  </a>
);

// ─── SVG icons ────────────────────────────────────────────────────────────────
const Icon = {
  Users: () => (
    <svg
      className="h-[14px] w-[14px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Grid: () => (
    <svg
      className="h-[14px] w-[14px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  Calendar: () => (
    <svg
      className="h-[14px] w-[14px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  UserPlus: () => (
    <svg
      className="h-[14px] w-[14px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <path d="M20 8v6M23 11h-6" />
    </svg>
  ),
  Photo: () => (
    <svg
      className="h-[14px] w-[14px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  ),
  Pencil: () => (
    <svg
      className="h-[14px] w-[14px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Help: () => (
    <svg
      className="h-[14px] w-[14px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  ),
  Message: () => (
    <svg
      className="h-[14px] w-[14px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Book: () => (
    <svg
      className="h-[14px] w-[14px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  Award: () => (
    <svg
      className="h-[14px] w-[14px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  Chart: () => (
    <svg
      className="h-[14px] w-[14px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Briefcase: () => (
    <svg
      className="h-[14px] w-[14px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Mail: () => (
    <svg
      className="h-[14px] w-[14px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  MapPin: () => (
    <svg
      className="h-[14px] w-[14px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Facebook: () => (
    <svg className="h-[15px] w-[15px]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  Twitter: () => (
    <svg className="h-[15px] w-[15px]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Instagram: () => (
    <svg
      className="h-[15px] w-[15px]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  YouTube: () => (
    <svg className="h-[15px] w-[15px]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  Heart: () => (
    <svg className="h-[13px] w-[13px]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

// ─── Footer ───────────────────────────────────────────────────────────────────
export const Footer = () => {
  const communityLinks: NavLink[] = [
    { label: "Find your tribe", href: "#", icon: <Icon.Users /> },
    { label: "All communities", href: "#", icon: <Icon.Grid /> },
    { label: "Events calendar", href: "#", icon: <Icon.Calendar /> },
    { label: "Join IIK", href: "#", icon: <Icon.UserPlus /> },
  ];

  const resourceLinks: NavLink[] = [
    { label: "Gallery", href: "#", icon: <Icon.Photo /> },
    { label: "Blog", href: "#", icon: <Icon.Pencil /> },
    { label: "FAQs", href: "#", icon: <Icon.Help /> },
    { label: "Contact us", href: "#", icon: <Icon.Message /> },
  ];

  const aboutLinks: NavLink[] = [
    { label: "Our story", href: "#", icon: <Icon.Book /> },
    { label: "Board members", href: "#", icon: <Icon.Award /> },
    { label: "Our impact", href: "#", icon: <Icon.Chart /> },
    { label: "Careers", href: "#", icon: <Icon.Briefcase /> },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-[#0F1A12] text-[#e8e4dc]">
      {/* Decorative rings */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full border border-[#FF9933]/6" />
      <div className="pointer-events-none absolute -left-12 bottom-20 h-52 w-52 rounded-full border border-[#138808]/6" />
      <div className="pointer-events-none absolute bottom-28 right-[20%] h-20 w-20 rounded-full bg-[#FF9933]/4" />

      {/* Tricolor stripe */}
      <TricolorBar />

      {/* ── Hero zone ── */}
      <div className="border-b border-white/6 px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/images/iik.png"
                alt="Indians in Korea"
                width={36}
                height={54}
                className="object-contain"
                priority
              />
              <span className="text-[18px] sm:text-[20px] font-bold tracking-[0.01em]">
                <span className="text-[#FF9933]">INDIANS</span>
                <span className="text-[#f5f0e8]"> IN </span>
                <span className="text-[#22c55e]">KOREA</span>
              </span>
            </div>
            <p className="max-w-[280px] text-[13px] leading-[1.6] text-[#8a9580]">
              Building a vibrant community of Indians across Korea — every city,
              every story.
            </p>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#FF9933]/15 bg-[#FF9933]/8 px-3 py-1 text-[11px] font-semibold tracking-[0.05em] text-[#FF9933]">
              <Icon.Calendar />
              Est. 2002 · 24 years of community
            </span>
          </div>

          {/* Newsletter — full width on mobile, constrained on larger */}
          <div className="w-full sm:w-auto sm:flex-shrink-0">
            <Newsletter />
          </div>
        </div>
      </div>

      {/* ── Nav columns ── */}
      {/*
        Mobile:     2-col grid (Community | Resources on row 1, About | Connect on row 2)
        Tablet md:  2-col grid, wider padding
        Desktop lg: 4-col grid
      */}
      <div className="grid grid-cols-2 gap-x-4 px-5 sm:px-8 lg:grid-cols-4 lg:gap-x-0 lg:px-12">
        {/* Community */}
        <div className="border-b border-white/5 lg:border-b-0 lg:border-r lg:pr-8">
          <NavColumn title="Community" links={communityLinks} />
        </div>

        {/* Resources */}
        <div className="border-b border-white/5 pl-4 sm:pl-6 lg:border-b-0 lg:border-r lg:pl-8 lg:pr-8">
          <NavColumn title="Resources" links={resourceLinks} />
        </div>

        {/* About */}
        <div className="pl-4 sm:pl-6 lg:border-r lg:pl-8 lg:pr-8">
          <NavColumn title="About" links={aboutLinks} />
        </div>

        {/* Connect */}
        <div className="pl-4 sm:pl-6 lg:pl-8">
          <div className="flex flex-col gap-4 py-6 sm:py-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#555]">
              Connect
            </p>

            <div className="flex items-start gap-2.5">
              <IconChip>
                <Icon.Mail />
              </IconChip>
              <a
                href="mailto:hello@indiansinkorea.com"
                className="mt-1.5 text-[11.5px] sm:text-[12.5px] leading-[1.5] text-[#a0a89a] transition-colors hover:text-[#FF9933] break-all"
              >
                hello@indiansinkorea.com
              </a>
            </div>

            <div className="flex items-start gap-2.5">
              <IconChip>
                <Icon.MapPin />
              </IconChip>
              <p className="mt-1.5 text-[12.5px] leading-[1.5] text-[#8a9580]">
                Seoul, South Korea
              </p>
            </div>

            <div className="mt-1 flex flex-wrap gap-2">
              <SocialBtn href="#" label="Facebook">
                <Icon.Facebook />
              </SocialBtn>
              <SocialBtn href="#" label="Twitter">
                <Icon.Twitter />
              </SocialBtn>
              <SocialBtn href="#" label="Instagram">
                <Icon.Instagram />
              </SocialBtn>
              <SocialBtn href="#" label="YouTube">
                <Icon.YouTube />
              </SocialBtn>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="flex flex-col gap-3 border-t border-white/6 px-5 py-5 sm:px-8 sm:flex-row sm:items-center sm:justify-between lg:px-12">
        <p className="flex items-center gap-2 text-[12px] text-[#555]">
          <InlineFlag />© 2002–{new Date().getFullYear()} Indians in Korea ·
          Made with
          <span className="text-[#FF9933]">
            <Icon.Heart />
          </span>
          for the diaspora
        </p>
        <div className="flex flex-wrap gap-4 sm:gap-5">
          <Link
            href="#"
            className="text-[12px] text-[#555] transition-colors hover:text-[#FF9933]"
          >
            Privacy policy
          </Link>
          <Link
            href="#"
            className="text-[12px] text-[#555] transition-colors hover:text-[#FF9933]"
          >
            Terms of service
          </Link>
          <Link
            href="#"
            className="text-[12px] text-[#555] transition-colors hover:text-[#FF9933]"
          >
            Cookie policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
