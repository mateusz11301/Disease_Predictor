from scipy.stats import ks_2samp
from sklearn.base import BaseEstimator, TransformerMixin
import pandas as pd

class KolmogorovFeatureSelector(BaseEstimator, TransformerMixin):
    def __init__(self, threshold=0.99, verbose=False):
        self.threshold = threshold
        self.verbose = verbose
        self.features_to_remove_ = []

    def fit(self, X, y=None):
        X = pd.DataFrame(X)  # Na wypadek, gdyby podano np. numpy array
        n_features = X.shape[1]
        self.features_to_remove_ = []
        checked_pairs = set()

        for i in range(n_features):
            for j in range(i + 1, n_features):
                col1, col2 = X.columns[i], X.columns[j]
                pair = tuple(sorted((col1, col2)))
                if pair in checked_pairs:
                    continue
                checked_pairs.add(pair)

                stat, p_value = ks_2samp(X[col1], X[col2])
                if p_value > self.threshold:
                    self.features_to_remove_.append(col2)
                    if self.verbose:
                        print(f"Usuwam cechę: {col2} (podobna do {col1}, p={p_value:.3f})")

        return self

    def transform(self, X):
        X = pd.DataFrame(X)
        return X.drop(columns=self.features_to_remove_, errors="ignore")
