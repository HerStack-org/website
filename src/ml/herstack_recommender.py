# ============================================================
#  HerStack — ML-Based Resource Recommendation System
#  Model: TF-IDF Vectorization + Cosine Similarity
#  Eval:  KNN Classifier for accuracy report
#  Run:   python herstack_recommender.py
# ============================================================

import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.neighbors import KNeighborsClassifier
import re
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import (
    classification_report, confusion_matrix,
    accuracy_score, ConfusionMatrixDisplay
)
from sklearn.preprocessing import LabelEncoder
import warnings
warnings.filterwarnings("ignore")


# ============================================================
# SECTION 1: DATASET
# ============================================================

print("\n" + "=" * 60)
print("  SECTION 1: DATASET")
print("=" * 60)

data = [
    # CNN
    {"id": 1,  "title": "CNN Basics Tutorial",                    "description": "convolutional neural networks filters pooling layers feature maps image recognition beginner",                                "category": "CNN",           "difficulty": "Beginner"},
    {"id": 2,  "title": "Image Classification with CNN",          "description": "image classification CNN training dataset labels prediction accuracy softmax output layer evaluation",                       "category": "CNN",           "difficulty": "Intermediate"},
    {"id": 3,  "title": "Object Detection using YOLO and CNN",    "description": "real time object detection CNN YOLO bounding boxes anchor boxes confidence image recognition deep learning",                 "category": "CNN",           "difficulty": "Advanced"},
    {"id": 4,  "title": "Transfer Learning with CNNs",            "description": "transfer learning pretrained CNN VGG ResNet fine tuning image classification feature extraction",                             "category": "CNN",           "difficulty": "Intermediate"},
    # NLP
    {"id": 5,  "title": "Introduction to NLP",                    "description": "natural language processing text tokenization stopwords stemming bag of words TF-IDF basics beginner",                       "category": "NLP",           "difficulty": "Beginner"},
    {"id": 6,  "title": "Sentiment Analysis with BERT",           "description": "sentiment analysis BERT transformer model fine tuning huggingface NLP text classification advanced",                         "category": "NLP",           "difficulty": "Advanced"},
    {"id": 7,  "title": "Text Classification using TF-IDF",       "description": "text classification TF-IDF vectorization logistic regression naive bayes NLP pipeline machine learning",                     "category": "NLP",           "difficulty": "Beginner"},
    {"id": 8,  "title": "Named Entity Recognition NER",           "description": "named entity recognition NER spaCy BERT sequence labeling token classification language model NLP",                          "category": "NLP",           "difficulty": "Intermediate"},
    # Deep Learning
    {"id": 9,  "title": "Deep Learning Fundamentals",             "description": "deep learning neural networks backpropagation gradient descent activation functions layers weights bias optimization",         "category": "Deep Learning", "difficulty": "Beginner"},
    {"id": 10, "title": "Building Neural Networks from Scratch",  "description": "implement neural network numpy forward pass backward pass gradient descent epochs loss function scratch",                    "category": "Deep Learning", "difficulty": "Intermediate"},
    {"id": 11, "title": "Recurrent Neural Networks and LSTMs",    "description": "recurrent neural network LSTM GRU sequence modeling time series text generation deep learning memory",                      "category": "Deep Learning", "difficulty": "Advanced"},
    {"id": 12, "title": "Regularization in Deep Learning",        "description": "overfitting dropout batch normalization L1 L2 regularization deep learning model generalization neural network",             "category": "Deep Learning", "difficulty": "Intermediate"},
    # GenAI
    {"id": 13, "title": "Generative AI with GANs",                "description": "generative adversarial network GAN generator discriminator image synthesis latent space training deep learning",             "category": "GenAI",         "difficulty": "Advanced"},
    {"id": 14, "title": "Prompt Engineering for LLMs",            "description": "prompt engineering large language models GPT chain of thought few shot zero shot generative AI text",                        "category": "GenAI",         "difficulty": "Beginner"},
    {"id": 15, "title": "Variational Autoencoders VAE",           "description": "variational autoencoder VAE latent space generative model encoder decoder image generation probabilistic",                  "category": "GenAI",         "difficulty": "Advanced"},
    {"id": 16, "title": "Fine-tuning LLMs on Custom Data",        "description": "fine tuning large language models custom dataset LoRA PEFT instruction tuning generative AI huggingface",                   "category": "GenAI",         "difficulty": "Advanced"},
    # ML Basics
    {"id": 17, "title": "Intro to Machine Learning",              "description": "machine learning supervised unsupervised regression classification decision tree random forest scikit-learn",                 "category": "ML Basics",     "difficulty": "Beginner"},
    {"id": 18, "title": "Feature Engineering Techniques",         "description": "feature engineering selection transformation encoding categorical variables machine learning model performance",               "category": "ML Basics",     "difficulty": "Intermediate"},
    {"id": 19, "title": "Model Evaluation Metrics",               "description": "accuracy precision recall F1 score ROC AUC confusion matrix model evaluation machine learning classification",               "category": "ML Basics",     "difficulty": "Beginner"},
    {"id": 20, "title": "Hyperparameter Tuning GridSearchCV",     "description": "hyperparameter tuning grid search cross validation scikit-learn optimization model selection machine learning",              "category": "ML Basics",     "difficulty": "Intermediate"},
    # Computer Vision
    {"id": 21, "title": "OpenCV for Computer Vision",             "description": "OpenCV computer vision image processing edge detection contours morphological operations python beginner",                   "category": "CV",            "difficulty": "Beginner"},
    {"id": 22, "title": "Semantic Segmentation with U-Net",       "description": "semantic segmentation U-Net architecture pixel classification medical imaging computer vision deep learning",                "category": "CV",            "difficulty": "Advanced"},
    # Reinforcement Learning
    {"id": 23, "title": "Reinforcement Learning Basics",          "description": "reinforcement learning agent environment reward policy Q-learning Markov decision process exploration",                    "category": "RL",            "difficulty": "Intermediate"},
    {"id": 24, "title": "Deep Q-Network DQN from Scratch",        "description": "deep Q-network DQN reinforcement learning Atari game playing neural network reward replay buffer",                         "category": "RL",            "difficulty": "Advanced"},
    # Transformers
{"id": 25, "title": "Transformer Architecture Explained", 
 "description": "transformer self attention encoder decoder positional encoding multi head attention sequence modeling NLP deep learning", 
 "category": "Transformers", "difficulty": "Intermediate"},

{"id": 26, "title": "Attention Mechanism in Deep Learning", 
 "description": "attention mechanism context vectors sequence to sequence models neural machine translation transformer NLP", 
 "category": "Transformers", "difficulty": "Intermediate"},

{"id": 27, "title": "Vision Transformers ViT", 
 "description": "vision transformer ViT image patches self attention computer vision image classification deep learning", 
 "category": "Transformers", "difficulty": "Advanced"},

{"id": 28, "title": "BERT vs GPT Models", 
 "description": "BERT GPT transformer encoder decoder masked language modeling autoregressive text generation NLP", 
 "category": "Transformers", "difficulty": "Beginner"},


# MLOps
{"id": 29, "title": "Introduction to MLOps", 
 "description": "MLOps machine learning deployment monitoring CI CD automation model lifecycle production systems", 
 "category": "MLOps", "difficulty": "Beginner"},

{"id": 30, "title": "Docker for Machine Learning", 
 "description": "docker containers reproducible environments machine learning deployment packaging models MLOps", 
 "category": "MLOps", "difficulty": "Intermediate"},

{"id": 31, "title": "Deploying Models with FastAPI", 
 "description": "FastAPI REST API machine learning deployment inference backend serving prediction endpoints python", 
 "category": "MLOps", "difficulty": "Intermediate"},

{"id": 32, "title": "Model Monitoring in Production", 
 "description": "model drift monitoring logging production AI systems data distribution MLOps reliability", 
 "category": "MLOps", "difficulty": "Advanced"},


# Data Science
{"id": 33, "title": "Data Cleaning with Pandas", 
 "description": "pandas dataframe missing values duplicates preprocessing feature cleaning data science python", 
 "category": "Data Science", "difficulty": "Beginner"},

{"id": 34, "title": "Exploratory Data Analysis EDA", 
 "description": "EDA visualization histograms boxplots correlations statistics data analysis python seaborn", 
 "category": "Data Science", "difficulty": "Beginner"},

{"id": 35, "title": "Feature Scaling Techniques", 
 "description": "normalization standardization min max scaling z score preprocessing machine learning features", 
 "category": "Data Science", "difficulty": "Intermediate"},

{"id": 36, "title": "Handling Imbalanced Datasets", 
 "description": "imbalanced classification SMOTE oversampling undersampling class weights machine learning", 
 "category": "Data Science", "difficulty": "Advanced"},


# GenAI
{"id": 37, "title": "Building Chatbots with LLMs", 
 "description": "chatbot conversational AI large language models prompt engineering retrieval augmented generation", 
 "category": "GenAI", "difficulty": "Intermediate"},

{"id": 38, "title": "Retrieval Augmented Generation RAG", 
 "description": "RAG vector database embeddings semantic search retrieval augmented generation LLM applications", 
 "category": "GenAI", "difficulty": "Advanced"},

{"id": 39, "title": "LangChain for AI Applications", 
 "description": "LangChain chains agents memory tools prompt templates large language model applications", 
 "category": "GenAI", "difficulty": "Intermediate"},

{"id": 40, "title": "Prompt Templates and Few Shot Learning", 
 "description": "few shot prompting prompt templates chain of thought in context learning large language models", 
 "category": "GenAI", "difficulty": "Beginner"},


# Computer Vision
{"id": 41, "title": "Face Detection using OpenCV", 
 "description": "face detection haar cascades OpenCV computer vision image processing webcam detection", 
 "category": "CV", "difficulty": "Beginner"},

{"id": 42, "title": "Image Segmentation Techniques", 
 "description": "image segmentation thresholding watershed semantic segmentation computer vision image analysis", 
 "category": "CV", "difficulty": "Intermediate"},

{"id": 43, "title": "Pose Estimation with MediaPipe", 
 "description": "pose estimation mediapipe human body keypoints computer vision tracking deep learning", 
 "category": "CV", "difficulty": "Intermediate"},

{"id": 44, "title": "Optical Flow in Video Analysis", 
 "description": "optical flow motion estimation video processing computer vision tracking movement analysis", 
 "category": "CV", "difficulty": "Advanced"},


# Reinforcement Learning
{"id": 45, "title": "Policy Gradient Methods", 
 "description": "policy gradient reinforcement learning optimization rewards neural policies actor critic", 
 "category": "RL", "difficulty": "Advanced"},

{"id": 46, "title": "Q-Learning Explained", 
 "description": "Q-learning reinforcement learning Bellman equation rewards agent environment exploration", 
 "category": "RL", "difficulty": "Beginner"},

{"id": 47, "title": "Actor Critic Algorithms", 
 "description": "actor critic reinforcement learning policy optimization value functions deep reinforcement learning", 
 "category": "RL", "difficulty": "Advanced"},

{"id": 48, "title": "Training Game Agents with RL", 
 "description": "reinforcement learning game agents rewards environments exploration exploitation Atari", 
 "category": "RL", "difficulty": "Intermediate"},


# Deep Learning
{"id": 49, "title": "Gradient Descent Optimization", 
 "description": "gradient descent optimization stochastic gradient descent Adam RMSprop neural networks deep learning", 
 "category": "Deep Learning", "difficulty": "Beginner"},

{"id": 50, "title": "Batch Normalization Explained", 
 "description": "batch normalization training stability deep neural networks covariate shift optimization", 
 "category": "Deep Learning", "difficulty": "Intermediate"},

{"id": 51, "title": "Autoencoders for Representation Learning", 
 "description": "autoencoders encoder decoder latent representations dimensionality reduction unsupervised learning", 
 "category": "Deep Learning", "difficulty": "Intermediate"},

{"id": 52, "title": "Sequence to Sequence Models", 
 "description": "sequence to sequence encoder decoder translation recurrent neural networks NLP deep learning", 
 "category": "Deep Learning", "difficulty": "Advanced"},


# ML Basics
{"id": 53, "title": "Linear Regression Fundamentals", 
 "description": "linear regression supervised learning prediction loss function machine learning basics", 
 "category": "ML Basics", "difficulty": "Beginner"},

{"id": 54, "title": "Decision Trees and Random Forests", 
 "description": "decision trees random forests ensemble learning classification regression machine learning", 
 "category": "ML Basics", "difficulty": "Intermediate"},

{"id": 55, "title": "Support Vector Machines SVM", 
 "description": "support vector machines hyperplane kernel trick classification machine learning supervised learning", 
 "category": "ML Basics", "difficulty": "Intermediate"},

{"id": 56, "title": "Clustering with K-Means", 
 "description": "K means clustering unsupervised learning centroids grouping machine learning data analysis", 
 "category": "ML Basics", "difficulty": "Beginner"},
]

