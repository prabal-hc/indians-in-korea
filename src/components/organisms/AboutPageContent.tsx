"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Globe,
  Users,
  Calendar,
  Building2,
  ExternalLink,
} from "lucide-react";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const visionItems = [
  "Help Indians make life easy in Korea by providing useful information in one place.",
  "Strive to create a positive image for India through transformational thinking and creative contribution.",
  "Recognize achievements of the Indian community and their impact on Korean society and economy.",
  "Provide an outlet for spreading group & personal creative expressions and experiences.",
  "Promote ideas to create a sense of mutual openness and trust between Koreans and Indians.",
  "Create a platform for NRI awareness by sharing how Indians in other countries are organizing to help transform India.",
  "Raise common social, professional, and other issues of IIK members and help solve them as one community voice.",
  "Provide a transformational platform to members.",
];

const boardMembers = [
  {
    name: "Prof. Nagendra Kaushik",
    role: "President",
    profession: "Professor, Kwangwoon University",
    initials: "NK",
  },
  {
    name: "Ms. Beena Nair",
    role: "Vice President",
    profession: "Program Management, Green Climate Fund",
    initials: "BN",
  },
  {
    name: "Prof. Maidul Islam",
    role: "Vice President",
    profession: "Assistant Professor, Keimyung University",
    initials: "MI",
  },
  {
    name: "Nahakpam Bidhanchandra",
    role: "Director of Finance",
    profession: "Asst. Professor, Tongmyong University",
    initials: "NB",
  },
  {
    name: "Dr. Vivek Dhimole",
    role: "Director of Student Affairs",
    profession: "Research Professor, Inha University",
    initials: "VD",
  },
  {
    name: "Dr. Sib Shankar Giri",
    role: "Director of Student Affairs",
    profession: "Research Professor, Seoul National University",
    initials: "SG",
  },
  {
    name: "Mr. Partha De",
    role: "Immediate Past President",
    profession: "Sr. Principal Engineer, Hancom Forensics",
    initials: "PD",
  },
  {
    name: "Mr. Sanjay Yadav",
    role: "Chairman, Director of Legal Affairs",
    profession: "President of ISKCON Korea",
    initials: "SY",
  },
  {
    name: "Dr. Nitish Katoch",
    role: "Director of Finance & Social Media",
    profession: "Research Professor, Kyung Hee University",
    initials: "NK",
  },
];

const advisors = [
  {
    name: "Mr. Navneet Basutkar",
    role: "Advisor",
    profession: "Principal Engineer, Samsung Electronics",
    initials: "NB",
  },
  {
    name: "Prof. Benjamin Cho",
    role: "Advisor",
    profession: "Professor, Kwangwoon University",
    initials: "BC",
  },
];

const coreMembers = [
  { name: "Mr. Amit Bhat", image: "/images/profile pic.jpg" },
  { name: "Mr. Majunath Bhide", image: "/images/profile pic.jpg" },
  { name: "Mr. Syed Sanu", image: "/images/profile pic.jpg" },
  { name: "Mr. Ashutosh Singh", image: "/images/profile pic.jpg" },
  { name: "Mr. Ashutosh Kumar Mishra", image: "/images/profile pic.jpg" },
  { name: "Mr. Agrim Bhalla", image: "/images/profile pic.jpg" },
  { name: "Dr. Haribalan Perumalsamy", image: "/images/profile pic.jpg" },
];

const stats = [
  { value: "12,000+", label: "Members", icon: Users },
  { value: "Since 2002", label: "Established", icon: Calendar },
  { value: "2 Platforms", label: "Facebook & Telegram", icon: Globe },
  { value: "Non-Profit", label: "Organisation", icon: Building2 },
];

