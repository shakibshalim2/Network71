import { OCEAN, TEAL } from "../../theme"
import type { EShipeContent } from "../en"

// filterType / status / condition are matched in VesselListings — keep them in English.
export const vessels: EShipeContent["listings"]["vessels"] = [
  {
    name: "MV Kalindi",
    type: "জেনারেল কার্গো",
    filterType: "Cargo",
    flag: "বাংলাদেশ",
    dwt: "৮,২০০ DWT",
    year: "২০০৬",
    price: "অনুরোধ সাপেক্ষে",
    status: "For Sale",
    condition: "Trading",
    color: OCEAN,
  },
  {
    name: "MV Oriental Star",
    type: "বাল্ক ক্যারিয়ার",
    filterType: "Bulk Carrier",
    flag: "পানামা",
    dwt: "২৭,৫০০ DWT",
    year: "২০০৩",
    price: "$২.৫M",
    status: "For Sale",
    condition: "Trading",
    color: TEAL,
  },
  {
    name: "MV Pacific Trader",
    type: "কনটেইনার জাহাজ",
    filterType: "Container",
    flag: "মার্শাল দ্বীপপুঞ্জ",
    dwt: "১৪,২০০ DWT",
    year: "১৯৯৮",
    price: "$৫৮০ / LDT",
    status: "For Recycling",
    condition: "Scrap",
    color: "var(--accent-red)",
  },
  {
    name: "MT Crude Master",
    type: "ক্রুড অয়েল ট্যাংকার",
    filterType: "Tanker",
    flag: "লাইবেরিয়া",
    dwt: "৬০,০০০ DWT",
    year: "১৯৯৯",
    price: "$৬২০ / LDT",
    status: "For Recycling",
    condition: "Scrap",
    color: "var(--accent-red)",
  },
  {
    name: "MV Sea Guardian",
    type: "টাগবোট",
    filterType: "Tugboat",
    flag: "সিঙ্গাপুর",
    dwt: "৫৫০ GT",
    year: "২০১০",
    price: "$৪৫০K",
    status: "For Sale",
    condition: "Trading",
    color: "var(--accent-amber)",
  },
  {
    name: "MV Atlantic Fisher",
    type: "মৎস্য জাহাজ",
    filterType: "Fishing",
    flag: "স্পেন",
    dwt: "১,২০০ GT",
    year: "২০০৮",
    price: "€৩৮০K",
    status: "For Sale",
    condition: "Trading",
    color: "var(--accent-emerald)",
  },
]

export const process: EShipeContent["process"] = [
  {
    title: "অনুসন্ধান জমা দিন",
    desc: "আপনার চাহিদা জানিয়ে আমাদের সঙ্গে যোগাযোগ করুন — জাহাজের ধরন, আকার, বাজেট ও ব্যবহারের উদ্দেশ্য। আমাদের ব্রোকাররা ২৪ ঘণ্টার মধ্যে উপযুক্ত লিস্টিংয়ের সঙ্গে আপনাকে যুক্ত করবেন।",
  },
  {
    title: "পর্যালোচনা ও শর্টলিস্ট",
    desc: "আপনার পর্যালোচনার জন্য আমরা যাচাইকৃত জাহাজের বিকল্পগুলো উপস্থাপন করি — পূর্ণাঙ্গ স্পেসিফিকেশন শিট, সার্ভে ইতিহাস, ফ্ল্যাগ রেকর্ড ও মূল্যের বিস্তারিত সহ।",
  },
  {
    title: "পরিদর্শন ও সার্ভে",
    desc: "ক্লাস-স্বীকৃত মেরিন সার্ভেয়ারের মাধ্যমে স্বতন্ত্র সার্ভে পরিচালিত হয়। হাল, মেশিনারি ও ক্লাস স্ট্যাটাস সহ পূর্ণাঙ্গ কন্ডিশন রিপোর্ট প্রদান করা হয়।",
  },
  {
    title: "দর-কষাকষি ও চুক্তি",
    desc: "আমাদের ব্রোকাররা মূল্য নিয়ে আলোচনায় সহায়তা করেন এবং আন্তর্জাতিক সমুদ্র আইন অনুসারে মেমোরেন্ডাম অব অ্যাগ্রিমেন্ট (MOA) প্রস্তুত করেন।",
  },
  {
    title: "হস্তান্তর ও ডেলিভারি",
    desc: "ফ্ল্যাগ ট্রান্সফার, মালিকানার নথিপত্র, অর্থ পরিশোধ ও জাহাজ ডেলিভারি — চূড়ান্ত হস্তান্তর পর্যন্ত প্রতিটি ধাপ আমাদের টিম সমন্বয় করে।",
  },
]

