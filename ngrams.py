from collections import Counter

def get_ngrams(words, n) -> list[tuple]:
    ngrams = [tuple(words[i:i + n]) for i in range(len(words) - n + 1)]
    return ngrams

def ngrams_freq(ngrams) -> list[tuple]:
    ngram_counts = dict(Counter(ngrams))
    return list(sorted(ngram_counts.items(), key=lambda item: item[1], reverse=True))

def bigraph_freq(words) -> dict[str, int]:
    t_grams = get_ngrams(words, 2)
    unique_bigrams = set(t_grams)

    left_words = Counter()
    for bigram in unique_bigrams:
        left_words[bigram[0]] += 1

    return left_words