df = pd.DataFrame(data)
df["corpus"] = (
    df["title"] + " " +
    df["title"] + " " +      
    df["description"] + " " +
    df["category"] + " " +
    df["difficulty"]
)

print(f"Total resources  : {len(df)}")
print(f"Categories       : {list(df['category'].unique())}")
print(f"Difficulty levels: {list(df['difficulty'].unique())}")
print()
print(df[["id", "title", "category", "difficulty"]].to_string(index=False))


# ============================================================
# SECTION 2: TF-IDF VECTORIZATION
# ============================================================

print("\n" + "=" * 60)
print("  SECTION 2: TF-IDF VECTORIZATION")
print("=" * 60)



def clean_text(text):
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9 ]", "", text)
    return text

df["corpus"] = df["corpus"].apply(clean_text)

vectorizer = TfidfVectorizer(
    stop_words="english",
    ngram_range=(1, 2),   # unigrams + bigrams
    min_df=1,
    max_df=0.85,
    max_features=1000,
    sublinear_tf=True     # log normalization on TF
)

tfidf_matrix = vectorizer.fit_transform(df["corpus"])
feature_names = vectorizer.get_feature_names_out()

print(f"TF-IDF matrix shape : {tfidf_matrix.shape}  ({tfidf_matrix.shape[0]} resources x {tfidf_matrix.shape[1]} features)")

