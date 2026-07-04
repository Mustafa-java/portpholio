export type Locale = 'en' | 'ru';

export type LocalizedText = Record<Locale, string>;

export type Project = {
  slug: string;
  name: string;
  category: LocalizedText;
  description: LocalizedText;
  tags: Record<Locale, string[]>;
  liveUrl: string;
  images: {
    desktop: string;
    mobile: string;
  };
};

export const projects: Project[] = [
  {
    slug: 'nexora',
    name: 'Nexora',
    category: {
      en: 'SaaS / Tech',
      ru: 'SaaS / Технологии',
    },
    description: {
      en: 'A dark AI workflow product with cinematic gradients, motion depth, and a futuristic 3D-inspired hero.',
      ru: 'Тёмный AI-продукт для workflow-автоматизации с кинематографичными градиентами, глубиной и футуристичным hero.',
    },
    tags: {
      en: ['AI', 'Dark UI', 'Motion Design'],
      ru: ['AI', 'Dark UI', 'Motion Design'],
    },
    liveUrl: 'https://nexora-ai-mocha.vercel.app/',
    images: {
      desktop: '/projects/nexora/desktop.png',
      mobile: '/projects/nexora/mobile.png',
    },
  },
  {
    slug: 'bold-studio',
    name: 'Bold Studio',
    category: {
      en: 'Creative Agency',
      ru: 'Креативное агентство',
    },
    description: {
      en: 'An expressive agency landing page built around bold typography, experimental rhythm, and interaction-first storytelling.',
      ru: 'Экспрессивный лендинг агентства с сильной типографикой, экспериментальным ритмом и интерактивной подачей.',
    },
    tags: {
      en: ['Typography', 'Interaction Design', 'Branding'],
      ru: ['Типографика', 'Интеракции', 'Брендинг'],
    },
    liveUrl: 'https://bold-studio-rho.vercel.app/',
    images: {
      desktop: '/projects/bold-studio/desktop.png',
      mobile: '/projects/bold-studio/mobile.png',
    },
  },
  {
    slug: 'aurelia',
    name: 'Aurélia',
    category: {
      en: 'Luxury / Lifestyle',
      ru: 'Luxury / Lifestyle',
    },
    description: {
      en: 'A restrained luxury skincare experience with editorial spacing, warm minimalism, and cinematic motion.',
      ru: 'Сдержанный luxury-лендинг для skincare-бренда с editorial-композицией, тёплым минимализмом и кинематографичной анимацией.',
    },
    tags: {
      en: ['Editorial', 'Minimal', 'Premium'],
      ru: ['Editorial', 'Минимализм', 'Premium'],
    },
    liveUrl: 'https://aurelia-landing-two.vercel.app/',
    images: {
      desktop: '/projects/aurelia/desktop.png',
      mobile: '/projects/aurelia/mobile.png',
    },
  },
];
