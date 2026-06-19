"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import type { IconType } from "react-icons";
import {
  PiXBold,
  PiBus,
  PiAirplane,
  PiShoppingCart,
  PiPhone,
  PiAirplaneLanding,
  PiReceipt,
  PiQuestion,
  PiMagnifyingGlass,
  PiCaretDownBold,
  PiArrowSquareOut,
} from "react-icons/pi";
import { ModalPortal } from "./ModalPortal";

interface FAQModalProps {
  open: boolean;
  onClose: () => void;
}

type FAQItem = {
  q: string;
  a: string;
  links?: { label: string; url: string }[];
};

type FAQCategory = {
  id: string;
  icon: IconType;
  label: string;
  items: FAQItem[];
};

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "commutation",
    icon: PiBus,
    label: "Commutation in Korea",
    items: [
      {
        q: "Where can I get information about Bus Routes?",
        a: "Refer to the following websites to get bus routes.",
        links: [
          {
            label: "Bus Routes in Seoul (TOPIS)",
            url: "http://topis.seoul.go.kr/eng",
          },
          {
            label: "Bus Routes all over Korea (Naver)",
            url: "http://traffic.map.naver.com",
          },
        ],
      },
      {
        q: "Where can I get information about the Subway?",
        a: "Refer to the following website to get subway routes.",
        links: [
          {
            label: "Naver Subway Map",
            url: "http://traffic.map.naver.com/Traffic_Browser/SubwayLine2/index.asp?CID=1000",
          },
        ],
      },
      {
        q: "Where can I get information about long distance Trains?",
        a: "Use the below site to see the routes and to buy tickets for long distance train and KTX.",
        links: [{ label: "KORAIL (korail.com)", url: "http://korail.com" }],
      },
      {
        q: "How can I get a new Korean Driving License?",
        a: "Refer to the below URL to get the process of making a new driving license in Korea.",
        links: [
          {
            label: "Korea Road Authority – New License",
            url: "http://dl.koroad.or.kr/english/01_info/info06.jsp",
          },
        ],
      },
      {
        q: "What is the process to change a foreign license into a Korean driving license?",
        a: "The following URL will guide you to convert your existing driving license to a Korean driving license.",
        links: [
          {
            label: "Korea Road Authority – License Conversion",
            url: "http://dl.koroad.or.kr/english/02_news/news01.jsp",
          },
        ],
      },
      {
        q: "Can I make an International Driving License while in Korea?",
        a: "An international driver's license is an internationally recognised translation of your domestic driver's license. It must be accompanied by your driver's license when you travel. Refer to the below URL for full details about the process.",
        links: [
          {
            label: "Korea Road Authority – International License",
            url: "http://dl.koroad.or.kr/english/02_news/news02.jsp",
          },
        ],
      },
      {
        q: "Do I need to buy a Car to live in Seoul?",
        a: "Seoul has an excellent public transport system including buses and a subway network. For commuting to the office, public transport is best and so one can easily live in Seoul without owning a car. If you love to travel and go sightseeing a lot, owning a car makes it much easier and more fun. Alternatively, you can also rent a car for a day or two on occasions and still manage without owning one.",
      },
      {
        q: "If I am interested in buying a car, what should I do?",
        a: "For a new car, visit any car showroom you find. For a used car, research the model and price online first. The below website has English support.",
        links: [
          {
            label: "Encar Global (Used Cars)",
            url: "http://global.encar.com/global/index.html",
          },
        ],
      },
      {
        q: "Where do I get guidance about Car rental in Korea?",
        a: "Renting a car in Korea is easy. For metropolitan cities, public transportation is recommended. For longer journeys to provincial sites or especially Jeju Island, renting is a better option. Refer to the below site for more information.",
        links: [
          {
            label: "Visit Korea – Car Rental",
            url: "http://www.visitkorea.or.kr/enu/TR/TR_EN_5_3_1.jsp",
          },
        ],
      },
      {
        q: "What is T-money Card? How does it work? Where can I recharge it?",
        a: "T-money is a transportation card used to pay for bus and subway fares and, in some cases, transactions at convenience stores across several metropolitan cities. It offers 100 won off the basic cash fare and additional savings when transferring between bus lines, subway lines, or between bus and subway (within a transfer time limit).",
        links: [
          {
            label: "Visit Korea – T-Money Info",
            url: "http://visitkorea.or.kr/enu/TR/TR_EN_5_4.jsp",
          },
          { label: "T-Money Official Site", url: "http://www.t-money.co.kr/" },
        ],
      },
    ],
  },
  {
    id: "travel",
    icon: PiAirplane,
    label: "Travel Korea",
    items: [
      {
        q: "Where can I find information about travel destinations and festivals in Korea?",
        a: "The 'Visit Korea' website has a lot of information about Korea's tourist spots in English and many other languages.",
        links: [
          { label: "Visit Korea", url: "http://visitkorea.or.kr/intro.html" },
          { label: "Korea.net", url: "http://korea.net" },
          {
            label: "Visit Seoul",
            url: "http://visitseoul.net/en/index.do?_method=main",
          },
        ],
      },
      {
        q: "I heard there are many temples in Korea that allow tourists to stay overnight. Can I get more details?",
        a: "A Temple Stay is a cultural-experience program designed to help people understand Korean Buddhism better. Programs include Yebul (chanting), Chamseon (Zen meditation), Dahdoh (tea ceremony), and Balwoo Gongyang (communal Buddhist meal). Participants can find their 'true self' amongst the harmony of nature. Temple Life is a similar program focused on understanding the life of monks.",
        links: [
          {
            label: "Visit Korea – Temple Stay",
            url: "http://english.visitkorea.or.kr/enu/SI/SI_EN_3_4_5.jsp",
          },
          { label: "Templestay.com", url: "http://templestay.com" },
          {
            label: "Yongjoosa Temple (English)",
            url: "http://eng.yongjoosa.or.kr",
          },
        ],
      },
      {
        q: "How are Condominium, Pension and Hotels different in Korea?",
        a: "Hotels: Found in every city; used for business or tourism; no cooking facility usually.\n\nCondominium: Located in tourist spots, not cities; less expensive than hotels; rooms have cooking gas, utensils, and cutleries.\n\nPension: Similar to condominiums; smaller buildings in scenic locations (forests, mountains, lakes); good for groups of 15–20+; cooking facilities usually available (confirm in advance).",
        links: [
          { label: "Hanwha Resort (Condo)", url: "http://hanwharesort.co.kr" },
          {
            label: "Daemyung Resort (Condo)",
            url: "http://daemyungresort.com",
          },
          { label: "KP Condo", url: "http://kpcondo.com" },
          { label: "Woori Pension", url: "http://wooripension.com" },
          { label: "Hue Pension", url: "http://huepension.com" },
          { label: "Minbak Net", url: "http://minbaknet.com" },
        ],
      },
      {
        q: "Is there a helpline for travel-related queries in Korea?",
        a: "Yes. Call 1330 from your phone and select your preferred language. Queries can be about travel, public transportation, daily living, or interpretation when dealing with taxi drivers. The service is available 24/7 with English support. If they cannot immediately find an answer, they take your number and call back.\n\nFor overseas callers: +82 (area code + 1330)\n\nKorean Area Codes (drop the 0 when calling from abroad):\nSeoul 02 · Gyeonggi 031 · Incheon 032 · Gangwon 033 · Chung-nam 041 · Daejeon 042 · Chungbuk 043 · Busan 051 · Ulsan 052 · Daegu 053 · Gyeongbuk 054 · Gyeongnam 055 · Jeonnam 061 · Gwangju 062 · Jeonbuk 063 · Jeju 064",
      },
      {
        q: "Are there online maps available to plan my trip around Korea?",
        a: "Yes. Online maps show distances by bus and car, routing from source to destination, and even street-view photos of exact locations. The sites are mainly in Korean but a colleague can help you learn to use them.",
        links: [
          { label: "Naver Maps", url: "http://maps.naver.com" },
          { label: "Daum Maps", url: "http://local.daum.net/map/index.jsp" },
          { label: "Google Maps", url: "http://maps.google.com" },
        ],
      },
      {
        q: "I am interested in Camping in Korea. How shall I do it?",
        a: "Korea has many camping sites with good facilities like shower rooms and toilets. Camping season runs from May to October and popular sites should be reserved 2–3 months in advance. Most sites charge around 20,000 won per night for 3–4 people (price varies by site and season).",
        links: [
          {
            label: "Korea Camping Association",
            url: "http://campingkorea.or.kr",
          },
          { label: "Camptown", url: "http://camptown.co.kr" },
          {
            label: "Nanji Camping (English)",
            url: "http://nanjicamping.co.kr/en/index.asp",
          },
          { label: "Camp Nrak", url: "http://campnrak.co.kr" },
        ],
      },
      {
        q: "Could you suggest English tourist sites for each Province?",
        a: "Below are the official English tourism websites by province/city.",
        links: [
          { label: "Busan (English)", url: "http://english.busan.go.kr/main" },
          { label: "Gangwon-do", url: "http://eng.gwd.go.kr/page/main.html" },
          { label: "Gyeonggi-do", url: "http://english.gg.go.kr" },
          { label: "Jeju-do", url: "http://english.jeju.go.kr/index.php" },
          {
            label: "Jeollabuk-do (North Jeolla)",
            url: "http://www.jeonbuk.go.kr/02en/index.jsp",
          },
          {
            label: "Jeollanam-do (South Jeolla)",
            url: "http://english.jeonnam.go.kr",
          },
          { label: "Geoje Island", url: "http://english.geoje.go.kr/main" },
        ],
      },
      {
        q: "Where can I find information about Rest Areas on Korean highways?",
        a: "Refer to the below site for a list of highway rest areas. You can select each rest area to see facilities, addresses, and phone numbers, as well as filter by highway number.",
        links: [
          {
            label: "Korea Highway Service Areas (HSA)",
            url: "http://www.hsa.or.kr",
          },
        ],
      },
      {
        q: "Where can I get more information about hiking routes?",
        a: "The below site has a lot of information on hiking routes. Note: the site is in Korean.",
        links: [
          { label: "Korea Sanha (Hiking Info)", url: "http://koreasanha.net/" },
        ],
      },
      {
        q: "Where can I get information on the beaches in Korea?",
        a: "Below is a link to the top 12 beaches in Korea on the Visit Korea website.",
        links: [
          {
            label: "Top 12 Beaches in Korea – Visit Korea",
            url: "http://www.visitkorea.or.kr/enu/SI/SI_EN_3_6.jsp?cid=262056",
          },
        ],
      },
    ],
  },
  {
    id: "shopping",
    icon: PiShoppingCart,
    label: "Online Shopping",
    items: [
      {
        q: "Where can we do online shopping in Korea for daily items?",
        a: "Online shopping for daily need items can be done at the following sites. Prices for items like tomato, potato, and onion can be almost half the price on Gmarket compared to Homeplus or local markets. You can also find discount coupons for travel, outings, and even last-minute flight tickets or car bookings on Coupang.",
        links: [
          {
            label: "Gmarket (English)",
            url: "http://global.gmarket.com/Home/Main",
          },
          {
            label: "11st (English)",
            url: "http://english.11st.co.kr/html/en/main.html",
          },
          { label: "Coupang", url: "http://www.coupang.com/" },
        ],
      },
    ],
  },
  {
    id: "calling",
    icon: PiPhone,
    label: "Calling to India",
    items: [
      {
        q: "What are the options to call India using a PC?",
        a: "There are many VoIP software options available. Rates listed are approximate.",
        links: [
          {
            label: "Skype (Pay-per-use or Monthly subscription)",
            url: "http://www.skype.com",
          },
          {
            label: "Internetcalls – Landline: €0.010/min · Mobile: €0.007/min",
            url: "http://www.internetcalls.com",
          },
          {
            label: "ActionVOIP – Landline: €0.010/min · Mobile: €0.010/min",
            url: "http://www.actionvoip.com",
          },
          {
            label: "Nymgo – Landline & Mobile: $0.013 USD/min",
            url: "http://www.nymgo.com",
          },
          {
            label: "Freecall – Landline: €0.020/min · Mobile: €0.023/min",
            url: "http://www.freecall.com",
          },
        ],
      },
      {
        q: "What are the options to call India using a Smartphone?",
        a: "You can download and use the mobile version of the following apps while connected to 3G/4G/WiFi:\n\n• Skype – App name: Skype\n• Nymgo – App name: Nymgo\n• ActionVOIP / Freecall / Jumblo – App name: Mobile VOIP\n• Fring – App name: Fring – Landline: 1.5 cents/min · Mobile: 7 cents/min\n\nIf you want to use free minutes provided by your carrier, you can use the OTO International mobile application.",
      },
      {
        q: "What are the options to call India using a Non-Smartphone?",
        a: "You can buy International calling cards from some local foreign food marts in your city and follow the steps on the card to make calls from a non-smartphone device.",
      },
    ],
  },
  {
    id: "arriving",
    icon: PiAirplaneLanding,
    label: "Coming to Korea",
    items: [
      {
        q: "Is there a language barrier when communicating with local people?",
        a: "Very few people speak English and most understand only basic words like Hello, Bye, Stop, etc. For official purposes, it is better to take help from a Korean friend. Interestingly, some Korean words are similar to South Indian languages (Tamil), which can be an advantage while learning.",
      },
      {
        q: "What are the primary items to bring when coming to Korea?",
        a: "Money / traveller's checks.\n\nClothing: Warm clothing, jeans, kurtis & tops for women (if you are on the larger side, as most clothes in Korea are sized for lean builds), formal business suits for men (very expensive in Korea), bed covers, towels.\n\nFood: Indian spices, groceries like dal, basmati rice, ghee, tea.\n\nMedicines: Essentials for cold and headache.\n\nDeodorants & Cosmetics: Bring your favourites; your preferred shades may not be available, though Korea has a wide range of excellent local and imported brands.",
      },
      {
        q: "Are all Indian vegetables available in Korea?",
        a: "Commonly found vegetables include potatoes, sweet potato, onions, tomatoes, bell pepper, cauliflower, peas, eggplant (baingan), cucumber, carrot, radish, cabbage, mushrooms, broccoli, spinach, lettuce, parsley, beans, okra, bean sprouts and many others. Zucchini (a substitute for lauki) and tofu (a substitute for paneer) are also available. Indian vegetables are easily found at Seoul Foreign Mart, Ansan vegetable market, and Korean open markets (shijang).",
      },
      {
        q: "Are Indian groceries available in Korea? What is the price difference?",
        a: "Indian groceries are available in Expat Marts and Foreign Marts in Seoul, Suwon, Ansan, Daegu, Busan, and Daejeon. Most cities also have Indian restaurants that sell spices, ready-to-cook food, atta, ghee, and more. However, groceries in Korea are usually three times more expensive than their actual price in Indian rupees.",
      },
      {
        q: "Is there any way to bring groceries from India by post or courier?",
        a: "Yes. Using India Post it costs around ₹2,000–₹2,500 for 10 kg and takes approximately 7–14 days to reach Korea. Liquid items are not allowed. All items should be packed properly so they don't appear suspicious. Rates and duration may vary.",
        links: [
          {
            label: "India Post – International Tariff",
            url: "http://www.indiapost.gov.in/Old/Netscape/SPInternationalTariff.html",
          },
          {
            label: "Vegetarian & Vegan Guide to Korea",
            url: "http://www.thekoreaguide.com/2011/11/27/can-vegetarians-and-vegans-survive-in-korea/",
          },
        ],
      },
      {
        q: "How is the weather in Korea?",
        a: "Winters (December–March) are bitterly cold and snowy. Summers are hot and humid with occasional rain. The best time to visit is autumn (September–November) when weather is pleasant. Spring (April–June) is beautiful with mild temperatures and cherry blossoms across the country.",
      },
      {
        q: "Are Indian winter clothes suitable for Korea?",
        a: "Korean winters are bitterly cold and snowy, so Indian winter clothing is generally not sufficient. You will need to buy padded jackets, thermal wear/warmers, and snow boots in Korea.",
      },
      {
        q: "Are winter clothes very expensive in Korea?",
        a: "It depends on where and when you buy. The best time to buy padded jackets (essential for winter survival) is during autumn or after the winter season, when end-of-season sales at malls and factory outlets offer significant discounts.",
      },
    ],
  },
  {
    id: "taxation",
    icon: PiReceipt,
    label: "Taxation in Korea",
    items: [
      {
        q: "What is the official site for the tax system in Korea?",
        a: "The below website provides all information regarding taxation in Korea and has an English interface.",
        links: [
          {
            label: "National Tax Service (NTS) – English",
            url: "http://www.nts.go.kr/eng/",
          },
        ],
      },
      {
        q: "Is there a helpline for foreigners for tax-related queries?",
        a: "You can call 1588-0569 or 02-2076-5711. If these numbers do not work, visit the NTS site for the updated helpline number.",
        links: [
          { label: "NTS Official Site", url: "http://www.nts.go.kr/eng/" },
        ],
      },
      {
        q: "Do foreigners need to pay tax in Korea? Is there any tax exemption?",
        a: "Yes, most foreign employees are required to pay income taxes. In some cases, foreign employees may receive a partial tax exemption for a certain period. Check with your employer whether you fall under such categories.",
      },
      {
        q: "How is income tax calculated in Korea?",
        a: "Below is a summary of tax calculation (effective from 2009 — visit the official NTS site for the latest).\n\nIndividual Income Tax (Progressive):\n• Up to ₩12 million — 6%\n• ₩12M to ₩46M — 15%\n• ₩46M to ₩88M — 24%\n• Over ₩88 million — 33%\n\nFlat Tax: Foreigners can choose a flat rate of 15% instead of the progressive tax.\n\nResident Surtax: An additional 10% of income tax applies on top of the above.",
      },
      {
        q: "Is the whole salary/income considered taxable?",
        a: "There are several deductions applicable under progressive taxation (they do not apply if you opt for flat taxation). Deduction examples include:\n• Automobile allowance\n• Insurance premium paid by employer on behalf of employee\n• Medical expenses\n• Rebate on credit card and cash receipt payments\n• Education expenses\n• Deduction for spouse and dependents\n• Deductions for dependents over 65\n• Deductions for disabled dependents\n• Additional deductions for large households\n\nFor exact categories and amounts, refer to the Official NTS site.",
      },
      {
        q: "What is a tax refund in Korea?",
        a: "In Korea, sales taxes are included in the purchase price. If you are a visitor (non-resident) taking goods out of the country, you may be eligible for a tax refund.\n\nRefundable taxes: VAT/sales tax (10%) and special taxes on high-priced goods (jewellery, etc.).\n\nEligibility:\n• Purchases at each retail store must total ₩30,000 or more (inclusive of tax)\n• Goods must be purchased within 3 months of departure\n• Must be an international visitor residing/visiting Korea for less than 6 months; or an overseas Korean residing/visiting for less than 3 months; or a Korean student studying abroad for 3 or more years.",
      },
      {
        q: "What is Year End Tax Settlement?",
        a: "This is the period where you do the final settlement of your taxes. You fill in forms indicating all deduction categories and submit your annual credit card summary, medical expense summary, car insurance receipts, and other documents. Your company's finance department should guide you through the exact process.\n\nIncome tax payment due dates:\n• Employees: 10 March\n• Business Owners / Freelancers: 31 May",
      },
      {
        q: "What is the Cash Receipt System?",
        a: "The Cash Receipt System provides income deductions or tax credits based on a taxpayer's use of Cash Receipts. It helps the NTS track cash transactions. Cash Receipts are issued for cash purchases of ₩5,000 (approx. US$5) or more, using existing credit card networks. At the point of sale, purchasers provide identification such as a resident ID or cell phone number. Credit cards, membership cards, mileage cards, debit cards, or NTS-issued Cash Receipt Cards can also be used for identification. These receipts can be submitted during Year End Tax Settlement to claim a tax deduction.\n\nNote: Tax laws change frequently — always visit the official NTS site for accurate and updated details.",
      },
    ],
  },
];

