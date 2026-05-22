/**
 * Curated learning resources
 *
 * To add a resource, copy an object below and fill in the details.
 * Submit a PR — no coding needed!
 *
 * Fields:
 *   platform   - The provider (e.g. "Google", "DeepLearning.AI", "fast.ai")
 *   title      - Course/resource title
 *   url        - Direct link to the resource
 *   free       - true if free, false if paid
 *   hasCert    - true if a free certificate is available
 *   difficulty - "beginner" | "intermediate" | "advanced"
 *   stage      - Which learning stage this fits: 1 (beginner) | 2 (explorer) | 3 (builder)
 *   durationWeeks - Approximate number of weeks to complete
 *   tags       - Array of topic tags e.g. ["python", "ml", "ai"]
 */

export const resources = [
  {
    id: 1,
    platform: 'DeepLearning.AI',
    title: 'AI for Everyone',
    url: 'https://www.deeplearning.ai/courses/ai-for-everyone/',
    free: true,
    hasCert: true,
    difficulty: 'beginner',
    stage: 1,
    durationWeeks: 4,
    tags: ['ai', 'no-code', 'overview'],
  },
  {
    id: 2,
    platform: 'Google',
    title: 'Machine Learning Crash Course',
    url: 'https://developers.google.com/machine-learning/crash-course',
    free: true,
    hasCert: false,
    difficulty: 'beginner',
    stage: 2,
    durationWeeks: 3,
    tags: ['ml', 'python', 'tensorflow'],
  },
  {
    id: 3,
    platform: 'fast.ai',
    title: 'Practical Deep Learning for Coders',
    url: 'https://course.fast.ai/',
    free: true,
    hasCert: false,
    difficulty: 'intermediate',
    stage: 3,
    durationWeeks: 8,
    tags: ['deep-learning', 'python', 'pytorch'],
  },
  {
    id: 4,
    platform: 'Kaggle',
    title: 'Intro to Machine Learning',
    url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
    free: true,
    hasCert: true,
    difficulty: 'beginner',
    stage: 2,
    durationWeeks: 2,
    tags: ['ml', 'python', 'data'],
  },
  {
    id: 5,
    platform: 'CS50',
    title: 'CS50\'s Introduction to Programming with Python',
    url: 'https://cs50.harvard.edu/python/',
    free: true,
    hasCert: true,
    difficulty: 'beginner',
    stage: 1,
    durationWeeks: 6,
    tags: ['python', 'programming', 'fundamentals'],
  },
  {
    id: 6,
    platform: 'DeepLearning.AI',
    title: 'ChatGPT Prompt Engineering for Developers',
    url: 'https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/',
    free: true,
    hasCert: false,
    difficulty: 'beginner',
    stage: 2,
    durationWeeks: 1,
    tags: ['llm', 'prompting', 'ai'],
  },
  {
    id: 7,
    platform: 'University of Helsinki',
    title: 'Elements of AI',
    url: 'https://www.elementsofai.com/',
    free: true,
    hasCert: true,
    difficulty: 'beginner',
    stage: 1,
    durationWeeks: 6,
    tags: ['ai', 'beginner'],
  },
]

export const learningStages = [
  {
    id: 1,
    number: '1',
    title: 'Complete Beginner',
    description: 'Python basics, computational thinking, how the internet works. Zero experience needed.',
    tag: 'Start here',
  },
  {
    id: 2,
    number: '2',
    title: 'Curious Explorer',
    description: 'Intro to ML, data science basics, building your first model. Getting hands on.',
    tag: '4–6 weeks in',
  },
  {
    id: 3,
    number: '3',
    title: 'Builder',
    description: 'Deep learning, LLMs, real projects. Building things people can actually use.',
    tag: '3+ months in',
  },
  {
    id: 4,
    number: '4',
    title: 'Summer of AI',
    description: 'Contribute to open source AI projects, get mentored, earn your certificate.',
    tag: 'Apply when ready',
  },
]
