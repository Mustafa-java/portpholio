import type { Locale } from '@/data/projects';

export type Dictionary = typeof dictionaries.en;

export const dictionaries = {
  en: {
    nav: {
      work: 'Work',
      about: 'About',
      process: 'Process',
      contact: 'Contact',
      cta: "Let's talk",
    },
    hero: {
      eyebrow: 'Independent landing page designer',
      title: 'Landing pages with taste, tension, and a reason to keep scrolling.',
      subtitle:
        'Landings_Akyl designs and builds premium web experiences for SaaS and brands — with sharp positioning, expressive motion, and production-ready frontend.',
      primary: 'Explore the work',
      secondary: 'Book a landing page',
      proof: 'Selected launches across SaaS, creative, and luxury',
      marquee: ['Direction', 'Interaction', 'Frontend', 'Launch'],
    },
    work: {
      eyebrow: 'Selected case studies',
      title: 'Three distinct landing systems — each designed around a different brand energy.',
      subtitle:
        'The site acts like a gallery: cinematic enough to feel authored, quiet enough to let the work take the spotlight.',
      live: 'Open live site',
      preview: 'Full launch',
      close: 'Close preview',
      replace: '',
    },
    about: {
      eyebrow: 'Studio point of view',
      title: 'I build landing pages that feel designed, not assembled.',
      body:
        'My work sits at the intersection of visual direction, interaction design, and frontend craft. I focus on the details that make a page feel expensive: rhythm, spacing, type hierarchy, responsive composition, hover states, scroll reveals, and a clear conversion path.',
      statOne: 'Premium landing pages',
      statTwo: 'Design to frontend',
      statThree: 'Motion-led storytelling',
    },
    process: {
      eyebrow: 'How I work',
      title: 'A tight process for pages that need to impress quickly.',
      steps: [
        ['Position', 'Define the offer, audience, visual direction, and the one feeling the page must create.'],
        ['Compose', 'Shape the page around strong sections, editorial rhythm, and a conversion path that feels natural.'],
        ['Animate', 'Add motion where it increases clarity, depth, and desire — never as decoration only.'],
        ['Launch', 'Polish responsive behavior, performance, accessibility, and deploy a clean production build.'],
      ],
    },
    tools: {
      eyebrow: 'Production stack',
      title: 'Modern tools, used with restraint and taste.',
    },
    value: {
      eyebrow: 'What you get',
      title: 'A page that makes the product feel more valuable before the first click.',
      items: [
        'Distinct art direction instead of generic template sections',
        'Responsive layouts designed for desktop and mobile impact',
        'Micro-interactions that make the interface feel alive',
        'Clean frontend structure ready for Vercel and future edits',
      ],
    },
    contact: {
      eyebrow: 'Start a project',
      title: 'Have a landing page that needs to feel premium?',
      subtitle:
        'Send the product, niche, timeline, and a few references. I will help turn the idea into a focused visual direction and a polished launch-ready page.',
      email: 'Email',
      telegram: 'Telegram',
    },
    footer: {
      copyright: 'Landings_Akyl — landing pages with direction',
    },
  },
  ru: {
    nav: {
      work: 'Работы',
      about: 'Подход',
      process: 'Процесс',
      contact: 'Контакты',
      cta: 'Обсудить проект',
    },
    hero: {
      eyebrow: 'Независимый дизайнер лендингов',
      title: 'Лендинги со вкусом, напряжением и желанием скроллить дальше.',
      subtitle:
        'Landings_Akyl проектирует и собирает polished web experiences для SaaS, студий и premium-брендов — с сильной подачей, выразительным motion и готовым frontend.',
      primary: 'Смотреть работы',
      secondary: 'Заказать лендинг',
      proof: 'Избранные запуски: SaaS, creative, luxury',
      marquee: ['Direction', 'Interaction', 'Frontend', 'Launch'],
    },
    work: {
      eyebrow: 'Избранные кейсы',
      title: 'Три разных landing-системы — каждая под свою энергию бренда.',
      subtitle:
        'Сайт работает как галерея: достаточно кинематографичный, чтобы чувствовался авторский стиль, и достаточно чистый, чтобы работы оставались главным героем.',
      live: 'Открыть сайт',
      preview: 'Живой запуск',
      close: 'Закрыть просмотр',
      replace: '',
    },
    about: {
      eyebrow: 'Подход',
      title: 'Я делаю лендинги, которые выглядят спроектированными, а не собранными из блоков.',
      body:
        'Моя работа — это визуальное направление, интерактивный дизайн и frontend-реализация. Я фокусируюсь на деталях, которые делают страницу дороже: ритм, отступы, типографика, адаптивная композиция, hover-состояния, scroll-анимации и понятный путь к заявке.',
      statOne: 'Premium лендинги',
      statTwo: 'Дизайн → frontend',
      statThree: 'Motion storytelling',
    },
    process: {
      eyebrow: 'Как я работаю',
      title: 'Сжатый процесс для страниц, которые должны впечатлять быстро.',
      steps: [
        ['Position', 'Фиксирую оффер, аудиторию, визуальное направление и эмоцию, которую должна создать страница.'],
        ['Compose', 'Собираю страницу через сильные секции, editorial-ритм и естественный путь к конверсии.'],
        ['Animate', 'Добавляю motion там, где он усиливает ясность, глубину и желание взаимодействовать.'],
        ['Launch', 'Полирую адаптив, производительность, доступность и готовлю чистую production-сборку.'],
      ],
    },
    tools: {
      eyebrow: 'Production stack',
      title: 'Современные инструменты, использованные со вкусом и без перегруза.',
    },
    value: {
      eyebrow: 'Что вы получаете',
      title: 'Страницу, которая делает продукт ценнее ещё до первого клика.',
      items: [
        'Отдельное визуальное направление вместо шаблонных секций',
        'Адаптивные layout-решения с сильным desktop и mobile impact',
        'Микро-интеракции, из-за которых интерфейс ощущается живым',
        'Чистая frontend-структура для Vercel и дальнейших правок',
      ],
    },
    contact: {
      eyebrow: 'Начать проект',
      title: 'Нужен лендинг, который ощущается premium?',
      subtitle:
        'Пришлите продукт, нишу, сроки и пару референсов. Я помогу превратить идею в сильное визуальное направление и готовую к запуску страницу.',
      email: 'Email',
      telegram: 'Telegram',
    },
    footer: {
      copyright: 'Landings_Akyl — лендинги с направлением',
    },
  },
} satisfies Record<Locale, Record<string, unknown>>;
