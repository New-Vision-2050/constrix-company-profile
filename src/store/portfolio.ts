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
    education: { degree: LocalizedString; school: LocalizedString; description: LocalizedString }[];
    experience: { role: LocalizedString; company: LocalizedString; description: LocalizedString }[];
    skills: { name: LocalizedString; level: number }[];
    languages: { name: LocalizedString; level: LocalizedString }[];
    certifications: { name: LocalizedString; issuer: LocalizedString; year: string }[];
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
    education: [
      { 
        degree: { en: 'B.Sc. Computer Engineering', ar: 'بكالوريوس هندسة الحاسوب' }, 
        school: { en: 'Engineering University', ar: 'جامعة الهندسة' }, 
        description: { en: 'Specialized in Software Engineering and Web Technologies', ar: 'متخصص في هندسة البرمجيات وتقنيات الويب' } 
      },
      { 
        degree: { en: 'Frontend Development Bootcamp', ar: 'معسكر تطوير الفرونت إند' }, 
        school: { en: 'Tech Academy', ar: 'أكاديمية التقنية' }, 
        description: { en: 'Advanced React and Modern Web Development', ar: 'React المتقدم وتطوير الويب الحديث' } 
      },
    ],
    experience: [
      { 
        role: { en: 'Senior Frontend Engineer', ar: 'مهندس فرونت إند أول' }, 
        company: { en: 'Engineering Consultancy', ar: 'شركة استشارات هندسية' }, 
        description: { en: 'Leading frontend development for enterprise web applications', ar: 'قيادة تطوير الفرونت إند لتطبيقات الويب المؤسسية' } 
      },
      { 
        role: { en: 'Frontend Developer', ar: 'مطور فرونت إند' }, 
        company: { en: 'Tech Solutions Inc.', ar: 'شركة الحلول التقنية' }, 
        description: { en: 'Built responsive web applications using React and Next.js', ar: 'بناء تطبيقات ويب متجاوبة باستخدام React و Next.js' } 
      },
      { 
        role: { en: 'Junior Web Developer', ar: 'مطور ويب مبتدئ' }, 
        company: { en: 'Digital Agency', ar: 'وكالة رقمية' }, 
        description: { en: 'Developed modern websites with HTML, CSS, and JavaScript', ar: 'تطوير مواقع ويب حديثة باستخدام HTML و CSS و JavaScript' } 
      },
    ],
    skills: [
      { name: { en: 'React.js', ar: 'React.js' }, level: 95 },
      { name: { en: 'Next.js', ar: 'Next.js' }, level: 92 },
      { name: { en: 'TypeScript', ar: 'TypeScript' }, level: 90 },
      { name: { en: 'JavaScript (ES6+)', ar: 'JavaScript (ES6+)' }, level: 93 },
      { name: { en: 'HTML5 & CSS3', ar: 'HTML5 & CSS3' }, level: 95 },
      { name: { en: 'Tailwind CSS', ar: 'Tailwind CSS' }, level: 88 },
      { name: { en: 'Material-UI', ar: 'Material-UI' }, level: 90 },
      { name: { en: 'Git & GitHub', ar: 'Git & GitHub' }, level: 87 },
      { name: { en: 'Responsive Design', ar: 'التصميم المتجاوب' }, level: 94 },
    ],
    languages: [
      { name: { en: 'Arabic', ar: 'العربية' }, level: { en: 'Native', ar: 'اللغة الأم' } },
      { name: { en: 'English', ar: 'الإنجليزية' }, level: { en: 'Fluent', ar: 'بطلاقة' } },
      { name: { en: 'French', ar: 'الفرنسية' }, level: { en: 'Intermediate', ar: 'متوسط' } },
    ],
    certifications: [
      { name: { en: 'React Developer Certification', ar: 'شهادة مطور React' }, issuer: { en: 'Meta', ar: 'ميتا' }, year: '2024' },
      { name: { en: 'Advanced JavaScript', ar: 'JavaScript المتقدم' }, issuer: { en: 'Udemy', ar: 'يوديمي' }, year: '2023' },
      { name: { en: 'Frontend Web Developer', ar: 'مطور واجهات الويب' }, issuer: { en: 'freeCodeCamp', ar: 'freeCodeCamp' }, year: '2022' },
      { name: { en: 'Responsive Web Design', ar: 'تصميم الويب المتجاوب' }, issuer: { en: 'Google', ar: 'جوجل' }, year: '2022' },
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
    address: { en: '123 Street Name', ar: '١٢٣ اسم الشارع' },
    email: 'hello@example.com',
    phone: '+1 234 567 890',
  },
  settings: {
    isVisible: true,
    allowedUrl: 'benjamin',
    colors: {
      primary: '#ffc107',
      background: '#ffffff',
      text: '#000000',
    },
  },
  navigation: [
    { id: 'home', label: { en: 'HOME', ar: 'الرئيسية' }, path: '/PortfolioEmployee/homeemployee', icon: 'mingcute:home-2-line' },
    { id: 'about', label: { en: 'ABOUT ME', ar: 'عني' }, path: '/PortfolioEmployee/about', icon: 'mingcute:user-2-line' },
    { id: 'resume', label: { en: 'RESUME', ar: 'السيرة الذاتية' }, path: '/PortfolioEmployee/Resume', icon: 'mingcute:briefcase-line' },
    { id: 'portfolio', label: { en: 'PORTFOLIO', ar: 'الأعمال' }, path: '/PortfolioEmployee/Portfolio', icon: 'mingcute:monitor-line' },
    { id: 'testimonials', label: { en: 'TESTIMONIALS', ar: 'التوصيات' }, path: '/PortfolioEmployee/Testimonials', icon: 'solar:speaker-bold' },
    { id: 'contact', label: { en: 'CONTACT', ar: 'اتصل بي' }, path: '/PortfolioEmployee/Contact', icon: 'mingcute:send-plane-line' },
  ],
};

export const portfolioDataAtom = atom<PortfolioData>(defaultData);

// Helper for extracting localized string
export const getLocalized = (str: LocalizedString | undefined, locale: string) => {
  if (!str) return '';
  return (str[locale as keyof LocalizedString] || str.en || '') as string;
};
