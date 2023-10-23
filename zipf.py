
def prepare_ranks_list(word_counts : dict) -> dict:
    rank_counts = {}
    sorted_counts = sorted(word_counts.items(),key=lambda x: x[1], reverse=True)
    for i, tup in enumerate(sorted_counts):
        rank = i + 1
        rank_counts[rank] = tup[1]

    return  rank_counts