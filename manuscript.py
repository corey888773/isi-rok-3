#!/usr/bin/env python
# coding: utf-8

# # Initial Setup

# In[1]:


from matplotlib import pyplot as plt
import os, re

# text preprocessing
from striper import stip_herbal_pages, count_words, get_words, prepare_icelandic

# Zipf's law
import pandas as pd # for dataframes in zipf
from zipf import zipf_ranks_list, zipf_constant, zipf_inv_word_frequency

# n-grams and bigrams
from ngrams import get_ngrams, ngrams_freq, bigraph_freq

# Path to the manuscript
current_dir = os.getcwd()
script_dir = os.path.join(current_dir)


# ## Prepare voynich manuscript and count words

# In[2]:


# manuscript
raw_file = os.path.join(script_dir, 'data', 'manuscript.txt')
rdy_manuscript_file = os.path.join(script_dir, 'data', 'herbal_manuscript.txt')

stip_herbal_pages(in_file=raw_file, out_file=rdy_manuscript_file)
    
manuscript_word_counts = count_words(in_file=rdy_manuscript_file)
print(manuscript_word_counts)


# ## Prepare icelandic text and count words

# In[3]:


# irelandic book
raw_file = os.path.join(script_dir, 'data', 'Um góðu verkin_djvu.txt')
rdy_icelandic_file = os.path.join(script_dir, 'data', 'icelandic.txt')

prepare_icelandic(in_file=raw_file, out_file=rdy_icelandic_file) 

icelandic_word_counts = count_words(in_file=rdy_icelandic_file)
print(icelandic_word_counts)


# ## Zipf constant (rankf * freq) to rank

# In[19]:


manuscript_zipf_constant = zipf_constant(word_counts=manuscript_word_counts)
icelandic_zipf_constant = zipf_constant(word_counts=icelandic_word_counts)

fig, ax = plt.subplots(1, 2, figsize=(15, 5))

ax[0].plot(manuscript_zipf_constant, color='red')
ax[0].set_title('Manuscript')
ax[0].set_xlabel('Rank')
ax[0].set_ylabel('Zipf Constant')
ax[0].grid(True)

ax[1].plot(icelandic_zipf_constant, color='blue')
ax[1].set_title('Icelandic book')
ax[1].set_xlabel('Rank')
ax[1].set_ylabel('Zipf Constant')
ax[1].grid(True)

plt.show()


# ## Zipf law 1/frequency to rank

# In[20]:


manuscript_freq = zipf_inv_word_frequency(word_counts=manuscript_word_counts)
icelandic_freq = zipf_inv_word_frequency(word_counts=icelandic_word_counts)

fig, ax = plt.subplots(1, 2, figsize=(15, 5))

ax[0].plot(manuscript_freq, color='red')
ax[0].set_title('Manuscript')
ax[0].set_xlabel('Rank')
ax[0].set_ylabel('Inverse Word Frequency')
ax[0].grid(True)

ax[1].plot(icelandic_freq, color='blue')
ax[1].set_title('Icelandic book')
ax[1].set_xlabel('Rank')
ax[1].set_ylabel('Inverse Word Frequency')
ax[1].grid(True)

plt.show()


# # Zipf law frequency to rank

# In[21]:


manuscript_ranks = zipf_ranks_list(word_counts=manuscript_word_counts)
icelandic_ranks = zipf_ranks_list(word_counts=icelandic_word_counts)
fig, axs = plt.subplots(1, 2, figsize=(15, 5))

axs[0].plot(manuscript_ranks.keys(), manuscript_ranks.values(), color='red')
axs[0].set_title('Manuscript')
axs[0].set_xlabel('Rank')
axs[0].set_ylabel('Frequency')
axs[0].set_xscale('log')
axs[0].set_yscale('log')
axs[0].grid(True)

axs[1].plot(icelandic_ranks.keys(), icelandic_ranks.values(), color='blue')
axs[1].set_title('Icelandic')
axs[1].set_xlabel('Rank')
axs[1].set_ylabel('Frequency')
axs[1].set_xscale('log')
axs[1].set_yscale('log')
axs[1].grid(True)

plt.show()


# ## Counting N-grams

# In[22]:


icelandic_words = get_words(in_file=rdy_icelandic_file)
manuscript_words = get_words(in_file=rdy_manuscript_file)

print(f'Icelandic words: {len(icelandic_words)}')
for n in range(2, 15):
    ngrams = get_ngrams(icelandic_words, n)
    ngram_counts = ngrams_freq(ngrams)
    print(f'{n}-grams: {ngram_counts[:5]}')

print(f'Voynich words: {len(manuscript_words)}')
for n in range(2, 15):
    ngrams = get_ngrams(manuscript_words, n)
    ngram_counts = ngrams_freq(ngrams)
    print(f'{n}-grams: {ngram_counts[:5]}')


# ## Bipartite graph for Icelandic text

# In[23]:


print(f'Icelandic bigraphs: {bigraph_freq(icelandic_words)}')

