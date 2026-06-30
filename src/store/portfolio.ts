import { atom } from 'jotai';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface PortfolioData {
  home: {
    greeting: LocalizedString;
    name: LocalizedString;
    jobTitle: LocalizedString;
    description: LocalizedString;
    buttonText: LocalizedString;
    buttonLink: string;
    mainImage: string;
  };
  about: {
    title: LocalizedString;
    content: LocalizedString;
    profileImage: string;
  };
  resume: {
    title: LocalizedString;
    profileImage: string;
    qualifications: { title: LocalizedString; institution: LocalizedString; year: string; description: LocalizedString }[];
    summary: LocalizedString;
    experience: { role: LocalizedString; company: LocalizedString; period: LocalizedString; description: LocalizedString; skills: { name: LocalizedString; icon: string }[] }[];
    courses: { name: LocalizedString; provider: LocalizedString; year: string; icon: string }[];
    certifications: { name: LocalizedString; issuer: LocalizedString; year: string; icon: string }[];
  };
  portfolio: {
    title: LocalizedString;
    profileImage: string;
    categories: LocalizedString[];
    items: { id: string; categoryEn: string; image: string }[]; 
  };
  testimonials: {
    title: LocalizedString;
    profileImage: string;
    items: { author: LocalizedString; role: LocalizedString; text: LocalizedString; avatar: string }[];
  };
  contact: {
    title: LocalizedString;
    profileImage: string;
    address: LocalizedString;
    email: string;
    phone: string;
    socialLinks: {
      instagram: string;
      facebook: string;
      whatsapp: string;
      linkedin: string;
      twitter: string;
    };
  };
  settings: {
    isVisible: boolean;
    allowedUrl: string;
    colors: {
      primary: string;
      background: string;
      text: string;
    };
  };
  navigation: { id: string; label: LocalizedString; path: string; icon: string }[];
}

