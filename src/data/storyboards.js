/**
 * AI Concept Storyboards
 *
 * To propose a new storyboard concept, open a GitHub issue with the label "storyboard".
 * To submit a completed storyboard, follow the guide in CONTRIBUTING.md.
 *
 * Fields:
 *   emoji      - Visual icon for the card
 *   title      - Concept name
 *   description - One-sentence explainer
 *   difficulty  - "beginner" | "intermediate" | "advanced"
 *   status     - "available" | "coming-soon" | "in-progress"
 *   gradient   - CSS gradient string for the card background
 */

export const storyboards = [
  {
    id: 1,
    emoji: '🧠',
    title: 'What is Machine Learning?',
    description: 'How computers learn from examples instead of being programmed with rules.',
    difficulty: 'beginner',
    status: 'coming-soon',
    gradient: 'linear-gradient(135deg, var(--purple-dark), var(--purple))',
  },
  {
    id: 2,
    emoji: '🔮',
    title: 'How do LLMs work?',
    description: 'The magic behind ChatGPT and other large language models, explained simply.',
    difficulty: 'intermediate',
    status: 'coming-soon',
    gradient: 'linear-gradient(135deg, var(--purple-dark), var(--purple-mid))',
  },
  {
    id: 3,
    emoji: '📊',
    title: 'Classification vs Regression',
    description: 'Two fundamental ways ML models make predictions — and when to use which.',
    difficulty: 'beginner',
    status: 'coming-soon',
    gradient: 'linear-gradient(135deg, var(--purple-dark), var(--purple))',
  },
  {
    id: 4,
    emoji: '⚡',
    title: 'What is a Neural Network?',
    description: 'The building blocks of modern AI — inspired by the human brain.',
    difficulty: 'beginner',
    status: 'coming-soon',
    gradient: 'linear-gradient(135deg, var(--teal), var(--teal-light))',
  },
  {
    id: 5,
    emoji: '🎯',
    title: 'What is Loss & Training?',
    description: 'How an AI model learns by making mistakes and correcting itself.',
    difficulty: 'intermediate',
    status: 'coming-soon',
    gradient: 'linear-gradient(135deg, var(--amber), var(--amber-light))',
  },
  {
    id: 6,
    emoji: '🗂️',
    title: 'What is a Dataset?',
    description: 'Why data is the fuel of AI — and what makes a good dataset.',
    difficulty: 'beginner',
    status: 'coming-soon',
    gradient: 'linear-gradient(135deg, var(--ink-soft), var(--purple))',
  },
]
