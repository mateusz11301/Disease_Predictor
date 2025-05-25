from itertools import combinations
from scipy.stats import ks_2samp  # Funkcja licząca test statystyczny porównujący dwa rozkłady
import pandas as pd  # Funkcja zwracająca wszystkie możliwe pary bez powtórzeń z danego zbioru

class KolmogorovFeatureSelector:
    def __init__(self, threshold=0.05):
        self.threshold = threshold  # Próg wartości używany w teście Kołmogorowa (domyślnie jeśli podobieństow będzie > 0.95 to cechy są podobne)
        self.similar_features = {}

    def fit(self, features: pd.DataFrame, labels: pd.Series):
        self.similar_features = {}

        feature_names = features.columns
        class_pairs = list(combinations(labels.unique(), 2))  # Wszystkie możliwe pary klas

        for f1, f2 in combinations(feature_names, 2):  # Wszystkie pary cech
            p_values = []

            for class1, class2 in class_pairs:
                group1 = features[labels == class1][f1]  # Wartości cechy dla pierwszej klasy (np. kaszel przy grypie)
                group2 = features[labels == class2][f2]  # Wartości cechy dla drugiej klasy (np. kaszel przy raku)

                stat, p_value = ks_2samp(group1, group2)  # Test Kołmogorowa - mierzy różnicę między rozkładami group1 i group2

                p_values.append(p_value)

            mean_p_value = sum(p_values) / len(p_values)  # Średnie podobieństwo między klasami

            if mean_p_value > self.threshold:
                self.similar_features.setdefault(f1, []).append((f2, mean_p_value))

    def get_similar_features(self):
        return self.similar_features


if __name__ == '__main__':
    features = pd.DataFrame({
        'kaszel': [1, 1, 0, 0, 1, 0, 0, 0],
        'gorączka': [1, 1, 0, 0, 1, 0, 1, 0],
        'ból_gardła': [0, 0, 1, 1, 0, 1, 0, 1],
        'duszność': [1, 0, 1, 0, 1, 0, 1, 0]
    })

    labels = pd.Series([
        "grypa", "grypa", "grypa", "grypa",
        "covid", "covid", "covid", "covid"
    ])

    selector = KolmogorovFeatureSelector(threshold=0.8)
    selector.fit(features, labels)
    print(selector.get_similar_features())

    # Rozkłady wartości tych cech są identyczne między klasami grypa i covid

"""
Testuje każdą cechę (np. 'kaszel') osobno, sprawdzając czy jest istotna statystycznie
pomiędzy różnymi klasami (np. 'grypa' vs 'rak'). 

Jeśli dana cecha nie różni się znacząco w żadnej parze klas — uznaje się ją za zbędną.

Zastosowanie: można te cechy usunąć z danych wejściowych, by uprościć model i poprawić jego ogólność.
"""