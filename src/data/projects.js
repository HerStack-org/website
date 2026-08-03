/**
 * Project-Based Learning Track
 *
 * A beginner → advanced series of classic ML mini-projects, each mapped to
 * a specific algorithm/concept from src/data/storyboards.js and
 * src/data/conceptData.js. The goal: "you just learned classification —
 * here's a tiny project to actually build it."
 *
 * To add a project, copy an object below and fill in the details.
 * Submit a PR — no coding needed!
 *
 * Fields:
 *   id             - Unique number
 *   title          - Project name
 *   description    - One or two sentences on what to build
 *   category       - The algorithm/technique this project teaches,
 *                    e.g. "Binary Classification", "Regression", "Clustering"
 *   difficulty     - "beginner" | "intermediate" | "advanced"
 *   stage          - Which learning stage this fits: 1 (beginner) | 2 (explorer) | 3 (builder)
 *   relatedConcept - slug of the matching concept in storyboards.js / conceptData.js
 *                    (used to show a "Try it yourself" card on that concept's page)
 *   datasetName    - Name of the beginner-friendly dataset to use
 *   datasetUrl     - Direct link to the dataset/notebook (e.g. Kaggle)
 *
 * Roadmap (see issue #167) — this file starts with Stage 1 to 3 .
 * Stage 2/3 entries (Iris Flower Classifier, Spam vs Not-Spam Detector,
 * Customer Segmentation, Loan Approval Predictor, Handwritten Digit
 * Recognizer) will be added in follow-up PRs once this shape is reviewed.
 */

export const projects = [
  {
    id: 1,
    title: 'Student Pass/Fail Predictor',
    description:
      'Predict whether a student will pass or fail an exam based on features like study hours and attendance — the "hello world" of binary classification.',
    category: 'Binary Classification',
    difficulty: 'beginner',
    stage: 1,
    relatedConcept: 'classification-vs-regression',
    datasetName: 'Pass or Not? Students Exam Score Data',
    datasetUrl: 'https://www.kaggle.com/datasets/cchen002/pass-or-not-students-exam-score-data',
    tutorialUrl: 'https://www.kaggle.com/datasets/cchen002/pass-or-not-students-exam-score-data/code',
  },
  {
    id: 2,
    title: 'Will This Customer Buy?',
    description:
      'Build a model that predicts whether a customer will complete a purchase based on browsing behavior — a practical intro to classification for real-world business data.',
    category: 'Binary Classification',
    difficulty: 'beginner',
    stage: 1,
    relatedConcept: 'classification-vs-regression',
    datasetName: 'Online Shoppers Purchasing Intention Dataset',
    datasetUrl: 'https://www.kaggle.com/datasets/imakash3011/online-shoppers-purchasing-intention-dataset',
       tutorialUrl: 'https://www.kaggle.com/code/alessandroabati/online-shoppers-purchasing-intention-prediction',
  },
  {
    id: 3,
    title: 'House Price Predictor',
    description:
      'Predict house prices from features like square footage, bedrooms, and location — the classic first project for learning regression.',
    category: 'Regression',
    difficulty: 'beginner',
    stage: 1,
    relatedConcept: 'classification-vs-regression',
    datasetName: 'Housing Price Prediction Dataset',
    datasetUrl: 'https://www.kaggle.com/datasets/harishkumardatalab/housing-price-prediction',
     tutorialUrl: 'https://www.kaggle.com/code/harishkumardatalab/housing-price-prediction-eda-regression-dt',
  },

   {
    id: 4,
    title: 'Iris Flower Classifier',
    description:
      'Classify iris flowers into three species from petal and sepal measurements — the classic first step into multi-class classification.',
    category: 'Multi-class Classification',
    difficulty: 'beginner',
    stage: 2,
    relatedConcept: 'classification-vs-regression',
    datasetName: 'Iris Species',
    datasetUrl: 'https://www.kaggle.com/datasets/uciml/iris',
      tutorialUrl: 'https://www.kaggle.com/code/agilesifaka/step-by-step-iris-ml-project',
  },
  {
    id: 5,
    title: 'Spam vs Not-Spam Detector',
    description:
      'Turn raw SMS text into features and classify messages as spam or ham — a beginner-friendly first taste of text classification.',
    category: 'Text Classification',
    difficulty: 'intermediate',
    stage: 2,
    relatedConcept: 'classification-vs-regression',
    datasetName: 'SMS Spam Collection Dataset',
    datasetUrl: 'https://www.kaggle.com/datasets/uciml/sms-spam-collection-dataset',
     tutorialUrl: 'https://www.kaggle.com/code/sid321axn/sms-spam-classifier-naive-bayes-ml-algo',
  },
  {
    id: 6,
    title: 'Customer Segmentation',
    description:
      'Group mall customers into segments by income and spending behavior using unsupervised learning — no labels required.',
    category: 'Clustering',
    difficulty: 'intermediate',
    stage: 2,
    relatedConcept: null,
    datasetName: 'Mall Customer Segmentation Data',
    datasetUrl: 'https://www.kaggle.com/datasets/vjchoudhary7/customer-segmentation-tutorial-in-python',
     tutorialUrl: 'https://www.kaggle.com/code/satishgunjal/tutorial-k-means-clustering',
  },
  {
    id: 7,
    title: 'Loan Approval Predictor',
    description:
      'Predict whether a loan application will be approved using ensemble methods like Random Forest — where accuracy really starts to matter.',
    category: 'Ensemble Methods',
    difficulty: 'intermediate',
    stage: 3,
    relatedConcept: 'classification-vs-regression',
    datasetName: 'Loan Prediction Problem Dataset',
    datasetUrl: 'https://www.kaggle.com/datasets/altruistdelhite04/loan-prediction-problem-dataset',
      tutorialUrl: 'https://www.kaggle.com/code/akshaydani/loan-prediction-analysis-with-random-forests',
  },
  {
    id: 8,
    title: 'Handwritten Digit Recognizer',
    description:
      'Build a neural network that recognizes handwritten digits 0–9 from pixel data — the "hello world" of computer vision and deep learning.',
    category: 'Neural Networks',
    difficulty: 'advanced',
    stage: 3,
    relatedConcept: 'neural-networks',
    datasetName: 'MNIST — Digit Recognizer',
    datasetUrl: 'https://www.kaggle.com/competitions/digit-recognizer',
      tutorialUrl: 'https://www.kaggle.com/code/chapagain/digit-recognizer-beginner-s-guide-mlp-cnn-keras',
  },
]
