/**
 * Production fallback data — used when Strapi API is unreachable.
 * Showcases ALL component types with beautiful, professional content.
 */

export const fallbackHomeArticle = {
  id: 1,
  attributes: {
    Domain: 'fallback.local',
    urlSlug: '/',
    SiteName: 'Daily Inspiration',
    H1: 'Transform Your Life with Daily Inspiration',
    Title: 'Daily Inspiration: Transform Your Life Today',
    MetaTitle: 'Daily Inspiration | Transform Your Life Today',
    MetaDescription: 'Discover practical strategies, proven techniques, and inspiring stories that will help you unlock your full potential.',
    Paragraph: 'Every journey begins with a single step, and today is your day to start transforming your life. Learn practical strategies, proven techniques, and inspiring stories that will help you unlock your full potential.',
    Markdown: '## Welcome\n\nWe help individuals and businesses reach their full potential through expert guidance, innovative solutions, and unwavering commitment to excellence.',
    ProcessedMarkdown: '<h2>Welcome</h2><p>We help individuals and businesses reach their full potential through expert guidance, innovative solutions, and unwavering commitment to excellence.</p>',
    imgkeywords: 'inspiration motivation success',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    features: [
      { title: 'Expert Guidance', description: 'Work with industry-leading professionals who understand your unique challenges', icon: 'star' },
      { title: 'Proven Results', description: 'Our clients consistently achieve measurable improvements in their goals', icon: 'trophy' },
      { title: 'Personalised Approach', description: 'Every solution is tailored specifically to your needs and aspirations', icon: 'heart' },
      { title: 'Ongoing Support', description: 'We are with you every step of the way, from start to finish', icon: 'shield' },
    ],
    gallery_images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600',
    ],
    containerStyles: null,
    headerStyles: null,
    bodyStyles: null,
    paragraphStyles: null,
  },
};

