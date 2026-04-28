/**
 * Fallback Data Variants
 * Different site configurations for testing component combinations
 */

// ============================================================
// SITE 1: Professional Consulting — Split Hero, Content, FAQ, CTA Banner
// ============================================================
export const site1 = {
  name: 'Professional Consulting',
  homeArticle: {
    id: 1,
    attributes: {
      Domain: 'fallback.local',
      urlSlug: '/',
      SiteName: 'Summit Consulting',
      H1: 'Strategic Business Growth',
      Title: 'Expert Consulting Services',
      MetaTitle: 'Summit Consulting | Strategic Growth Partners',
      MetaDescription: 'Transform your business with expert strategy consulting.',
      Paragraph: 'We help businesses scale with data-driven strategies.',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  pageComponents: [
    {
      __component: 'components.hero-section',
      variant: 'split',
      config: {
        height: 'medium',
        textAlign: 'left',
        backgroundType: 'gradient',
        showCTA: true,
        ctaText: 'Book a Consultation',
        ctaHref: '/contact',
        style: {
          gradientColors: ['#1e3a5f', '#2563eb'],
        },
      },
    },
    {
      __component: 'components.content-section',
      variant: 'twoColumn',
      config: {
        heading: 'Our Approach',
        content: '<p>We combine deep industry expertise with cutting-edge analytics to deliver measurable results. Our consultants have helped over 200 companies achieve sustainable growth.</p><p>From market analysis to execution, we partner with you every step of the way to ensure lasting success.</p>',
        image: null,
        style: {
          backgroundColor: '#f9fafb',
        },
      },
    },
    {
      __component: 'components.faq',
      variant: 'accordion',
      config: {
        heading: 'Common Questions',
        faqs: [
          { question: 'What industries do you serve?', answer: 'We serve technology, healthcare, finance, and manufacturing sectors with specialized consulting teams.' },
          { question: 'How long does a typical engagement last?', answer: 'Most engagements run 3-6 months, though we tailor the timeline to your specific needs and goals.' },
          { question: 'Do you offer ongoing support?', answer: 'Yes! We provide retainer-based advisory services to ensure continued growth after the initial engagement.' },
          { question: 'What makes Summit different?', answer: 'Our data-driven approach, industry specialists, and proven track record of 40% average revenue growth for clients.' },
        ],
        style: {},
      },
    },
    {
      __component: 'components.cta-section',
      variant: 'banner',
      config: {
        heading: 'Ready to Scale Your Business?',
        description: 'Schedule a free 30-minute strategy session with our team.',
        ctaText: 'Get Started Today',
        ctaHref: '/contact',
        style: {
          backgroundColor: '#1e3a5f',
          textColor: '#ffffff',
        },
      },
    },
  ],
  globalConfig: {
    domain: 'fallback.local',
    useComponentSystem: true,
    templateVersion: 'v2.0',
    colorScheme: { primary: '#1e3a5f', secondary: '#2563eb', background: '#ffffff', text: '#1f2937' },
    typography: { headingFont: 'Georgia, serif', bodyFont: 'Inter, sans-serif' },
    header: { style: {} },
    footer: {
      variant: 'enhanced',
      style: { backgroundColor: '#1e3a5f', textColor: '#e2e8f0' },
      description: 'Strategic growth partners for ambitious businesses.',
      columnOrder: ['logo', 'menuLinks', 'contactInfo'],
      contactEmail: 'hello@summit.co',
      contactPhone: '+1 (800) 555-1234',
      contactAddress: '100 Strategy Lane, NY 10001',
      copyright: `© ${new Date().getFullYear()} Summit Consulting. All rights reserved.`,
    },
  },
  menuItems: { 'Home': '/', 'Services': '/services', 'About': '/about', 'Contact': '/contact' },
};

// ============================================================
// SITE 2: Creative Agency — Minimal Hero, Gallery, About Split, CTA Split
// ============================================================
export const site2 = {
  name: 'Creative Agency',
  homeArticle: {
    id: 1,
    attributes: {
      Domain: 'fallback.local',
      urlSlug: '/',
      SiteName: 'Pixel Studio',
      H1: 'We Create Digital Experiences',
      Title: 'Award-Winning Creative Agency',
      MetaTitle: 'Pixel Studio | Digital Creative Agency',
      MetaDescription: 'Award-winning creative agency specializing in brand design and digital experiences.',
      Paragraph: 'Crafting beautiful digital experiences since 2015.',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  pageComponents: [
    {
      __component: 'components.hero-section',
      variant: 'minimal',
      config: {
        textAlign: 'center',
        showCTA: true,
        ctaText: 'View Our Work',
        ctaHref: '#gallery',
        style: {
          backgroundColor: '#0f172a',
          color: '#ffffff',
          titleFontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
        },
      },
    },
    {
      __component: 'components.gallery',
      variant: 'grid',
      config: {
        heading: 'Selected Work',
        columns: 3,
        images: [
          { src: 'https://picsum.photos/seed/a/600/400', alt: 'Brand Identity Project', caption: 'Brand Identity — TechCorp' },
          { src: 'https://picsum.photos/seed/b/600/400', alt: 'Website Redesign', caption: 'Web — Fashion House' },
          { src: 'https://picsum.photos/seed/c/600/400', alt: 'Mobile App Design', caption: 'App — HealthTrack' },
          { src: 'https://picsum.photos/seed/d/600/400', alt: 'Product Photography', caption: 'Photo — Artisan Coffee' },
          { src: 'https://picsum.photos/seed/e/600/400', alt: 'UI/UX Design', caption: 'UX — FinTech App' },
          { src: 'https://picsum.photos/seed/f/600/400', alt: 'Marketing Campaign', caption: 'Campaign — EcoLiving' },
        ],
        style: {},
      },
    },
    {
      __component: 'components.about-section',
      variant: 'split',
      config: {
        heading: 'Who We Are',
        content: '<p>Pixel Studio is a collective of designers, developers, and strategists who believe great design can change the world. We work with bold brands ready to make an impact.</p>',
        stats: [
          { value: '150+', label: 'Projects Delivered' },
          { value: '8', label: 'Years Experience' },
          { value: '95%', label: 'Client Retention' },
        ],
        style: {},
      },
    },
    {
      __component: 'components.cta-section',
      variant: 'split',
      config: {
        heading: "Let's Create Something Amazing",
        description: "Have a project in mind? We'd love to hear about it.",
        ctaText: 'Start a Project',
        ctaHref: '/contact',
        style: {
          backgroundColor: '#4f46e5',
          textColor: '#ffffff',
        },
      },
    },
  ],
  globalConfig: {
    domain: 'fallback.local',
    useComponentSystem: true,
    templateVersion: 'v2.0',
    colorScheme: { primary: '#4f46e5', secondary: '#0f172a', background: '#ffffff', text: '#1e293b' },
    typography: { headingFont: "'Space Grotesk', sans-serif", bodyFont: 'Inter, sans-serif' },
    header: { style: {} },
    footer: {
      variant: 'enhanced',
      style: { backgroundColor: '#0f172a', textColor: '#94a3b8' },
      description: 'Award-winning creative agency.',
      columnOrder: ['logo', 'menuLinks', 'contactInfo'],
      contactEmail: 'studio@pixel.co',
      contactPhone: '+1 (555) 987-6543',
      copyright: `© ${new Date().getFullYear()} Pixel Studio. All rights reserved.`,
    },
  },
  menuItems: { 'Home': '/', 'Work': '/services', 'About': '/about', 'Contact': '/contact' },
};

// ============================================================
// SITE 3: SaaS Product — Fullscreen Hero, Features 4col, Testimonials, FAQ Grid
// ============================================================
export const site3 = {
  name: 'SaaS Product',
  homeArticle: {
    id: 1,
    attributes: {
      Domain: 'fallback.local',
      urlSlug: '/',
      SiteName: 'CloudFlow',
      H1: 'Workflow Automation Made Simple',
      Title: 'The All-in-One Productivity Platform',
      MetaTitle: 'CloudFlow | Workflow Automation Platform',
      MetaDescription: 'Automate your workflows and boost team productivity by 10x.',
      Paragraph: 'Trusted by 5,000+ teams worldwide.',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  pageComponents: [
    {
      __component: 'components.hero-section',
      variant: 'fullscreen',
      config: {
        height: 'medium',
        textAlign: 'center',
        backgroundType: 'gradient',
        showCTA: true,
        ctaText: 'Start Free Trial',
        ctaHref: '/contact',
      },
    },
    {
      __component: 'components.features-grid',
      variant: '4col',
      config: {
        heading: 'Everything You Need',
        features: [
          { icon: '⚡', title: 'Instant Setup', description: 'Get started in minutes with our guided onboarding process.' },
          { icon: '🔄', title: 'Smart Automation', description: 'Automate repetitive tasks and free your team to focus on what matters.' },
          { icon: '📊', title: 'Real-time Analytics', description: 'Track performance with beautiful dashboards and custom reports.' },
          { icon: '🔗', title: '500+ Integrations', description: 'Connect with Slack, Jira, GitHub, and hundreds more tools.' },
        ],
      },
    },
    {
      __component: 'components.testimonials-grid',
      config: {
        heading: 'Loved by Teams Everywhere',
        subtitle: 'Testimonials',
        showRatings: true,
        testimonials: [
          { name: 'Alex Rivera', position: 'CTO, StartupCo', rating: 5, content: 'CloudFlow reduced our project delivery time by 40%. The automation features are game-changing.', image: 'https://i.pravatar.cc/150?img=11' },
          { name: 'Jessica Park', position: 'PM, TechGiant', rating: 5, content: "Best productivity tool we've ever used. The team adopted it instantly — zero learning curve.", image: 'https://i.pravatar.cc/150?img=5' },
          { name: 'Marcus Chen', position: 'Founder, DevShop', rating: 4, content: 'The integrations are incredible. Everything connects seamlessly and just works.', image: 'https://i.pravatar.cc/150?img=12' },
        ],
        style: {},
      },
    },
    {
      __component: 'components.faq',
      variant: 'grid',
      config: {
        heading: 'Frequently Asked Questions',
        faqs: [
          { question: 'Is there a free plan?', answer: 'Yes! Our Starter plan is free forever with up to 5 team members.' },
          { question: 'Can I import my existing data?', answer: 'Absolutely. We support imports from Asana, Trello, Monday, and CSV files.' },
          { question: 'Is my data secure?', answer: 'We use bank-level encryption and are SOC 2 Type II certified.' },
          { question: 'Do you offer enterprise plans?', answer: 'Yes, with dedicated support, custom integrations, and SLA guarantees.' },
        ],
        style: {},
      },
    },
    {
      __component: 'components.cta-section',
      variant: 'centered',
      config: {
        heading: 'Start Building Better Workflows',
        description: 'Join 5,000+ teams already using CloudFlow. No credit card required.',
        ctaText: 'Try CloudFlow Free',
        ctaHref: '/contact',
        style: {
          backgroundColor: '#7c3aed',
          textColor: '#ffffff',
        },
      },
    },
  ],
  globalConfig: {
    domain: 'fallback.local',
    useComponentSystem: true,
    templateVersion: 'v2.0',
    colorScheme: { primary: '#7c3aed', secondary: '#4f46e5', background: '#ffffff', text: '#111827' },
    typography: { headingFont: "'Plus Jakarta Sans', sans-serif", bodyFont: 'Inter, sans-serif' },
    header: { style: {} },
    footer: {
      variant: 'enhanced',
      style: { backgroundColor: '#1e1b4b', textColor: '#c4b5fd' },
      description: 'Workflow automation for modern teams.',
      columnOrder: ['logo', 'menuLinks', 'latestPages', 'contactInfo'],
      contactEmail: 'support@cloudflow.io',
      copyright: `© ${new Date().getFullYear()} CloudFlow Inc. All rights reserved.`,
    },
  },
  menuItems: { 'Home': '/', 'Features': '/services', 'About': '/about', 'Contact': '/contact' },
};

// ============================================================
// SITE 4: Health & Wellness — Split Hero, About Story, Content Sidebar, CTA Centered
// ============================================================
export const site4 = {
  name: 'Health & Wellness',
  homeArticle: {
    id: 1,
    attributes: {
      Domain: 'fallback.local',
      urlSlug: '/',
      SiteName: 'Mindful Living',
      H1: 'Your Journey to Wellness Starts Here',
      Title: 'Holistic Health & Mindfulness',
      MetaTitle: 'Mindful Living | Holistic Health & Wellness',
      MetaDescription: 'Discover mindfulness practices, nutrition guides, and holistic wellness programs.',
      Paragraph: 'Transform your life through mindful practices and holistic wellness.',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  pageComponents: [
    {
      __component: 'components.hero-section',
      variant: 'fullscreen',
      config: {
        height: 'medium',
        textAlign: 'center',
        backgroundType: 'gradient',
        showCTA: true,
        ctaText: 'Begin Your Journey',
        ctaHref: '/contact',
      },
    },
    {
      __component: 'components.about-section',
      variant: 'story',
      config: {
        heading: 'Our Story',
        content: '<p>Founded in 2018, Mindful Living was born from a simple belief: everyone deserves access to practices that nurture the mind, body, and spirit. What started as a small community class has grown into a movement touching thousands of lives.</p><p>Our certified instructors bring decades of combined experience in yoga, meditation, nutrition counseling, and holistic therapies.</p>',
        style: {},
      },
    },
    {
      __component: 'components.features-grid',
      variant: 'iconCards',
      config: {
        heading: 'Our Programs',
        features: [
          { icon: '🧘', title: 'Yoga & Movement', description: 'Daily classes for all levels, from gentle flow to power vinyasa.' },
          { icon: '🧠', title: 'Meditation', description: 'Guided sessions to reduce stress and improve mental clarity.' },
          { icon: '🥗', title: 'Nutrition', description: 'Personalized meal plans and workshops for optimal health.' },
        ],
      },
    },
    {
      __component: 'components.content-section',
      variant: 'sidebar',
      config: {
        heading: 'This Week\'s Focus: Mindful Breathing',
        content: '<p>Breathing is something we do every moment, yet most of us rarely pay attention to it. This week, we invite you to explore the transformative power of conscious breathing.</p><p><strong>Try this:</strong> Set a timer for 5 minutes. Sit comfortably, close your eyes, and simply observe your breath. Notice the cool air entering, the warm air leaving. When your mind wanders—and it will—gently bring your attention back.</p>',
        sidebar: '<h4>Quick Tips</h4><ul><li>Practice for 5 minutes daily</li><li>Find a quiet, comfortable spot</li><li>No special equipment needed</li><li>Best done morning or evening</li></ul>',
        style: {},
      },
    },
    {
      __component: 'components.cta-section',
      variant: 'centered',
      config: {
        heading: 'Start Your Wellness Journey',
        description: 'Book a free introductory session and discover the Mindful Living difference.',
        ctaText: 'Book Free Session',
        ctaHref: '/contact',
        style: {
          backgroundColor: '#065f46',
          textColor: '#ffffff',
        },
      },
    },
  ],
  globalConfig: {
    domain: 'fallback.local',
    useComponentSystem: true,
    templateVersion: 'v2.0',
    colorScheme: { primary: '#059669', secondary: '#065f46', background: '#ffffff', text: '#1f2937' },
    typography: { headingFont: "'Playfair Display', serif", bodyFont: "'Lato', sans-serif" },
    header: { style: {} },
    footer: {
      variant: 'enhanced',
      style: { backgroundColor: '#065f46', textColor: '#d1fae5' },
      description: 'Nurturing mind, body, and spirit.',
      columnOrder: ['logo', 'menuLinks', 'contactInfo'],
      contactEmail: 'namaste@mindfulliving.com',
      contactPhone: '+1 (555) 234-5678',
      contactAddress: '42 Serenity Way, Wellness District',
      copyright: `© ${new Date().getFullYear()} Mindful Living. All rights reserved.`,
    },
  },
  menuItems: { 'Home': '/', 'Programs': '/services', 'About': '/about', 'Contact': '/contact' },
};

// ============================================================
// SITE 5: E-commerce/Restaurant — Fullscreen Hero, Features IconCards, Gallery Masonry, Testimonials
// ============================================================
export const site5 = {
  name: 'Restaurant',
  homeArticle: {
    id: 1,
    attributes: {
      Domain: 'fallback.local',
      urlSlug: '/',
      SiteName: 'The Golden Fork',
      H1: 'Exceptional Dining, Unforgettable Moments',
      Title: 'Fine Dining Restaurant',
      MetaTitle: 'The Golden Fork | Fine Dining Experience',
      MetaDescription: 'Experience exquisite cuisine in an elegant setting. Reservations now open.',
      Paragraph: 'Where culinary art meets warm hospitality.',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  pageComponents: [
    {
      __component: 'components.hero-section',
      variant: 'fullscreen',
      config: {
        height: 'large',
        textAlign: 'center',
        backgroundType: 'gradient',
        showCTA: true,
        ctaText: 'Reserve a Table',
        ctaHref: '/contact',
      },
    },
    {
      __component: 'components.features-grid',
      variant: 'iconCards',
      config: {
        heading: 'Why Dine With Us',
        features: [
          { icon: '👨‍🍳', title: 'Master Chefs', description: 'Our award-winning chefs craft each dish with passion and precision.' },
          { icon: '🌿', title: 'Farm to Table', description: 'Locally sourced, seasonal ingredients for the freshest flavors.' },
          { icon: '🍷', title: 'Curated Wines', description: 'An extensive wine list personally selected by our sommelier.' },
        ],
      },
    },
    {
      __component: 'components.gallery',
      variant: 'grid',
      config: {
        heading: 'From Our Kitchen',
        columns: 3,
        images: [
          { src: 'https://picsum.photos/seed/food1/600/400', alt: 'Signature Dish', caption: 'Pan-seared Salmon' },
          { src: 'https://picsum.photos/seed/food2/600/400', alt: 'Dessert', caption: 'Chocolate Fondant' },
          { src: 'https://picsum.photos/seed/food3/600/400', alt: 'Appetizer', caption: 'Truffle Risotto' },
          { src: 'https://picsum.photos/seed/food4/600/400', alt: 'Main Course', caption: 'Wagyu Steak' },
          { src: 'https://picsum.photos/seed/food5/600/400', alt: 'Wine Selection', caption: 'Wine Cellar' },
          { src: 'https://picsum.photos/seed/food6/600/400', alt: 'Interior', caption: 'Dining Room' },
        ],
        style: {},
      },
    },
    {
      __component: 'components.testimonials-grid',
      config: {
        heading: 'What Our Guests Say',
        subtitle: 'Reviews',
        showRatings: true,
        testimonials: [
          { name: 'David & Emma', position: 'Anniversary Dinner', rating: 5, content: 'An absolutely magical evening. The tasting menu was a revelation — each course more surprising than the last.', image: 'https://i.pravatar.cc/150?img=33' },
          { name: 'Sophie Laurent', position: 'Food Critic', rating: 5, content: 'The Golden Fork raises the bar for fine dining. Impeccable service, extraordinary flavors, stunning presentation.', image: 'https://i.pravatar.cc/150?img=44' },
          { name: 'James Taylor', position: 'Regular Guest', rating: 5, content: "We've been coming here for three years and it never disappoints. The consistency is remarkable.", image: 'https://i.pravatar.cc/150?img=55' },
        ],
        style: {},
      },
    },
    {
      __component: 'components.cta-section',
      variant: 'banner',
      config: {
        heading: 'Reserve Your Table Tonight',
        description: 'Open Tuesday–Sunday, 5:30 PM – 10:30 PM. Private dining available.',
        ctaText: 'Make a Reservation',
        ctaHref: '/contact',
        style: {
          backgroundColor: '#78350f',
          textColor: '#fef3c7',
        },
      },
    },
  ],
  globalConfig: {
    domain: 'fallback.local',
    useComponentSystem: true,
    templateVersion: 'v2.0',
    colorScheme: { primary: '#b45309', secondary: '#78350f', background: '#fffbeb', text: '#1c1917' },
    typography: { headingFont: "'Cormorant Garamond', serif", bodyFont: "'Source Sans 3', sans-serif" },
    header: { style: {} },
    footer: {
      variant: 'enhanced',
      style: { backgroundColor: '#1c1917', textColor: '#d6d3d1' },
      description: 'Fine dining since 2012.',
      columnOrder: ['logo', 'menuLinks', 'contactInfo'],
      contactEmail: 'reservations@goldenfork.com',
      contactPhone: '+1 (555) 321-9876',
      contactAddress: '88 Gourmet Boulevard, Culinary District',
      copyright: `© ${new Date().getFullYear()} The Golden Fork. All rights reserved.`,
    },
  },
  menuItems: { 'Home': '/', 'Menu': '/services', 'About': '/about', 'Reservations': '/contact' },
};

// ============================================================
// SITE 6: Minimal Portfolio — ONLY Hero + CTA (no features, no faq, no testimonials)
// Tests: sparse layout, dark theme, minimal components, custom inline styles
// ============================================================
export const site6 = {
  name: 'Minimal Portfolio',
  homeArticle: {
    id: 1,
    attributes: {
      Domain: 'fallback.local', urlSlug: '/',
      SiteName: 'Jane Doe',
      H1: 'Designer. Developer. Creator.',
      Title: 'Crafting Digital Products That Matter',
      MetaTitle: 'Jane Doe — Designer & Developer',
      MetaDescription: 'A minimal portfolio showcasing design and development work.',
      Paragraph: 'I build things for the web with a focus on simplicity and usability.',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  pageComponents: [
    {
      __component: 'components.hero-section',
      variant: 'minimal',
      config: {
        textAlign: 'center',
        showCTA: true,
        ctaText: 'See My Work',
        ctaHref: '#gallery',
        style: {
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          titleFontSize: 'clamp(3rem, 7vw, 5rem)',
        },
      },
    },
    {
      __component: 'components.cta-section',
      variant: 'centered',
      config: {
        heading: 'Want to Work Together?',
        description: 'I\'m always open to new projects and collaborations.',
        ctaText: 'Say Hello',
        ctaHref: '/contact',
        style: { backgroundColor: '#18181b', textColor: '#fafafa' },
      },
    },
  ],
  globalConfig: {
    domain: 'fallback.local', useComponentSystem: true, templateVersion: 'v2.0',
    colorScheme: { primary: '#fafafa', secondary: '#a1a1aa', background: '#0a0a0a', text: '#fafafa' },
    typography: { headingFont: "'JetBrains Mono', monospace", bodyFont: "'Inter', sans-serif" },
    header: { style: { backgroundColor: '#0a0a0a', color: '#fafafa', linkColor: '#a1a1aa' } },
    footer: {
      variant: 'enhanced',
      style: { backgroundColor: '#0a0a0a', textColor: '#a1a1aa' },
      description: 'Made with ♥ and lots of coffee.',
      columnOrder: ['logo', 'contactInfo'],
      contactEmail: 'hello@janedoe.dev',
      copyright: `© ${new Date().getFullYear()} Jane Doe. All rights reserved.`,
    },
  },
  menuItems: { 'Home': '/', 'About': '/about', 'Contact': '/contact' },
};

// ============================================================
// SITE 7: Tech Blog — Content-heavy, OneColumn content, FAQ Grid, NO Hero
// Tests: site without hero section, content-first approach, light theme
// ============================================================
export const site7 = {
  name: 'Tech Blog',
  homeArticle: {
    id: 1,
    attributes: {
      Domain: 'fallback.local', urlSlug: '/',
      SiteName: 'ByteSize Dev',
      H1: 'Learn. Build. Ship.',
      Title: 'A Blog for Developers Who Ship',
      MetaTitle: 'ByteSize Dev — Practical Developer Blog',
      MetaDescription: 'Practical guides and tutorials for modern web development.',
      Paragraph: 'Short, focused tutorials to help you build better software.',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  pageComponents: [
    {
      __component: 'components.content-section',
      variant: 'oneColumn',
      config: {
        heading: 'Latest Articles',
        content: '<h3>Getting Started with Next.js 14</h3><p>Next.js 14 brings exciting new features including the App Router, Server Components, and improved performance. In this guide, we\'ll walk through setting up a new project from scratch.</p><h3>The Complete Guide to CSS Grid</h3><p>CSS Grid is the most powerful layout system in CSS. Learn how to create complex, responsive layouts with minimal code — no frameworks required.</p><h3>TypeScript Tips You Need to Know</h3><p>Level up your TypeScript skills with these practical tips that will make your code safer, more readable, and easier to maintain.</p>',
        style: { backgroundColor: '#ffffff' },
      },
    },
    {
      __component: 'components.features-grid',
      variant: '3col',
      config: {
        heading: 'Topics We Cover',
        features: [
          { icon: '⚛️', title: 'React & Next.js', description: 'Modern React patterns, hooks, and Next.js features.' },
          { icon: '🎨', title: 'CSS & Design', description: 'Responsive layouts, animations, and design systems.' },
          { icon: '🔧', title: 'DevOps & Tools', description: 'CI/CD, Docker, testing, and developer productivity.' },
        ],
      },
    },
    {
      __component: 'components.faq',
      variant: 'grid',
      config: {
        heading: 'Reader FAQ',
        faqs: [
          { question: 'How often do you publish?', answer: 'We publish 2-3 new articles every week, covering React, CSS, and DevOps.' },
          { question: 'Can I contribute?', answer: 'Yes! We accept guest posts. Send your pitch to hello@bytesizedev.com.' },
          { question: 'Are articles free?', answer: 'All articles are completely free and always will be. No paywalls.' },
          { question: 'Do you offer courses?', answer: 'We\'re working on video courses. Join the newsletter to get early access.' },
        ],
        style: {},
      },
    },
    {
      __component: 'components.cta-section',
      variant: 'banner',
      config: {
        heading: 'Join 10,000+ Developers',
        description: 'Get weekly tutorials delivered to your inbox. No spam, ever.',
        ctaText: 'Subscribe Free',
        ctaHref: '/contact',
        style: { backgroundColor: '#1e40af', textColor: '#ffffff' },
      },
    },
  ],
  globalConfig: {
    domain: 'fallback.local', useComponentSystem: true, templateVersion: 'v2.0',
    colorScheme: { primary: '#1e40af', secondary: '#3b82f6', background: '#f8fafc', text: '#0f172a' },
    typography: { headingFont: "'Space Grotesk', sans-serif", bodyFont: "'Inter', sans-serif" },
    header: { style: {} },
    footer: {
      variant: 'enhanced',
      style: { backgroundColor: '#0f172a', textColor: '#94a3b8' },
      description: 'Practical dev tutorials, no fluff.',
      columnOrder: ['logo', 'menuLinks'],
      copyright: `© ${new Date().getFullYear()} ByteSize Dev. All rights reserved.`,
    },
  },
  menuItems: { 'Home': '/', 'Articles': '/services', 'About': '/about', 'Subscribe': '/contact' },
};

// ============================================================
// SITE 8: Law Firm — Split Hero, About Story, Content Sidebar, ContactForm
// Tests: ContactForm component, professional dark navy, max components
// ============================================================
export const site8 = {
  name: 'Law Firm',
  homeArticle: {
    id: 1,
    attributes: {
      Domain: 'fallback.local', urlSlug: '/',
      SiteName: 'Sterling & Associates',
      H1: 'Justice. Integrity. Results.',
      Title: 'Trusted Legal Counsel Since 1995',
      MetaTitle: 'Sterling & Associates — Trusted Legal Counsel',
      MetaDescription: 'Experienced attorneys providing exceptional legal representation.',
      Paragraph: 'With over 25 years of experience, we fight for the results you deserve.',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  pageComponents: [
    {
      __component: 'components.hero-section',
      variant: 'split',
      config: {
        textAlign: 'left',
        showCTA: true,
        ctaText: 'Free Consultation',
        ctaHref: '/contact',
        style: { gradientColors: ['#1e293b', '#334155'] },
      },
    },
    {
      __component: 'components.features-grid',
      variant: 'iconCards',
      config: {
        heading: 'Practice Areas',
        features: [
          { icon: '⚖️', title: 'Corporate Law', description: 'Business formation, contracts, mergers, and regulatory compliance.' },
          { icon: '🏛️', title: 'Litigation', description: 'Trial advocacy and dispute resolution with a proven track record.' },
          { icon: '📋', title: 'Estate Planning', description: 'Wills, trusts, and comprehensive estate management strategies.' },
          { icon: '🏠', title: 'Real Estate', description: 'Commercial and residential transactions, zoning, and land use.' },
        ],
      },
    },
    {
      __component: 'components.about-section',
      variant: 'story',
      config: {
        heading: 'Our Legacy',
        content: '<p>Founded in 1995, Sterling & Associates has grown from a small practice into one of the region\'s most respected law firms. Our attorneys have collectively recovered over $500 million for our clients.</p><p>We believe every client deserves aggressive, compassionate representation — regardless of the size of their case.</p>',
        style: {},
      },
    },
    {
      __component: 'components.content-section',
      variant: 'sidebar',
      config: {
        heading: 'Why Choose Sterling?',
        content: '<p>Our approach combines deep legal expertise with a genuine commitment to our clients\' well-being. We don\'t just handle cases — we build lasting relationships.</p><p><strong>98% success rate</strong> in civil litigation. <strong>25+ years</strong> of combined experience. <strong>500+</strong> cases resolved.</p>',
        sidebar: '<h4>Office Hours</h4><p>Monday–Friday: 8:30 AM – 6:00 PM<br/>Saturday: By appointment<br/>Sunday: Closed</p><h4>Emergency?</h4><p>Call our 24/7 hotline: <strong>(555) 911-LEGAL</strong></p>',
        style: {},
      },
    },
    {
      __component: 'components.contact-form',
      variant: 'simple',
      config: {
        heading: 'Request a Consultation',
        style: {},
      },
    },
    {
      __component: 'components.cta-section',
      variant: 'banner',
      config: {
        heading: 'Your First Consultation is Free',
        description: 'Call us today or fill out the form above. No obligation, no pressure.',
        ctaText: 'Call (555) 123-LAW1',
        ctaHref: 'tel:+15551239291',
        style: { backgroundColor: '#1e293b', textColor: '#ffffff' },
      },
    },
  ],
  globalConfig: {
    domain: 'fallback.local', useComponentSystem: true, templateVersion: 'v2.0',
    colorScheme: { primary: '#1e293b', secondary: '#475569', background: '#ffffff', text: '#0f172a' },
    typography: { headingFont: "'Merriweather', serif", bodyFont: "'Source Sans 3', sans-serif" },
    header: { style: {} },
    footer: {
      variant: 'enhanced',
      style: { backgroundColor: '#0f172a', textColor: '#cbd5e1' },
      description: 'Trusted legal counsel for over 25 years.',
      columnOrder: ['logo', 'menuLinks', 'contactInfo'],
      contactEmail: 'info@sterlinglaw.com',
      contactPhone: '+1 (555) 123-5291',
      contactAddress: '100 Justice Boulevard, Suite 400',
      copyright: `© ${new Date().getFullYear()} Sterling & Associates. All rights reserved.`,
    },
  },
  menuItems: { 'Home': '/', 'Practice Areas': '/services', 'About': '/about', 'Contact': '/contact' },
};

// ============================================================
// SITE 9: Photography — Gallery Masonry, Testimonials, NO Features/FAQ
// Tests: Masonry gallery variant, image-heavy, very few text sections
// ============================================================
export const site9 = {
  name: 'Photography Studio',
  homeArticle: {
    id: 1,
    attributes: {
      Domain: 'fallback.local', urlSlug: '/',
      SiteName: 'Lux Lens',
      H1: 'Capturing Life\'s Beautiful Moments',
      Title: 'Professional Photography',
      MetaTitle: 'Lux Lens | Professional Photography Studio',
      MetaDescription: 'Award-winning photography for weddings, portraits, and events.',
      Paragraph: 'Every picture tells a story. Let us tell yours.',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  pageComponents: [
    {
      __component: 'components.hero-section',
      variant: 'fullscreen',
      config: {
        height: 'large',
        textAlign: 'center',
        backgroundType: 'gradient',
        showCTA: true,
        ctaText: 'Book a Session',
        ctaHref: '/contact',
      },
    },
    {
      __component: 'components.gallery',
      variant: 'masonry',
      config: {
        heading: 'Recent Work',
        columns: 3,
        images: [
          { src: 'https://picsum.photos/seed/photo1/600/800', alt: 'Portrait Session', caption: 'Portrait — Emma & Light' },
          { src: 'https://picsum.photos/seed/photo2/600/400', alt: 'Wedding Day', caption: 'Wedding — Sarah & James' },
          { src: 'https://picsum.photos/seed/photo3/600/700', alt: 'Event Coverage', caption: 'Event — Gala Night' },
          { src: 'https://picsum.photos/seed/photo4/600/500', alt: 'Nature Shot', caption: 'Nature — Golden Hour' },
          { src: 'https://picsum.photos/seed/photo5/600/600', alt: 'Product Photography', caption: 'Product — Luxury Watch' },
          { src: 'https://picsum.photos/seed/photo6/600/450', alt: 'Couple Photography', caption: 'Couple — Beach Sunset' },
          { src: 'https://picsum.photos/seed/photo7/600/750', alt: 'Family Portrait', caption: 'Family — Holiday Special' },
          { src: 'https://picsum.photos/seed/photo8/600/500', alt: 'Street Photography', caption: 'Street — City Lights' },
        ],
        style: {},
      },
    },
    {
      __component: 'components.testimonials-grid',
      config: {
        heading: 'Client Love',
        subtitle: 'What They Say',
        showRatings: true,
        testimonials: [
          { name: 'Rachel Adams', position: 'Bride', rating: 5, content: 'The photos from our wedding are absolutely stunning. Every emotion was captured perfectly.', image: 'https://i.pravatar.cc/150?img=25' },
          { name: 'Tom Baker', position: 'CEO, TechStart', rating: 5, content: 'Lux Lens handled our corporate headshots with incredible professionalism. The team loved the results.', image: 'https://i.pravatar.cc/150?img=14' },
        ],
        style: {},
      },
    },
    {
      __component: 'components.cta-section',
      variant: 'split',
      config: {
        heading: 'Ready to Create Something Beautiful?',
        description: 'Limited slots available this season.',
        ctaText: 'Book Now',
        ctaHref: '/contact',
        style: { backgroundColor: '#292524', textColor: '#fef2f2' },
      },
    },
  ],
  globalConfig: {
    domain: 'fallback.local', useComponentSystem: true, templateVersion: 'v2.0',
    colorScheme: { primary: '#be123c', secondary: '#9f1239', background: '#fef2f2', text: '#1c1917' },
    typography: { headingFont: "'Playfair Display', serif", bodyFont: "'Lato', sans-serif" },
    header: { style: {} },
    footer: {
      variant: 'enhanced',
      style: { backgroundColor: '#1c1917', textColor: '#d6d3d1' },
      description: 'Capturing moments that last forever.',
      columnOrder: ['logo', 'contactInfo'],
      contactEmail: 'book@luxlens.com',
      contactPhone: '+1 (555) LENS',
      copyright: `© ${new Date().getFullYear()} Lux Lens Photography. All rights reserved.`,
    },
  },
  menuItems: { 'Home': '/', 'Portfolio': '/services', 'About': '/about', 'Book': '/contact' },
};

// ============================================================
// SITE 10: Startup Landing — Fullscreen Hero, About Split w/stats, 4-col Features, Testimonials, FAQ, CTA
// Tests: Maximum components, vibrant gradient theme, all sections present
// ============================================================
export const site10 = {
  name: 'Startup Landing Page',
  homeArticle: {
    id: 1,
    attributes: {
      Domain: 'fallback.local', urlSlug: '/',
      SiteName: 'LaunchPad AI',
      H1: 'Build Smarter with AI',
      Title: 'The AI-Powered Business Assistant',
      MetaTitle: 'LaunchPad AI — Your AI Business Assistant',
      MetaDescription: 'Supercharge your workflow with AI-powered insights and automation.',
      Paragraph: 'From idea to execution in minutes, not months.',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  pageComponents: [
    {
      __component: 'components.hero-section',
      variant: 'fullscreen',
      config: {
        height: 'large',
        textAlign: 'center',
        backgroundType: 'gradient',
        showCTA: true,
        ctaText: 'Try Free for 14 Days',
        ctaHref: '/contact',
      },
    },
    {
      __component: 'components.about-section',
      variant: 'split',
      config: {
        heading: 'Why LaunchPad AI?',
        content: '<p>Traditional tools slow you down. LaunchPad AI uses advanced machine learning to analyze your data, generate insights, and automate tedious tasks — so you can focus on what matters.</p>',
        stats: [
          { value: '10x', label: 'Faster Workflows' },
          { value: '50K+', label: 'Active Users' },
          { value: '99.9%', label: 'Uptime' },
          { value: '4.9★', label: 'App Store Rating' },
        ],
        style: {},
      },
    },
    {
      __component: 'components.features-grid',
      variant: '4col',
      config: {
        heading: 'Powerful Features',
        features: [
          { icon: '🤖', title: 'AI Assistant', description: 'Chat with your data. Ask questions, get answers in plain English.' },
          { icon: '📈', title: 'Smart Analytics', description: 'Real-time dashboards that surface the insights that matter most.' },
          { icon: '⚙️', title: 'Workflow Automation', description: 'Set up automations in minutes. No coding required.' },
          { icon: '🔐', title: 'Enterprise Security', description: 'SOC 2, GDPR, and HIPAA compliant. Your data is safe with us.' },
        ],
      },
    },
    {
      __component: 'components.testimonials-grid',
      config: {
        heading: 'Trusted by Industry Leaders',
        subtitle: 'Customer Stories',
        showRatings: true,
        testimonials: [
          { name: 'Lisa Chen', position: 'VP Product, ScaleUp', rating: 5, content: 'LaunchPad AI saved us 20 hours per week on reporting alone. The ROI was instant.', image: 'https://i.pravatar.cc/150?img=26' },
          { name: 'Ryan Park', position: 'Founder, DevFlow', rating: 5, content: 'The AI assistant is like having a data scientist on the team. Game-changing for a small startup.', image: 'https://i.pravatar.cc/150?img=32' },
          { name: 'Maria Santos', position: 'COO, GrowthCo', rating: 5, content: 'We\'ve tried every tool out there. LaunchPad AI is the only one that delivered on its promises.', image: 'https://i.pravatar.cc/150?img=47' },
        ],
        style: {},
      },
    },
    {
      __component: 'components.faq',
      variant: 'accordion',
      config: {
        heading: 'Common Questions',
        faqs: [
          { question: 'Is there a free trial?', answer: 'Yes! Start with a 14-day free trial. No credit card required.' },
          { question: 'What integrations do you support?', answer: 'We integrate with Slack, HubSpot, Salesforce, Google Workspace, and 200+ more tools.' },
          { question: 'How does the AI work?', answer: 'Our AI uses GPT-4 and proprietary models trained on business data to provide accurate, contextual insights.' },
          { question: 'Can I cancel anytime?', answer: 'Absolutely. No long-term contracts. Cancel with one click, keep your data.' },
          { question: 'Is my data private?', answer: 'Your data is never used to train models. We\'re SOC 2 certified with end-to-end encryption.' },
        ],
        style: {},
      },
    },
    {
      __component: 'components.cta-section',
      variant: 'centered',
      config: {
        heading: 'Start Building Smarter Today',
        description: 'Join 50,000+ businesses already using LaunchPad AI.',
        ctaText: 'Start Free Trial',
        ctaHref: '/contact',
        style: { backgroundColor: '#7c3aed', textColor: '#ffffff' },
      },
    },
  ],
  globalConfig: {
    domain: 'fallback.local', useComponentSystem: true, templateVersion: 'v2.0',
    colorScheme: { primary: '#7c3aed', secondary: '#a855f7', background: '#faf5ff', text: '#1e1b4b' },
    typography: { headingFont: "'Plus Jakarta Sans', sans-serif", bodyFont: "'Inter', sans-serif" },
    header: { style: {} },
    footer: {
      variant: 'enhanced',
      style: { backgroundColor: '#1e1b4b', textColor: '#c4b5fd' },
      description: 'AI-powered business intelligence.',
      columnOrder: ['logo', 'menuLinks', 'latestPages', 'contactInfo'],
      contactEmail: 'hello@launchpadai.com',
      copyright: `© ${new Date().getFullYear()} LaunchPad AI Inc. All rights reserved.`,
    },
  },
  menuItems: { 'Home': '/', 'Features': '/services', 'About': '/about', 'Get Started': '/contact' },
};

// ============================================================
// SITE 11: Education — Split Hero, Content TwoColumn, Features ThreeColumn, FAQ, CTA
// Tests: ThreeColumn features variant, orange warm theme, education style
// ============================================================
export const site11 = {
  name: 'Online Education',
  homeArticle: {
    id: 1,
    attributes: {
      Domain: 'fallback.local', urlSlug: '/',
      SiteName: 'Bright Academy',
      H1: 'Learn Without Limits',
      Title: 'Online Courses for Everyone',
      MetaTitle: 'Bright Academy — Learn Without Limits',
      MetaDescription: 'Affordable online courses taught by industry experts.',
      Paragraph: 'Unlock your potential with expert-led courses in tech, business, and design.',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  pageComponents: [
    {
      __component: 'components.hero-section',
      variant: 'split',
      config: {
        textAlign: 'left',
        showCTA: true,
        ctaText: 'Browse Courses',
        ctaHref: '/services',
        style: { gradientColors: ['#ea580c', '#f97316'] },
      },
    },
    {
      __component: 'components.content-section',
      variant: 'twoColumn',
      config: {
        heading: 'Why Learn With Us?',
        content: '<p>At Bright Academy, we believe education should be accessible, practical, and engaging. Our courses are designed by industry professionals who know what skills employers actually want.</p><p>Whether you\'re switching careers, upskilling, or exploring a passion — we\'ve got a course for you.</p>',
        image: null,
        style: { backgroundColor: '#fff7ed' },
      },
    },
    {
      __component: 'components.features-grid',
      variant: '3col',
      config: {
        heading: 'What Makes Us Different',
        features: [
          { icon: '🎓', title: 'Expert Instructors', description: 'Learn from professionals with real-world experience in top companies.' },
          { icon: '📱', title: 'Learn Anywhere', description: 'Access courses on any device — desktop, tablet, or mobile.' },
          { icon: '🏆', title: 'Certificates', description: 'Earn recognized certificates to boost your resume and career.' },
        ],
      },
    },
    {
      __component: 'components.faq',
      variant: 'accordion',
      config: {
        heading: 'Student FAQ',
        faqs: [
          { question: 'How much do courses cost?', answer: 'Courses start at $29. We also offer a monthly subscription for unlimited access at $19/month.' },
          { question: 'Do I get a certificate?', answer: 'Yes! Every completed course includes a shareable digital certificate.' },
          { question: 'Can I learn at my own pace?', answer: 'Absolutely. All courses are self-paced with lifetime access once purchased.' },
        ],
        style: {},
      },
    },
    {
      __component: 'components.cta-section',
      variant: 'banner',
      config: {
        heading: 'Start Learning Today',
        description: 'Join 50,000+ students already transforming their careers.',
        ctaText: 'Enroll Now — Free Trial',
        ctaHref: '/contact',
        style: { backgroundColor: '#ea580c', textColor: '#ffffff' },
      },
    },
  ],
  globalConfig: {
    domain: 'fallback.local', useComponentSystem: true, templateVersion: 'v2.0',
    colorScheme: { primary: '#ea580c', secondary: '#f97316', background: '#fff7ed', text: '#1c1917' },
    typography: { headingFont: "'Nunito', sans-serif", bodyFont: "'Open Sans', sans-serif" },
    header: { style: {} },
    footer: {
      variant: 'enhanced',
      style: { backgroundColor: '#431407', textColor: '#fed7aa' },
      description: 'Empowering learners worldwide.',
      columnOrder: ['logo', 'menuLinks', 'contactInfo'],
      contactEmail: 'learn@brightacademy.com',
      contactPhone: '+1 (888) LEARN-IT',
      copyright: `© ${new Date().getFullYear()} Bright Academy. All rights reserved.`,
    },
  },
  menuItems: { 'Home': '/', 'Courses': '/services', 'About': '/about', 'Enroll': '/contact' },
};