const defaultData: PortfolioData = {
  home: {
    greeting: { en: 'HI THERE!', ar: 'أهلاً بك!' },
    name: { en: 'MOHAMED ABDEL LATIF', ar: 'محمد عبد اللطيف' },
    jobTitle: { en: 'FRONTEND ENGINEER', ar: 'مهندس فرونت إند' },
    description: { 
      en: 'Passionate Frontend Engineer specializing in building modern, responsive web applications. I transform complex requirements into elegant user interfaces.',
      ar: 'مهندس فرونت إند شغوف متخصص في بناء تطبيقات ويب حديثة ومتجاوبة. أحول المتطلبات المعقدة إلى واجهات مستخدم أنيقة.'
    },
    buttonText: { en: 'MORE ABOUT ME', ar: 'المزيد عني' },
    buttonLink: '/PortfolioEmployee/about',
    mainImage: '/assets/images/portfolio/benayman-profile.png',
  },
  about: {
    title: { en: 'ABOUT ME', ar: 'نبذة عني' },
    content: { 
      en: 'I am a Frontend Engineer at an engineering consultancy firm, specializing in developing cutting-edge web solutions. With expertise in modern frameworks and best practices, I create scalable and maintainable applications that deliver exceptional user experiences.', 
      ar: 'أنا مهندس فرونت إند في شركة استشارات هندسية، متخصص في تطوير حلول ويب متطورة. مع خبرة في الأطر الحديثة وأفضل الممارسات، أقوم بإنشاء تطبيقات قابلة للتطوير وسهلة الصيانة توفر تجارب مستخدم استثنائية.' 
    },
    profileImage: '/assets/images/portfolio/benayman-profile.png',
  },
  resume: {
    title: { en: 'RESUME', ar: 'السيرة الذاتية' },
    profileImage: '/assets/images/portfolio/benayman-profile.png',
    qualifications: [
      {
        title: { en: 'B.Sc. Computer Engineering', ar: 'بكالوريوس هندسة الحاسوب' },
        institution: { en: 'Engineering University', ar: 'جامعة الهندسة' },
        year: '2018 – 2022',
        description: { en: 'Specialized in Software Engineering and Web Technologies with honors.', ar: 'متخصص في هندسة البرمجيات وتقنيات الويب بمرتبة الشرف.' }
      },
      {
        title: { en: 'Frontend Development Diploma', ar: 'دبلوم تطوير الفرونت إند' },
        institution: { en: 'Tech Academy', ar: 'أكاديمية التقنية' },
        year: '2022 – 2023',
        description: { en: 'Intensive program covering React, Next.js, and modern web standards.', ar: 'برنامج مكثف يغطي React وNext.js ومعايير الويب الحديثة.' }
      },
    ],
    summary: {
      en: 'Passionate Frontend Engineer with 4+ years of experience building scalable, high-performance web applications for engineering consultancy firms. Proficient in modern JavaScript frameworks with a strong eye for UI/UX and clean code architecture.',
      ar: 'مهندس فرونت إند متميز بخبرة تزيد عن 4 سنوات في بناء تطبيقات ويب قابلة للتطوير وعالية الأداء لشركات الاستشارات الهندسية. متمكن من أطر JavaScript الحديثة مع حس قوي بتصميم الواجهات وهندسة الكود النظيف.'
    },
    experience: [
      {
        role: { en: 'Senior Frontend Engineer', ar: 'مهندس فرونت إند أول' },
        company: { en: 'Engineering Consultancy Co.', ar: 'شركة الاستشارات الهندسية' },
        period: { en: '2023 – Present', ar: '2023 – حتى الآن' },
        description: { en: 'Lead the frontend team in building enterprise-grade web platforms for major engineering projects. Improved performance by 40% through code optimization.', ar: 'قيادة فريق الفرونت إند في بناء منصات ويب للمشاريع الهندسية الكبرى. تحسين الأداء بنسبة 40% من خلال تحسين الكود.' },
        skills: [
          { name: { en: 'React.js', ar: 'React.js' }, icon: 'logos:react' },
          { name: { en: 'Next.js', ar: 'Next.js' }, icon: 'logos:nextjs-icon' },
          { name: { en: 'TypeScript', ar: 'TypeScript' }, icon: 'logos:typescript-icon' },
        ]
      },
      {
        role: { en: 'Frontend Developer', ar: 'مطور فرونت إند' },
        company: { en: 'Tech Solutions Inc.', ar: 'شركة الحلول التقنية' },
        period: { en: '2021 – 2023', ar: '2021 – 2023' },
        description: { en: 'Built responsive dashboards and client portals using React and Material-UI. Collaborated with backend teams on REST API integrations.', ar: 'بناء لوحات تحكم ومنصات عملاء متجاوبة. تعاون مع فرق الباكند في تكامل واجهات برمجة التطبيقات.' },
        skills: [
          { name: { en: 'Material-UI', ar: 'Material-UI' }, icon: 'logos:material-ui' },
          { name: { en: 'JavaScript', ar: 'JavaScript' }, icon: 'logos:javascript' },
          { name: { en: 'Git', ar: 'Git' }, icon: 'logos:git-icon' },
        ]
      },
    ],
    courses: [
      { name: { en: 'Advanced React Patterns', ar: 'أنماط React المتقدمة' }, provider: { en: 'Udemy', ar: 'يوديمي' }, year: '2023', icon: 'logos:react' },
      { name: { en: 'TypeScript Complete Guide', ar: 'دليل TypeScript الشامل' }, provider: { en: 'Udemy', ar: 'يوديمي' }, year: '2023', icon: 'logos:typescript-icon' },
      { name: { en: 'Next.js & React - The Complete Guide', ar: 'Next.js وReact - الدليل الكامل' }, provider: { en: 'Udemy', ar: 'يوديمي' }, year: '2022', icon: 'logos:nextjs-icon' },
      { name: { en: 'CSS for JavaScript Developers', ar: 'CSS لمطوري JavaScript' }, provider: { en: 'Josh W. Comeau', ar: 'جوش كومو' }, year: '2022', icon: 'logos:css-3' },
    ],
    certifications: [
      { name: { en: 'Meta React Developer', ar: 'مطور React من Meta' }, issuer: { en: 'Meta / Coursera', ar: 'Meta / Coursera' }, year: '2024', icon: 'logos:react' },
      { name: { en: 'Google UX Design', ar: 'تصميم UX من Google' }, issuer: { en: 'Google / Coursera', ar: 'Google / Coursera' }, year: '2023', icon: 'logos:google-icon' },
      { name: { en: 'Frontend Web Developer', ar: 'مطور واجهات الويب' }, issuer: { en: 'freeCodeCamp', ar: 'freeCodeCamp' }, year: '2022', icon: 'simple-icons:freecodecamp' },
      { name: { en: 'Responsive Web Design', ar: 'تصميم الويب المتجاوب' }, issuer: { en: 'Google', ar: 'جوجل' }, year: '2022', icon: 'logos:google-icon' },
    ],
  },
  portfolio: {
    title: { en: 'PORTFOLIO', ar: 'معرض الأعمال' },
    profileImage: '/assets/images/portfolio/benayman-profile.png',
    categories: [
      { en: 'ALL', ar: 'الكل' },
      { en: 'WEB APPLICATIONS', ar: 'تطبيقات ويب' },
      { en: 'REACT PROJECTS', ar: 'مشاريع React' },
      { en: 'UI/UX DESIGN', ar: 'تصميم واجهات' }
    ],
    items: [
      { id: '1', categoryEn: 'WEB APPLICATIONS', image: '/assets/images/portfolio/1.PNG' },
      { id: '2', categoryEn: 'REACT PROJECTS', image: '/assets/images/portfolio/2.PNG' },
      { id: '3', categoryEn: 'UI/UX DESIGN', image: '/assets/images/portfolio/3.PNG' },
      { id: '4', categoryEn: 'REACT PROJECTS', image: '/assets/images/portfolio/4.PNG' },
    ],
  },
  testimonials: {
    title: { en: 'TESTIMONIALS', ar: 'التوصيات' },
    profileImage: '/assets/images/portfolio/benayman-profile.png',
    items: [
      { 
        author: { en: 'John Doe', ar: 'جون دو' }, 
        role: { en: 'CEO', ar: 'المدير التنفيذي' }, 
        text: { en: 'Great work!', ar: 'عمل رائع جداً!' }, 
        avatar: '/assets/images/portfolio/benayman-profile.png' 
      }
    ],
  },
  contact: {
    title: { en: 'CONTACT', ar: 'اتصل بي' },
    profileImage: '/assets/images/portfolio/benayman-profile.png',
    address: { en: 'Cairo, Egypt', ar: 'القاهرة، مصر' },
    email: 'hello@example.com',
    phone: '+20 100 000 0000',
    socialLinks: {
      instagram: 'https://instagram.com/',
      facebook: 'https://facebook.com/',
      whatsapp: 'https://wa.me/201000000000',
      linkedin: 'https://linkedin.com/in/',
      twitter: 'https://twitter.com/',
    },
  },
  settings: {
    isVisible: true,
    allowedUrl: 'benjamin',
    colors: {
      primary: '#F42589',
      background: '#ffffff',
      text: '#000000',
    },
  },
  navigation: [
    { id: 'home', label: { en: 'HOME', ar: 'الرئيسية' }, path: '/PortfolioEmployee/homeemployee', icon: 'mingcute:home-2-line' },
    { id: 'about', label: { en: 'ABOUT ME', ar: 'عني' }, path: '/PortfolioEmployee/about', icon: 'mingcute:user-2-line' },
    { id: 'resume', label: { en: 'RESUME', ar: 'السيرة الذاتية' }, path: '/PortfolioEmployee/Resume', icon: 'mingcute:briefcase-line' },
    { id: 'portfolio', label: { en: 'PORTFOLIO', ar: 'الأعمال' }, path: '/PortfolioEmployee/Portfolio', icon: 'mingcute:monitor-line' },
    { id: 'contact', label: { en: 'CONTACT', ar: 'اتصل بي' }, path: '/PortfolioEmployee/Contact', icon: 'mingcute:send-plane-line' },
  ],
};

export const portfolioDataAtom = atom<PortfolioData>(defaultData);

// Helper for extracting localized string
export const getLocalized = (str: LocalizedString | undefined, locale: string) => {
  if (!str) return '';
  return (str[locale as keyof LocalizedString] || str.en || '') as string;
};
