export const ALGORITHM_DATA = {
  "knn": {
    id: "knn",
    name: "K-Nearest Neighbors",
    analogy: "Imagine moving to a new city and asking the 3 neighbors closest to your house what their favorite restaurant is; whatever the majority says becomes your new favorite too.",
    about: "K-Nearest Neighbors is an instance-based learning algorithm. Instead of learning a complex mathematical model during training, it simply memorizes the dataset. When asked to classify a new data point, it looks at the 'K' closest points (neighbors) and assigns the majority class to the new point.",
    type: "Supervised Learning - Classification",
    tags: ["Instance-based", "Lazy Learning", "Distance Metric", "Non-parametric"],
    history: [
      { year: "1951", event: "Introduced by Evelyn Fix and J.L. Hodges as an unpublished technical report." },
      { year: "1967", event: "Expanded by Thomas Cover and Peter Hart, formally proving its mathematical properties." },
      { year: "1990s", event: "Gained widespread popularity with the rise of modern computing power allowing fast distance calculations." }
    ],
    pros: [
      "Extremely simple to understand and implement.",
      "No explicit training phase (lazy learning).",
      "Naturally handles multi-class cases without modification."
    ],
    cons: [
      "Computationally expensive at scale (calculates distance to all points).",
      "High memory requirement to store the entire dataset.",
      "Sensitive to irrelevant features and the scale of the data."
    ],
    whenToUse: [
      "When the dataset is relatively small.",
      "When you need a baseline classifier quickly.",
      "When data is noise-free and dimensions are small."
    ],
    whenNotToUse: [
      "Large datasets where inference speed is critical.",
      "High-dimensional data (curse of dimensionality).",
      "Imbalanced datasets where majority classes can dominate."
    ]
  },
  "linear-regression": {
    id: "linear-regression",
    name: "Linear Regression",
    analogy: "Imagine drawing a straight line through a scatterplot of dots so that the line is as close as possible to all the dots at once.",
    about: "Linear Regression models the relationship between a dependent variable and one or more independent variables by fitting a linear equation to observed data. It is one of the most fundamental algorithms in statistics and machine learning.",
    type: "Supervised Learning - Regression",
    tags: ["Regression", "Parametric", "Continuous Output"],
    history: [
      { year: "1805", event: "The method of least squares was first published by Legendre." },
      { year: "1809", event: "Carl Friedrich Gauss published a deeper analysis of the least squares method." },
      { year: "1880s", event: "Francis Galton coined the term 'regression' while studying the heights of descendants of tall ancestors." }
    ],
    pros: [
      "Fast to train and highly interpretable.",
      "Works exceptionally well on linearly separable data.",
      "Provides clear statistical significance of variables."
    ],
    cons: [
      "Assumes a linear relationship between input and output.",
      "Highly sensitive to outliers.",
      "Struggles with complex, non-linear relationships."
    ],
    whenToUse: [
      "Predicting continuous numerical values (e.g., prices, temperature).",
      "When interpretability of the model is a strict requirement.",
      "Establishing baseline performance before using complex models."
    ],
    whenNotToUse: [
      "When the data has severe non-linear patterns.",
      "Classification tasks (use Logistic Regression instead).",
      "When features are highly correlated (multicollinearity)."
    ]
  },
  "kmeans": {
    id: "kmeans",
    name: "K-Means Clustering",
    analogy: "Imagine throwing a party and asking everyone to form groups based on who they are standing closest to, then moving the center of each group until everyone is perfectly clustered.",
    about: "K-Means is an unsupervised clustering algorithm. It partitions a dataset into K distinct, non-overlapping clusters. It iteratively assigns data points to the nearest cluster centroid and then updates the centroids based on the new assignments.",
    type: "Unsupervised Learning - Clustering",
    tags: ["Clustering", "Centroid-based", "Iterative"],
    history: [
      { year: "1957", event: "Originated in signal processing by Stuart Lloyd (though not published until 1982)." },
      { year: "1965", event: "Edward W. Forgy independently published the same method." },
      { year: "1967", event: "The term 'k-means' was first used by James MacQueen." }
    ],
    pros: [
      "Simple to implement and guarantees convergence.",
      "Scales reasonably well to large datasets.",
      "Easily adapts to new examples."
    ],
    cons: [
      "You must manually choose the value of k.",
      "Sensitive to the initial placement of centroids.",
      "Struggles with non-spherical clusters or varying sizes."
    ],
    whenToUse: [
      "Customer segmentation and grouping similar items.",
      "Image compression or color quantization.",
      "When the underlying clusters are expected to be roughly spherical."
    ],
    whenNotToUse: [
      "When clusters are complex, overlapping, or non-spherical.",
      "When data has many outliers, which can drag centroids away."
    ]
  },
  "neural-network": {
    id: "neural-network",
    name: "Neural Network",
    analogy: "Imagine a complex assembly line of workers where each worker looks at a small piece of a puzzle and passes their guess to the next worker, until the final worker shouts the answer.",
    about: "Neural Networks are a series of algorithms that endeavor to recognize underlying relationships in a set of data through a process that mimics the way the human brain operates. They consist of input, hidden, and output layers of interconnected nodes.",
    type: "Deep Learning - Supervised/Unsupervised",
    tags: ["Deep Learning", "Non-linear", "Black Box"],
    history: [
      { year: "1943", event: "McCulloch and Pitts created the first mathematical model of a biological neuron." },
      { year: "1958", event: "Frank Rosenblatt introduced the Perceptron, the simplest form of a neural network." },
      { year: "1986", event: "Backpropagation was popularized by Rumelhart, Hinton, and Williams, enabling deep networks." }
    ],
    pros: [
      "Incredible performance on complex, unstructured data (images, text).",
      "Can approximate almost any function (Universal Approximation Theorem).",
      "Feature engineering is largely automated in deep networks."
    ],
    cons: [
      "Black box nature makes them hard to interpret.",
      "Requires massive amounts of data and computational power.",
      "Prone to overfitting on small datasets."
    ],
    whenToUse: [
      "Image recognition, NLP, and complex sequence predictions.",
      "When you have extremely large datasets.",
      "When traditional algorithms plateau in accuracy."
    ],
    whenNotToUse: [
      "When interpretability and explainability are required.",
      "Small datasets where simpler models perform just as well.",
      "When computational resources (GPUs/TPUs) are strictly limited."
    ]
  },
  "decision-tree": {
    id: "decision-tree",
    name: "Decision Tree",
    analogy: "Imagine playing '20 Questions' where each question splits the remaining possibilities in half until you guess the right answer.",
    about: "A Decision Tree is a flowchart-like structure where each internal node represents a 'test' on an attribute, each branch represents the outcome of the test, and each leaf node represents a class label. It literally splits data based on questions.",
    type: "Supervised Learning - Classification/Regression",
    tags: ["Tree-based", "Interpretable", "Non-parametric"],
    history: [
      { year: "1963", event: "Morgan and Sonquist proposed the AID (Automatic Interaction Detection) method." },
      { year: "1984", event: "Leo Breiman and colleagues published CART (Classification and Regression Trees)." },
      { year: "1993", event: "Ross Quinlan introduced C4.5, a major improvement in generating decision trees." }
    ],
    pros: [
      "Extremely interpretable; the model can be visualized and explained.",
      "Requires very little data preprocessing (no need to scale or normalize).",
      "Handles both numerical and categorical data naturally."
    ],
    cons: [
      "Highly prone to overfitting (creating overly complex trees that don't generalize).",
      "Small changes in data can result in a completely different tree structure.",
      "Biased towards features with more levels."
    ],
    whenToUse: [
      "When decisions need to be explained to non-technical stakeholders.",
      "When the dataset has a mix of categorical and numerical variables.",
      "When data scaling or normalization is difficult to maintain."
    ],
    whenNotToUse: [
      "When maximum accuracy is required on complex datasets (use Random Forests instead).",
      "When the dataset is very small and noisy (leads to extreme overfitting)."
    ]
  },
  "logistic-regression": {
    id: "logistic-regression",
    name: "Logistic Regression",
    analogy: "Imagine taking the straight line from linear regression and bending it into an 'S' shape so that no matter how extreme the inputs get, the output is always squeezed between 0% and 100% certainty.",
    about: "Logistic Regression is used for binary classification. It models the probability of a discrete outcome given an input variable. By passing a linear combination of inputs through a sigmoid or logistic function, it outputs a probability score between 0 and 1.",
    type: "Supervised Learning - Classification",
    tags: ["Classification", "Probabilistic", "Parametric"],
    history: [
      { year: "1838", event: "The logistic function was introduced by Pierre François Verhulst to study population growth." },
      { year: "1944", event: "Joseph Berkson formalized logistic regression and coined the term 'logit'." },
      { year: "1958", event: "David Cox brought the logistic regression model into mainstream statistics." }
    ],
    pros: [
      "Highly interpretable; the weights give the odds ratio of the features.",
      "Very fast to train and predict.",
      "Outputs a calibrated probability score, not just a hard class assignment."
    ],
    cons: [
      "Assumes a linear boundary between classes.",
      "Struggles with non-linear or highly complex relationships.",
      "Requires independent observations."
    ],
    whenToUse: [
      "Binary classification problems (e.g., spam detection, disease diagnosis).",
      "When you need a probabilistic understanding of the predictions.",
      "When interpretability of feature importance is required."
    ],
    whenNotToUse: [
      "When the classes are severely overlapping in a non-linear way.",
      "When there are a massive number of uninformative features.",
      "For multi-class problems (though multinomial logistic exists, trees/neural nets are often preferred)."
    ]
  },
  "random-forest": {
    id: "random-forest",
    name: "Random Forest",
    analogy: "Imagine asking a single expert for advice (a Decision Tree), but instead, you ask 100 different experts who each only know a fraction of the story, and then you take a majority vote. The crowd's wisdom is always more accurate.",
    about: "Random Forest is an ensemble learning method that constructs a multitude of decision trees at training time. For classification tasks, the output of the random forest is the class selected by most trees. It corrects for decision trees' habit of overfitting to their training set.",
    type: "Supervised Learning - Ensemble",
    tags: ["Ensemble", "Tree-based", "Bagging"],
    history: [
      { year: "1995", event: "Tin Kam Ho introduced random decision forests, utilizing the random subspace method." },
      { year: "2001", event: "Leo Breiman formalized the modern Random Forest algorithm by combining bagging and random feature selection." }
    ],
    pros: [
      "One of the most accurate algorithms for tabular data out-of-the-box.",
      "Highly robust against overfitting compared to individual decision trees.",
      "Provides internal estimates of feature importance."
    ],
    cons: [
      "Much slower to predict than a single decision tree or linear model.",
      "Requires significantly more memory to store all the trees.",
      "Loses the easy interpretability of a single decision tree."
    ],
    whenToUse: [
      "When high accuracy is the primary goal on tabular (row/column) data.",
      "When you don't want to spend hours tuning hyper-parameters (works great default).",
      "When the dataset has lots of missing values or categorical features."
    ],
    whenNotToUse: [
      "When strict real-time inference speed is demanded on limited hardware.",
      "On completely unstructured data like raw images or audio.",
      "When you must explain the exact logical path of a single prediction."
    ]
  }
};
