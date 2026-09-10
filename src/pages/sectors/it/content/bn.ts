import type { ITContent } from "./en"
import {
  metrics,
  showcaseProjects,
  servicePillars,
  ezyifyFeatures,
  aiModels,
  techBadges,
  processSteps,
} from "./bn/data"
import {
  internalDivisions,
  deliveryModels,
  roadmapItems,
  overviewPillars,
  qualityItems,
  ezyifyStats,
  reachStats,
  opportunities,
} from "./bn/operations"

const bn: ITContent = {
  divisionName: "আইটি ও সফটওয়্যার",
  copy: {
    Hero: {
      eyebrow: "Network71 — বিভাগ ০৬",
      title: "সফটওয়্যার",
      lead:
        "একটি বৈশ্বিক প্রতিষ্ঠানের ডিজিটাল ভিত্তি " +
        "নির্মাণ এবং আগামী দিনের প্ল্যাটফর্ম তৈরি।",
      ctaPrimary: "প্রকল্প শুরু করুন",
      ctaSecondary: "Ezyify দেখুন",
      detailPrimary: "$ n71 deploy --division=it --env=production",
      detailSecondary: "✓ পণ্য ব্যবস্থা সংযুক্ত",
      detailTertiary: "✓ ডেলিভারি পাইপলাইন প্রস্তুত",
      footnote: "✓ মান যাচাই সম্পন্ন",
      status: "▮ নির্দেশনার অপেক্ষায়_",
    },
    Overview: {
      eyebrow: "বিভাগ পরিচিতি",
      title: "প্রতিটি ব্যবসায়িক ইউনিটের প্রযুক্তি অংশীদার",
      lead:
        "Network71-এর IT ও সফটওয়্যার বিভাগ অভ্যন্তরীণ " +
        "অবকাঠামো ও বাণিজ্যিক সফটওয়্যার — উভয় " +
        "ক্ষেত্রেই কাজ করে।",
      ctaPrimary:
        "ফুল-স্ট্যাক ডেভেলপমেন্ট, পণ্য নকশা, ক্লাউড, " +
        "ডেটা ও নিরাপত্তা একটি সমন্বিত ডেলিভারি " +
        "ব্যবস্থায় যুক্ত।",
    },
    Services: {
      eyebrow: "সেবার ভিত্তি",
      title: "ছয়টি প্রযুক্তি শাখা",
      lead:
        "এন্টারপ্রাইজ ব্যাক-অফিস থেকে AI পণ্য পর্যন্ত " +
        "আমাদের সক্ষমতা সম্পূর্ণ ডিজিটাল " +
        "স্ট্যাকজুড়ে বিস্তৃত।",
    },
    Ezyify: {
      websiteUrl: "https://ezyify.com",
      eyebrow: "প্রধান উদ্ভাবনী পণ্য",
      title: "Ezyify",
      lead: "N71-এর প্রধান AI-চালিত সোশ্যাল কমার্স ইকোসিস্টেম",
      ctaPrimary:
        "Network71-এর IT বিভাগে অভ্যন্তরীণভাবে নির্মিত " +
        "Ezyify সোশ্যাল মিডিয়া, AI কমার্স এবং ক্রিয়েটর " +
        "মনিটাইজেশনকে এক প্ল্যাটফর্মে যুক্ত করছে — বর্তমানে নির্মাণাধীন।",
      ctaSecondary: "Ezyify দেখুন",
      detailPrimary: "ezyify.com",
    },
    Technology: {
      eyebrow: "প্রযুক্তি ইকোসিস্টেম",
      title: "প্রযুক্তিগত সক্ষমতা",
      lead: "প্রতিটি কার্যক্রমে আমাদের প্রকৌশলীরা যে মূল " + "প্রযুক্তিগুলো ব্যবহার করেন।",
    },
    Projects: {
      eyebrow: "নির্বাচিত কাজ",
      title: "আমাদের পণ্যসমূহ",
      lead: "কাজের উপযোগী নকশা।",
      ctaPrimary:
        "Network71-এর মালিকানাধীন প্ল্যাটফর্ম ও ডিজিটাল " + "অভিজ্ঞতার একটি নির্বাচন।",
      ctaSecondary: "এ ধরনের একটি প্রকল্প গড়ুন",
      detailPrimary: "ওয়েব · মোবাইল · মার্কেটপ্লেস · এন্টারপ্রাইজ",
      detailSecondary:
        "আপনার কি কোনো পণ্য-ভাবনা বা উন্নয়নযোগ্য " + "বিদ্যমান সিস্টেম আছে?",
      detailTertiary: "লক্ষ্য, বর্তমান চ্যালেঞ্জ ও প্রত্যাশিত " + "উদ্বোধনকাল জানান।",
      footnote: "আপনার প্রকল্প নিয়ে আলোচনা করুন",
    },
    Clients: {
      eyebrow: "অভ্যন্তরীণ এন্টারপ্রাইজ ভিত্তি",
      title: "IT প্রতিটি N71 বিভাগকে শক্তিশালী করে",
      lead: "IT বিভাগটি Network71-এর সব ব্যবসায়িক বিভাগের সংযোগসূত্র।",
      ctaPrimary: "Ezyify প্ল্যাটফর্ম",
      ctaSecondary: "N71 ডিজিটাল অপারেশনস হাব",
    },
    Delivery: {
      eyebrow: "আমাদের সম্পৃক্ততার ধরন",
      title: "ডেলিভারি মডেল",
      lead: "প্রকল্পের ধরন ও সময়সীমা অনুযায়ী প্রতিটি " + "সম্পৃক্ততা সাজানো হয়।",
      ctaPrimary: "সময়সীমা",
      ctaSecondary: "দলের আকার",
    },
    Quality: {
      eyebrow: "মান ও নিরাপত্তা",
      title: "নিরাপত্তা ও মানকে কেন্দ্রে রেখে নির্মিত",
      lead: "নিরাপত্তা ও গুণগত মান আমাদের স্থাপত্যের মৌলিক নীতি।",
      ctaPrimary: "নিরাপত্তা ব্রিফিং অনুরোধ করুন",
    },
    GlobalReach: {
      eyebrow: "বৈশ্বিক পরিসর",
      title: "দূরবর্তী ডেলিভারি। বৈশ্বিক প্রভাব।",
      lead:
        "ঢাকা, বাংলাদেশে আমাদের প্রকৌশল সদরদপ্তর " +
        "সমৃদ্ধ প্রতিভার ভান্ডার, প্রতিযোগিতামূলক ব্যয়কাঠামো ও ইউরোপ, " +
        "মধ্যপ্রাচ্য ও এশিয়ার সঙ্গে কার্যকর সময়সমন্বয় নিশ্চিত করে।",
      ctaPrimary:
        "প্রমাণিত অ্যাসিঙ্ক্রোনাস পদ্ধতিতে আমরা দূরবর্তীভাবে প্রকল্প সরবরাহ করি। " +
        "বৃহত্তর Network71 নেটওয়ার্কের মাধ্যমে দক্ষিণ এশিয়া, মধ্যপ্রাচ্য ও তার বাইরের " +
        "ক্লায়েন্টদের প্রকল্পে আমরা সহায়তা করেছি।",
    },
    Opportunities: {
      eyebrow: "সুযোগ",
      title: "আমাদের সঙ্গে কাজ করুন",
      lead:
        "তিনটি স্বতন্ত্র সম্পৃক্ততার পথ N71 প্রযুক্তি " +
        "ইকোসিস্টেমে ভিন্ন ভিন্ন সম্ভাবনার দ্বার " +
        "খোলে।",
    },
    Roadmap: {
      eyebrow: "কৌশলগত রোডম্যাপ",
      title: "প্রবৃদ্ধির রোডম্যাপ",
      lead: "আগামী চার বছরে Network71 প্রযুক্তি বিভাগের অগ্রযাত্রা।",
    },
    AILab: {
      areas: [
        { title: "কমার্স AI", desc: "আচরণভিত্তিক সুপারিশ, ব্যক্তিগতকরণ ও কনভার্সন অপ্টিমাইজেশন।" },
        { title: "কম্পিউটার ভিশন", desc: "ভার্চুয়াল প্রোডাক্ট ট্রাই-অনের জন্য ইমেজ রিকগনিশন ও 3D মডেলিং।" },
        { title: "NLP ও চ্যাট AI", desc: "কমার্স, সাপোর্ট ও কন্টেন্ট তৈরির জন্য কনভার্সেশনাল অ্যাসিস্ট্যান্ট।" },
        { title: "প্রেডিক্টিভ সিস্টেম", desc: "চাহিদা পূর্বাভাস, প্রাইসিং ইন্টেলিজেন্স ও ইনভেন্টরি প্রেডিকশন।" },
      ],
      eyebrow: "N71 AI ল্যাব",
      title:
        "Network71-এর AI ল্যাব Ezyify-এর বুদ্ধিমত্তা ও আমাদের " +
        "সফটওয়্যার গবেষণার চালিকাশক্তি। আমরা কমার্সের জন্য প্রোডাকশন-উপযোগী " +
        "AI সিস্টেম তৈরি করছি — প্রতিটি মডেলের রয়েছে সুনির্দিষ্ট ব্যবসায়িক প্রয়োগ।",
      lead: "সক্রিয় মডেলের ধরন",
      ctaPrimary: "> model.train(dataset=commerce_signals)",
      ctaSecondary: "epoch 1/50 — loss: 0.3412 — acc: 0.8870",
      detailPrimary: "epoch 50/50 — loss: 0.0182 — acc: 0.9940",
      detailSecondary: '> model.deploy(env="ezyify-prod")',
      detailTertiary: "✓ deployed — latency 18ms p99",
    },
    ProjectPreview: { productInterface: "পণ্য ইন্টারফেস" },
  },
  metrics: [
    { value: "৩", label: "পণ্য প্ল্যাটফর্ম", desc: "কমার্স, মেরিটাইম ও মিডিয়া" },
    { value: "গ্রুপজুড়ে", label: "সংযুক্ত বিভাগ", desc: "একীভূত এন্টারপ্রাইজ ইকোসিস্টেম" },
    { value: "ফুল স্ট্যাক", label: "সেবা পরিধি", desc: "কৌশল থেকে মোতায়েন" },
    { value: "Ezyify", label: "প্রধান পণ্য", desc: "AI কমার্স ইকোসিস্টেম" },
  ],
  showcaseProjects,
  servicePillars,
  ezyifyFeatures,
  aiModels,
  techBadges,
  processSteps,
  internalDivisions,
  deliveryModels,
  roadmapItems,
  overviewPillars,
  qualityItems,
  ezyifyStats,
  reachStats,
  opportunities,
  processLabel: "আমাদের ডেলিভারি প্রক্রিয়া",
  inquiryTypes: [
    "কাস্টম ডেভেলপমেন্ট",
    "এন্টারপ্রাইজ সফটওয়্যার",
    "Ezyify অংশীদারত্ব",
    "AI/ML প্রকল্প",
    "বিনিয়োগ-সংক্রান্ত অনুসন্ধান",
  ],
}

export default bn
