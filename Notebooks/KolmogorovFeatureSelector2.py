from itertools import combinations
from scipy.stats import ks_2samp
from joblib import Parallel, delayed
import pandas as pd
import numpy as np
import time

class KolmogorovFeatureSelector:
    def __init__(self, threshold=0.95, n_jobs=-1):
        self.threshold = threshold
        self.similar_features = {}
        self.n_jobs = n_jobs

    def _compare_pair(self, f1, f2, features, labels, class_pairs):
        p_values = []

        for class1, class2 in class_pairs:
            group1 = features[labels == class1][f1]
            group2 = features[labels == class2][f2]

            # ks_2samp can fail if group is empty
            if len(group1) == 0 or len(group2) == 0:
                continue

            stat, p_value = ks_2samp(group1, group2)
            p_values.append(p_value)

        if p_values:
            mean_p_value = sum(p_values) / len(p_values)
            if mean_p_value > self.threshold:
                return (f1, f2, mean_p_value)
        return None

    def fit(self, features: pd.DataFrame, labels: pd.Series):
        start_time = time.time()
        print("[INFO] Rozpoczynam analizę Kołmogorowa na wszystkich parach cech...")

        features = features.astype(np.float32)  # zmniejsz RAM
        feature_names = features.columns
        class_pairs = list(combinations(labels.unique(), 2))
        feature_pairs = list(combinations(feature_names, 2))

        results = Parallel(n_jobs=self.n_jobs, verbose=5)(
            delayed(self._compare_pair)(f1, f2, features, labels, class_pairs)
            for f1, f2 in feature_pairs
        )

        for res in results:
            if res is not None:
                f1, f2, mean_p_value = res
                self.similar_features.setdefault(f1, []).append((f2, mean_p_value))

        print(f"[INFO] Zakończono w {time.time() - start_time:.2f} sekund.")

    def get_similar_features(self):
        return self.similar_features
