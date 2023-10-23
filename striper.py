import os, re

def stip_herbal_pages(in_file, out_file):
    # if os.path.exists(out_file):
    #     return

    herbal_page = False
    with open(in_file, 'r') as f:
        with open(out_file, 'w') as out_file:
            for line in f:
                if line.startswith('#'):
                    if 'herbal' in line:
                        herbal_page = True
                        continue

                    if 'page' in line:
                        herbal_page = False # reset state
                        continue
                    
                    continue

                if herbal_page:
                    line = line.replace('\n', '')
                    line = line.replace('=', '')
                    line = line.replace('-', '')
                    out_file.write(line)


def prepare_icelandic(in_file, out_file):
    if os.path.exists(out_file):
        return

    with open(in_file, 'r') as f:
        with open(out_file, 'w') as out_file:
            temp = ''
            for line in f:
                line = line.replace('\n', '')
                # remove non-alphabetical characters using regex
                line = re.sub(r'[^a-zA-ZáðéíóúýþæÁÐÉÍÓÚÝÞÆ\s-]', '', line)

                if temp != '':
                    line = temp + line
                    temp = ''

                words = line.split(' ')
                # remove '' from list
                words = list(filter(lambda x: x != '', words))
                if len(words) == 0:
                    continue

                if temp != '':
                    words[0] = temp + words[0]
                    temp = ''

                if words[-1].endswith('-'):
                    temp = words[-1].rstrip('-')
                    words = words[:-1]  

                out_file.write(','.join(words))

def count_words (in_file) -> dict():
    word_counts = dict()

    with open(in_file, 'r') as f:
        for line in f:
            words = line.split(',')
            for word in words:
                try:
                    if '(' in word or ')' in word or word == '':
                        continue
                    elif word not in word_counts:
                        word_counts[word] = 1
                    else:
                        word_counts[word] += 1
                except IndexError:
                    continue

    return word_counts