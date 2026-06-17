"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ModalPortal } from "./ModalPortal";

interface InternationalSchoolsModalProps {
  open: boolean;
  onClose: () => void;
}

const SCHOOLS = [
  {
    name: "Yongsang International School of Seoul (YISS)",
    url: "https://www.yisseoul.org/",
    address: "Yongsang-gu, Seoul",
    phone: "02-797-5104",
    branch: "Seoul",
  },
  {
    name: "Korea International School (KIS) – Seoul Campus",
    url: "http://kisseoul.org/",
    address: "408 Gaepo-ro, Gangnam-gu, Seoul",
    phone: "02-3496-0509",
    branch: "Seoul",
  },
  {
    name: "Dulwich College Seoul",
    url: "https://seoul.dulwich.org/",
    address: "Banpo-dong, Seocho-gu, Seoul",
    phone: "02-3015-8500",
    branch: "Seoul",
  },
  {
    name: "Deutch Schule Seoul",
    url: "http://www.dsseoul.org/",
    address: "4-13 Hannam-dong, Yongsan-ku, Seoul",
    phone: "(02) 792-0988",
    branch: "Seoul",
  },
  {
    name: "British School of Seoul Foreign School",
    url: "http://www.sfs.or.kr/sfbs/thomas",
    address: "55 Yeonhi-dong, Seodaemun-ku, Seoul",
    phone: "(02) 330-3271",
    branch: "Seoul",
  },
  {
    name: "Korea Kent Foreign School",
    url: "http://www.kkfs.org/",
    address: "619-30 Guui-dong, Kwangji-ku, Seoul",
    phone: "(02) 2201-7091~2",
    branch: "Seoul",
  },
  {
    name: "Seoul International School",
    url: "http://www.siskorea.org/",
    address: "Bokjeong-dong, Sujeong-gu, Seongnam-si, Gyeonggi-do",
    phone: "+82-(0)31-750-1327~8",
    branch: "Seongnam",
  },
  {
    name: "Korea International School (KIS) Pangyo Campus",
    url: "https://www.kis.or.kr/",
    address: "27 Daewangpangyo-ro 385, Bundang-gu, Seongnam-si, Gyeonggi-do",
    phone: "031-789-0509",
    branch: "Pangyo",
  },
  {
    name: "American Stem Prep. (ASP)",
    url: "https://www.astemprep.org/",
    address: "91, Poeun-daero, Suji-gu, Yongin-si, Gyeonggi-do",
    phone: "031-212-9117",
    branch: "Gwanggyo / Incheon",
  },
  {
    name: "St. Paul American Scholars (SPAS)",
    url: "https://www.stpaulscholars.com/",
    address: "Gyeonggi-do, Yongin-si, Sanghyeon-dong, Suji-ro",
    phone: "1522-3026",
    branch: "Gwanggyo / Dongtang / Seocho",
  },
  {
    name: "Gyeonggi Suwon International School (GSIS)",
    url: "http://www.gsis.sc.kr/",
    address: "451, Yeongtong-gu, Suwon-si, Gyeonggi-do",
    phone: "031-695-2800",
    branch: "Suwon",
  },
  {
    name: "Seoul Academy International School",
    url: "http://www.seoulacademy.net/",
    address: "988-5 Daechi 3-dong, Kangnam-ku, Seoul",
    phone: "(02) 554-1690",
    branch: "Seoul",
  },
  {
    name: "Centennial Christian School",
    url: "http://www.ccslions.com/",
    address: "820 Wolgye 2-dong, Nowon-ku, Seoul",
    phone: "(02) 905-9275~6",
    branch: "Seoul",
  },
  {
    name: "Seoul Foreign School",
    url: "http://www.sfs.or.kr/",
    address: "55 Yeonhi-dong, Seodaemun-ku, Seoul",
    phone: "(02) 330-3201",
    branch: "Seoul",
  },
  {
    name: "Lycee International Xavier",
    url: "http://www.xavier.sc.kr/",
    address: "151 Kuki-dong, Chongro-ku, Seoul",
    phone: "(02) 396-7688",
    branch: "Seoul",
  },
  {
    name: "Global Christian School (GCS-Seoul)",
    url: "http://www.gcskorea.org/",
    address: "243-5 Bokwang-dong, Yongsan-ku, Seoul",
    phone: "(02) 797-0234",
    branch: "Seoul",
  },
  {
    name: "Lycee Francaise de Seoul",
    url: "http://www.lfseoul.org/",
    address: "98-2 Banpo-dong, Seocho-ku, Seoul",
    phone: "(02) 593-5444",
    branch: "Seoul",
  },
  {
    name: "Canada Maple International School",
    url: "http://cmis.kr/",
    address: "Incheon Gwangyok, Nam-Gu, Munhak-dong",
    phone: "(032) 715-8000",
    branch: "Incheon",
  },
  {
    name: "Incheon International High School",
    url: "http://ii.icehs.kr/",
    address: "74-40 Yeongjong-daero 277beon-gil, Unseo-dong, Jung-gu, Incheon",
    phone: "032-745-4604",
    branch: "Incheon",
  },
  {
    name: "Cheongna Dalton School",
    url: "http://daltonschool.kr/",
    address: "Gyeongseo-dong, Seo-gu, Incheon",
    phone: "032-563-0523",
    branch: "Incheon",
  },
  {
    name: "International Christian School (ICS-Seoul)",
    url: "http://ics-ujb.org/",
    address: "Nok Yang Dong 375-2, Uijongbu, Gyeonggi-do",
    phone: "031-855-1277",
    branch: "Uijongbu",
  },
  {
    name: "Indianhead International School",
    url: "http://www.iis.or.kr/",
    address: "233-3 Howon-dong, Eujeongbu, Gyeonggi-do",
    phone: "(031) 870-3700",
    branch: "Uijongbu",
  },
  {
    name: "Liberty Foreign School",
    url: null,
    address: "375-2 Nokyang-dong, Eujeongbu, Gyeonggi-do",
    phone: "(031) 855-1276",
    branch: "Uijongbu",
  },
  {
    name: "Helen Doron International",
    url: "http://www.helendoronkindergarten.com/",
    address: "42-5 Banseong Dong, 3F, Hwaseong Si, Gyeonggi Do",
    phone: "(31) 613-1062",
    branch: "Dongtang",
  },
  {
    name: "Indianhead International School Dongduchon Campus",
    url: "http://www.iis.or.kr/",
    address: "523-1 Saeyeon 1-dong, Dongducheon, Gyeonggi-do",
    phone: "(031) 868-2600",
    branch: "Dongducheon",
  },
  {
    name: "Songtan Foreign School",
    url: null,
    address: "367-3 Sindae-dong, Pyeongtaik, Gyeonggi-do",
    phone: "(031) 653-1375",
    branch: "Pyeongtaek",
  },
  {
    name: "International Christian School",
    url: null,
    address: "851-9 Jisan-dong, Pyeongtaik, Gyeonggi-do",
    phone: "031-651-1376",
    branch: "Pyeongtaek",
  },
  {
    name: "Okpo International School",
    url: null,
    address: "302 Okpo 1-dong, Keoje, Gyeongsangnam-do",
    phone: "(055) 687-1503",
    branch: "Geoje",
  },
  {
    name: "Daewoo Foreign School",
    url: null,
    address: "1-443 Okpo-dong, Keoje, Gyeongsangnam-do",
    phone: "(055) 687-3283",
    branch: "Geoje",
  },
  {
    name: "Busan Japanese School",
    url: "http://user.chollian.net/~pusjpnsc",
    address: "173-8 Minrak-dong, Suyeong-ku, Busan",
    phone: "(051) 576-0723",
    branch: "Busan",
  },
  {
    name: "Busan Foreign School",
    url: "http://www.busanforeignschool.org/",
    address: "1366-3 Joa-dong, Haewoondai-ku, Busan",
    phone: "(051) 747-7199",
    branch: "Busan",
  },
  {
    name: "Busan International School",
    url: null,
    address: "1492-12 Jung 2-dong, Haewoondai-ku, Busan",
    phone: "(051) 742-3375",
    branch: "Busan",
  },
  {
    name: "Gyeongnam International Foreign School",
    url: "http://www.gifs.or.kr/",
    address: "451 Wolseong-ri, Sanam-myeon, Gyeongsangnam-do",
    phone: "(055) 853-5125",
    branch: "Sanam",
  },
  {
    name: "Daegu International School",
    url: "https://www.dis.sc.kr/",
    address: "22 Palgong-ro 50-gil, Dong-gu, Daegu",
    phone: "053-980-2100",
    branch: "Daegu",
  },
  {
    name: "Global Christian School (GCS-Daegu)",
    url: "http://www.gcskorea.org/GCSD",
    address: "175 Namsan 2-dong, Jung-ku, Daegu",
    phone: "(053) 255-5956",
    branch: "Daegu",
  },
  {
    name: "Kwangju Foreign School",
    url: null,
    address: "633-1 Yangsan-dong, Buk-ku, Kwangju",
    phone: "(062) 575-0900",
    branch: "Gwangju",
  },
  {
    name: "Dwight School",
    url: "http://www.dwight.or.kr/",
    address: "21, 62-gil World cup buk-ro, Mapo-gu, Seoul",
    phone: "02-6920-8600",
    branch: "Seoul",
  },
  {
    name: "Kunsan Christian Foreign School",
    url: null,
    address: "24-4 Yeonghwa-dong, Kunsan, Jeonrabuk-do",
    phone: "(063) 443-4723",
    branch: "Gunsan",
  },
  {
    name: "Jeonbuk Foreign School",
    url: "http://www.jbfschool.com/",
    address: "167-291 Deokji-dong 2ka, Deokjin-ku, Jeonju",
    phone: "(063) 253-5900",
    branch: "Jeonju",
  },
  {
    name: "Daejon International School",
    url: null,
    address: "210-1 Ojeong-dong, Daedeok-ku, Daejeon",
    phone: "(042) 633-3663",
    branch: "Daejeon",
  },
  {
    name: "Korea International School, Jeju Campus",
    url: "http://www.kis.ac/",
    address: "Jeju-do, Seogwipo-si, Daejeong-eup",
    phone: "064-741-0509",
    branch: "Jeju",
  },
  {
    name: "North London Collegiate School Jeju",
    url: "https://www.nlcsjeju.co.kr/",
    address: "33 Globaleduro 145 beongil, Daejeongeup Seogwiposi, Jeju-do",
    phone: "064-793-8000",
    branch: "Jeju",
  },
  {
    name: "St. Johnsbury Academy Jeju",
    url: "http://www.sjajeju.kr/",
    address: "1159, Gueok-ri, Daejeong-eup, Seogwipo-si, Jeju-do",
    phone: "064-801-1200",
    branch: "Jeju",
  },
  {
    name: "Handong International School",
    url: "https://his.sc.kr/",
    address: "Gyeongsangbuk-do, Pohang-si, Heunghae-eup, Handong-ro 558",
    phone: "054-260-1733",
    branch: "Pohang",
  },
  {
    name: "Collegiate Academy of Seoul",
    url: "http://www.ca-seoul.org/",
    address: "Dogok-ro 2-gil, Gangnam-gu, Seoul",
    phone: "02-571-7701",
    branch: "Seoul",
  },
  {
    name: "Hillside Collegiate",
    url: "http://www.hccanada.org/",
    address: "99 Jisepo 3-gil Irun Myeon, Geoje-si 53328",
    phone: "055 682 5500",
    branch: "Geoje",
  },
  {
    name: "Beyond Dream Global Leader Scholars (BDS)",
    url: "http://www.bds-korea.org",
    address: "206-61 Useong 1-gil, Noeun-myeon, Chungju-si, Chungcheongbukdo",
    phone: "070-7525-5517",
    branch: "Chungju",
  },
  {
    name: "BC Collegiate: Bangbae",
    url: "http://www.bccollegiate.org",
    address: "101 Hyoryeong-ro, Seocho-gu, Seoul 6687",
    phone: "02 3486 3000",
    branch: "Seoul",
  },
  {
    name: "Hillside Collegiate Songdo Academy",
    url: "http://www.instagram.com/hcis_songdo/",
    address: "E 2-3F, 232, Central-ro, Yeonsu-gu, Incheon 22003",
    phone: "032 858 0008",
    branch: "Incheon",
  },
  {
    name: "MICA International Scholars",
    url: "http://www.mica.or.kr",
    address: "30-17 gogigonwon-ro, Suiji-gu, Yongin-si",
    phone: "031 264 2510",
    branch: "Yongin",
  },
  {
    name: "Lighthouse International School",
    url: "http://www.liskorea.org",
    address:
      "34-55, Deogi-ro, 292 Beon-gil, Ilsanseo-gu, Goyang-si, Gyeonggi-do",
    phone: "031 971 271 2",
    branch: "Ilsan",
  },
  {
    name: "SIS Canada",
    url: "http://www.siscanada.org",
    address: "18-351 Beongil, Cheondae-ro, Sokcho-si 24863",
    phone: "033 637 8815",
    branch: "Sokcho",
  },
  {
    name: "Skysam International Christian School",
    url: "http://www.sky2012.co.kr",
    address: "73, SunGwang-ro, Jeollanam-do, Suncheon 57950",
    phone: "061 722-2012",
    branch: "Suncheon",
  },
  {
    name: "Westminster Canadian Academy",
    url: "http://www.wcacanada.com",
    address: "36 Dolmugae-gil, Gwacheon-si, Gyeonggi-Do 13820",
    phone: "02-504-7200",
    branch: "Gwacheon",
  },
  {
    name: "US International School",
    url: "http://www.usischool.org",
    address:
      "Kolon Sporex New Building, #32 Seochodaero 70-gil, Seocho-gu, Seoul",
    phone: "02 2135 3877",
    branch: "Seoul",
  },
  {
    name: "Korea Liberal Arts School (KLAS)",
    url: "http://www.klaskorea.org",
    address: "Hageo 3gil 61-14, Yeoju-si, Gyeonggi-do",
    phone: "031 883 7713",
    branch: "Yeoju",
  },
  {
    name: "Seoul Scholars International",
    url: "http://seoulscholars.org/",
    address: "982-5 Daechi 2-dong, Gangnam-gu, Seoul",
    phone: "02-554-2510",
    branch: "Seoul",
  },
  {
    name: "British International Academy",
    url: "https://www.biakorea.org/",
    address: "24, Deokpo 3-gil, Geoje, Gyeongnam",
    phone: "055 688 5154",
    branch: "Geoje",
  },
  {
    name: "International School of Busan",
    url: "http://www.isbusan.org/",
    address: "50 Gijang-daero, Gijang-eup, Gijang-gun, Busan",
    phone: "051-742-3332",
    branch: "Busan",
  },
  {
    name: "Daejeon Foreign Language High School",
    url: "https://djflhs.djsch.kr/main.do",
    address: "19 Singalma-ro, Seo-gu, Daejeon",
    phone: "042-530-8001",
    branch: "Daejeon",
  },
];