# Top IDF-weighted terms (most distinctive)
idf_series = pd.Series(vectorizer.idf_, index=feature_names).sort_values(ascending=False)
print("\nTop 20 most distinctive terms (highest IDF weight):")
for term, score in idf_series.head(20).items():
    print(f"  {term:<35} IDF = {score:.4f}")


# ============================================================
# SECTION 3: INSPECT VECTOR FOR A SPECIFIC RESOURCE
# ============================================================

print("\n" + "=" * 60)
print("  SECTION 3: VECTOR INSPECTION (per resource)")
print("=" * 60)

def show_resource_vector(resource_id, top_n=12):
    idx = df[df["id"] == resource_id].index[0]
    title = df.loc[idx, "title"]
    vec = tfidf_matrix[idx].toarray().flatten()
    top_terms = pd.Series(vec, index=feature_names)
    top_terms = top_terms[top_terms > 0].sort_values(ascending=False).head(top_n)

    print(f"\nResource ID {resource_id}: '{title}'")
    print(f"Non-zero features: {(vec > 0).sum()} / {len(vec)}")
    print(f"{'Term':<35} {'TF-IDF':>8}  Bar")
    print("-" * 60)
    for term, score in top_terms.items():
        bar = "█" * int(score * 40)
        print(f"  {term:<33} {score:>8.4f}  {bar}")

