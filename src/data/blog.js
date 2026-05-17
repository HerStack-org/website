/**
 * Blog posts data
 *
 * To add a blog post, copy the object below and fill in the details.
 * Submit a PR with your changes!
 *
 * Fields:
 *   id          - Unique number
 *   slug        - URL-friendly identifier (e.g. "getting-started-with-ml")
 *   title       - Article title
 *   excerpt     - One or two sentence summary
 *   date        - Publication date (YYYY-MM-DD)
 *   readTime    - Estimated read time in minutes
 *   category    - One of: "AI Basics", "Career", "Tools", "Community"
 *   coverImage  - URL or local path to cover image
 *   author      - Author name
 */
export const blogPosts = [
  {
    id: 1,
    slug: 'getting-started-with-ml',
    title: 'Getting Started with Machine Learning as a Student',
    excerpt: 'You don\'t need a PhD to start learning ML. Here\'s a practical roadmap for school and college students in India.',
    date: '2025-04-10',
    readTime: 5,
    category: 'AI Basics',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    author: 'Ananya Pillai',
  },
  {
    id: 2,
    slug: 'women-in-ai-india',
    title: 'Women in AI: Closing the Gender Gap in India',
    excerpt: 'A look at the current state of gender diversity in Indian AI research and what you can do to be part of the change.',
    date: '2025-04-22',
    readTime: 7,
    category: 'Career',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    author: 'Riya Sharma',
  },
  {
    id: 3,
    slug: 'free-ai-tools-for-students',
    title: '7 Free AI Tools Every Student Should Know About',
    excerpt: 'From Colab to Hugging Face — here are the tools that will take you from zero to building real AI projects.',
    date: '2025-05-01',
    readTime: 4,
    category: 'Tools',
    coverImage: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80',
    author: 'Neha Krishnan',
  },
]