const PRESCHOOLS = [
  {
    name: "Seoul Japanese School (Affiliate)",
    url: "http://www.sjshp.or.kr/",
    address: "153 Gaepo-dong, Kangnam-ku",
    phone: "(02) 574-0348",
    branch: "Seoul",
  },
  {
    name: "Korea International School (Affiliate)",
    url: "http://www.kis.or.kr/",
    address: "155 Gaepo-dong, Kangnam-ku",
    phone: "(02) 561-0509",
    branch: "Seoul",
  },
  {
    name: "Seoul Academy International School (Affiliate)",
    url: "http://www.seoulacademy.net/",
    address: "988-5 Daechi 3-dong, Kangnam-ku",
    phone: "(02) 554-1690",
    branch: "Seoul",
  },
  {
    name: "Korea Kent Foreign School (Affiliate)",
    url: "http://www.kkfs.org/",
    address: "619-30 Guui-dong, Kwangji-ku",
    phone: "(02) 2201-7091~2",
    branch: "Seoul",
  },
  {
    name: "Deutch Schule Seoul (Affiliate)",
    url: "http://www.dsseoul.org/",
    address: "4-13 Hannam-dong, Yongsan-ku",
    phone: "(02) 794-7792",
    branch: "Seoul",
  },
  {
    name: "Indianhead International School (Affiliate)",
    url: "http://www.iis.or.kr/",
    address: "233-3 Howon-dong, Eujeongbu, Gyeonggi-do",
    phone: "(031) 870-3700",
    branch: "Seoul",
  },
  {
    name: "Seoul International School (Affiliate)",
    url: "http://www.siskorea.or.kr/",
    address: "San 32-16 Bokjeong-dong, Sujeong-ku, Seongnam, Gyeonggi-do",
    phone: "(031) 750-1200",
    branch: "Seongnam",
  },
  {
    name: "Hello Kids! ICEC",
    url: null,
    address: "572-99 Sungsan-dong, Mapo-ku",
    phone: "(02) 333-0478",
    branch: "Seoul",
  },
  {
    name: "Early Childhood Learning Center",
    url: "http://www.eclcseoul.com/",
    address: "6-4 Itaewon-dong, Yongsan-ku",
    phone: "(02) 795-8418",
    branch: "Seoul",
  },
  {
    name: "Namsan International School",
    url: "http://www.nsis.or.kr/",
    address: "366-591 Shindang-dong, Jung-ku",
    phone: "(02) 2232-2451",
    branch: "Seoul",
  },
  {
    name: "Franciscan School (Nursery & Kindergarten)",
    url: "http://www.franciscanschool.com/",
    address: "707-10 Hannam-dong, Yongsan-ku",
    phone: "(02) 798-2195",
    branch: "Seoul",
  },
  {
    name: "Hana Kindergarten",
    url: null,
    address: "439-5 Pyungchang-dong, Chongro-ku",
    phone: "(02) 394-1152",
    branch: "Seoul",
  },
  {
    name: "Little Seeds English Academy",
    url: null,
    address: "Yeongtong, Suwon",
    phone: "031-202-8279",
    branch: "Suwon",
  },
  {
    name: "O.N.E",
    url: "https://www.oneenglish.org/",
    address: "Yeongtong, Suwon",
    phone: "031-215-8383",
    branch: "Suwon",
  },
  {
    name: "EOS",
    url: "https://www.eoskorea.com/",
    address: "Yeongtong, Suwon",
    phone: "031-203-8205",
    branch: "Suwon",
  },
];

