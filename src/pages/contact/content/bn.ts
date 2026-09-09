import type { ContactContent } from './en'

const bn: ContactContent = {
  hero: {
    breadcrumbHome: 'হোম',
    breadcrumbCurrent: 'যোগাযোগ',
    eyebrow: 'আমাদের সাথে যোগাযোগ',
    title: 'যোগাযোগ করুন',
    lead: 'আপনি অংশীদার, বিনিয়োগকারী বা চাকরিপ্রার্থী — যিনিই হোন, আপনার কথা শুনতে আমরা আগ্রহী।',
  },
  methods: {
    email: {
      title: 'ইমেইল',
      value: 'info@network71.com',
      note: 'সাধারণ জিজ্ঞাসা',
    },
    location: {
      title: 'অবস্থান',
      value: 'ঢাকা, বাংলাদেশ',
      note: 'বৈশ্বিক সদর দপ্তর',
    },
    social: {
      title: 'সোশ্যাল',
      value: 'অফিসিয়াল চ্যানেলগুলো এখানে প্রকাশ করা হবে।',
      note: 'হালনাগাদ তথ্যের জন্য আমাদের মিডিয়া টিমের সাথে যোগাযোগ করুন।',
    },
  },
  form: {
    eyebrow: 'বার্তা পাঠান',
    title: 'যোগাযোগ ফর্ম',
    successTitle: 'আপনার জিজ্ঞাসা গৃহীত হয়েছে',
    successText: 'আমাদের সাথে যোগাযোগ করার জন্য ধন্যবাদ। আপনার রেফারেন্স নম্বর {ref}।',
    projectPrefill: '“{project}”-এর অনুরূপ একটি প্রকল্প নিয়ে আমি আলোচনা করতে আগ্রহী।\n\nআমার প্রয়োজনীয়তা:\n',
    subjectSuffix: 'সংক্রান্ত জিজ্ঞাসা',
    name: 'পূর্ণ নাম *',
    namePh: 'আহমেদ হাসান',
    company: 'প্রতিষ্ঠান (ঐচ্ছিক)',
    companyPh: 'আপনার প্রতিষ্ঠানের নাম',
    email: 'ইমেইল *',
    emailPh: 'you@example.com',
    phone: 'ফোন (ঐচ্ছিক)',
    phonePh: '+880 1XXXXXXXXX',
    department: 'বিভাগ *',
    departments: [
      { value: 'General', label: 'সাধারণ' },
      { value: 'Investors', label: 'বিনিয়োগকারী' },
      { value: 'Careers', label: 'ক্যারিয়ার' },
      { value: 'Partnerships', label: 'অংশীদারিত্ব' },
      { value: 'Media', label: 'মিডিয়া' },
    ],
    message: 'বার্তা *',
    messagePh: 'আমরা আপনাকে কীভাবে সহায়তা করতে পারি?',
    sending: 'পাঠানো হচ্ছে…',
    send: 'বার্তা পাঠান',
  },
  sidebar: {
    officesEyebrow: 'কার্যালয়',
    hqLabel: 'সদর দপ্তর',
    hqCity: 'ঢাকা, বাংলাদেশ',
    hqEmail: 'info@network71.com',
    divisionsEyebrow: 'বিভাগ অনুসারে',
    enquire: 'জিজ্ঞাসা করুন',
    divisions: [
      'গার্মেন্টস ও অ্যাপারেল',
      'কৃষি ও অ্যাগ্রো',
      'খাদ্য ও পানীয়',
      'তেল ও জ্বালানি',
      'IT ও সফটওয়্যার',
      'গ্লোবাল ট্রেডিং',
      'মিডিয়া',
      'eSHIPe মেরিটাইম',
    ],
  },
}

export default bn