export const recyclingItems: EShipeContent["recycling"]["items"] = [
  {
    title: "হংকং কনভেনশন",
    body: "আন্তর্জাতিক সমুদ্র সংস্থা (IMO)",
    status: "সমন্বিত",
    statusColor: "var(--accent-emerald)",
    desc: "আমাদের সকল রিসাইক্লিং অংশীদার জাহাজের নিরাপদ ও পরিবেশসম্মত রিসাইক্লিং সংক্রান্ত হংকং আন্তর্জাতিক কনভেনশনের সঙ্গে সমন্বিত।",
  },
  {
    title: "ইইউ শিপ রিসাইক্লিং রেগুলেশন",
    body: "ইউরোপীয় কমিশন",
    status: "সম্মত",
    statusColor: "var(--accent-emerald)",
    desc: "ইইউ-পতাকাবাহী ও ইইউ-মালিকানাধীন জাহাজগুলো ইইউ শিপ রিসাইক্লিং রেগুলেশন (EUSRR) তালিকাভুক্ত অনুমোদিত ইয়ার্ডের মাধ্যমে পরিচালিত হয়।",
  },
  {
    title: "বাসেল কনভেনশন",
    body: "জাতিসংঘ পরিবেশ কর্মসূচি",
    status: "সম্মত",
    statusColor: "var(--accent-emerald)",
    desc: "রিসাইক্লিংয়ের সময় সৃষ্ট বিপজ্জনক বর্জ্য আন্তঃসীমান্ত পরিবহন সংক্রান্ত বাসেল কনভেনশন অনুসারে ব্যবস্থাপনা করা হয়।",
  },
  {
    title: "ISM কোড পরিপালন",
    body: "ইন্টারন্যাশনাল সেফটি ম্যানেজমেন্ট",
    status: "যাচাইকৃত",
    statusColor: OCEAN,
    desc: "ট্রেডিংয়ের জন্য তালিকাভুক্ত সকল জাহাজের বৈধ ISM সার্টিফিকেশন ও হালনাগাদ সেফটি ম্যানেজমেন্ট সিস্টেমের নথিপত্র যাচাই করা হয়।",
  },
]

export const whyItems: EShipeContent["why"]["items"] = [
  {
    icon: "◈",
    title: "আন্তঃসীমান্ত ক্রেতা নেটওয়ার্ক",
    desc: "দক্ষিণ এশিয়া, মধ্যপ্রাচ্য, দক্ষিণ-পূর্ব এশিয়া ও তার বাইরের নিবন্ধিত ক্রেতা — প্রাতিষ্ঠানিক বিনিয়োগকারী, শিপিং লাইন ও স্বতন্ত্র অপারেটর সহ।",
    color: OCEAN,
  },
  {
    icon: "◈",
    title: "শুধুই যাচাইকৃত লিস্টিং",
    desc: "প্রকাশের আগে তালিকাভুক্ত প্রতিটি জাহাজের মালিকানা, ক্লাস স্ট্যাটাস ও ফ্ল্যাগ রেজিস্ট্রি যাচাই করা হয়। কোনো ভুয়া লিস্টিং নেই।",
    color: TEAL,
  },
  {
    icon: "◈",
    title: "নিরপেক্ষ ব্রোকারেজ",
    desc: "আমাদের ব্রোকাররা লেনদেনের প্রতিনিধিত্ব করেন — কোনো এক পক্ষের নয়। স্বচ্ছ ফি কাঠামো, কোনো গোপন কমিশন নেই।",
    color: "var(--accent-emerald)",
  },
  {
    icon: "◈",
    title: "আইনি সহায়তা",
    desc: "MOA প্রস্তুতি, ফ্ল্যাগ ট্রান্সফার সমন্বয় ও পোর্ট এজেন্ট সেবা — Network71-এর আইনি ও ট্রেডিং অংশীদারদের মাধ্যমে পরিচালিত।",
    color: "var(--accent-amber)",
  },
  {
    icon: "◈",
    title: "স্বতন্ত্র সার্ভেয়ার",
    desc: "জাহাজের অবস্থানকারী বন্দরে স্বতন্ত্র সার্ভে অংশীদারের ব্যবস্থা করা হয় — ক্লাস-স্বীকৃত এবং স্বীকৃত শিল্পমান অনুসারে কর্মরত।",
    color: OCEAN,
  },
  {
    icon: "◈",
    title: "শুরু থেকে শেষ পর্যন্ত সেবা",
    desc: "প্রথম অনুসন্ধান থেকে চূড়ান্ত ডেলিভারি বা রিসাইক্লিং পর্যন্ত — আপনার লেনদেনের প্রতিটি ধাপ একটি টিমই সমন্বয় করে।",
    color: TEAL,
  },
]

export const regions: EShipeContent["reach"]["regions"] = [
  {
    region: "দক্ষিণ এশিয়া",
    detail: "বাংলাদেশ · ভারত · পাকিস্তান · শ্রীলঙ্কা",
    color: OCEAN,
  },
  {
    region: "মধ্যপ্রাচ্য",
    detail: "সংযুক্ত আরব আমিরাত · সৌদি আরব · কুয়েত · ওমান",
    color: TEAL,
  },
  {
    region: "পূর্ব এশিয়া",
    detail: "চীন · জাপান · দক্ষিণ কোরিয়া · তাইওয়ান",
    color: "var(--accent-cyan)",
  },
  {
    region: "ইউরোপ",
    detail: "গ্রিস · তুরস্ক · জার্মানি · নরওয়ে",
    color: "var(--accent-purple)",
  },
  {
    region: "দক্ষিণ-পূর্ব এশিয়া",
    detail: "সিঙ্গাপুর · মালয়েশিয়া · ফিলিপাইন",
    color: OCEAN,
  },
  {
    region: "আমেরিকা",
    detail: "যুক্তরাষ্ট্র · পানামা · ব্রাজিল · কানাডা",
    color: "var(--accent-emerald)",
  },
]