// Get unique branches for filtering
const ALL_BRANCHES = [
  "All",
  ...Array.from(new Set(SCHOOLS.map((s) => s.branch))).sort(),
];

function SchoolCard({ school }: { school: (typeof SCHOOLS)[0] }) {
  const initials = school.name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div className="group relative flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-200 hover:border-orange-200 hover:shadow-md hover:shadow-orange-50">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-amber-100 text-xs font-bold text-orange-600 ring-1 ring-orange-100">
          {initials || "IN"}
        </div>
        <div className="min-w-0 flex-1">
          {school.url ? (
            <a
              href={school.url}
              target="_blank"
              rel="noopener noreferrer"
              className="line-clamp-2 text-sm font-semibold text-slate-800 transition-colors hover:text-orange-600"
            >
              {school.name}
            </a>
          ) : (
            <p className="line-clamp-2 text-sm font-semibold text-slate-800">
              {school.name}
            </p>
          )}
          <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#138808]">
            {school.branch}
          </span>
        </div>
      </div>
      <div className="mt-1 space-y-1 pl-12">
        <p className="flex items-start gap-1.5 text-xs text-slate-500">
          <svg
            className="mt-0.5 h-3 w-3 shrink-0 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {school.address}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-slate-500">
          <svg
            className="h-3 w-3 shrink-0 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"
            />
          </svg>
          {school.phone}
        </p>
      </div>
    </div>
  );
}

