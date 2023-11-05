import pandas as pd

def zipf_ranks_list(word_counts : dict) -> dict:
    rank_counts = {}
    sorted_counts = sorted(word_counts.items(),key=lambda x: x[1], reverse=True)
    for i, tup in enumerate(sorted_counts):
        rank_counts[i + 1] = tup[1]

    return  rank_counts

def zipf_constant(word_counts : dict) -> list[int]:
    sorted_word_counts = dict(sorted(word_counts.items(), key=lambda item: item[1], reverse=True))
    ranked_word_counts =  dict(zip([i for i in range(1, len(sorted_word_counts))], list(sorted_word_counts.values())))
    return [k*v for (k,v) in ranked_word_counts.items()]

def zipf_inv_word_frequency(word_counts : dict[str, int]) -> dict[int, int]:
    sorted_word_counts = dict(sorted(word_counts.items(), key=lambda item: item[1], reverse=True))
    values = [1/v for v in list(sorted_word_counts.values())] 

    return pd.DataFrame(values, index=range(1, len(sorted_word_counts)+1), columns=['Frequency'])