#!/usr/bin/env python3
"""
Cambridge IELTS PDF & Audio Server-Side Downloader
Downloads Cambridge IELTS 11-19 PDFs and MP3s directly to public/cambridge/
Provides instant local loading for the Cambridge Mock Tests Hub.
"""

import os
import sys
import urllib.request
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_CAMBRIDGE = os.path.join(BASE_DIR, 'public', 'cambridge')
PDF_DIR = os.path.join(PUBLIC_CAMBRIDGE, 'pdf')
AUDIO_DIR = os.path.join(PUBLIC_CAMBRIDGE, 'audio')

os.makedirs(PDF_DIR, exist_ok=True)
os.makedirs(AUDIO_DIR, exist_ok=True)

ARCHIVE_BASE = 'https://archive.org/download/cambridge-ielts-books'

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

DOWNLOAD_QUEUE = []

# Cambridge 14
DOWNLOAD_QUEUE.append({
    'url': f"{ARCHIVE_BASE}/book%2012-20/14/Cambridge%2014.pdf",
    'dest': os.path.join(PDF_DIR, 'Cambridge-14.pdf'),
    'label': 'C14 PDF'
})
for t in range(1, 5):
    for s in range(1, 5):
        DOWNLOAD_QUEUE.append({
            'url': f"{ARCHIVE_BASE}/book%2012-20/14/C14T{t}S{s}.mp3",
            'dest': os.path.join(AUDIO_DIR, f"c14-t{t}-s{s}.mp3"),
            'label': f"C14 T{t} Part {s}"
        })

# Cambridge 15
DOWNLOAD_QUEUE.append({
    'url': f"{ARCHIVE_BASE}/book%2012-20/15/Cambridge%2015.pdf",
    'dest': os.path.join(PDF_DIR, 'Cambridge-15.pdf'),
    'label': 'C15 PDF'
})
for t in range(1, 5):
    for s in range(1, 5):
        DOWNLOAD_QUEUE.append({
            'url': f"{ARCHIVE_BASE}/book%2012-20/15/IELTS15_test{t}_audio{s}.mp3",
            'dest': os.path.join(AUDIO_DIR, f"c15-t{t}-s{s}.mp3"),
            'label': f"C15 T{t} Part {s}"
        })

# Cambridge 16
DOWNLOAD_QUEUE.append({
    'url': f"{ARCHIVE_BASE}/book%2012-20/16/Cambridge%2016.pdf",
    'dest': os.path.join(PDF_DIR, 'Cambridge-16.pdf'),
    'label': 'C16 PDF'
})
for t in range(1, 5):
    for s in range(1, 5):
        url = (
            f"{ARCHIVE_BASE}/book%2012-20/16/AUDIO/Test%201%20Part%202%20%20%5B%40cambridgematerials%5D.mp3"
            if t == 1 and s == 2
            else f"{ARCHIVE_BASE}/book%2012-20/16/AUDIO/Test%20{t}%20Part%20{s}%20%5B%40cambridgematerials%5D.mp3"
        )
        DOWNLOAD_QUEUE.append({
            'url': url,
            'dest': os.path.join(AUDIO_DIR, f"c16-t{t}-s{s}.mp3"),
            'label': f"C16 T{t} Part {s}"
        })

# Cambridge 17
DOWNLOAD_QUEUE.append({
    'url': f"{ARCHIVE_BASE}/book%2012-20/17/Cambridge%2017.pdf",
    'dest': os.path.join(PDF_DIR, 'Cambridge-17.pdf'),
    'label': 'C17 PDF'
})
for t in range(1, 5):
    for s in range(1, 5):
        DOWNLOAD_QUEUE.append({
            'url': f"{ARCHIVE_BASE}/book%2012-20/17/AUDIO/TEST/Camb%2017%20{t}-{s}.mp3",
            'dest': os.path.join(AUDIO_DIR, f"c17-t{t}-s{s}.mp3"),
            'label': f"C17 T{t} Part {s}"
        })

# Cambridge 18
DOWNLOAD_QUEUE.append({
    'url': f"{ARCHIVE_BASE}/book%2012-20/18/Cambridge%2018.pdf",
    'dest': os.path.join(PDF_DIR, 'Cambridge-18.pdf'),
    'label': 'C18 PDF'
})
for t in range(1, 5):
    for s in range(1, 5):
        DOWNLOAD_QUEUE.append({
            'url': f"{ARCHIVE_BASE}/book%2012-20/18/Cambridge%20IELTS%2018%20Audio/Test-{t}-Part-{s}.mp3",
            'dest': os.path.join(AUDIO_DIR, f"c18-t{t}-s{s}.mp3"),
            'label': f"C18 T{t} Part {s}"
        })