export function FAQModal({ open, onClose }: FAQModalProps) {
  const [activeTab, setActiveTab] = useState<string>("commutation");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setActiveTab("commutation");
      setOpenIndex(null);
      setSearch("");
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

  const isSearching = search.trim().length > 0;

  const allItems: (FAQItem & { categoryLabel: string; categoryId: string })[] =
    FAQ_CATEGORIES.flatMap((cat) =>
      cat.items.map((item) => ({
        ...item,
        categoryLabel: cat.label,
        categoryId: cat.id,
      })),
    );

  const searchResults = isSearching
    ? allItems.filter(
        (item) =>
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase()) ||
          item.categoryLabel.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  const activeCategory = FAQ_CATEGORIES.find((c) => c.id === activeTab)!;
  const displayItems = isSearching ? searchResults : activeCategory.items;

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 px-0 pb-0 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Frequently Asked Questions"
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
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-violet-100 text-purple-600 shadow-sm">
                  <PiQuestion className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-purple-600">
                    IIK Help
                  </p>
                  <h2 className="mt-0.5 text-xl font-bold text-slate-900 sm:text-2xl">
                    Frequently Asked Questions
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {allItems.length} questions across {FAQ_CATEGORIES.length}{" "}
                    categories · curated for Indian families
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-500 transition hover:bg-slate-200"
              >
                <PiXBold className="h-4 w-4" />
              </button>
            </div>

            {/* Tabs — hidden when searching */}
            {!isSearching && (
              <div className="mt-5 flex gap-0 overflow-x-auto border-b border-slate-100 pb-px scrollbar-none">
                {FAQ_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(cat.id);
                      setOpenIndex(null);
                      scrollRef.current?.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className={`relative shrink-0 pb-3 pr-4 text-sm font-semibold transition-colors ${
                      activeTab === cat.id
                        ? "text-slate-900"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <cat.icon className="mr-1.5 inline h-4 w-4 -translate-y-0.5" />
                    {cat.label}
                    {activeTab === cat.id && (
                      <span className="absolute bottom-0 left-0 right-4 h-0.5 rounded-full bg-purple-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="shrink-0 border-b border-slate-100 bg-white px-6 py-3 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <PiMagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search all questions…"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setOpenIndex(null);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-purple-300 focus:bg-white focus:ring-2 focus:ring-purple-100"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <PiXBold className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              <span className="shrink-0 text-xs text-slate-400">
                {isSearching
                  ? `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""}`
                  : `${activeCategory.items.length} question${activeCategory.items.length !== 1 ? "s" : ""}`}
              </span>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto overscroll-contain px-6 py-5 sm:px-8"
          >
            {displayItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <PiMagnifyingGlass className="h-10 w-10 text-slate-300" />
                <p className="mt-3 text-sm font-semibold text-slate-600">
                  No questions found
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Try a different search term or browse the categories.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Search mode: show category labels as separators */}
                {isSearching
                  ? searchResults.map((item, i) => (
                      <div key={i}>
                        {(i === 0 ||
                          searchResults[i - 1].categoryId !==
                            item.categoryId) && (
                          <p className="mb-2 mt-4 first:mt-0 text-[10px] font-extrabold uppercase tracking-[0.25em] text-purple-500">
                            {item.categoryLabel}
                          </p>
                        )}
                        <AccordionItem
                          item={item}
                          index={i}
                          openIndex={openIndex}
                          setOpenIndex={setOpenIndex}
                        />
                      </div>
                    ))
                  : displayItems.map((item, i) => (
                      <AccordionItem
                        key={i}
                        item={item}
                        index={i}
                        openIndex={openIndex}
                        setOpenIndex={setOpenIndex}
                      />
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
                  href="https://indiansinkorea.com/inspire/faq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-600 underline underline-offset-2 hover:text-purple-600"
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

function AccordionItem({
  item,
  index,
  openIndex,
  setOpenIndex,
}: {
  item: FAQItem;
  index: number;
  openIndex: number | null;
  setOpenIndex: (i: number | null) => void;
}) {
  const isOpen = openIndex === index;

  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
        isOpen
          ? "border-purple-200 bg-white shadow-sm shadow-purple-50"
          : "border-slate-100 bg-white hover:border-purple-100"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="flex w-full items-start justify-between gap-3 px-4 py-3.5 text-left"
      >
        <span className="text-sm font-semibold leading-snug text-slate-800">
          {item.q}
        </span>
        <span
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
            isOpen
              ? "bg-purple-100 text-purple-600 rotate-180"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          <PiCaretDownBold className="h-3 w-3" />
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-slate-50 px-4 pb-4 pt-3">
          <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
            {item.a}
          </p>
          {item.links && item.links.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.links.map((link, j) => (
                <a
                  key={j}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700 transition hover:bg-purple-100"
                >
                  <PiArrowSquareOut className="h-3 w-3 shrink-0" />
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FAQModal;