show_resource_vector(1)   # CNN Basics Tutorial
show_resource_vector(5)   # Introduction to NLP
show_resource_vector(9)   # Deep Learning Fundamentals


# ============================================================
# SECTION 4: COSINE SIMILARITY MATRIX
# ============================================================

print("\n" + "=" * 60)
print("  SECTION 4: COSINE SIMILARITY MATRIX")
print("=" * 60)

cos_sim_matrix = cosine_similarity(tfidf_matrix)

print(f"Similarity matrix shape: {cos_sim_matrix.shape}")

# Show similarity of one resource vs all others
def show_similarities(resource_id):
    idx = df[df["id"] == resource_id].index[0]
    title = df.loc[idx, "title"]
    scores = cos_sim_matrix[idx]
    ranked = sorted(zip(df["title"], scores), key=lambda x: x[1], reverse=True)

    print(f"\nSimilarity scores for: '{title}'")
    print(f"{'Resource':<45} {'Score':>7}  Bar")
    print("-" * 65)
    for t, s in ranked:
        bar = "█" * int(s * 30)
        print(f"  {t:<43} {s:>7.4f}  {bar}")

show_similarities(1)   # CNN Basics


# ============================================================
# SECTION 5: RECOMMENDATION FUNCTION
# ============================================================

print("\n" + "=" * 60)
print("  SECTION 5: RECOMMENDATION FUNCTION")
print("=" * 60)

def recommend(query, top_k=5, difficulty=None, category=None, verbose=True):
    """
    Recommend HerStack resources for a given user query.

    Args:
        query      : str  - e.g. 'I want to learn CNN'
        top_k      : int  - number of results to return
        difficulty : str  - filter by 'Beginner' / 'Intermediate' / 'Advanced'
        category   : str  - filter by 'CNN' / 'NLP' / 'Deep Learning' / 'GenAI' etc.
        verbose    : bool - print matched query terms

    Returns:
        pd.DataFrame with top-k recommendations and similarity scores
    """
    query_vec = vectorizer.transform([query])

    if verbose:
        q_arr = query_vec.toarray().flatten()
        matched = pd.Series(q_arr, index=feature_names)
        matched = matched[matched > 0].sort_values(ascending=False)
        print(f"\nQuery : '{query}'")
        print(f"Matched terms in vocabulary ({len(matched)}): {list(matched.index)}")

    scores = cosine_similarity(query_vec, tfidf_matrix).flatten()

    results = df.copy()
    results["similarity_score"] = scores

    if difficulty:
        results = results[results["difficulty"] == difficulty]
    if category:
        results = results[results["category"] == category]

    top = (results
           .sort_values("similarity_score", ascending=False)
           .head(top_k)[["title", "category", "difficulty", "similarity_score"]]
           .reset_index(drop=True))
    top["similarity_score"] = top["similarity_score"].round(4)
    return top