# Cambridge 19
DOWNLOAD_QUEUE.append({
    'url': f"{ARCHIVE_BASE}/book%2012-20/19/Cambridge%2019.pdf",
    'dest': os.path.join(PDF_DIR, 'Cambridge-19.pdf'),
    'label': 'C19 PDF'
})
c19_audio = [
    (1, 1, f"{ARCHIVE_BASE}/book%2012-20/19/AUDIO/TEST1/P1%20-%20Hinchingbrooke%20Country%20Park.mp3"),
    (1, 2, f"{ARCHIVE_BASE}/book%2012-20/19/AUDIO/TEST1/P2%20-%20Stanthrope%20Twinning%20Association%20-%20Farley%20House.mp3"),
    (1, 3, f"{ARCHIVE_BASE}/book%2012-20/19/AUDIO/TEST1/P3_Food_trends_Colin_find_most_satifying_about_his_bread_reuse_project.mp3"),
    (1, 4, f"{ARCHIVE_BASE}/book%2012-20/19/AUDIO/TEST1/P4%20-%20Ceide%20Fields.mp3"),
    (2, 1, f"{ARCHIVE_BASE}/book%2012-20/19/AUDIO/TEST2/Cam%2019%20-%20Test%202%20-%20Part%201.mp3"),
    (2, 2, f"{ARCHIVE_BASE}/book%2012-20/19/AUDIO/TEST2/Cam%2019%20-%20Test%202%20-%20Part%202.mp3"),
    (2, 3, f"{ARCHIVE_BASE}/book%2012-20/19/AUDIO/TEST2/Cam%2019%20-%20Test%202%20-%20Part%203.mp3"),
    (2, 4, f"{ARCHIVE_BASE}/book%2012-20/19/AUDIO/TEST2/Cam%2019%20-%20Test%202%20-%20Part%204.mp3"),
]
for t, s, u in c19_audio:
    DOWNLOAD_QUEUE.append({
        'url': u,
        'dest': os.path.join(AUDIO_DIR, f"c19-t{t}-s{s}.mp3"),
        'label': f"C19 T{t} Part {s}"
    })

# Cambridge 13
DOWNLOAD_QUEUE.append({
    'url': f"{ARCHIVE_BASE}/book%2012-20/13/Cambridge%2013.pdf",
    'dest': os.path.join(PDF_DIR, 'Cambridge-13.pdf'),
    'label': 'C13 PDF'
})
c13_audio = [
    (1, 1, f"{ARCHIVE_BASE}/book%2012-20/13/IELTS13-Test%201%2CSection-1.mp3"),
    (1, 2, f"{ARCHIVE_BASE}/book%2012-20/13/IELTS13-Test%201%2C%20Section%202.mp3"),
    (1, 3, f"{ARCHIVE_BASE}/book%2012-20/13/IELTS13-Test%201%2C%20Section%203.mp3"),
    (1, 4, f"{ARCHIVE_BASE}/book%2012-20/13/IELTS13-Test%201%2C%20Section%204.mp3"),
    (2, 1, f"{ARCHIVE_BASE}/book%2012-20/13/IELTS13-Test%202%2C%20Section%201.mp3"),
    (2, 2, f"{ARCHIVE_BASE}/book%2012-20/13/IELTS13-Test%202%2C%20Section%202.mp3"),
    (2, 3, f"{ARCHIVE_BASE}/book%2012-20/13/IELTS13-Test%202%2C%20Section%203.mp3"),
    (2, 4, f"{ARCHIVE_BASE}/book%2012-20/13/IELTS13-Test%202%2C%20Section%20%204.mp3"),
]
for t, s, u in c13_audio:
    DOWNLOAD_QUEUE.append({
        'url': u,
        'dest': os.path.join(AUDIO_DIR, f"c13-t{t}-s{s}.mp3"),
        'label': f"C13 T{t} Part {s}"
    })

# Cambridge 11
DOWNLOAD_QUEUE.append({
    'url': f"{ARCHIVE_BASE}/CAMBRIDGE%20IELTS%20%28BOOK%201-%2011%29/IELTS%20Cambridge%20book%2011/Cambridge%20IELTS%2011%20-%20Clear%20PDF%20Version.pdf",
    'dest': os.path.join(PDF_DIR, 'Cambridge-11.pdf'),
    'label': 'C11 PDF'
})
for t in range(1, 5):
    for s in range(1, 5):
        DOWNLOAD_QUEUE.append({
            'url': f"{ARCHIVE_BASE}/CAMBRIDGE%20IELTS%20%28BOOK%201-%2011%29/IELTS%20Cambridge%20book%2011/Audio%20Files/IELTS11_Test{t}_Section{s}.mp3",
            'dest': os.path.join(AUDIO_DIR, f"c11-t{t}-s{s}.mp3"),
            'label': f"C11 T{t} Part {s}"
        })


def download_file(item):
    url = item['url']
    dest = item['dest']
    label = item['label']

    if os.path.exists(dest) and os.path.getsize(dest) > 100000:
        return f"[EXISTS] {label} ({os.path.getsize(dest) // 1024} KB)"

    req = urllib.request.Request(url, headers=HEADERS)
    temp_dest = dest + '.tmp'
    try:
        with urllib.request.urlopen(req, timeout=45) as response, open(temp_dest, 'wb') as out_file:
            while True:
                chunk = response.read(64 * 1024)
                if not chunk:
                    break
                out_file.write(chunk)
        os.rename(temp_dest, dest)
        return f"[DOWNLOADED] {label} ({os.path.getsize(dest) // 1024} KB)"
    except Exception as e:
        if os.path.exists(temp_dest):
            os.remove(temp_dest)
        return f"[FAILED] {label}: {e}"


def main():
    target_book = sys.argv[1] if len(sys.argv) > 1 else 'all'
    if target_book != 'all':
        queue = [item for item in DOWNLOAD_QUEUE if target_book.lower() in item['label'].lower()]
    else:
        queue = DOWNLOAD_QUEUE

    print(f"Starting Cambridge IELTS download pool ({len(queue)} items)...")
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = {executor.submit(download_file, item): item for item in queue}
        for future in as_completed(futures):
            res = future.result()
            print(res)

if __name__ == '__main__':
    main()
