import { resources as learningResources } from "./resources";
import { storyboards } from "./storyboards";

function capitalizeDifficulty(difficulty) {
  if (!difficulty) return "";
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

function resourceTypeFromTags(tags = [], url = "") {
  const t = (tags || []).map(String);
  if (url.includes("github.com") || t.includes("github")) return "github";
  if (t.includes("video")) return "video";
  if (t.includes("article")) return "article";
  return "docs";
}

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

// ─────────────────────────────────────────────────────────────────────────────
// Featured Videos (6 total)
//   machine-learning      StatQuest: A Gentle Introduction to ML
//   large-language-models Karpathy: Intro to Large Language Models
//   classification        StatQuest: Classification vs Regression
//    neural-networks       3B1B: But what is a neural network? ch.1
//   loss-and-training     3B1B: Gradient Descent ch.2
//    datasets              How Datasets Work in ML
//
// Resources (11 total)
//    machine-learning      freeCodeCamp: ML for Everybody (Kylie Ying)
//    machine-learning      IBM Technology: ML Explained
//    machine-learning      MIT OCW 6.0002: Introduction to ML
//    large-language-models 3B1B: But what is a GPT? (transformers ch.5)
//    classification        StatQuest: Bias and Variance
//    neural-networks       StatQuest: Neural Networks – Inside the Black Box
//    neural-networks       IBM: Neural Networks Explained in 5 min
//  loss-and-training     3B1B: Backpropagation ch.3
//   loss-and-training     StatQuest: Gradient Descent Step-by-Step
//    loss-and-training     Karpathy: Building micrograd from scratch
//    datasets              StatQuest: Train/Test/Validation Split
// ─────────────────────────────────────────────────────────────────────────────

export const conceptData = [

 
  {
    slug: "machine-learning",
    title: "What is Machine Learning?",
    icon: "🧠",
    difficulty: "Beginner",
    estimatedTime: "15 min",
    description:
      "Learn how computers discover patterns in data and use those patterns to make predictions — without being explicitly programmed.",
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
    featuredVideo: {
      title: "A Gentle Introduction to Machine Learning — StatQuest",
      youtubeId: "Gv9_4yMHFhI",
      description:
        "Josh Starmer cuts through ML hype and builds the essential foundations in plain language. The perfect first video for any beginner.",
    },
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
        title: "Machine Learning Explained: ML, AI & Deep Learning",
        url: "https://www.youtube.com/watch?v=znF2U_3Z210",
        meta: "IBM Technology · Non-technical overview · 2025 · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "video",
        title: "Introduction to Machine Learning – MIT 6.0002",
        url: "https://www.youtube.com/watch?v=h0e2HAPTGF4",
        meta: "MIT OpenCourseWare · Prof. Eric Grimson · University-grade · Free",
        difficulty: "Beginner",
        free: true,
      },

      {
        type: "article",
        title: "A Visual Introduction to Machine Learning — R2D3",
        url: "http://www.r2d3.us/visual-intro-to-machine-learning-part-1/",
        meta: "R2D3 · Award-winning animated scrollytelling explainer · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "article",
        title: "An Overview of Deep Learning for Curious People — Lilian Weng",
        url: "https://lilianweng.github.io/posts/2017-06-21-overview/",
        meta: "Lilian Weng (OpenAI) · Dense but accessible survey · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "article",
        title: "What is Machine Learning? — IBM Think",
        url: "https://www.ibm.com/think/topics/machine-learning",
        meta: "IBM · Comprehensive, regularly updated · Free",
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
        title: "Practical Deep Learning for Coders — fast.ai",
        url: "https://course.fast.ai/",
        meta: "fast.ai · Jeremy Howard · Top-down hands-on approach · Free",
        difficulty: "Beginner",
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
        type: "article",
        title: "Deep Learning — LeCun, Bengio & Hinton (Nature, 2015)",
        url: "https://www.nature.com/articles/nature14539",
        meta: "Nature · The paper that defined the modern deep learning era · Seminal",
        difficulty: "Advanced",
        free: false,
      },
    ],
    nextConcepts: [
      { title: "Neural Networks",             slug: "neural-networks",             difficulty: "Beginner", icon: "⚡" },
      { title: "Classification vs Regression", slug: "classification-vs-regression", difficulty: "Beginner", icon: "📊" },
      { title: "What is a Dataset?",           slug: "datasets",                    difficulty: "Beginner", icon: "🗂️" },
    ],
  },

 
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
        title: "But what is a GPT? Visual intro to Transformers | 3Blue1Brown ch.5",
        url: "https://www.youtube.com/watch?v=wjZofJX0v4M",
        meta: "3Blue1Brown · Stunning animated deep-dive · ~27 min · Free",
        difficulty: "Intermediate",
        free: true,
      },

      {
        type: "article",
        title: "The Illustrated GPT-2 — Jay Alammar",
        url: "https://jalammar.github.io/illustrated-gpt2/",
        meta: "Jay Alammar · Visual walkthrough of GPT-2 internals · Referenced at MIT · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "The Illustrated Transformer — Jay Alammar",
        url: "https://jalammar.github.io/illustrated-transformer/",
        meta: "Jay Alammar · Used in ML courses at MIT, Cornell, Stanford · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "Large Language Models Explained with Minimum Math",
        url: "https://www.understandingai.org/p/large-language-models-explained-with",
        meta: "UnderstandingAI · Tim Lee & Sean Trott · Beginner-friendly deep dive · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "article",
        title: "The Unreasonable Effectiveness of Recurrent Neural Networks — Karpathy",
        url: "https://karpathy.github.io/2015/05/21/rnn-effectiveness/",
        meta: "Andrej Karpathy's Blog · Classic influential post on language models · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "What Are Large Language Models? — IBM Think",
        url: "https://www.ibm.com/think/topics/large-language-models",
        meta: "IBM · Comprehensive overview · Regularly updated · Free",
        difficulty: "Beginner",
        free: true,
      },

      {
        type: "docs",
        title: "Hugging Face NLP Course",
        url: "https://huggingface.co/learn/nlp-course/chapter1/1",
        meta: "Hugging Face · The industry-standard LLM library · Free full course · Free",
        difficulty: "Intermediate",
        free: true,
      },

      {
        type: "github",
        title: "Hands-On Large Language Models — Jay Alammar & Maarten Grootendorst",
        url: "https://github.com/HandsOnLLM/Hands-On-Large-Language-Models",
        meta: "O'Reilly book companion · Full Jupyter notebooks · Free",
        difficulty: "Intermediate",
        free: true,
      },

      {
        type: "article",
        title: "Attention Is All You Need — Vaswani et al. (arXiv, 2017)",
        url: "https://arxiv.org/abs/1706.03762",
        meta: "arXiv · The transformer paper that started everything · Seminal · Free",
        difficulty: "Advanced",
        free: true,
      },
    ],
    nextConcepts: [
      { title: "Neural Networks", slug: "neural-networks",    difficulty: "Beginner",     icon: "⚡" },
      { title: "Loss & Training",  slug: "loss-and-training",  difficulty: "Intermediate", icon: "🎯" },
    ],
  },

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
        title: "Machine Learning Fundamentals: Bias and Variance — StatQuest",
        url: "https://www.youtube.com/watch?v=EuBBz3bI-aA",
        meta: "StatQuest · Josh Starmer · Essential follow-up concept · Free",
        difficulty: "Beginner",
        free: true,
      },

      {
        type: "article",
        title: "Classification vs Regression — Machine Learning Mastery",
        url: "https://machinelearningmastery.com/classification-versus-regression-in-machine-learning/",
        meta: "Jason Brownlee · Definitive written breakdown · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "article",
        title: "A Visual Introduction to Machine Learning Part II — R2D3",
        url: "http://www.r2d3.us/visual-intro-to-machine-learning-part-2/",
        meta: "R2D3 · Animated bias-variance tradeoff explainer · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "article",
        title: "An Overview of Gradient Descent Optimization Algorithms — Sebastian Ruder",
        url: "https://www.ruder.io/optimizing-gradient-descent/",
        meta: "Sebastian Ruder · The most-cited blog post on optimizers · Free",
        difficulty: "Intermediate",
        free: true,
      },

      {
        type: "docs",
        title: "Framing: ML Terminology — Google ML Crash Course",
        url: "https://developers.google.com/machine-learning/crash-course/framing/ml-terminology",
        meta: "Google · Authoritative definitions · Beginner · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "Supervised Learning — Scikit-learn User Guide",
        url: "https://scikit-learn.org/stable/supervised_learning.html",
        meta: "Scikit-learn · Official guide to classification & regression models · Free",
        difficulty: "Beginner",
        free: true,
      },
      // ── GitHub ──────────────────────────────────────────────────────────
      {
        type: "github",
        title: "Microsoft ML-For-Beginners: Regression Lessons",
        url: "https://github.com/microsoft/ML-For-Beginners/tree/main/2-Regression",
        meta: "Microsoft · Hands-on Jupyter notebooks · Free",
        difficulty: "Beginner",
        free: true,
      },
    ],
    nextConcepts: [
      { title: "Loss & Training", slug: "loss-and-training", difficulty: "Intermediate", icon: "🎯" },
      { title: "Neural Networks", slug: "neural-networks",   difficulty: "Beginner",     icon: "⚡" },
    ],
  },


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
        title: "StatQuest: Neural Networks – Inside the Black Box",
        url: "https://www.youtube.com/watch?v=CqOfi41LfDw",
        meta: "StatQuest · Josh Starmer · Step-by-step with worked examples · Free",
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
        meta: "Chris Olah · Most-read blog post on LSTMs · Read by millions · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "Neural Networks and Deep Learning — Free Online Book",
        url: "http://neuralnetworksanddeeplearning.com/",
        meta: "Michael Nielsen · Complete free book · Beginner → Intermediate · Free",
        difficulty: "Intermediate",
        free: true,
      },

      {
        type: "docs",
        title: "TensorFlow Playground — Train a Neural Net in Your Browser",
        url: "https://playground.tensorflow.org/",
        meta: "Google Brain · Interactive · No code required · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "CNN Explainer — Visual CNN Explorer",
        url: "https://poloclub.github.io/cnn-explainer/",
        meta: "Georgia Tech · Interactive CNN visualization tool · Free",
        difficulty: "Beginner",
        free: true,
      },

      {
        type: "github",
        title: "nn-zero-to-hero — Andrej Karpathy",
        url: "https://github.com/karpathy/nn-zero-to-hero",
        meta: "Karpathy · Build neural nets from scratch in Python · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "github",
        title: "fast.ai — Practical Deep Learning Library",
        url: "https://github.com/fastai/fastai",
        meta: "fast.ai · Jeremy Howard · High-level PyTorch wrappers + course · Free",
        difficulty: "Intermediate",
        free: true,
      },
    ],
    nextConcepts: [
      { title: "Loss & Training",   slug: "loss-and-training",    difficulty: "Intermediate", icon: "🎯" },
      { title: "How do LLMs work?", slug: "large-language-models", difficulty: "Intermediate", icon: "🔮" },
    ],
  },

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
        title: "What is Backpropagation Really Doing? | 3Blue1Brown ch.3",
        url: "https://www.youtube.com/watch?v=Ilg3gGewQ5U",
        meta: "3Blue1Brown · Visual deep-dive into backpropagation · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "video",
        title: "StatQuest: Gradient Descent, Step-by-Step",
        url: "https://www.youtube.com/watch?v=sDv4f4s2SB8",
        meta: "StatQuest · Josh Starmer · Clear worked numerical example · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "video",
        title: "Building micrograd: Backprop from Scratch — Andrej Karpathy",
        url: "https://www.youtube.com/watch?v=VMj-3S1tku0",
        meta: "Karpathy · The most step-by-step backprop explanation ever made · ~2.5 hrs · Free",
        difficulty: "Intermediate",
        free: true,
      },

      {
        type: "article",
        title: "Calculus on Computational Graphs: Backpropagation — Colah's Blog",
        url: "https://colah.github.io/posts/2015-08-Backprop/",
        meta: "Chris Olah (Anthropic) · The classic intuition-first essay on backprop · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "An Overview of Gradient Descent Optimization Algorithms — Sebastian Ruder",
        url: "https://www.ruder.io/optimizing-gradient-descent/",
        meta: "Sebastian Ruder (Google DeepMind) · Most-cited optimizer reference · Free",
        difficulty: "Intermediate",
        free: true,
      },
      {
        type: "article",
        title: "Loss Functions for Deep Learning — Machine Learning Mastery",
        url: "https://machinelearningmastery.com/loss-and-loss-functions-for-training-deep-learning-neural-networks/",
        meta: "Jason Brownlee · Comprehensive reference on every common loss function · Free",
        difficulty: "Intermediate",
        free: true,
      },

      {
        type: "docs",
        title: "Gradient Descent — Google ML Crash Course",
        url: "https://developers.google.com/machine-learning/crash-course/linear-regression/gradient-descent",
        meta: "Google · Interactive diagrams · Beginner-friendly · Free",
        difficulty: "Beginner",
        free: true,
      },

      {
        type: "github",
        title: "micrograd — Tiny Autograd Engine by Karpathy",
        url: "https://github.com/karpathy/micrograd",
        meta: "Karpathy · Full backprop engine in ~150 lines of Python · Free",
        difficulty: "Intermediate",
        free: true,
      },

      {
        type: "article",
        title: "Learning Representations by Back-propagating Errors — Rumelhart et al. (Nature, 1986)",
        url: "https://www.nature.com/articles/323533a0",
        meta: "Nature · The original backpropagation paper · Hinton, Rumelhart & Williams · Seminal",
        difficulty: "Advanced",
        free: false,
      },
    ],
    nextConcepts: [
      { title: "Neural Networks",   slug: "neural-networks",      difficulty: "Beginner",     icon: "⚡" },
      { title: "How do LLMs work?", slug: "large-language-models", difficulty: "Intermediate", icon: "🔮" },
    ],
  },


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
        title: "StatQuest: Training/Test/Validation Split, Clearly Explained",
        url: "https://www.youtube.com/watch?v=dSCFk168vmo",
        meta: "StatQuest · Josh Starmer · Short & crystal clear · Free",
        difficulty: "Beginner",
        free: true,
      },

      {
        type: "article",
        title: "Data Preparation for Machine Learning — Machine Learning Mastery",
        url: "https://machinelearningmastery.com/data-preparation-for-machine-learning/",
        meta: "Jason Brownlee · Practical guide to cleaning & preparing data · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "article",
        title: "Datasheets for Datasets — Gebru et al. (Communications of the ACM, 2021)",
        url: "https://dl.acm.org/doi/10.1145/3458723",
        meta: "ACM · Landmark paper on dataset documentation & ethics · Free",
        difficulty: "Intermediate",
        free: true,
      },

      {
        type: "docs",
        title: "Splitting Data — Google ML Crash Course",
        url: "https://developers.google.com/machine-learning/crash-course/training-and-test-sets/splitting-data",
        meta: "Google · Authoritative · Interactive · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "Kaggle Datasets — Browse & Download Free Datasets",
        url: "https://www.kaggle.com/datasets",
        meta: "Kaggle · Thousands of real-world datasets for practice · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "Hugging Face Datasets Hub",
        url: "https://huggingface.co/datasets",
        meta: "Hugging Face · 50,000+ ML-ready datasets · Searchable · Free",
        difficulty: "Beginner",
        free: true,
      },
      {
        type: "docs",
        title: "Papers With Code — Datasets",
        url: "https://paperswithcode.com/datasets",
        meta: "Papers With Code · Research benchmarks with leaderboards · Free",
        difficulty: "Intermediate",
        free: true,
      },

      {
        type: "github",
        title: "Awesome Public Datasets",
        url: "https://github.com/awesomedata/awesome-public-datasets",
        meta: "Community curated · 500+ datasets across every domain · Free",
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