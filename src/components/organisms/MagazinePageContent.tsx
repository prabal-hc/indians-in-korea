"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Download, BookOpen, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const magazineIssues = [
  {
    issue: "2021 Spring",
    title: "IIK Magazine 2021 Spring_1.0",
    date: "Spring 2021",
    badge: "PDF Issue",
    description:
      "Download or preview the Spring 2021 edition of IIK Magazine from the official archive.",
    url: "https://indiansinkorea.com/inspire/wp-content/uploads/2022/05/IIK-Magazine-2021-Spring_1.0.pdf",
  },
  {
    issue: "2017 v03",
    title: "IIK Magazine 2017 v03 A3",
    date: "2017",
    badge: "PDF Issue",
    description:
      "Read the 2017 volume 03 issue with community stories, events, and archives.",
    url: "https://indiansinkorea.com/inspire/wp-content/uploads/2022/05/IIK-Magazine-2017-v03-A3.pdf",
  },
  {
    issue: "2015 v10",
    title: "IIK Magazine 2015 v10",
    date: "2015",
    badge: "PDF Issue",
    description:
      "Explore the 2015 issue featuring culture, lifestyle, and IIK events updates.",
    url: "https://indiansinkorea.com/inspire/wp-content/uploads/2022/05/IIK-Magazine-2015-v10.pdf",
  },
  {
    issue: "2014",
    title: "IIK_Magazine_2014",
    date: "2014",
    badge: "PDF Issue",
    description:
      "A back issue of IIK Magazine from 2014, available for download and preview.",
    url: "https://indiansinkorea.com/inspire/wp-content/uploads/2022/05/IIK_Magazine_2014.pdf",
  },
  {
    issue: "2007",
    title: "IIK_Magazine_2007",
    date: "2007",
    badge: "PDF Issue",
    description:
      "Dive into the earliest archived edition from 2007, complete with community highlights.",
    url: "https://indiansinkorea.com/inspire/wp-content/uploads/2022/05/IIK_Magazine_2007.pdf",
  },
];

const highlights = [
  {
    label: "Original features",
    text: "In-depth essays, interviews, and community spotlights published every quarter.",
  },
  {
    label: "Digital editions",
    text: "Download the latest issue or browse the archive for back issues and featured articles.",
  },
  {
    label: "Community-led",
    text: "Content created by members, for members, with a focus on Korean-Indian connection.",
  },
];

function SectionBadge({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
      <Sparkles className="w-4 h-4" />
      {label}
    </div>
  );
}

function HighlightHeadline({ label }: { label: string }) {
  return (
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
      <span className="block">{label.split(" ").slice(0, 2).join(" ")}</span>
      <span className="block text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-orange-600 to-amber-500">
        {label.split(" ").slice(2).join(" ")}
      </span>
    </h1>
  );
}

function MagazineCard({ issue }: { issue: (typeof magazineIssues)[0] }) {
  return (
    <motion.article
      className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <span className="text-sm font-semibold text-gray-500">
          {issue.issue}
        </span>
        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-orange-600">
          {issue.badge}
        </span>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-3">{issue.title}</h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        {issue.description}
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500">{issue.date}</span>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={issue.url}
            download
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Download
            <Download className="w-4 h-4" />
          </a>
          <a
            href={issue.url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
          >
            Preview
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function MagazinePageContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-120px" });

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-orange-50/70 to-white overflow-hidden">
      <section className="relative px-6 lg:px-10 pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="mx-auto max-w-9xl">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={stagger}
            ref={rootRef}
            className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] items-start"
          >
            <motion.div variants={fadeUp} className="space-y-6">
              <SectionBadge label="Magazine" />
              <HighlightHeadline label="Stories from our community" />
              <p className="max-w-2xl text-lg text-gray-600 leading-relaxed">
                Discover the latest editions of IIK Magazine. Each issue brings
                stories of culture, community, innovation, and life at the
                crossroads of India and Korea.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={magazineIssues[0].url}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-200/60 transition hover:bg-orange-600"
                >
                  Download Latest Issue
                  <Download className="w-4 h-4" />
                </a>
                <a
                  href={magazineIssues[0].url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
                >
                  Preview Latest Issue
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#issues"
                  className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-semibold text-orange-700 transition hover:bg-orange-50"
                >
                  Browse Back Issues
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-4xl border border-orange-100 bg-white/90 p-8 shadow-[0_20px_70px_rgba(251,146,60,0.10)]"
            >
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-orange-500">
                    Featured Issue
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-gray-900">
                    {magazineIssues[0].issue}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {magazineIssues[0].title}
                  </p>
                </div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-orange-50 text-orange-600">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Preview or download the featured archive edition from the IIK
                Magazine collection.
              </p>
              <div className="space-y-4">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-orange-100 bg-orange-50/70 p-4"
                  >
                    <p className="text-sm font-semibold text-gray-900">
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="issues" className="px-6 lg:px-10 pb-20 lg:pb-28">
        <div className="mx-auto max-w-9xl">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={stagger}
            className="mb-10 text-center"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500 mb-3"
            >
              Archive
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl font-bold text-gray-900"
            >
              Recent magazine issues
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-2xl text-gray-600 leading-relaxed"
            >
              Browse recent issues of IIK Magazine and explore the stories
              shaping the Indian community in Korea.
            </motion.p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {magazineIssues.map((issue) => (
              <MagazineCard key={issue.issue} issue={issue} />
            ))}
          </div>
        </div>
      </section>

      {/* <section className="px-6 lg:px-10 pb-24">
        <div className="mx-auto max-w-5xl rounded-4xl bg-linear-to-br from-orange-50 via-orange-100 to-white p-10 shadow-[0_30px_90px_rgba(251,146,60,0.12)]">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-500 mb-4">
                Stay connected
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Never miss the next issue
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Subscribe to the IIK Magazine mailing list for edition
                announcements, special stories, and event coverage delivered
                straight to your inbox.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Subscribe now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="rounded-4xl border border-orange-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-orange-50 text-orange-600">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Access everywhere
                  </p>
                  <p className="text-sm text-gray-500">
                    Read the magazine online, on mobile, or download PDF
                    editions.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl border border-orange-100 bg-orange-50/70 p-4">
                  <p className="text-sm font-semibold text-gray-900">
                    Easy download
                  </p>
                  <p className="text-sm text-gray-600">
                    Get the latest issue in one click and keep it for offline
                    reading.
                  </p>
                </div>
                <div className="rounded-3xl border border-orange-100 bg-orange-50/70 p-4">
                  <p className="text-sm font-semibold text-gray-900">
                    Featured stories
                  </p>
                  <p className="text-sm text-gray-600">
                    Follow curated themes, interviews, and editorials from the
                    Indian community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