// ─── Component ────────────────────────────────────────────────────────────────
export const AboutPageContent = () => (
  <div className="bg-white text-gray-900 font-sans antialiased">
    {/* ── Hero Section ───────────────────────────────────────────────────────── */}
    <section className="relative overflow-hidden bg-orange-50 px-5 pt-30 pb-28 sm:px-8 lg:px-14">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(251,146,60,0.12), transparent), radial-gradient(ellipse 40% 40% at 10% 80%, rgba(251,191,36,0.08), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-9xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid gap-14 lg:grid-cols-2 lg:items-center"
        >
          {/* Left: Text */}
          <motion.div variants={fadeUp} className="space-y-7">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full w-fit">
              <span className="text-base">⊙</span>
              <span className="text-xs font-bold tracking-widest uppercase">
                Community · Culture · Korea
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              One of Korea's{" "}
              <span className="text-orange-500">Oldest & Largest</span> Indian
              Communities
            </h1>

            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              IIK has been the heart of the Indian diaspora in Korea since March
              25, 2002 — a platform for sharing happiness, sadness, and
              essential information for every Indian living in or coming to
              Korea.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="https://www.facebook.com/groups/IIK2002/"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 hover:-translate-y-0.5"
              >
                Join on Facebook <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-7 py-4 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-600"
              >
                Get in Touch
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 pt-6 border-t border-gray-200">
              {[
                { val: "12,000+", lbl: "Members" },
                { val: "120+", lbl: "Events" },
                { val: "2002", lbl: "Founded" },
              ].map((s) => (
                <div key={s.lbl}>
                  <div className="text-3xl font-bold text-orange-500">
                    {s.val}
                  </div>
                  <p className="text-sm text-gray-500">{s.lbl}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image collage */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
            <div className="col-span-2 overflow-hidden rounded-3xl border border-orange-100 shadow-lg">
              <Image
                src="/images/gallery_pic1.jpg"
                alt="IIK Community gathering"
                width={800}
                height={420}
                className="h-56 w-full object-cover"
                priority
              />
            </div>
            <div className="overflow-hidden rounded-3xl border border-orange-100 shadow-md">
              <Image
                src="/images/gallery_pic5.jpg"
                alt="IIK Event"
                width={400}
                height={300}
                className="h-40 w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center rounded-3xl bg-orange-100 border border-orange-200 p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600">
                Non-Profit
              </p>
              <p className="mt-2 text-sm font-semibold text-gray-800 leading-6">
                Connecting Indians & Koreans with culture, career & community.
              </p>
              <div className="mt-4 flex gap-1">
                {["🇮🇳", "🤝", "🇰🇷"].map((e) => (
                  <span key={e} className="text-xl">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* ── Who We Are ─────────────────────────────────────────────────────────── */}
    <section className="px-5 py-24 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-9xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-12 lg:grid-cols-2 lg:items-center"
        >
          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Who We Are
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
              A community rooted in{" "}
              <span className="text-orange-500">connection & care</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-base">
              <p>
                IIK is one of the largest and oldest Indian community groups in
                Korea. Since its establishment on{" "}
                <strong className="text-gray-800">March 25, 2002</strong>, it
                has been a platform for sharing happiness and sadness, and a
                go-to source of information for all Indians living in or coming
                to Korea.
              </p>
              <p>
                Over <strong className="text-gray-800">10,000+ members</strong>{" "}
                are closely associated across the Republic of Korea via the IIK
                Facebook Group and IIK Telegram channel — making it an ideal
                medium for sharing views, events, and information pertinent to
                the Indian community.
              </p>
              <p>
                IIK is a{" "}
                <strong className="text-gray-800">
                  non-profit organisation
                </strong>{" "}
                with over 12,000 members, including Indians living in Korea and
                Koreans who are interested in India and its culture.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                "Facebook Community",
                "Telegram Forum",
                "Non-Profit",
                "Est. 2002",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-orange-50 border border-orange-200 px-4 py-1.5 text-sm font-semibold text-orange-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-orange-200 transition-all"
              >
                <Icon className="h-5 w-5 text-orange-400 mb-3" />
                <p className="text-2xl font-bold text-orange-500">{value}</p>
                <p className="mt-1 text-sm text-gray-500 uppercase tracking-wide">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* ── Vision ─────────────────────────────────────────────────────────────── */}
    <section className="bg-gray-50 px-5 py-24 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-9xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            className="mb-12 text-center max-w-2xl mx-auto"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-3">
              IIK's Vision
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Our guiding principles for a thriving community
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Eight pillars that drive everything we do — from supporting
              newcomers to celebrating cultural achievements.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            {visionItems.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:border-orange-300 hover:shadow-md transition-all duration-300"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-sm leading-7 text-gray-600">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* ── Board of Directors ──────────────────────────────────────────────────── */}
    <section className="px-5 py-24 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-9xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-3">
            Board of Directors
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Team IIK
            </h2>
            <p className="text-sm text-gray-500 max-w-md leading-relaxed">
              A dedicated group of professionals, professors, and community
              leaders shaping the Indian experience in Korea.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {boardMembers.map((member) => (
            <motion.div
              key={member.name + member.role}
              variants={fadeUp}
              className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-orange-300 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center rounded-2xl bg-orange-500 text-white font-bold text-base shadow-md shadow-orange-200">
                {member.initials}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm leading-snug">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold text-orange-600 mt-0.5 uppercase tracking-wide">
                  {member.role}
                </p>
                <p className="text-xs text-gray-500 mt-1.5 leading-5">
                  {member.profession}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Advisors */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-6">
            IIK Advisors
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {advisors.map((a) => (
              <div
                key={a.name}
                className="flex gap-4 rounded-2xl border border-orange-100 bg-orange-50 p-5"
              >
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-xl bg-orange-200 text-orange-700 font-bold text-sm">
                  {a.initials}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{a.name}</h4>
                  <p className="text-xs text-orange-600 font-semibold mt-0.5">
                    {a.role}
                  </p>
                  <p className="text-xs text-gray-500 mt-1.5 leading-5">
                    {a.profession}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Core Members */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
            Core Members
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-8">
            The people who keep IIK running
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {coreMembers.map((m) => (
              <motion.div
                key={m.name}
                variants={fadeUp}
                className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:border-orange-200 hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="relative mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-orange-100 shadow-md group-hover:border-orange-300 transition-all">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs font-semibold text-gray-800 leading-5">
                  {m.name}
                </p>
                <span className="mt-2 inline-block rounded-full bg-orange-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-600">
                  Core Member
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Contact ─────────────────────────────────────────────────────────────── */}
    <section id="contact" className="bg-gray-50 px-5 py-24 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-9xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Connect with the IIK community
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed">
            Reach out for events, membership, or partnership enquiries.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              label: "Address",
              value: "Seoul, South Korea",
              bg: "bg-orange-50 border-orange-200",
            },
            {
              label: "Email",
              value: "contact@indiansinkorea.com",
              bg: "bg-blue-50 border-blue-200",
            },
            {
              label: "Registration No.",
              value: "620-82-84678",
              bg: "bg-green-50 border-green-200",
            },
            {
              label: "Established",
              value: "March 25, 2002",
              bg: "bg-yellow-50 border-yellow-200",
            },
          ].map((c) => (
            <motion.div
              key={c.label}
              variants={fadeUp}
              className={`rounded-2xl border p-6 ${c.bg}`}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                {c.label}
              </p>
              <p className="mt-3 text-sm font-semibold text-gray-800 leading-6">
                {c.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          {[
            {
              label: "Facebook Group",
              href: "https://www.facebook.com/groups/IIK2002/",
              emoji: "📘",
            },
            {
              label: "Telegram Channel",
              href: "https://t.me/joinchat/NNK0sEgfkwLvKzaWwQCIrw",
              emoji: "✈️",
            },
            {
              label: "Twitter / X",
              href: "https://twitter.com/IndiansInKorea",
              emoji: "🐦",
            },
          ].map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 shadow-sm hover:border-orange-300 hover:text-orange-600 transition-all"
            >
              <span>{s.emoji}</span>
              {s.label}
              <ExternalLink className="h-3 w-3 opacity-50" />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  </div>
);

export default AboutPageContent;