# ============================================================
# SECTION 6: LIVE RECOMMENDATION EXAMPLES
# ============================================================

print("\n" + "=" * 60)
print("  SECTION 6: LIVE RECOMMENDATIONS")
print("=" * 60)

queries = [
    ("I want to learn CNN",                 {},                                          ),
    ("text classification language model",  {"difficulty": "Beginner"}                  ),
    ("generate images deep learning",       {}                                           ),
    ("neural network training from scratch",{"category": "Deep Learning"}               ),
    ("beginner machine learning basics",    {"difficulty": "Beginner"}                  ),
    ("reinforcement learning game agent",   {}                                           ),
]

for query, filters in queries:
    print(f"\n{'─'*60}")
    result = recommend(query, top_k=5, **filters)
    print(result.to_string(index=False))


# ============================================================
# SECTION 7: MODEL ACCURACY REPORT
# (KNN classifier trained on TF-IDF vectors → predicts category)
# This tells you how well TF-IDF captures semantic meaning per category
# ============================================================

print("\n" + "=" * 60)
print("  SECTION 7: MODEL ACCURACY REPORT")
print("  (KNN on TF-IDF vectors — category prediction)")
print("=" * 60)

le = LabelEncoder()
y = le.fit_transform(df["category"])
X = tfidf_matrix.toarray()

# --- Cross-validation (better than single split on small dataset) ---
knn = KNeighborsClassifier(n_neighbors=3, metric="cosine")

# With 24 samples across 7 categories (~3 per category), max safe CV = 3
n_folds = 3
cv_scores = cross_val_score(knn, X, y, cv=n_folds, scoring="accuracy")

print(f"\n{n_folds}-Fold Cross-Validation Accuracy (small dataset — 24 samples):")
for i, s in enumerate(cv_scores, 1):
    bar = "█" * int(s * 30)
    print(f"  Fold {i}: {s:.4f}  {bar}")
print(f"\n  Mean CV Accuracy : {cv_scores.mean():.4f}")
print(f"  Std Dev          : {cv_scores.std():.4f}")

# --- Train/test split for full classification report ---
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)

knn.fit(X_train, y_train)
y_pred = knn.predict(X_test)

print(f"\nTrain/Test Split (70/30):")
print(f"  Train samples : {len(X_train)}")
print(f"  Test samples  : {len(X_test)}")
print(f"  Test Accuracy : {accuracy_score(y_test, y_pred):.4f}")

print("\nClassification Report (per category):")
present_classes = np.unique(np.concatenate([y_test, y_pred]))
present_names   = le.inverse_transform(present_classes)
print(classification_report(
    y_test, y_pred,
    labels=present_classes,
    target_names=present_names,
    zero_division=0
))

print("Confusion Matrix:")
cm = confusion_matrix(y_test, y_pred, labels=present_classes)
cm_df = pd.DataFrame(cm, index=present_names, columns=present_names)
print(cm_df.to_string())

print("\nNOTE: Dataset has 53 samples. Cross-validation score is the")
print("more reliable metric here. Add more resources to improve accuracy.")


# ============================================================
# SECTION 8: INTERACTIVE MODE
# ============================================================

print("\n" + "=" * 60)
print("  SECTION 8: INTERACTIVE MODE")
print("  Type a topic to get recommendations. Type 'quit' to exit.")
print("=" * 60)

while True:
    print()
    query = input("Enter your topic (or 'quit'): ").strip()
    if query.lower() in ("quit", "exit", "q"):
        print("Exiting. Happy learning!")
        break
    if not query:
        continue

    diff = input("Filter by difficulty? (Beginner / Intermediate / Advanced / skip): ").strip()
    diff = diff if diff in ("Beginner", "Intermediate", "Advanced") else None

    cat = input("Filter by category? (CNN / NLP / Deep Learning / GenAI / ML Basics / CV / RL / skip): ").strip()
    cat = cat if cat in ("CNN", "NLP", "Deep Learning", "GenAI", "ML Basics", "CV", "RL") else None

    result = recommend(query, top_k=5, difficulty=diff, category=cat, verbose=True)
    print("\nTop Recommendations:")
    print(result.to_string(index=False))