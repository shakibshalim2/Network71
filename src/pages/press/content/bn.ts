import type { PressContent } from './en'

const PRESS_EMAIL = 'press@network71.com'

const bn: PressContent = {
  hero: {
    eyebrow: 'Network71',
    title: 'প্রেস ও মিডিয়া',
    lead: 'Network71-এর সর্বশেষ সংবাদ, প্রেস বিজ্ঞপ্তি ও মিডিয়া রিসোর্স।',
  },
  mediaKit: {
    title: 'মিডিয়া কিট',
    lead: 'হালনাগাদ ব্র্যান্ড পরিচিতি নির্দেশনা দেখুন এবং আমাদের যোগাযোগ দলের কাছ থেকে সরাসরি অনুমোদিত মিডিয়া উপকরণের অনুরোধ করুন।',
    viewLabel: 'রিসোর্স দেখুন',
    items: [
      {
        icon: 'image',
        title: 'লোগো ফাইল',
        desc: 'সকল রঙের ভ্যারিয়েন্টে উচ্চ রেজোলিউশনের PNG, SVG ও EPS ফরম্যাট।',
        href: '/brand',
      },
      {
        icon: 'brush',
        title: 'ব্র্যান্ড নির্দেশিকা',
        desc: 'আমাদের ভিজ্যুয়াল পরিচিতি, টাইপোগ্রাফি ও ব্যবহারবিধির পূর্ণাঙ্গ নির্দেশিকা।',
        href: '/brand',
      },
      {
        icon: 'person',
        title: 'নির্বাহীদের ছবি',
        desc: 'Network71 নেতৃত্বের আনুষ্ঠানিক প্রতিকৃতি ও আলোকচিত্র।',
        href: '/leadership',
      },
    ],
  },
  briefings: {
    title: 'মিডিয়া ব্রিফিং ক্ষেত্র',
    lead: 'সাংবাদিক ও অংশীদারদের জন্য যাচাইকৃত পটভূমি উপকরণ।',
    enquiriesLabel: 'মিডিয়া জিজ্ঞাসা',
    requestLabel: 'ব্রিফিংয়ের অনুরোধ',
    requestSubject: 'ব্রিফিংয়ের অনুরোধ',
    email: PRESS_EMAIL,
    releases: [
      {
        date: 'কোম্পানি ব্রিফিং',
        tag: 'কর্পোরেট',
        tagColor: 'bg-gold/10 text-gold',
        title: 'Network71 কর্পোরেট ও ব্যবসায়িক পোর্টফোলিও',
        excerpt: 'Network71 গ্রুপ, তার পরিচালন বিভাগ, কৌশলগত দিকনির্দেশনা এবং একীভূত প্রতিষ্ঠানের মাধ্যমে বাজার সংযুক্ত করার পদ্ধতি সম্পর্কে পটভূমি তথ্য।',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=340&fit=crop&auto=format',
      },
      {
        date: 'প্রোডাক্ট ব্রিফিং',
        tag: 'প্রযুক্তি',
        tagColor: 'bg-cyan-400/10 text-cyan-400',
        title: 'Ezyify প্রোডাক্ট ও প্রযুক্তি সারসংক্ষেপ',
        excerpt: 'Network71-এর Ezyify সোশ্যাল-কমার্স প্ল্যাটফর্মের দৃষ্টিভঙ্গি, প্রোডাক্ট অভিজ্ঞতা ও ইকোসিস্টেম নিয়ে একটি ব্রিফিং।',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop&auto=format',
      },
      {
        date: 'টেকসইতা ব্রিফিং',
        tag: 'ESG',
        tagColor: 'bg-emerald-400/10 text-emerald-400',
        title: 'দায়িত্বশীল প্রবৃদ্ধি ও ESG পদ্ধতি',
        excerpt: 'Network71-এর দীর্ঘমেয়াদি পরিচালন পদ্ধতির পথনির্দেশক পরিবেশগত, সামাজিক ও সুশাসন নীতির পটভূমি।',
        img: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&h=340&fit=crop&auto=format',
      },
    ],
  },
  verification: {
    title: 'তথ্য ও যাচাই',
    badge: 'প্রেস মানদণ্ড',
    cardTitle: 'শুধুই যাচাইকৃত তথ্য',
    cardBody: 'অনুমোদিত কোম্পানি তথ্য, নির্বাহীদের উদ্ধৃতি, ছবি এবং প্রকাশযোগ্য পটভূমি উপকরণের জন্য যোগাযোগ দলের সঙ্গে যোগাযোগ করুন।',
  },
  contact: {
    eyebrow: 'মিডিয়া জিজ্ঞাসা',
    title: 'আমাদের প্রেস দলের সঙ্গে যোগাযোগ করুন',
    lead: 'মিডিয়া জিজ্ঞাসা, সাক্ষাৎকারের অনুরোধ বা প্রেস কিট পেতে আমাদের যোগাযোগ দলের সঙ্গে সংযুক্ত হোন।',
    email: PRESS_EMAIL,
  },
}

export default bn
