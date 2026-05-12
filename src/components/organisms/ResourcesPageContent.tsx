"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Home,
  FileText,
  Briefcase,
  AlertCircle,
  HelpCircle,
  GraduationCap,
  Users,
  ChevronDown,
  ExternalLink,
  Train,
  Hospital,
  Banknote,
  ShoppingBag,
  Smartphone,
  MapPin,
  Shield,
  BookOpen,
  Globe,
  Phone,
  Heart,
  Building2,
  Key,
  ScrollText,
  Landmark,
  Bus,
  Stethoscope,
  Pill,
  IndianRupee,
  Clock,
  Star,
  MessageCircle,
  Calendar,
  Wifi,
  CreditCard,
} from "lucide-react";
import { Heading } from "@/components/atoms/Heading";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface ResourceItem {
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
  link?: { label: string; url: string };
  tags: string[];
}

interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  bgGradient: string;
  borderColor: string;
  items: ResourceItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// REAL INDIA-IN-KOREA RESOURCE DATA
// ─────────────────────────────────────────────────────────────────────────────

const resourceCategories: ResourceCategory[] = [
  {
    id: "living",
    title: "Living Essentials",
    description: "Practical day-to-day survival guide for Indians in Korea",
    icon: <Home className="w-6 h-6" />,
    accent: "#ea580c",
    bgGradient: "from-orange-50 via-amber-50/60 to-white",
    borderColor: "rgba(234,88,12,0.18)",
    items: [
      {
        title: "T-money Card & Public Transport",
        icon: <Train className="w-4 h-4" />,
        description:
          "Korea's transit is world-class. A T-money card is your lifeline for buses, metro, and even taxis.",
        details: [
          "Buy a T-money card at any convenience store (GS25, CU, 7-Eleven) for ₩2,500–₩4,000.",
          "Top up at metro station kiosks or convenience stores — minimum ₩1,000.",
          "Use Kakao Metro app (iOS/Android) for real-time subway navigation with English support.",
          "Naver Maps is essential for walking, transit, and driving directions across Korea.",
          "Monthly bus+subway passes are available for Seoul city transit — costs around ₩55,000.",
          "KTX intercity trains connect Seoul–Busan in 2.5 hrs. Book via the Korail website or app.",
          "Buses run on fixed schedules; apps show real-time arrival. Most stops have English signage.",
        ],
        link: { label: "Kakao Metro App", url: "https://kakaometro.kakao.com" },
        tags: ["T-money", "Subway", "Bus", "Apps"],
      },
      {
        title: "Indian Grocery & Food in Korea",
        icon: <ShoppingBag className="w-4 h-4" />,
        description:
          "Finding Indian ingredients is easier than you think — especially in Seoul.",
        details: [
          "Itaewon (Seoul) has multiple Indian and South Asian grocery stores stocking dals, masalas, rice, and frozen foods.",
          "Samsung-dong and Dongdaemun also have Indian grocery options.",
          "Coupang (Korean Amazon) delivers many Indian packaged goods within 24 hours.",
          "Korean supermarkets (Emart, Lotte Mart, Homeplus) stock basmati rice, coconut milk, and some Indian spices.",
          "Daiso sells basic cooking tools. Bigger Korean stores carry pressure cookers.",
          "Several Indian restaurants operate in Seoul, Daejeon, Suwon, and Busan.",
          "Vegetarian options at Korean restaurants: search for '채식' (chaeshik). Temple food restaurants are entirely plant-based.",
        ],
        tags: ["Grocery", "Itaewon", "Vegetarian", "Coupang"],
      },
      {
        title: "SIM Cards & Phone Plans",
        icon: <Smartphone className="w-4 h-4" />,
        description:
          "Stay connected from day one — Korea has fast LTE/5G and affordable data plans.",
        details: [
          "At Incheon Airport: KT, SKT, and LG U+ all have counters selling tourist SIMs (7–90 day plans).",
          "For long-term stays: visit any carrier store with your passport and ARC. Monthly plans start from ₩30,000.",
          "MVNOs (cheap carriers) like HelloMobile or KT M Mobile offer great value — ₩10,000–₩20,000/month.",
          "Kakao Talk is the dominant messaging app in Korea — download before arriving. Most official communication happens here.",
          "WhatsApp is used by Indians/expats; Korean friends will use Kakao Talk.",
          "Check your phone is unlocked before arrival to avoid issues with Korean SIMs.",
          "eSIM options (Airalo, etc.) work well for short stays before getting a local number.",
        ],
        tags: ["SIM", "KT", "SKT", "Kakao Talk"],
      },
      {
        title: "Essential Korean Apps",
        icon: <Smartphone className="w-4 h-4" />,
        description:
          "Your smartphone will be your best friend in Korea. Install these before landing.",
        details: [
          "Naver Map — Korea's Google Maps. More accurate than Google Maps in Korea.",
          "Kakao Metro — Subway routes and real-time trains.",
          "Kakao Talk — Messaging app used by virtually all Koreans.",
          "Coupang — Fastest delivery in Korea, app in English.",
          "Baemin (배달의민족) — Food delivery, some English support.",
          "Naver Papago — Best translation app for Korean. Supports camera translation.",
          "Toss — Digital banking app, some foreign card support.",
          "HiKorea (외국인종합안내) — Official immigration portal app.",
          "Naver Webtoon / Kakao Page — Entertainment while commuting.",
        ],
        tags: ["Apps", "Naver", "Kakao", "Coupang"],
      },
    ],
  },
  {
    id: "visa",
    title: "Visa & Immigration",
    description:
      "Navigate Korean immigration — visas, ARC, extensions, and HiKorea",
    icon: <FileText className="w-6 h-6" />,
    accent: "#2563eb",
    bgGradient: "from-blue-50 via-cyan-50/60 to-white",
    borderColor: "rgba(37,99,235,0.18)",
    items: [
      {
        title: "Student Visa (D-2) Guide",
        icon: <GraduationCap className="w-4 h-4" />,
        description:
          "The D-2 is the most common visa for Indian students enrolled in Korean universities.",
        details: [
          "D-2 covers undergraduate (D-2-2), graduate (D-2-3), and exchange students (D-2-6).",
          "Apply at the Korean Consulate/Embassy in India with: admission letter, financial proof, passport, photos, application form.",
          "Processing time: 5–15 working days depending on consulate volume.",
          "On arrival in Korea, register at your local Immigration Office within 90 days to get your ARC.",
          "D-2 holders can work part-time: max 20 hours/week during semesters, unlimited during vacation.",
          "Part-time work requires a separate part-time work permit — apply at immigration with your university's permission letter.",
          "For D-2 extension: apply at HiKorea or in-person at least 1 month before visa expiry.",
        ],
        link: { label: "HiKorea Portal", url: "https://www.hikorea.go.kr" },
        tags: ["D-2", "Student", "Part-time", "ARC"],
      },
      {
        title: "Work Visas (E-series & D-10)",
        icon: <Briefcase className="w-4 h-4" />,
        description:
          "Planning to work in Korea? Here's what each visa type covers.",
        details: [
          "D-10 (Job Seeker): For graduates or professionals looking for work. Valid 6 months, extendable once. Must show intent to find employment.",
          "E-1 (Professor): For teaching at universities. Requires a relevant degree and job offer.",
          "E-3 (Research): For research positions at Korean research institutes.",
          "E-4 (Technology Transfer): For corporate tech transfer roles.",
          "E-7 (Specially Designated): For skilled foreign workers in fields Korea needs. Requires sponsor employer.",
          "To change from D-2 to D-10 after graduation: apply at HiKorea within the D-2 validity.",
          "Work permit approval is needed before starting any paid work — violations can result in deportation.",
        ],
        link: {
          label: "Korea Immigration Service",
          url: "https://www.immigration.go.kr",
        },
        tags: ["E-7", "D-10", "Work Visa", "E-series"],
      },
      {
        title: "ARC — Alien Registration Card",
        icon: <CreditCard className="w-4 h-4" />,
        description:
          "Your ARC is your ID in Korea. Essential for banking, housing, and daily life.",
        details: [
          "Required for all foreigners staying in Korea for more than 90 days.",
          "Apply within 90 days of arrival at your nearest Immigration Office or HiKorea.",
          "Required documents: passport, visa, one photo, application form, fee (₩30,000), and proof of residence.",
          "Your ARC number acts like a Korean national ID — needed for phone plans, bank accounts, and health insurance.",
          "Keep it on you at all times — police can ask to see it.",
          "Lost ARC: report to police first, then apply for reissue at immigration.",
          "ARC must be updated if your address or visa status changes.",
        ],
        link: {
          label: "HiKorea Registration",
          url: "https://www.hikorea.go.kr/info/InfoDetailR.hi?categoryId=2&subCategoryId=72",
        },
        tags: ["ARC", "Registration", "Immigration", "ID"],
      },
      {
        title: "Visa Extension & Status Change",
        icon: <ScrollText className="w-4 h-4" />,
        description:
          "Extend your stay or change visa status without leaving Korea.",
        details: [
          "Apply for extension at HiKorea online or at your local Immigration Office.",
          "Apply at least 1 month (preferably 2) before expiry — late applications face fines.",
          "Documents vary by visa type but generally: ARC, passport, proof of enrollment/employment, bank statement.",
          "Overstaying your visa results in fines, deportation, and potential ban from re-entry.",
          "Status change (e.g., D-2 to D-10): possible in-country without leaving Korea if eligibility is met.",
          "HiKorea has English-language guides for each visa type extension process.",
          "Seoul Global Center offers free immigration counseling in English — useful for complex situations.",
        ],
        link: {
          label: "Seoul Global Center",
          url: "https://global.seoul.go.kr",
        },
        tags: ["Extension", "HiKorea", "Overstay", "Status Change"],
      },
    ],
  },
  {
    id: "housing",
    title: "Housing & Accommodation",
    description:
      "Find the right place to live — from Goshiwons to full apartments",
    icon: <Building2 className="w-6 h-6" />,
    accent: "#16a34a",
    bgGradient: "from-green-50 via-emerald-50/60 to-white",
    borderColor: "rgba(22,163,74,0.18)",
    items: [
      {
        title: "Korean Housing Types Explained",
        icon: <Home className="w-4 h-4" />,
        description:
          "Korean rental system is unique. Understanding it saves money and avoids mistakes.",
        details: [
          "Goshiwon (고시원): Tiny single rooms, fully furnished, bills included. ₩300,000–₩600,000/month. Great for short stays or tight budgets.",
          "Monthly Rent (월세): Standard rental. Pay monthly rent + smaller deposit (보증금). Most common for expats.",
          "Jeonse (전세): Pay a large lump-sum deposit (often 50–80% of property value) and live rent-free. Not practical for most short-term expats.",
          "Officetel (오피스텔): Studio apartments that can be used residentially. Modern, efficient, good for single professionals.",
          "Shared apartments: Common among students. Check Roomies Korea or university bulletin boards.",
          "University dorms: Usually cheapest option for students. Apply early — spots fill up fast. Costs ₩300,000–₩700,000/month.",
          "Foreigner-friendly areas: Mapo-gu, Seodaemun-gu, Gangnam, Itaewon, Suwon, Pangyo (for tech workers).",
        ],
        tags: ["Goshiwon", "Officetel", "월세", "Dorm"],
      },
      {
        title: "Finding a Place to Rent",
        icon: <MapPin className="w-4 h-4" />,
        description:
          "Where and how to search for housing as a foreigner in Korea.",
        details: [
          "Naver Real Estate (네이버 부동산): The best property portal in Korea. Use Papago to translate.",
          "Zigbang (직방) and Dabang (다방): English-friendly apps with map-based search and virtual tours.",
          "Seoul Global Center housing counseling: Free guidance on Korean rental contracts.",
          "University housing offices: Most Korean universities have lists of verified landlords near campus.",
          "IIK community groups: Fellow Indians often share leads on available rooms.",
          "Avoid contracts without ARC/passport verification from the landlord side — always verify the property owner.",
          "Real estate agencies (부동산): Walk into any '부동산' near your target area. Some speak basic English.",
        ],
        link: { label: "Zigbang App", url: "https://www.zigbang.com" },
        tags: ["Naver", "Zigbang", "Dabang", "Search"],
      },
      {
        title: "Lease & Contracts — What to Know",
        icon: <Key className="w-4 h-4" />,
        description:
          "Never sign a Korean lease without understanding these key points.",
        details: [
          "Always confirm the landlord is the actual registered owner — check at the local 등기소 (registry office) or via Naver Real Estate.",
          "For monthly rent (월세), the lease is typically 1–2 years. Negotiate before signing.",
          "Deposit (보증금) protects you — get it back when you leave if no damage. Document the condition of the apartment on move-in.",
          "Utility bills (electricity, gas, water) are usually paid separately unless goshiwon-included.",
          "Some landlords require a Korean guarantor — universities can sometimes help foreign students with this.",
          "Seoul Global Center offers free lease contract review in English.",
          "If a landlord refuses to return your deposit, you can file a complaint through the Korea Legal Aid Corporation.",
        ],
        link: {
          label: "Seoul Global Center",
          url: "https://global.seoul.go.kr",
        },
        tags: ["Deposit", "Lease", "Contract", "Legal"],
      },
      {
        title: "Moving In — Setup Checklist",
        icon: <ShoppingBag className="w-4 h-4" />,
        description:
          "Everything to arrange when you first move into a Korean home.",
        details: [
          "Register your new address at the local 주민센터 (Community Service Center) within 14 days of moving.",
          "Update your ARC address at HiKorea or immigration office — required by law.",
          "Set up utilities: most apartments have prepaid meters; electricity is via KEPCO (한전), gas via city provider.",
          "Internet: KT, SKT, LG U+ all offer home internet. Installation typically within 3–5 business days.",
          "Furniture: Secondhand furniture is abundant on Karrot (당근마켓 — Korea's Craigslist). Ikea has stores in Korea.",
          "Trash disposal: Korea has strict recycling laws. General trash requires official trash bags (종량제). Recyclables are free.",
          "For movers: use Naver to search '이사' (moving companies) in your area. Many offer affordable small-move services.",
        ],
        tags: ["Setup", "Utilities", "Recycling", "KEPCO"],
      },
    ],
  },
  {
    id: "jobs",
    title: "Jobs & Career",
    description: "Find work, understand visas, and build your career in Korea",
    icon: <Briefcase className="w-6 h-6" />,
    accent: "#9333ea",
    bgGradient: "from-violet-50 via-fuchsia-50/60 to-white",
    borderColor: "rgba(147,51,234,0.18)",
    items: [
      {
        title: "Top Job Platforms in Korea",
        icon: <Globe className="w-4 h-4" />,
        description:
          "Where to look for jobs as an international professional or student in Korea.",
        details: [
          "LinkedIn Korea: Best for multinational companies, tech, and finance roles. Set location to 'Seoul' in your profile.",
          "JobKorea (잡코리아): Korea's largest job portal. Use Papago to translate. Great for local companies.",
          "Saramin (사람인): Similar to JobKorea. Some English listings available.",
          "Seoul Global Center Job Board: Specifically targets English-speaking foreigners. Free and curated.",
          "Korea Tech scene: Kakao, Naver, Krafton, Samsung, LG, SK all post English-friendly listings on LinkedIn.",
          "Glassdoor Korea: For salary benchmarking before negotiations.",
          "Indeed Korea: Growing international job listings, some with English applications.",
          "Startup ecosystem: Strong in Seoul — check 'Startup Recipe' and 'Korea Startup Forum' communities.",
        ],
        link: {
          label: "Seoul Global Center Jobs",
          url: "https://global.seoul.go.kr/life/job_and_business/foreign_job_seeker",
        },
        tags: ["LinkedIn", "JobKorea", "Saramin", "Startups"],
      },
      {
        title: "Korean Resume & Interview Culture",
        icon: <ScrollText className="w-4 h-4" />,
        description:
          "Korean job applications differ significantly from Indian or Western norms.",
        details: [
          "Korean resume (이력서) traditionally includes a photo, age, and sometimes family status — though this is changing at international companies.",
          "Self-introduction letter (자기소개서): A 1–2 page narrative essay about your background and motivation. More important than the CV in Korea.",
          "For multinational companies: use a standard international resume format without age/photo.",
          "Interview culture: formal, hierarchical. Arrive 10 minutes early. Dress conservatively.",
          "Bow when greeting interviewers. Address people formally. Avoid casual language.",
          "Group interviews and personality tests (MBTI, aptitude tests) are common at large Korean conglomerates (chaebols).",
          "Salary negotiation: less aggressive than in Western culture. Research market rates beforehand on Glassdoor or JobKorea.",
        ],
        tags: ["Resume", "Interview", "Chaebol", "자기소개서"],
      },
      {
        title: "Work Restrictions & Permits",
        icon: <Shield className="w-4 h-4" />,
        description:
          "Understanding what you can and cannot do legally depending on your visa.",
        details: [
          "D-2 (Student): Can work part-time max 20 hrs/week during semester. Full-time in vacation periods. Needs part-time permit.",
          "D-10 (Job Seeker): Cannot work until you have a confirmed job offer and change to E-series visa.",
          "E-7 (Skilled Worker): Tied to a specific employer. Changing jobs requires notifying immigration.",
          "F-2 (Long-term Resident) and F-5 (Permanent Resident): Unrestricted work rights.",
          "Part-time work permit: Apply at HiKorea or immigration with your university's permission letter + ARC.",
          "Illegal work (working without permit or beyond hours) can result in ARC cancellation and deportation.",
          "Freelancing as a foreigner: legally complex — consult Seoul Global Center or a Korean immigration lawyer.",
        ],
        link: {
          label: "HiKorea Work Permits",
          url: "https://www.hikorea.go.kr",
        },
        tags: ["Part-time", "Permit", "D-2", "E-7"],
      },
      {
        title: "Internships for Students",
        icon: <Star className="w-4 h-4" />,
        description:
          "How to find and secure internships in Korea as an international student.",
        details: [
          "University career centers (취업지원팀) are the best first stop — they have partnerships with Korean companies.",
          "KOTRA Global Internship Program: Government-run program placing international students in Korean companies.",
          "Samsung, LG, SK, Kakao, Naver all run summer internship programs — applications usually open Feb–March.",
          "Internships are generally unpaid or minimally compensated at many Korean firms — check visa work rules.",
          "Korea's Global Internship Program (GIP) is funded by the Korean government for international students.",
          "LinkedIn is the most effective networking platform for finding international-friendly internships.",
          "Networking events at Seoul Global Center and IIK often lead to direct introductions.",
        ],
        tags: ["Internship", "KOTRA", "Samsung", "Naver"],
      },
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare & Emergency",
    description: "Stay healthy, know your rights, and act fast in emergencies",
    icon: <Stethoscope className="w-6 h-6" />,
    accent: "#dc2626",
    bgGradient: "from-red-50 via-rose-50/60 to-white",
    borderColor: "rgba(220,38,38,0.18)",
    items: [
      {
        title: "National Health Insurance (NHI)",
        icon: <Heart className="w-4 h-4" />,
        description:
          "Korea's national health system covers most foreigners — enroll as early as possible.",
        details: [
          "국민건강보험 (National Health Insurance): Most foreigners on D-2, E-series, or F-series visas are automatically enrolled after 6 months.",
          "Monthly premiums: typically ₩70,000–₩130,000 depending on income. Students often pay minimum rate.",
          "NHI covers 60–80% of most medical costs — you pay the remainder at clinics.",
          "Enroll at the National Health Insurance Service (NHIS) office near you, or check enrollment status via nhis.or.kr.",
          "University students: check if your university provides group health insurance — many Korean universities include this for international students.",
          "Without NHI: most hospitals offer services but at full price. Keep receipts for any insurance reimbursement.",
          "Dental and vision care are largely not covered by NHI — plan separately.",
        ],
        link: {
          label: "NHIS Website",
          url: "https://www.nhis.or.kr/nhis/index.do",
        },
        tags: ["NHI", "Health Insurance", "NHIS", "Medical"],
      },
      {
        title: "Finding English-Speaking Hospitals",
        icon: <Hospital className="w-4 h-4" />,
        description:
          "Access healthcare confidently even with no Korean language skills.",
        details: [
          "Seoul National University Hospital, Samsung Medical Center, Asan Medical Center all have international patient centers with English-speaking staff.",
          "Foreigner Helpline 1345: For information on medical facilities, visa, and daily life. Available 24/7 in multiple languages including Hindi.",
          "Itaewon area has several international clinics and English-speaking GPs.",
          "NHIS app and website has a 'Hospital Finder' tool — search '영어' (English) to filter English-speaking facilities.",
          "Many university health centers have international student coordinators who can assist.",
          "For dental: University dental hospitals offer lower prices. Seoul National University Dental Hospital is recommended.",
          "Pharmacy (약국): Basic OTC medicines available without prescription. Show a photo of your medicine if unsure — pharmacists are helpful.",
        ],
        tags: ["English Hospital", "SNU", "Samsung Medical", "1345"],
      },
      {
        title: "Emergency Numbers to Save Now",
        icon: <Phone className="w-4 h-4" />,
        description:
          "Save these numbers before you need them. Emergencies don't wait.",
        details: [
          "🚨 112 — Police (criminal emergencies, theft, assault). English operators available.",
          "🚑 119 — Ambulance & Fire. Call for any medical emergency. Some English support.",
          "☎️ 1345 — Korea Immigration & Foreigner Support. 24/7. Available in English, Chinese, and other languages.",
          "☎️ 1399 — Foreign Language Support Center. Help for foreigners in everyday situations.",
          "🏛️ Indian Embassy Seoul: +82-2-798-4257 | emergencies: +82-10-5371-7700.",
          "Indian Embassy Emergency Email: emb.seoul@mea.gov.in",
          "🏥 After-hours medical: 'Night Pharmacy' (야간약국) — search Naver for nearest one. Most open until midnight.",
          "Seoul Global Emergency Center: +82-2-1588-1830.",
        ],
        tags: ["112", "119", "1345", "Embassy"],
      },
      {
        title: "Pharmacy & Medicine Basics",
        icon: <Pill className="w-4 h-4" />,
        description:
          "Navigating Korean pharmacies and getting the medicine you need.",
        details: [
          "Korean pharmacies (약국, pronounced 'yakgook') are everywhere — one in virtually every building cluster.",
          "Common Indian medicines have Korean equivalents — show pharmacist the active ingredient name.",
          "OTC medicines for cold, fever, headache, digestion available without prescription.",
          "Prescription: Get from a doctor at any clinic. Many clinics are walk-in. Average consultation: ₩5,000–₩15,000 with NHI.",
          "Digestive medicines: Korean 'Chung-a-ram' is effective. Indian brands like Hajmola are not available — try Korean equivalents.",
          "Allergy medicine: common and available OTC at pharmacies.",
          "For chronic medication from India: bring a supply + your prescription. Importing medicine via post requires documentation.",
        ],
        tags: ["Pharmacy", "약국", "Prescription", "OTC"],
      },
    ],
  },
  {
    id: "students",
    title: "Student Resources",
    description:
      "Everything a student needs to thrive academically and socially in Korea",
    icon: <GraduationCap className="w-6 h-6" />,
    accent: "#0891b2",
    bgGradient: "from-cyan-50 via-sky-50/60 to-white",
    borderColor: "rgba(8,145,178,0.18)",
    items: [
      {
        title: "University Onboarding & Admin",
        icon: <BookOpen className="w-4 h-4" />,
        description:
          "The first weeks at a Korean university can be overwhelming — here's what to expect.",
        details: [
          "International Office (국제교류팀): Your main point of contact for any administrative issue. Most have English staff.",
          "Student ID (학생증): Apply at your university's admin office — needed for library, dormitory, discounts.",
          "Library access, e-resources, and course registration all happen through your university portal.",
          "Orientation programs for international students are usually held at semester start — attend all of them.",
          "Korean buddy programs: Most universities pair international students with Korean students. Invaluable for daily life.",
          "Student banking: Many banks have university branches. KEB Hana Bank is particularly international-student-friendly.",
          "Korean language classes: Universities offer free or subsidized Korean courses for international students.",
        ],
        tags: ["Orientation", "International Office", "Student ID", "Banking"],
      },
      {
        title: "Scholarships for Indian Students",
        icon: <Star className="w-4 h-4" />,
        description:
          "Korea actively funds international students. Don't miss these opportunities.",
        details: [
          "GKS (Global Korea Scholarship / 정부초청장학금): Full scholarship for undergrad and postgrad. Apply through Korean Embassy in India (Feb–March annually).",
          "University-specific scholarships: KAIST, POSTECH, SNU, Yonsei, Korea University all offer merit-based scholarships to international students.",
          "KOICA scholarships: For graduate students in development-related fields.",
          "Brain Korea 21 (BK21): Research funding available through faculty labs — ask your professor.",
          "NIIED (National Institute for International Education): Manages GKS and additional programs.",
          "Tuition waivers: Many Korean universities offer 50–100% tuition waivers for GPA-maintaining international students.",
          "Application tips: Strong Korean language proficiency (TOPIK) significantly improves chances.",
        ],
        link: {
          label: "NIIED GKS Program",
          url: "https://www.niied.go.kr/eng/index.do",
        },
        tags: ["GKS", "Scholarship", "KAIST", "NIIED"],
      },
      {
        title: "Learning Korean Language",
        icon: <MessageCircle className="w-4 h-4" />,
        description:
          "Learning Korean isn't just polite — it genuinely transforms your experience.",
        details: [
          "TOPIK (Test of Proficiency in Korean): The standard certification. Level 1–2 for basic life, 3–4 for work, 5–6 for academic use.",
          "University language centers offer affordable Korean courses (often free for enrolled students).",
          "King Sejong Institute: Government-run Korean language centers worldwide. Also has online programs.",
          "Apps: Duolingo Korean is decent for basics. Pimsleur for audio learners. Anki for vocabulary.",
          "Language exchange (언어교환): Korean students want to practice English. Apps like HelloTalk and Tandem connect you.",
          "Korean drama and K-pop: Immersive passive learning. Enable Korean subtitles on Netflix.",
          "Hangul (Korean script) can be learned in 2–3 hours — do this before arrival. Essential for menus, signs, and forms.",
        ],
        link: {
          label: "King Sejong Institute Online",
          url: "https://www.sejonghakdang.org",
        },
        tags: ["TOPIK", "Korean", "Language Exchange", "Duolingo"],
      },
      {
        title: "Campus Life & Mental Health",
        icon: <Heart className="w-4 h-4" />,
        description:
          "Student life in Korea can be intense. Know your support systems.",
        details: [
          "Korean academic culture is competitive. Normal to feel overwhelmed — seek your campus counseling center.",
          "Most universities have counseling centers (학생상담센터) with some English-speaking counselors.",
          "Mental health hotline: 1577-0199 (suicide prevention and crisis). English available via 1345.",
          "Student clubs (동아리): Join at least one — it's the fastest way to make Korean friends.",
          "Sports, gaming, K-pop dance, hiking, language clubs all welcome international students.",
          "Homesickness is very common. IIK community events are specifically helpful for this.",
          "Sleep schedule: Many Korean students study late. Don't feel pressured to match it — prioritize your health.",
        ],
        tags: ["Mental Health", "Counseling", "Student Clubs", "Well-being"],
      },
    ],
  },
  {
    id: "community",
    title: "Community & Support",
    description: "Connect with Indians in Korea — events, groups, and networks",
    icon: <Users className="w-6 h-6" />,
    accent: "#f59e0b",
    bgGradient: "from-amber-50 via-yellow-50/60 to-white",
    borderColor: "rgba(245,158,11,0.18)",
    items: [
      {
        title: "IIK Community Support",
        icon: <Users className="w-4 h-4" />,
        description:
          "Indians in Korea (IIK) is your home away from home — the central hub for the Indian diaspora.",
        details: [
          "IIK (indiansinkorea.com) is the umbrella organization for all Indians in South Korea, founded in 2002.",
          "Chapters across Korea: Seoul, Incheon, Suwon, Daejeon, Busan, Daegu, Gwangju.",
          "IIK events cover Diwali, Holi, Independence Day, New Year celebrations, and networking meetups.",
          "IIK has dedicated WhatsApp groups for students, professionals, and families — request to join via the website.",
          "Emergency support: IIK community leaders can assist with urgent situations, translation, and local guidance.",
          "IIK Job Board and mentoring: Senior Indian professionals in Korea often offer career guidance through IIK.",
          "Annual Diwali event in Seoul attracts 3,000+ attendees — the largest Indian cultural event in Korea.",
        ],
        link: { label: "IIK Website", url: "https://indiansinkorea.com" },
        tags: ["IIK", "Events", "Diwali", "WhatsApp"],
      },
      {
        title: "Regional Indian Associations",
        icon: <Landmark className="w-4 h-4" />,
        description:
          "Connect with your own regional community — language, food, and culture.",
        details: [
          "Korea Tamil Nanbargal (KTN): Est. 2003. Supports Tamils across Korea with emergency funds, education, and culture.",
          "Bengali Association of Korea (BAK): Celebrates Durga Puja, Nababarsho, and Bengali cultural events.",
          "Korea Kannada Koota (KKK): Est. 2011. Regional association for Karnataka community.",
          "Marathi Mandal Korea (MMK): Celebrates Ganesh Utsav, Gudi Padwa, and more.",
          "ISKCON Korea Temple: Near Uijeongbu, Seoul. Spiritual and cultural hub for devotees.",
          "IIK Women's Forum: Dedicated support network for Indian women in Korea.",
          "These associations maintain WhatsApp/Telegram groups — reach via IIK website or Facebook.",
        ],
        tags: ["KTN", "BAK", "KKK", "MMK", "ISKCON"],
      },
      {
        title: "Networking & Professional Meetups",
        icon: <Calendar className="w-4 h-4" />,
        description:
          "Build your professional network in Korea through community-led events.",
        details: [
          "IIK Professional Network: Regular meetups for Indian professionals in tech, academia, and business in Korea.",
          "Seoul Global Center: Monthly multicultural events, free to attend. Great for meeting expats from all countries.",
          "Korea Startup Forum: Weekly events for the startup ecosystem — strong international presence.",
          "Eventbrite Korea: Listings for English-friendly professional events in Seoul.",
          "Meetup.com Korea: Communities for hiking, language exchange, tech, and more.",
          "LinkedIn Local Seoul: Occasional in-person networking events posted on LinkedIn.",
          "Embassy events: Indian Embassy Seoul hosts National Day, business forums, and consular camps.",
        ],
        tags: ["Networking", "Meetup", "Seoul Global", "LinkedIn"],
      },
      {
        title: "Online Groups & Resources",
        icon: <Wifi className="w-4 h-4" />,
        description:
          "Stay connected and informed through active online communities.",
        details: [
          "Facebook: 'Indians in Korea (IIK)' group — most active Indian community page in Korea.",
          "Facebook: 'Tamil in Seoul', 'Bengali Association Korea', 'Kannadigas in Korea' — regional groups.",
          "Reddit: r/korea — active expat community, many Indians. Great for honest Q&A.",
          "Telegram: Several IIK city-based groups. Ask in IIK Facebook for invite links.",
          "YouTube: 'Indians in Korea' channels document daily life — useful for pre-arrival research.",
          "Instagram: @indiansinkorea — IIK's official account for event updates and community news.",
          "KakaoTalk open rooms: Some Indian community groups use KakaoTalk open chat for quick help.",
        ],
        tags: ["Facebook", "Reddit", "Telegram", "KakaoTalk"],
      },
    ],
  },
  {
    id: "faq",
    title: "Frequently Asked Questions",
    description:
      "Honest answers to real questions Indians ask before and after moving to Korea",
    icon: <HelpCircle className="w-6 h-6" />,
    accent: "#7c3aed",
    bgGradient: "from-violet-50 via-purple-50/60 to-white",
    borderColor: "rgba(124,58,237,0.18)",
    items: [
      {
        title: "Is Korea safe for Indians?",
        icon: <Shield className="w-4 h-4" />,
        description:
          "Safety, discrimination, and what the reality looks like day-to-day.",
        details: [
          "Korea is one of the safest countries in the world — extremely low rates of violent crime and theft.",
          "Walking alone at night in cities is generally safe, including for women.",
          "Racism exists and can manifest as staring, occasional rudeness, or difficulty renting apartments.",
          "Most Koreans are curious but respectful toward Indians. Anti-Indian racism is far less common than media might suggest.",
          "The IIK community provides peer support if you encounter discrimination or unfair treatment.",
          "Areas near universities and international zones (Itaewon, Mapo, Gangnam) are very foreigner-friendly.",
          "Korea scores high on the Global Peace Index. Petty crime is very low.",
        ],
        tags: ["Safety", "Racism", "Crime", "Community"],
      },
      {
        title: "What's the real cost of living?",
        icon: <IndianRupee className="w-4 h-4" />,
        description: "Honest monthly budget breakdown for Indians in Korea.",
        details: [
          "Seoul monthly budget (student): ₩700,000–₩1,200,000 (approx. ₹43,000–₹75,000 INR) covering rent, food, transport, phone.",
          "Rent: Goshiwon ₩350,000 | Shared apt ₩400,000–₩600,000 | Studio ₩600,000–₩1,200,000.",
          "Food: Cooking Indian food at home costs less than ₩200,000/month. Eating out at Korean restaurants: ₩7,000–₩12,000 per meal.",
          "Transport: Seoul monthly T-money pass approx. ₩55,000. Taxis are affordable for short distances.",
          "Phone: Budget plans from ₩10,000–₩20,000/month.",
          "Suburbs (Suwon, Incheon, Daejeon): 20–30% cheaper than Seoul for similar quality of life.",
          "Busan: Popular for lower cost of living + great quality of life — growing Indian community.",
        ],
        tags: ["Budget", "Rent", "Seoul", "Cost"],
      },
      {
        title: "How difficult is Korean language?",
        icon: <MessageCircle className="w-4 h-4" />,
        description:
          "What you actually need to know — and how fast you can learn.",
        details: [
          "Hangul (the script) can be learned in 2–3 hours. It's a phonetic alphabet — far easier than Chinese or Japanese characters.",
          "Basic survival Korean (greetings, numbers, food orders) can be learned in 2–4 weeks of casual study.",
          "Most university admin, hospitals near campuses, and big corporations have English-speaking staff.",
          "Outside Seoul or tourist areas, English proficiency drops significantly — some Korean is very helpful.",
          "TOPIK Level 2 (basic) is achievable in 3–6 months of study for most Indians.",
          "Indians have an advantage: Korean grammar has parallels to Hindi/Dravidian structures (SOV word order, agglutinative morphology).",
          "Don't let language fear stop you from enjoying Korea — apps and translation tools bridge most gaps.",
        ],
        tags: ["Korean", "Hangul", "TOPIK", "Language"],
      },
      {
        title: "What about Indian food & vegetarianism?",
        icon: <ShoppingBag className="w-4 h-4" />,
        description:
          "Can you maintain an Indian diet or vegetarian lifestyle in Korea?",
        details: [
          "Yes — with some effort. Itaewon has multiple Indian restaurants and grocery stores stocking everything from methi to achar.",
          "Cooking your own food is the easiest and cheapest solution. Indian stores in Seoul are well-stocked.",
          "Korean food: heavy on meat and seafood. Strict vegetarians will struggle at Korean restaurants without Korean language skills.",
          "Korean temple food (사찰음식) is entirely vegan — some restaurants serve it publicly.",
          "Search for '채식 식당' (vegetarian restaurant) on Naver Maps for options near you.",
          "Jain vegetarians: very limited options eating out. Cooking at home is strongly recommended.",
          "Delivery apps like Baemin now have vegetarian/vegan filters — more options each year.",
        ],
        tags: ["Vegetarian", "Indian Food", "Itaewon", "Jain"],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SHIMMER KEYFRAMES COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const GlobalStyles = () => (
  <style>{`
    @keyframes shimmerSweep {
      0% { left: -100%; }
      100% { left: 160%; }
    }
    @keyframes badgeFloat {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
    }
    @keyframes iconPulse {
      0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.85; }
      50% { transform: scale(1.15) rotate(10deg); opacity: 1; }
    }
    @keyframes glowBreath {
      0%, 100% { box-shadow: 0 0 0 0 rgba(234,88,12,0); }
      50% { box-shadow: 0 0 20px 4px rgba(234,88,12,0.2); }
    }
    @keyframes blobA {
      0%, 100% { transform: translate(0,0) scale(1); }
      50% { transform: translate(22px, -14px) scale(1.1); }
    }
    @keyframes blobB {
      0%, 100% { transform: translate(0,0) scale(1); }
      50% { transform: translate(-16px, 18px) scale(1.08); }
    }
    @keyframes blobC {
      0%, 100% { transform: translate(0,0) scale(1); }
      50% { transform: translate(10px, 10px) scale(1.12); }
    }
    @keyframes gradShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes floatCard {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    @keyframes ctaGrad {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `}</style>
);

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING MINI CARD (hero decoration)
// ─────────────────────────────────────────────────────────────────────────────

const HeroFloatCard = ({
  icon,
  label,
  delay,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  delay: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 12 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute hidden lg:flex items-center gap-2.5 bg-white/90 backdrop-blur-sm border border-stone-100 rounded-2xl px-3.5 py-2.5 shadow-lg ${className}`}
    style={{
      animation: `floatCard ${3.5 + delay}s ease-in-out infinite`,
      animationDelay: `${delay * 0.5}s`,
    }}
  >
    <span className="text-lg">{icon}</span>
    <span className="text-[11px] font-semibold text-stone-700 whitespace-nowrap">
      {label}
    </span>
  </motion.div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ACCORDION ITEM
// ─────────────────────────────────────────────────────────────────────────────

const AccordionItem = ({
  item,
  accent,
  isOpen,
  onToggle,
}: {
  item: ResourceItem;
  accent: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-2xl border transition-all duration-300 overflow-hidden"
      style={{
        borderColor: isOpen
          ? `${accent}40`
          : hovered
            ? `${accent}25`
            : "rgba(0,0,0,0.07)",
        background: isOpen
          ? `linear-gradient(135deg, ${accent}06 0%, white 60%)`
          : hovered
            ? "rgba(255,255,255,0.95)"
            : "rgba(255,255,255,0.80)",
        boxShadow: isOpen
          ? `0 8px 32px ${accent}15, 0 2px 8px rgba(0,0,0,0.04)`
          : hovered
            ? "0 4px 18px rgba(0,0,0,0.07)"
            : "0 1px 4px rgba(0,0,0,0.04)",
        transform: hovered && !isOpen ? "translateX(3px)" : "translateX(0)",
        transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-300"
        style={{
          background: isOpen ? accent : "transparent",
          opacity: isOpen ? 1 : 0,
        }}
      />

      {/* Header button */}
      <button
        onClick={onToggle}
        className="relative w-full text-left p-4 flex items-start justify-between gap-3 group"
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Icon circle */}
          <div
            className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5 transition-all duration-300"
            style={{
              background: isOpen
                ? `${accent}15`
                : hovered
                  ? `${accent}10`
                  : "rgba(0,0,0,0.04)",
              color: isOpen ? accent : hovered ? accent : "#64748b",
            }}
          >
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-stone-900 text-sm leading-snug">
              {item.title}
            </h4>
            <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
              {item.description}
            </p>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium transition-all duration-200"
                  style={{
                    background: isOpen ? `${accent}12` : "rgba(0,0,0,0.05)",
                    color: isOpen ? accent : "#64748b",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="flex-shrink-0 mt-1"
        >
          <ChevronDown
            className="w-4 h-4 transition-colors duration-200"
            style={{ color: isOpen ? accent : "#94a3b8" }}
          />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              initial={{ y: -6, filter: "blur(3px)" }}
              animate={{ y: 0, filter: "blur(0px)" }}
              exit={{ y: -4, filter: "blur(2px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="px-4 pb-4"
            >
              <div
                className="rounded-xl p-4 space-y-2.5"
                style={{
                  background: `${accent}06`,
                  border: `1px solid ${accent}15`,
                }}
              >
                {item.details.map((detail, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.28,
                      delay: i * 0.045,
                      ease: "easeOut",
                    }}
                    className="flex items-start gap-2.5"
                  >
                    <span
                      className="flex-shrink-0 mt-[6px] w-1.5 h-1.5 rounded-full"
                      style={{ background: accent }}
                    />
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {detail}
                    </p>
                  </motion.div>
                ))}
                {item.link && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: item.details.length * 0.045 + 0.1,
                    }}
                    className="pt-1"
                  >
                    <a
                      href={item.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 hover:gap-2.5"
                      style={{ color: accent }}
                    >
                      <ExternalLink className="w-3 h-3" />
                      {item.link.label}
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY CARD
// ─────────────────────────────────────────────────────────────────────────────

const CategoryCard = ({
  category,
  index,
  expandedId,
  onToggle,
}: {
  category: ResourceCategory;
  index: number;
  expandedId: string | null;
  onToggle: (id: string) => void;
}) => {
  const [iconHovered, setIconHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.28, ease: "easeOut" } }}
      className={`resources-scroll-reveal group relative overflow-hidden rounded-[2rem] border p-8 bg-gradient-to-br ${category.bgGradient}`}
      style={{
        borderColor: category.borderColor,
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.8) inset",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          `0 20px 60px ${category.accent}20, 0 8px 24px rgba(0,0,0,0.08)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 24px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.8) inset";
      }}
    >
      {/* Gradient border glow on hover */}
      <div
        className="absolute inset-0 rounded-[2rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at top left, ${category.accent}08, transparent 60%)`,
        }}
      />

      {/* Card header */}
      <div className="relative flex items-start gap-4 mb-7">
        <motion.div
          className="rounded-2xl p-3.5 flex-shrink-0 transition-all duration-300"
          style={{
            background: `${category.accent}12`,
            color: category.accent,
            boxShadow: iconHovered ? `0 0 20px ${category.accent}35` : "none",
          }}
          onMouseEnter={() => setIconHovered(true)}
          onMouseLeave={() => setIconHovered(false)}
          whileHover={{ scale: 1.1, rotate: 4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {category.icon}
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-stone-950 leading-snug">
            {category.title}
          </h3>
          <p className="text-sm text-stone-500 mt-1 leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Accordion items */}
      <div className="relative space-y-2.5">
        {category.items.map((item, itemIndex) => {
          const itemId = `${category.id}-${itemIndex}`;
          return (
            <AccordionItem
              key={itemId}
              item={item}
              accent={category.accent}
              isOpen={expandedId === itemId}
              onToggle={() => onToggle(itemId)}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ResourcesPageContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [primaryHovered, setPrimaryHovered] = useState(false);
  const [secondaryHovered, setSecondaryHovered] = useState(false);
  const [shineActive, setShineActive] = useState(false);
  const heroInView = useInView(heroRef, { once: true });

  const handleToggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".resources-scroll-reveal")
        .forEach((section) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top 88%",
            onEnter: () =>
              gsap.to(section, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
              }),
          });
        });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden bg-white text-stone-900"
    >
      <GlobalStyles />

      {/* Global ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "8%",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(234,88,12,0.08) 0%, transparent 70%)",
            filter: "blur(48px)",
            animation: "blobA 11s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            right: "5%",
            width: 380,
            height: 380,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
            filter: "blur(48px)",
            animation: "blobB 13s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "30%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
            animation: "blobC 9s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden px-6 pt-20 pb-24 lg:px-12 lg:pt-28 z-10"
      >
        <div className="relative mx-auto max-w-5xl text-center">
          {/* Floating mini cards */}
          <HeroFloatCard
            icon="🛂"
            label="Visa Help"
            delay={0.9}
            className="-left-4 top-12"
          />
          <HeroFloatCard
            icon="🏠"
            label="Housing Tips"
            delay={1.1}
            className="-right-8 top-8"
          />
          <HeroFloatCard
            icon="🚨"
            label="Emergency Contacts"
            delay={1.3}
            className="-left-2 bottom-4"
          />
          <HeroFloatCard
            icon="🎓"
            label="Student Guide"
            delay={1.5}
            className="-right-4 bottom-8"
          />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.88 }}
            animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex mb-7"
            style={{
              animation: heroInView
                ? "badgeFloat 3.8s ease-in-out infinite"
                : "none",
              animationDelay: "0.8s",
            }}
          >
            <div
              className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-orange-700 cursor-default select-none"
              style={{
                background:
                  "linear-gradient(135deg, #fff7ed, #ffedd5 60%, #fed7aa)",
                border: "1px solid rgba(234,88,12,0.22)",
                animation: heroInView
                  ? "glowBreath 3.2s ease-in-out infinite"
                  : "none",
                animationDelay: "1s",
              }}
            >
              {/* Shimmer */}
              <span
                className="absolute top-0 bottom-0 w-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
                  animation: "shimmerSweep 3s ease-in-out infinite",
                  animationDelay: "1.5s",
                }}
              />
              <span
                className="text-base"
                style={{
                  animation: "iconPulse 2.8s ease-in-out infinite",
                  display: "inline-block",
                }}
              >
                📖
              </span>
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase relative z-10">
                Comprehensive Resources
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-6">
            {["Your Complete", "Guide to Living", "in Korea"].map(
              (line, li) => (
                <motion.div
                  key={li}
                  initial={{ opacity: 0, y: 36, filter: "blur(5px)" }}
                  animate={
                    heroInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
                  }
                  transition={{
                    duration: 0.72,
                    delay: 0.2 + li * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <h1
                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
                    style={{
                      background:
                        li === 2
                          ? "linear-gradient(90deg, #ea580c 0%, #f97316 40%, #fb923c 65%, #ea580c 100%)"
                          : "none",
                      backgroundSize: li === 2 ? "200% auto" : "auto",
                      WebkitBackgroundClip: li === 2 ? "text" : "unset",
                      WebkitTextFillColor: li === 2 ? "transparent" : "inherit",
                      backgroundClip: li === 2 ? "text" : "unset",
                      color: li === 2 ? "transparent" : "#0c0a09",
                      animation:
                        li === 2 ? "gradShift 4s ease-in-out infinite" : "none",
                    }}
                  >
                    {line}
                  </h1>
                </motion.div>
              ),
            )}
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={
              heroInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
            }
            transition={{ duration: 0.7, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-2xl text-base leading-8 text-stone-600 md:text-lg mb-10"
          >
            From visas and accommodation to jobs and emergency support —
            everything you need to thrive as an Indian in South Korea, curated
            by the IIK community.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.65,
              delay: 0.72,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-wrap justify-center gap-4"
          >
            {/* Primary */}
            <motion.a
              href="#resources"
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #ea580c, #f97316)",
                boxShadow: primaryHovered
                  ? "0 12px 40px rgba(234,88,12,0.42), 0 4px 12px rgba(234,88,12,0.2)"
                  : "0 6px 24px rgba(234,88,12,0.28)",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={() => {
                setPrimaryHovered(true);
                setShineActive(true);
              }}
              onMouseLeave={() => {
                setPrimaryHovered(false);
                setTimeout(() => setShineActive(false), 500);
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {shineActive && (
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)",
                    animation: "shimmerSweep 0.55s ease-out forwards",
                  }}
                />
              )}
              Explore Resources
            </motion.a>

            {/* Secondary */}
            <motion.a
              href="#"
              className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-stone-700"
              style={{
                border: "1.5px solid",
                borderColor: secondaryHovered
                  ? "rgba(234,88,12,0.4)"
                  : "rgba(0,0,0,0.12)",
                background: secondaryHovered ? "rgba(234,88,12,0.04)" : "white",
                boxShadow: secondaryHovered
                  ? "0 4px 16px rgba(234,88,12,0.1)"
                  : "0 1px 4px rgba(0,0,0,0.04)",
                transition: "all 0.28s ease",
                color: secondaryHovered ? "#ea580c" : "#44403c",
              }}
              onMouseEnter={() => setSecondaryHovered(true)}
              onMouseLeave={() => setSecondaryHovered(false)}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Contact IIK for Help
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── RESOURCE GRID ─────────────────────────────────────────────────── */}
      <section
        id="resources"
        className="relative px-6 py-20 lg:px-12 lg:py-24 z-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {resourceCategories.map((category, i) => (
              <CategoryCard
                key={category.id}
                category={category}
                index={i}
                expandedId={expandedId}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-24 lg:px-12 z-10">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #f97316 0%, #fb923c 25%, #fbbf24 50%, #f97316 75%, #ea580c 100%)",
            backgroundSize: "300% 300%",
            animation: "ctaGrad 8s ease infinite",
          }}
        />
        {/* Overlay glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.22),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.16),transparent_35%)]" />

        {/* Floating particles */}
        {[
          { top: "12%", left: "8%", size: 60, delay: 0 },
          { top: "70%", left: "80%", size: 80, delay: 1 },
          { top: "40%", left: "55%", size: 40, delay: 2 },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              background: "rgba(255,255,255,0.12)",
              filter: "blur(20px)",
              animation: `floatCard ${5 + p.delay}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8 rounded-[2.5rem] border border-white/25 bg-white/12 p-10 shadow-[0_40px_120px_rgba(0,0,0,0.15)] backdrop-blur-xl sm:p-14 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-xl">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[11px] uppercase tracking-[0.3em] text-white/75 font-semibold mb-4"
              >
                Need Help?
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-3xl font-bold leading-tight text-white md:text-4xl"
              >
                Can't find what you're looking for?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.42 }}
                className="mt-3 text-sm leading-7 text-white/82"
              >
                Reach out to the IIK community team. We've helped thousands of
                Indians settle into Korean life — you're not alone in this.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              {/* Primary CTA */}
              <motion.a
                href="#"
                className="relative overflow-hidden inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-orange-600 whitespace-nowrap"
                style={{ boxShadow: "0 8px 32px rgba(255,255,255,0.25)" }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 16px 48px rgba(255,255,255,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={(e) => {
                  const shine = e.currentTarget.querySelector(
                    ".cta-shine",
                  ) as HTMLElement;
                  if (shine)
                    shine.style.animation = "shimmerSweep 0.5s ease-out";
                }}
              >
                <span
                  className="cta-shine absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg,transparent 35%,rgba(234,88,12,0.1) 50%,transparent 65%)",
                  }}
                />
                Contact IIK Support
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="https://indiansinkorea.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/12 px-7 py-3.5 text-sm font-semibold text-white whitespace-nowrap backdrop-blur-sm"
                whileHover={{
                  scale: 1.04,
                  background: "rgba(255,255,255,0.2)",
                  y: -1,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                Join IIK Community
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
