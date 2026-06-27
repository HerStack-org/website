// Import external data sources
import { resources as learningResources } from "./resources";
import { storyboards } from "./storyboards";

// Helper function: Convert "beginner" to "Beginner"
function capitalizeDifficulty(difficulty) {
  if (!difficulty) return "";
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

// Helper function: Determine resource type from tags or URL
function resourceTypeFromTags(tags = [], url = "") {
  const t = (tags || []).map(String);
  if (url.includes("github.com") || t.includes("github")) return "github";
  if (t.includes("video")) return "video";
  if (t.includes("article")) return "article";
  return "docs";
}

// Helper function: Transform resource into standard format
function toConceptResource(r) {
  const type = resourceTypeFromTags(r.tags, r.url);
  const bits = [];
  if (r.difficulty) bits.push(r.difficulty);
  if (typeof r.stage !== "undefined" && r.stage !== null) bits.push(`Stage ${r.stage}`);
  if (r.free) bits.push("Free");
  if (r.hasCert) bits.push("Certificate");
  return {
    type, title: r.title, url: r.url, meta: bits.join(" • "),
    platform: r.platform, difficulty: r.difficulty,
    stage: r.stage, free: r.free, hasCert: r.hasCert,
  };
}

// Helper function: Get tag hints for resource matching based on concept slug
function slugToTagHints(slug) {
  switch (slug) {
    case "machine-learning":             return ["ml", "ai", "data", "python", "overview", "no-code"];
    case "large-language-models":        return ["llm", "prompting", "ai", "overview"];
    case "classification-vs-regression": return ["ml", "data", "python", "tensorflow"];
    case "neural-networks":              return ["deep-learning", "pytorch", "python", "ml"];
    case "loss-and-training":            return ["deep-learning", "pytorch", "python", "ml"];
    case "datasets":                     return ["data", "ml", "python"];
    default:                             return ["ai", "ml", "python"];
  }
}

// Helper function: Find fallback resources if specific ones not defined
function getFallbackResourcesForSlug(slug) {
  const hints = slugToTagHints(slug);
  const scored = learningResources
    .map((r) => {
      const tags = (r.tags || []).map(String);
      const score = tags.reduce((acc, tag) => acc + (hints.includes(tag) ? 1 : 0), 0);
      return { r, score };
    })
    .sort((a, b) => b.score - a.score);
  const best = scored.filter((x) => x.score > 0).slice(0, 5);
  const fallback = best.length ? best : scored.slice(0, 5);
  return fallback.map(({ r }) => toConceptResource(r));
}

// Main export: Get concept data by slug (e.g., "machine-learning")
// Returns full concept object with all resources and metadata
export function getConceptBySlug(slug) {
  const normalized = slug?.trim();
  if (!normalized) return null;
  const card   = storyboards.find((item) => item.slug?.trim() === normalized);
  const detail = conceptData.find((item) => item.slug?.trim() === normalized);
  if (!card && !detail) return null;
  const fallbackResources = getFallbackResourcesForSlug(normalized);
  const mergedResources =
    detail?.resources && detail.resources.length > 0 ? detail.resources : fallbackResources;
  return {
    slug: normalized,
    title:         detail?.title         ?? card?.title       ?? "",
    icon:          detail?.icon          ?? card?.emoji        ?? "📖",
    description:   detail?.description   ?? card?.description  ?? "",
    difficulty:    detail?.difficulty    ?? capitalizeDifficulty(card?.difficulty),
    estimatedTime: detail?.estimatedTime ?? null,
    storyboard:    detail?.storyboard    ?? [],
    featuredVideo: detail?.featuredVideo ?? null,
    resources:     mergedResources       ?? [],
    nextConcepts:  detail?.nextConcepts  ?? [],
    status:        card?.status          ?? null,
    gradient:      card?.gradient        ?? null,
  };
}

// ============================================================================
// LEARNING CONCEPTS DATABASE
// ============================================================================
// This is the main data structure containing all concepts and their resources.
// Each concept has:
//   - slug: URL-friendly identifier (e.g., "machine-learning")
//   - title: Display name
//   - icon: Single emoji for visual identification
//   - difficulty: Beginner, Intermediate, or Advanced
//   - estimatedTime: How long to learn (in minutes)
//   - description: One-sentence explanation
//   - storyboard: 2-3 step breakdown of the concept
//   - featuredVideo: Top recommended video (YouTube)
//   - resources: Array of learning materials (videos, articles, docs, GitHub)
//   - nextConcepts: Related concepts to learn after this one
//
// TO ADD A NEW RESOURCE:
//   1. Find the concept in the array below (e.g., "machine-learning")
//   2. Locate its "resources: [" section
//   3. Add a new resource object with: type, title, url, meta, difficulty, free
//   4. Keep formatting consistent with existing resources
// ============================================================================

export const conceptData = [

  // ========================================================================
  // CONCEPT 1: MACHINE LEARNING FUNDAMENTALS
  // ========================================================================
  // What is this about: How computers learn patterns from data
  // Who should learn: Anyone new to AI/ML
  // Time to learn: 15 minutes intro, then dive deeper with resources
  // ========================================================================
  {
    slug: "machine-learning",
    title: "What is Machine Learning?",
    icon: "🧠",
    difficulty: "Beginner",
    estimatedTime: "15 min",
    description:
      "Learn how computers discover patterns in data and use those patterns to make predictions — without being explicitly programmed.",
    // 3-step breakdown of the concept
    storyboard: [
      {
        title: "Collect Data",
        description:
          "Machine learning starts with examples. The more high-quality examples you feed the algorithm, the better it can learn.",
      },
      {
        title: "Learn Patterns",
        description:
          "Algorithms identify relationships and structure hidden inside the data — things a human might never spot manually.",
      },
      {
        title: "Make Predictions",
        description:
          "The trained model applies what it learned to brand-new data, making predictions or decisions automatically.",
      },
    ],
    // Top recommended video for this concept (YouTube ID)
    featuredVideo: {
      title: "A Gentle Introduction to Machine Learning — StatQuest",
      youtubeId: "Gv9_4yMHFhI",
      description:
        "Josh Starmer cuts through ML hype and builds the essential foundations in plain language. The perfect first video for any beginner.",
    },
    // Learning resources: mix of videos, articles, docs, and GitHub repos
    // Format: type, title, url, meta (author/source info), difficulty, free
    resources: [
      {
        type: "video",
        title: "Machine Learning for Everybody – Full Course",
        url: "https://www.youtube.com/watch?v=i_LwzRVP7bg",
        meta: "freeCodeCamp · Kylie Ying (MIT/CERN) · ~4 hrs · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "video",
        title: "ML Explained: Machine Learning, AI & Deep Learning Basics",
        url: "https://www.youtube.com/watch?v=znF2U_3Z210",
        meta: "IBM Technology · Non-technical overview · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "video",
        title: "Coursera: Machine Learning by Andrew Ng (Audit Free)",
        url: "https://www.coursera.org/learn/machine-learning",
        meta: "Coursera · Stanford University · 41 hours · Free audit",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "Google Machine Learning Crash Course",
        url: "https://developers.google.com/machine-learning/crash-course",
        meta: "Google · Interactive exercises & videos · Beginner → Intermediate · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "Scikit-learn: Getting Started",
        url: "https://scikit-learn.org/stable/getting_started.html",
        meta: "Scikit-learn · The go-to Python ML library · Official docs · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "Fast.ai: Practical Deep Learning for Coders",
        url: "https://course.fast.ai/",
        meta: "fast.ai · Jeremy Howard · Top-down hands-on approach · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "Machine Learning Zoomcamp",
        url: "https://github.com/DataTalks-Club/machine-learning-zoomcamp",
        meta: "DataTalks.Club · 4-month course · Free & open source",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "github",
        title: "Microsoft ML-For-Beginners",
        url: "https://github.com/microsoft/ML-For-Beginners",
        meta: "Microsoft · 12 weeks · 26 lessons · 52 quizzes · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "github",
        title: "Dive into Deep Learning (d2l.ai)",
        url: "https://github.com/d2l-ai/d2l-en",
        meta: "Berkeley / Carnegie Mellon · Interactive Jupyter book · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "github",
        title: "Awesome AI/ML Learning Resources",
        url: "https://github.com/armankhondker/awesome-ai-ml-resources",
        meta: "Community curated · 2025 roadmap · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "article",
        title: "Top Free Resources to Learn Machine Learning in 2026",
        url: "https://www.iotaacademy.in/post/top-free-resources-to-learn-machine-learning-in-2025",
        meta: "IoTA Academy · Comprehensive 2026 guide · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "article",
        title: "20+ Best Free Machine Learning Courses",
        url: "https://datatalks.club/blog/free-machine-learning-courses.html",
        meta: "DataTalks.Club · Curated list with descriptions · Free",
        difficulty: "Beginner",
        free: true,
      },
    ],
    nextConcepts: [
      { title: "Classification vs Regression", slug: "classification-vs-regression", difficulty: "Beginner", icon: "📊" },
      { title: "Datasets",                     slug: "datasets",                    difficulty: "Beginner", icon: "🗂️" },
    ],
  },

  // ========================================================================
  // CONCEPT 2: LARGE LANGUAGE MODELS (LLMs)
  // ========================================================================
  // What is this about: How ChatGPT, Claude, and similar models work
  // Prerequisites: Basic understanding of machine learning helpful but not required
  // Time to learn: 20 minutes intro, then 2-3 hours for deeper resources
  // ========================================================================
  {
    slug: "large-language-models",
    title: "How do LLMs work?",
    icon: "🔮",
    difficulty: "Intermediate",
    estimatedTime: "20 min",
    description:
      "Unpack the magic behind ChatGPT and other large language models — from tokens and transformers to how they generate human-like text.",
    storyboard: [
      {
        title: "Tokenize Text",
        description:
          "Text is broken into small chunks called tokens. The model never sees raw words — it sees numbers representing those chunks.",
      },
      {
        title: "Predict the Next Token",
        description:
          "LLMs are trained on one objective: given all previous tokens, predict the next one. Repeated billions of times, this produces surprisingly capable models.",
      },
      {
        title: "Attention & Context",
        description:
          "Transformer attention lets the model weigh which earlier tokens matter most when generating each new word — enabling long-range reasoning.",
      },
    ],
    featuredVideo: {
      title: "Intro to Large Language Models — Andrej Karpathy",
      youtubeId: "zjkBMFhNj_g",
      description:
        "Karpathy's one-hour talk gives a clear, first-principles mental model of what LLMs are, how they're trained, and where they're headed.",
    },
    resources: [
      {
        type: "video",
        title: "Intro to Large Language Models — Andrej Karpathy",
        url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        meta: "Karpathy · 60 min · State of LLMs · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "video",
        title: "But what is a GPT? Transformers | 3Blue1Brown ch.5",
        url: "https://www.youtube.com/watch?v=wjZofJX0v4M",
        meta: "3Blue1Brown · Stunning animated walkthrough · ~27 min · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "docs",
        title: "How Transformer LLMs Work — DeepLearning.AI",
        url: "https://www.deeplearning.ai/courses/how-transformer-llms-work/",
        meta: "DeepLearning.AI · Free course with Jay Alammar · Intermediate",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "docs",
        title: "Hugging Face NLP Course - LLMs Focus",
        url: "https://huggingface.co/learn/llm-course/en/chapter1/1",
        meta: "Hugging Face · Industry-standard LLM library · Free full course",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "docs",
        title: "Text Generation with Transformers — Hugging Face",
        url: "https://huggingface.co/docs/transformers/en/llm_tutorial",
        meta: "Hugging Face · Practical implementation guide · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "docs",
        title: "DeepLearning.AI: Short Courses Library",
        url: "https://www.deeplearning.ai/short-courses/",
        meta: "DeepLearning.AI · Free short LLM courses · 1-2 hours each",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "Building an LLM from Scratch — How Transformers Learn",
        url: "https://medium.com/@nileshsalpe/building-an-llm-from-scratch-how-transformers-learn-think-and-generate-fa43f7841024",
        meta: "Nilesh Salpe · Medium · Educational walkthrough · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "How to Rewrite a Transformer Model: LLM Customization",
        url: "https://medium.com/@oluwamusiwaolamide/how-to-rewrite-a-transformer-model-step-by-step-customization-of-llm-architectures-82ef5cfa1caf",
        meta: "Olamide David · Medium · Advanced customization · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "Build Your Own LLM with Hugging Face Transformers",
        url: "https://alican-kiraz1.medium.com/build-your-own-llm-a-complete-guide-to-training-llm-models-with-hugging-face-transformers-bf15cbc86a58",
        meta: "Alican Kiraz · Medium · Practical training guide · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "Tutorial: Building an LLM from Scratch with Transformers",
        url: "https://medium.com/ai-simplified-in-plain-english/tutorial-building-an-llm-from-scratch-with-transformer-architecture-e2c9ad611c36",
        meta: "Frank Morales · Medium · Real-world application · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "github",
        title: "Hands-On Large Language Models — O'Reilly",
        url: "https://github.com/HandsOnLLM/Hands-On-Large-Language-Models",
        meta: "Jay Alammar & Maarten Grootendorst · Jupyter notebooks · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "github",
        title: "LLMs Mastery: Generative AI & Transformers",
        url: "https://github.com/topics/llm-learning",
        meta: "GitHub · Curated LLM learning repos · Free",
        difficulty: "Intermediate",
        free: true,
      },
    ],
    nextConcepts: [
      { title: "Neural Networks", slug: "neural-networks",    difficulty: "Beginner",     icon: "⚡" },
      { title: "Loss & Training",  slug: "loss-and-training",  difficulty: "Intermediate", icon: "🎯" },
    ],
  },

  // ========================================================================
  // CONCEPT 3: CLASSIFICATION VS REGRESSION
  // ========================================================================
  // What is this about: Two different types of prediction problems
  // When to use: Choose this FIRST before building any ML model
  // Time to learn: 12 minutes to understand, 1-2 hours to master
  // ========================================================================
  {
    slug: "classification-vs-regression",
    title: "Classification vs Regression",
    icon: "📊",
    difficulty: "Beginner",
    estimatedTime: "12 min",
    description:
      "Two fundamental ways ML models make predictions — one outputs a category, the other a number. Knowing which to use is step one of any ML project.",
    storyboard: [
      {
        title: "Classification: Pick a Box",
        description:
          "Is this email spam or not? Is this tumor malignant or benign? Classification outputs a discrete label from a fixed set of categories.",
      },
      {
        title: "Regression: Predict a Number",
        description:
          "What will this house sell for? How many units will we ship? Regression outputs a continuous value on a numeric scale.",
      },
      {
        title: "Choosing the Right One",
        description:
          "The output type determines everything: loss function, evaluation metrics, and model architecture. Get this choice right first.",
      },
    ],
    featuredVideo: {
      title: "Regression vs Classification in Machine Learning — StatQuest",
      youtubeId: "TJveOYsK6MY",
      description:
        "Josh Starmer gives a clear visual explanation of the difference between regression and classification with real-world examples.",
    },
    resources: [
      {
        type: "video",
        title: "Regression vs Classification in Machine Learning — StatQuest",
        url: "https://www.youtube.com/watch?v=TJveOYsK6MY",
        meta: "StatQuest · Josh Starmer · Clear examples · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "video",
        title: "Machine Learning Fundamentals: Bias and Variance — StatQuest",
        url: "https://www.youtube.com/watch?v=EuBBz3bI-aA",
        meta: "StatQuest · Essential follow-up concept · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "Google ML Crash Course: Framing & Terminology",
        url: "https://developers.google.com/machine-learning/crash-course/framing/ml-terminology",
        meta: "Google · Authoritative definitions · Beginner · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "Supervised Learning — Scikit-learn User Guide",
        url: "https://scikit-learn.org/stable/supervised_learning.html",
        meta: "Scikit-learn · Official guide to classification & regression · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "article",
        title: "Classification vs Regression in Machine Learning",
        url: "https://machinelearningmastery.com/classification-versus-regression-in-machine-learning/",
        meta: "Jason Brownlee · Machine Learning Mastery · Definitive guide · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "article",
        title: "An Overview of Gradient Descent Optimization Algorithms",
        url: "https://www.ruder.io/optimizing-gradient-descent/",
        meta: "Sebastian Ruder · Most-cited blog on optimizers · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "github",
        title: "Microsoft ML-For-Beginners: Regression Lessons",
        url: "https://github.com/microsoft/ML-For-Beginners/tree/main/2-Regression",
        meta: "Microsoft · Hands-on Jupyter notebooks · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "github",
        title: "Microsoft ML-For-Beginners: Classification",
        url: "https://github.com/microsoft/ML-For-Beginners/tree/main/4-Classification",
        meta: "Microsoft · 4 lessons on classification · Free",
        difficulty: "Beginner",
        free: true,
      },
    ],
    nextConcepts: [
      { title: "Neural Networks", slug: "neural-networks",   difficulty: "Beginner",     icon: "⚡" },
      { title: "Datasets",        slug: "datasets",          difficulty: "Beginner",     icon: "🗂️" },
    ],
  },

  // ========================================================================
  // CONCEPT 4: NEURAL NETWORKS
  // ========================================================================
  // What is this about: Layers of neurons that learn by adjusting weights
  // Foundation for: Deep learning, computer vision, natural language processing
  // Time to learn: 20 minutes intro, 5-10 hours to really understand
  // ========================================================================
  {
    slug: "neural-networks",
    title: "What is a Neural Network?",
    icon: "⚡",
    difficulty: "Beginner",
    estimatedTime: "20 min",
    description:
      "The building blocks of modern AI — layers of interconnected neurons that learn to recognize patterns by adjusting billions of small weights.",
    storyboard: [
      {
        title: "Neurons & Layers",
        description:
          "A neural network is a stack of layers. Each layer is a set of neurons — simple math functions that take in numbers, transform them, and pass them forward.",
      },
      {
        title: "Weights & Learning",
        description:
          "Every connection between neurons has a weight. Training adjusts these weights so the network's outputs get closer to the right answers.",
      },
      {
        title: "Deep = Many Layers",
        description:
          "'Deep learning' just means many layers. Deeper networks learn increasingly abstract features — edges → shapes → faces, for example.",
      },
    ],
    featuredVideo: {
      title: "But what is a neural network? | 3Blue1Brown ch.1",
      youtubeId: "aircAruvnKk",
      description:
        "The definitive animated introduction. Grant Sanderson's visuals make the math click instantly. Part 1 of the Deep Learning series.",
    },
    resources: [
      {
        type: "video",
        title: "But what is a neural network? | 3Blue1Brown ch.1",
        url: "https://www.youtube.com/watch?v=aircAruvnKk",
        meta: "3Blue1Brown · Animated introduction · ~19 min · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "video",
        title: "StatQuest: Neural Networks – Inside the Black Box",
        url: "https://www.youtube.com/watch?v=CqOfi41LfDw",
        meta: "StatQuest · Josh Starmer · Step-by-step with examples · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "video",
        title: "Neural Networks Explained in 5 Minutes",
        url: "https://www.youtube.com/watch?v=jmmW0F0biz0",
        meta: "IBM Technology · Non-technical quick overview · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "video",
        title: "Deep Learning Specialization — Andrew Ng (Coursera)",
        url: "https://www.coursera.org/specializations/deep-learning",
        meta: "Coursera · 5-course specialization · Audit free · 4 months",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "docs",
        title: "TensorFlow Playground — Train a Neural Net in Browser",
        url: "https://playground.tensorflow.org/",
        meta: "Google Brain · Interactive · No code required · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "CNN Explainer — Visual CNN Explorer",
        url: "https://poloclub.github.io/cnn-explainer/",
        meta: "Georgia Tech · Interactive CNN visualization · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "PyTorch Tutorials — Official Docs",
        url: "https://pytorch.org/tutorials/",
        meta: "PyTorch · Official deep learning framework · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "TensorFlow & Keras Documentation",
        url: "https://www.tensorflow.org/learn",
        meta: "Google · Official framework docs · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "article",
        title: "Neural Networks, Manifolds, and Topology — Colah's Blog",
        url: "https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/",
        meta: "Chris Olah (Anthropic) · Intuition-first visual essay · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "Understanding LSTM Networks — Colah's Blog",
        url: "https://colah.github.io/posts/2015-08-Understanding-LSTMs/",
        meta: "Chris Olah · Most-read blog on LSTMs · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "Neural Networks and Deep Learning — Free Online Book",
        url: "http://neuralnetworksanddeeplearning.com/",
        meta: "Michael Nielsen · Complete free book · Beginner → Intermediate",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "github",
        title: "nn-zero-to-hero — Andrej Karpathy",
        url: "https://github.com/karpathy/nn-zero-to-hero",
        meta: "Karpathy · Build neural nets from scratch · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "github",
        title: "fast.ai — Practical Deep Learning Library",
        url: "https://github.com/fastai/fastai",
        meta: "fast.ai · Jeremy Howard · High-level PyTorch · Free",
        difficulty: "Intermediate",
        free: true,
      },
    ],
    nextConcepts: [
      { title: "Loss & Training",   slug: "loss-and-training",    difficulty: "Intermediate", icon: "🎯" },
      { title: "How do LLMs work?", slug: "large-language-models", difficulty: "Intermediate", icon: "🔮" },
    ],
  },

  // ========================================================================
  // CONCEPT 5: LOSS & TRAINING
  // ========================================================================
  // What is this about: How models learn by measuring and reducing error
  // Core concepts: Loss functions, gradient descent, backpropagation
  // Difficulty: Most technical concept - requires calculus understanding
  // Time to learn: 18 minutes intro, 10+ hours to fully master
  // ========================================================================
  {
    slug: "loss-and-training",
    title: "What is Loss & Training?",
    icon: "🎯",
    difficulty: "Intermediate",
    estimatedTime: "18 min",
    description:
      "How an AI model learns by making mistakes and correcting itself — the feedback loop of loss functions, gradient descent, and backpropagation.",
    storyboard: [
      {
        title: "Measure the Mistake",
        description:
          "A loss function scores how wrong the model's prediction is. Low loss = good; high loss = bad. This single number is the entire learning signal.",
      },
      {
        title: "Gradient Descent",
        description:
          "The model computes which direction to nudge each weight to reduce the loss — then takes a small step. Repeat millions of times.",
      },
      {
        title: "Backpropagation",
        description:
          "Backprop efficiently calculates the gradient for every weight in the network in one backward pass using the chain rule from calculus.",
      },
    ],
    featuredVideo: {
      title: "Gradient Descent, How Neural Networks Learn | 3Blue1Brown ch.2",
      youtubeId: "IHZwWFHWa-w",
      description:
        "3Blue1Brown's chapter 2 explains gradient descent and loss with beautiful animations — the clearest visual explanation available.",
    },
    resources: [
      {
        type: "video",
        title: "Gradient Descent, How Neural Networks Learn | 3Blue1Brown ch.2",
        url: "https://www.youtube.com/watch?v=IHZwWFHWa-w",
        meta: "3Blue1Brown · Beautiful animations · ~21 min · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "video",
        title: "What is Backpropagation Really Doing? | 3Blue1Brown ch.3",
        url: "https://www.youtube.com/watch?v=Ilg3gGewQ5U",
        meta: "3Blue1Brown · Visual deep-dive into backpropagation · ~17 min · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "video",
        title: "StatQuest: Gradient Descent, Step-by-Step",
        url: "https://www.youtube.com/watch?v=sDv4f4s2SB8",
        meta: "StatQuest · Josh Starmer · Clear numerical example · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "video",
        title: "Building micrograd: Backprop from Scratch — Karpathy",
        url: "https://www.youtube.com/watch?v=VMj-3S1tku0",
        meta: "Karpathy · Most step-by-step backprop explanation · ~2.5 hrs · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "docs",
        title: "Google ML Crash Course: Gradient Descent",
        url: "https://developers.google.com/machine-learning/crash-course/linear-regression/gradient-descent",
        meta: "Google · Interactive diagrams · Beginner-friendly · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "Google ML: Neural Network Training",
        url: "https://developers.google.com/machine-learning/crash-course/neural-networks/backpropagation",
        meta: "Google · Backpropagation fundamentals · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "docs",
        title: "DeepLearning.AI: How to Train LLMs",
        url: "https://www.deeplearning.ai/courses/",
        meta: "DeepLearning.AI · Specialized short courses · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "Calculus on Computational Graphs: Backpropagation",
        url: "https://colah.github.io/posts/2015-08-Backprop/",
        meta: "Chris Olah (Anthropic) · Classic intuition-first essay · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "An Overview of Gradient Descent Optimization Algorithms",
        url: "https://www.ruder.io/optimizing-gradient-descent/",
        meta: "Sebastian Ruder (Google DeepMind) · Most-cited reference · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "Gradient Descent & Backpropagation in Neural Networks",
        url: "https://developer.nvidia.com/blog/a-data-scientists-guide-to-gradient-descent-and-backpropagation-algorithms/",
        meta: "NVIDIA Technical Blog · Data Scientist's guide · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "Demystifying Backpropagation & Gradient Descent",
        url: "https://datajourney24.substack.com/p/demystifying-backpropagation-and",
        meta: "DataJourney · Interview prep series · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "How Neural Networks Learn: Backpropagation & Intuition",
        url: "https://medium.com/@theshubhamgoel/how-neural-networks-learn-gradient-descent-backpropagation-and-building-intuition-32d807542e31",
        meta: "Shubham Goel · Medium · Intuitive explanations · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "Backpropagation in Neural Networks — Comprehensive Guide",
        url: "https://telefonicatech.uk/blog/introduction-to-artificial-neural-networks-part-two-gradient-descent-backpropagation-supervised-unsupervised-learning/",
        meta: "Telefónica Tech · Detailed walkthrough · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "Loss Functions for Deep Learning",
        url: "https://machinelearningmastery.com/loss-and-loss-functions-for-training-deep-learning-neural-networks/",
        meta: "Jason Brownlee · Comprehensive reference · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "github",
        title: "micrograd — Tiny Autograd Engine by Karpathy",
        url: "https://github.com/karpathy/micrograd",
        meta: "Karpathy · Full backprop in ~150 lines · Free",
        difficulty: "Intermediate",
        free: true,
      },
    ],
    nextConcepts: [
      { title: "Neural Networks",   slug: "neural-networks",      difficulty: "Beginner",     icon: "⚡" },
      { title: "How do LLMs work?", slug: "large-language-models", difficulty: "Intermediate", icon: "🔮" },
    ],
  },

  // ========================================================================
  // CONCEPT 6: DATASETS
  // ========================================================================
  // What is this about: The data that powers machine learning
  // Key insight: Model quality depends on data quality (garbage in = garbage out)
  // Time to learn: 10 minutes to understand, ongoing to master
  // Resources: Where to find datasets for practice and projects
  // ========================================================================
  {
    slug: "datasets",
    title: "What is a Dataset?",
    icon: "🗂️",
    difficulty: "Beginner",
    estimatedTime: "10 min",
    description:
      "Data is the fuel of AI — a model is only as good as what it learned from. Learn what makes a dataset, and what makes a good one.",
    storyboard: [
      {
        title: "Rows & Features",
        description:
          "A dataset is a table. Each row is one example (a photo, a sentence, a transaction). Each column is a feature — a measurable property of that example.",
      },
      {
        title: "Labels",
        description:
          "Supervised learning requires labels: the correct answer for each row. Labels are expensive because a human usually has to provide them.",
      },
      {
        title: "Quality > Quantity",
        description:
          "Biased, incomplete, or mislabeled data produces bad models regardless of how sophisticated the algorithm. Garbage in, garbage out.",
      },
    ],
    featuredVideo: {
      title: "How Datasets Work in Machine Learning (Beginner Friendly)",
      youtubeId: "RqPR7GqSWRM",
      description:
        "A concise practical overview of training, validation, and test sets — and why the split matters for every ML project.",
    },
    resources: [
      {
        type: "video",
        title: "How Datasets Work in Machine Learning (Beginner Friendly)",
        url: "https://www.youtube.com/watch?v=RqPR7GqSWRM",
        meta: "Practical overview · Training/test/validation split · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "video",
        title: "StatQuest: Training/Test/Validation Split, Clearly Explained",
        url: "https://www.youtube.com/watch?v=dSCFk168vmo",
        meta: "StatQuest · Josh Starmer · Short & crystal clear · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "Google ML Crash Course: Splitting Data",
        url: "https://developers.google.com/machine-learning/crash-course/training-and-test-sets/splitting-data",
        meta: "Google · Authoritative · Interactive · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "Kaggle Datasets — Browse & Download Free Datasets",
        url: "https://www.kaggle.com/datasets",
        meta: "Kaggle · Thousands of real-world datasets · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "Hugging Face Datasets Hub",
        url: "https://huggingface.co/datasets",
        meta: "Hugging Face · 50,000+ ML-ready datasets · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "Papers With Code — Datasets & Benchmarks",
        url: "https://paperswithcode.com/datasets",
        meta: "Papers With Code · Research benchmarks · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "docs",
        title: "UCI Machine Learning Repository",
        url: "https://archive.ics.uci.edu/",
        meta: "UCI · Classic datasets · Beginner-friendly · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "article",
        title: "Data Preparation for Machine Learning",
        url: "https://machinelearningmastery.com/data-preparation-for-machine-learning/",
        meta: "Jason Brownlee · Practical guide · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "article",
        title: "Datasheets for Datasets — Gebru et al.",
        url: "https://dl.acm.org/doi/10.1145/3458723",
        meta: "ACM · Landmark paper on dataset documentation · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "github",
        title: "Awesome Public Datasets",
        url: "https://github.com/awesomedata/awesome-public-datasets",
        meta: "Community curated · 500+ datasets · Free",
        difficulty: "Beginner",
        free: true,
      },
    ],
    nextConcepts: [
      { title: "What is Machine Learning?",    slug: "machine-learning",            difficulty: "Beginner", icon: "🧠" },
      { title: "Classification vs Regression", slug: "classification-vs-regression", difficulty: "Beginner", icon: "📊" },
    ],
  },
];

// ============================================================================
// HOW TO ADD NEW RESOURCES
// ============================================================================
// 1. FIND THE CONCEPT you want to update (search for slug like "neural-networks")
// 2. LOCATE THE RESOURCES ARRAY inside that concept
// 3. ADD YOUR RESOURCE OBJECT before the closing bracket
// 4. USE THIS TEMPLATE:
//
//    {
//      type: "video",              // video, article, docs, or github
//      title: "Resource Title",    // What it's called
//      url: "https://...",         // Full URL to the resource
//      meta: "Author · Details · Free",  // Context about it
//      difficulty: "Beginner",     // Beginner, Intermediate, or Advanced
//      free: true,                 // Is it free? true or false
//    },
//
// METADATA EXAMPLES:
//   "Google · Interactive diagrams · Free"
//   "Josh Starmer · StatQuest · 15 min · Free"
//   "Jeremy Howard · Practical deep learning · Free"
//   "Karpathy · GitHub · Python · Free"
//
// RESOURCE TYPES:
//   type: "video"     - YouTube or video tutorials
//   type: "article"   - Blog posts, Medium, tutorials
//   type: "docs"      - Official documentation or courses
//   type: "github"    - GitHub repositories
//
// ============================================================================
// VERIFIED WORKING RESOURCE SOURCES
// ============================================================================
// Videos: YouTube (3Blue1Brown, StatQuest, freeCodeCamp)
// Courses: Google ML Crash Course, Fast.ai, DeepLearning.AI
// Docs: TensorFlow, PyTorch, Scikit-learn, Hugging Face
// Articles: Medium, Machine Learning Mastery, Colah's Blog
// Datasets: Kaggle, Hugging Face Datasets, UCI Repository
//
// ============================================================================
// LEARNING PATH SUGGESTION
// ============================================================================
// 1. Start with "Machine Learning" (get the big picture)
// 2. Then "Classification vs Regression" (choose your task type)
// 3. Then "Datasets" (understand your data)
// 4. Then "Neural Networks" (learn the architecture)
// 5. Then "Loss & Training" (understand how learning works)
// 6. Finally "Large Language Models" (see it all come together)
// ============================================================================