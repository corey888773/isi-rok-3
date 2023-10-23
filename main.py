from striper import stip_herbal_pages, count_words, prepare_icelandic
from zipf import prepare_ranks_list
from matplotlib import pyplot as plt
import os


def main():
    script_folder = os.path.dirname(os.path.realpath(__file__))

    # manuscript
    raw_file = os.path.join(script_folder, 'data', 'manuscript.txt')
    herbal_pages_file = os.path.join(script_folder, 'data', 'herbal_manuscript.txt')

    stip_herbal_pages(in_file=raw_file, out_file=herbal_pages_file)
    
    manuscript_word_counts = count_words(in_file=herbal_pages_file)
    manuscript_ranks = prepare_ranks_list(word_counts=manuscript_word_counts)

    # irelandic book
    raw_file = os.path.join(script_folder, 'data', 'Um góðu verkin_djvu.txt')
    output_file = os.path.join(script_folder, 'data', 'icelandic.txt')

    prepare_icelandic(in_file=raw_file, out_file=output_file) 

    icelandic_word_counts = count_words(in_file=output_file)
    icelandic_ranks = prepare_ranks_list(word_counts=icelandic_word_counts)

    # plot
    fig, axs = plt.subplots(1, 2, figsize=(15, 5))
    axs[0].plot(manuscript_ranks.keys(), manuscript_ranks.values())
    axs[0].set_title('Manuscript')
    axs[0].set_xlabel('Rank')
    axs[0].set_ylabel('Frequency')
    axs[0].set_xscale('log')
    axs[0].set_yscale('log')

    axs[1].plot(icelandic_ranks.keys(), icelandic_ranks.values())
    axs[1].set_title('Icelandic')
    axs[1].set_xlabel('Rank')
    axs[1].set_ylabel('Frequency')
    axs[1].set_xscale('log')
    axs[1].set_yscale('log')

    plt.show()


if __name__ == "__main__":
    main()