export const fallbackOtherArticles = [
  {
    id: 2,
    attributes: {
      Domain: 'fallback.local', urlSlug: '/about', Title: 'About Us', MetaTitle: 'About Us',
      MetaDescription: 'Learn more about our story and mission.',
      Paragraph: 'Founded with a vision to empower individuals and businesses, we have grown into a trusted partner for hundreds of clients across Australia. Our team brings decades of combined experience.',
      Markdown: '## Our Story\n\nWe started with a simple belief: everyone deserves access to expert guidance. Today, we serve clients nationwide.\n\n## Our Mission\n\nTo deliver transformative results through innovative solutions and genuine care for our clients.',
      ProcessedMarkdown: '<h2>Our Story</h2><p>We started with a simple belief: everyone deserves access to expert guidance. Today, we serve clients nationwide.</p><h2>Our Mission</h2><p>To deliver transformative results through innovative solutions and genuine care for our clients.</p>',
      H1: 'About Us', imgkeywords: 'team office professional',
      imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800',
      gallery_images: [
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600',
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600',
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600',
      ],
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  {
    id: 3,
    attributes: {
      Domain: 'fallback.local', urlSlug: '/services', Title: 'Our Services', MetaTitle: 'Services',
      MetaDescription: 'Explore our comprehensive range of services.',
      Paragraph: 'From strategic consulting to hands-on implementation, we offer a complete suite of services designed to help you achieve your goals.',
      Markdown: '## What We Offer\n\nOur services are designed to deliver measurable results. We work closely with each client to understand their unique needs.\n\n## Our Process\n\n1. **Discovery** — We listen and learn about your challenges\n2. **Strategy** — We develop a tailored plan\n3. **Execution** — We implement with precision\n4. **Results** — We measure and optimise',
      ProcessedMarkdown: '<h2>What We Offer</h2><p>Our services are designed to deliver measurable results.</p><h2>Our Process</h2><ol><li><strong>Discovery</strong> — We listen and learn</li><li><strong>Strategy</strong> — We develop a plan</li><li><strong>Execution</strong> — We implement with precision</li><li><strong>Results</strong> — We measure and optimise</li></ol>',
      H1: 'Our Services', imgkeywords: 'business consulting strategy',
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      features: [
        { title: 'Strategic Consulting', description: 'Expert guidance for your most complex challenges', icon: 'briefcase' },
        { title: 'Digital Transformation', description: 'Modernise your operations with cutting-edge technology', icon: 'zap' },
        { title: 'Growth Marketing', description: 'Data-driven strategies that deliver measurable ROI', icon: 'trending-up' },
      ],
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  {
    id: 4,
    attributes: {
      Domain: 'fallback.local', urlSlug: '/contact', Title: 'Contact Us', MetaTitle: 'Contact Us',
      MetaDescription: 'Get in touch with our team.',
      Paragraph: 'Ready to start your journey? Our friendly team is here to answer your questions and help you take the next step.',
      H1: 'Get In Touch',
      Markdown: '## Contact Us\n\nWe would love to hear from you. Reach out today and let us know how we can help.\n\n**Email:** hello@example.com\n**Phone:** +61 3 9000 0000\n**Address:** Melbourne, VIC, Australia',
      ProcessedMarkdown: '<h2>Contact Us</h2><p>We would love to hear from you.</p><p><strong>Email:</strong> hello@example.com<br><strong>Phone:</strong> +61 3 9000 0000<br><strong>Address:</strong> Melbourne, VIC, Australia</p>',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  {
    id: 5,
    attributes: {
      Domain: 'fallback.local', urlSlug: '/getting-started', Title: 'Getting Started with Our Platform',
      MetaTitle: 'Getting Started', MetaDescription: 'A beginner guide to using our platform effectively.',
      Paragraph: 'Welcome to our platform! In this guide, we walk you through everything you need to know to get started quickly.',
      H1: 'Getting Started', category: 'Guides', author: 'Sarah Chen', publishedAt: '2026-02-15T10:00:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  {
    id: 6,
    attributes: {
      Domain: 'fallback.local', urlSlug: '/top-10-tips', Title: '10 Tips for Business Growth in 2026',
      MetaTitle: '10 Growth Tips', MetaDescription: 'Proven strategies to scale your business this year.',
      Paragraph: 'Scaling a business requires the right mix of strategy, timing, and execution. Here are our top 10 actionable tips.',
      H1: '10 Growth Tips', category: 'Business', author: 'James Wilson', publishedAt: '2026-02-10T09:00:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  {
    id: 7,
    attributes: {
      Domain: 'fallback.local', urlSlug: '/design-trends', Title: 'Design Trends Shaping 2026',
      MetaTitle: 'Design Trends 2026', MetaDescription: 'Explore the latest design trends.',
      Paragraph: 'From bold typography to immersive 3D experiences, discover the key trends shaping how brands connect with audiences.',
      H1: 'Design Trends 2026', category: 'Design', author: 'Emily Park', publishedAt: '2026-02-05T14:00:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  {
    id: 8,
    attributes: {
      Domain: 'fallback.local', urlSlug: '/remote-work', Title: 'The Future of Remote Work',
      MetaTitle: 'Future of Remote Work', MetaDescription: 'How remote work continues to transform the workplace.',
      Paragraph: 'Remote work has fundamentally changed how we think about productivity, collaboration, and work-life balance.',
      H1: 'Future of Remote Work', category: 'Business', author: 'Michael Torres', publishedAt: '2026-01-28T11:00:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  {
    id: 9,
    attributes: {
      Domain: 'fallback.local', urlSlug: '/mindful-living', Title: 'The Art of Mindful Living',
      MetaTitle: 'Mindful Living', MetaDescription: 'Practical mindfulness techniques for everyday life.',
      Paragraph: 'Mindfulness is more than meditation. It is a way of approaching every moment with intention and awareness.',
      H1: 'Mindful Living', category: 'Lifestyle', author: 'Sarah Chen', publishedAt: '2026-01-20T08:00:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
  {
    id: 10,
    attributes: {
      Domain: 'fallback.local', urlSlug: '/resilience', Title: 'Building Resilience in Uncertain Times',
      MetaTitle: 'Building Resilience', MetaDescription: 'Strategies for staying strong through challenges.',
      Paragraph: 'Resilience is not about avoiding challenges — it is about developing the mindset and tools to thrive through them.',
      H1: 'Building Resilience', category: 'Personal Growth', author: 'James Wilson', publishedAt: '2026-01-15T10:00:00Z',
      imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800',
      containerStyles: null, headerStyles: null, bodyStyles: null, paragraphStyles: null,
    },
  },
];

// Home page: Hero → Features → Testimonials → Blog → CTA
export const fallbackPageComponents = [
  {
    type: 'HeroSection',
    variant: 'Fullscreen',
    config: {
      height: 'large',
      textAlign: 'center',
      backgroundType: 'gradient',
      showCTA: true,
      ctaText: 'Get Started',
      ctaHref: '/contact',
      style: {
        backgroundGradient: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%)',
      },
    },
  },
  {
    type: 'FeaturesGrid',
    variant: 'ThreeColumn',
    config: {
      heading: 'Why Choose Us',
      showIcons: true,
      features: [
        { icon: '🚀', title: 'Fast Performance', description: 'Lightning-fast load times for optimal user experience' },
        { icon: '🔒', title: 'Secure & Reliable', description: 'Enterprise-grade security with 99.9% uptime' },
        { icon: '✨', title: 'Easy to Use', description: 'Intuitive interface that anyone can master' },
        { icon: '📊', title: 'Data-Driven', description: 'Make informed decisions with powerful analytics' },
        { icon: '🎨', title: 'Beautiful Design', description: 'Stunning templates that make your brand shine' },
        { icon: '🤝', title: 'Dedicated Support', description: 'Expert help whenever you need it, 24/7' },
      ],
      style: {
        backgroundColor: '#f8fafc',
        padding: '5rem 2rem',
      },
    },
  },
  {
    type: 'Testimonials',
    variant: 'Grid',
    config: {
      heading: 'What Our Clients Say',
      subtitle: 'Real stories from real people',
      showRatings: true,
      testimonials: [
        { name: 'Sarah Mitchell', position: 'CEO, TechStart', content: 'Absolutely transformed our business. The team went above and beyond to deliver results that exceeded our expectations.', rating: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
        { name: 'James Cooper', position: 'Founder, GrowthLab', content: 'Professional, responsive, and incredibly talented. They understood our vision from day one and brought it to life beautifully.', rating: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
        { name: 'Emily Rodriguez', position: 'Marketing Director', content: 'The best investment we have made. Our online presence has never been stronger, and the results speak for themselves.', rating: 5, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
      ],
      style: {
        padding: '5rem 2rem',
      },
    },
  },
  {
    type: 'Blog',
    variant: 'Featured',
    config: {
      heading: 'Latest from Our Blog',
      subheading: 'Insights, guides, and tips from our team',
      articlesPerPage: 6,
      showImage: true,
      showExcerpt: true,
      showDate: true,
      showCategory: true,
      showReadMore: true,
      excerptLength: 120,
      style: {
        backgroundColor: '#f8fafc',
        padding: '5rem 2rem',
      },
    },
  },
  {
    type: 'CTA',
    variant: 'Centered',
    config: {
      heading: 'Ready to Get Started?',
      description: 'Contact us today to learn how we can help your business grow.',
      buttonText: 'Contact Us',
      buttonLink: '/contact',
      style: {
        backgroundGradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        color: '#ffffff',
        padding: '5rem 2rem',
      },
    },
  },
];

export const fallbackGlobalConfig = {
  useComponentSystem: true,
  templateVersion: 'v2.0',
  colorScheme: {
    primary: '#0ea5e9',
    secondary: '#6366f1',
    accent: '#f59e0b',
    background: '#ffffff',
    text: '#1f2937',
  },
  typography: {
    headingFont: 'system-ui, -apple-system, sans-serif',
    bodyFont: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    logo: null,
    style: {},
  },
  footer: {
    variant: 'enhanced',
    style: {},
    description: 'Leading the future of digital transformation',
    contactEmail: 'hello@example.com',
    contactPhone: '+1 (555) 123-4567',
    contactAddress: '123 Innovation Street, Tech City, TC 12345',
  },
};

export const fallbackMenuItems = {
  Home: '/',
  About: '/about',
  Services: '/services',
  Contact: '/contact',
};

export function getAllFallbackArticles() {
  return [fallbackHomeArticle, ...fallbackOtherArticles];
}