export function InternationalSchoolsModal({
  open,
  onClose,
}: InternationalSchoolsModalProps) {
  const [activeTab, setActiveTab] = useState<"schools" | "preschools">(
    "schools",
  );
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setSearch("");
      setBranch("All");
      setActiveTab("schools");
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const filtered = (activeTab === "schools" ? SCHOOLS : PRESCHOOLS).filter(
    (s) => {
      const matchSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.address.toLowerCase().includes(search.toLowerCase()) ||
        s.branch.toLowerCase().includes(search.toLowerCase());
      const matchBranch = branch === "All" || s.branch === branch;
      return matchSearch && matchBranch;
    },
  );

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 px-0 pb-0 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="International Schools in Korea"
      >
        <div
          className="flex w-full max-w-4xl flex-col overflow-y-auto overscroll-contain rounded-t-3xl border border-slate-200 bg-slate-50 shadow-2xl shadow-slate-900/20 sm:max-h-[90vh] sm:rounded-3xl"
          style={{ maxHeight: "92vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative shrink-0 overflow-hidden bg-white px-6 pb-0 pt-6 sm:px-8 sm:pt-8">
            {/* Decorative stripe */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-100 text-2xl shadow-sm">
                  🏫
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-[#138808]">
                    IIK Directory
                  </p>
                  <h2 className="mt-0.5 text-xl font-bold text-slate-900 sm:text-2xl">
                    International Schools in Korea
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {SCHOOLS.length} schools · {PRESCHOOLS.length} foreign
                    pre-schools · curated for Indian families
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-5 flex gap-1 border-b border-slate-100">
              {(["schools", "preschools"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab);
                    setBranch("All");
                    setSearch("");
                  }}
                  className={`relative pb-3 pr-4 text-sm font-semibold transition-colors ${
                    activeTab === tab
                      ? "text-slate-900"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {tab === "schools"
                    ? "International Schools"
                    : "Foreign Pre-Schools"}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-4 h-0.5 rounded-full bg-orange-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="shrink-0 border-b border-slate-100 bg-white px-6 py-3 sm:px-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, city, or address…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none ring-0 transition focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />
              </div>
              {activeTab === "schools" && (
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 py-2 pl-3 pr-8 text-sm text-slate-700 outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                >
                  {ALL_BRANCHES.map((b) => (
                    <option key={b} value={b}>
                      {b === "All" ? "All regions" : b}
                    </option>
                  ))}
                </select>
              )}
              <span className="shrink-0 text-xs text-slate-400">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* School Grid */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overscroll-contain px-6 py-5 sm:px-8"
          >
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="text-4xl">🔍</span>
                <p className="mt-3 text-sm font-semibold text-slate-600">
                  No schools found
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Try adjusting your search or region filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filtered.map((school) => (
                  <SchoolCard key={school.name} school={school} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-slate-100 bg-white px-6 py-4 sm:px-8">
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <p className="text-xs text-slate-400">
                Data sourced from{" "}
                <a
                  href="https://indiansinkorea.com/inspire/international-schools/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-600 underline underline-offset-2 hover:text-orange-600"
                >
                  Indians in Korea (IIK)
                </a>{" "}
                · Est. 2002 · 12,000+ members
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-9 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Close
                </button>
                <Link
                  href="/contact"
                  className="inline-flex h-9 items-center justify-center rounded-full bg-orange-500 px-5 text-sm font-semibold text-white shadow-md shadow-orange-200/40 transition hover:bg-orange-600 active:scale-95"
                >
                  Contact IIK
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}

export default InternationalSchoolsModal;
