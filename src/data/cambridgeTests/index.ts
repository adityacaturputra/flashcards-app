import { CambridgeBookItem } from '@/types/cambridgeTests';

const ARCHIVE_BASE = 'https://archive.org/download/cambridge-ielts-books';

export const CAMBRIDGE_BOOKS: CambridgeBookItem[] = [
  {
    id: 'cambridge-14',
    bookNumber: 14,
    title: 'Cambridge IELTS 14 Academic',
    badge: 'Official 2019',
    pdfUrl: '/cambridge/pdf/Cambridge-14.pdf',
    remotePdfUrl: `${ARCHIVE_BASE}/book%2012-20/14/Cambridge%2014.pdf`,
    totalTests: 4,
    tests: [1, 2, 3, 4].map((t) => ({
      id: `c14-t${t}`,
      testNumber: t,
      title: `Test ${t}`,
      pdfPageHint: 10 + (t - 1) * 24,
      tracks: [1, 2, 3, 4].map((s) => ({
        section: s as 1 | 2 | 3 | 4,
        title: `Section ${s}`,
        audioUrl: `/cambridge/audio/c14-t${t}-s${s}.mp3`,
        remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/14/C14T${t}S${s}.mp3`,
      })),
    })),
  },
  {
    id: 'cambridge-15',
    bookNumber: 15,
    title: 'Cambridge IELTS 15 Academic',
    badge: 'Official 2020',
    pdfUrl: '/cambridge/pdf/Cambridge-15.pdf',
    remotePdfUrl: `${ARCHIVE_BASE}/book%2012-20/15/Cambridge%2015.pdf`,
    totalTests: 4,
    tests: [1, 2, 3, 4].map((t) => ({
      id: `c15-t${t}`,
      testNumber: t,
      title: `Test ${t}`,
      pdfPageHint: 10 + (t - 1) * 24,
      tracks: [1, 2, 3, 4].map((s) => ({
        section: s as 1 | 2 | 3 | 4,
        title: `Section ${s}`,
        audioUrl: `/cambridge/audio/c15-t${t}-s${s}.mp3`,
        remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/15/IELTS15_test${t}_audio${s}.mp3`,
      })),
    })),
  },
  {
    id: 'cambridge-16',
    bookNumber: 16,
    title: 'Cambridge IELTS 16 Academic',
    badge: 'Official 2021',
    pdfUrl: '/cambridge/pdf/Cambridge-16.pdf',
    remotePdfUrl: `${ARCHIVE_BASE}/book%2012-20/16/Cambridge%2016.pdf`,
    totalTests: 4,
    tests: [1, 2, 3, 4].map((t) => ({
      id: `c16-t${t}`,
      testNumber: t,
      title: `Test ${t}`,
      pdfPageHint: 10 + (t - 1) * 24,
      tracks: [1, 2, 3, 4].map((s) => ({
        section: s as 1 | 2 | 3 | 4,
        title: `Part ${s}`,
        audioUrl: `/cambridge/audio/c16-t${t}-s${s}.mp3`,
        remoteAudioUrl:
          t === 1 && s === 2
            ? `${ARCHIVE_BASE}/book%2012-20/16/AUDIO/Test%201%20Part%202%20%20%5B%40cambridgematerials%5D.mp3`
            : `${ARCHIVE_BASE}/book%2012-20/16/AUDIO/Test%20${t}%20Part%20${s}%20%5B%40cambridgematerials%5D.mp3`,
      })),
    })),
  },
  {
    id: 'cambridge-17',
    bookNumber: 17,
    title: 'Cambridge IELTS 17 Academic',
    badge: 'Official 2022',
    pdfUrl: '/cambridge/pdf/Cambridge-17.pdf',
    remotePdfUrl: `${ARCHIVE_BASE}/book%2012-20/17/Cambridge%2017.pdf`,
    totalTests: 4,
    tests: [1, 2, 3, 4].map((t) => ({
      id: `c17-t${t}`,
      testNumber: t,
      title: `Test ${t}`,
      pdfPageHint: 10 + (t - 1) * 24,
      tracks: [1, 2, 3, 4].map((s) => ({
        section: s as 1 | 2 | 3 | 4,
        title: `Part ${s}`,
        audioUrl: `/cambridge/audio/c17-t${t}-s${s}.mp3`,
        remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/17/AUDIO/TEST/Camb%2017%20${t}-${s}.mp3`,
      })),
    })),
  },
  {
    id: 'cambridge-18',
    bookNumber: 18,
    title: 'Cambridge IELTS 18 Academic',
    badge: 'Official 2023',
    pdfUrl: '/cambridge/pdf/Cambridge-18.pdf',
    remotePdfUrl: `${ARCHIVE_BASE}/book%2012-20/18/Cambridge%2018.pdf`,
    totalTests: 4,
    tests: [1, 2, 3, 4].map((t) => ({
      id: `c18-t${t}`,
      testNumber: t,
      title: `Test ${t}`,
      pdfPageHint: 10 + (t - 1) * 24,
      tracks: [1, 2, 3, 4].map((s) => ({
        section: s as 1 | 2 | 3 | 4,
        title: `Part ${s}`,
        audioUrl: `/cambridge/audio/c18-t${t}-s${s}.mp3`,
        remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/18/Cambridge%20IELTS%2018%20Audio/Test-${t}-Part-${s}.mp3`,
      })),
    })),
  },
  {
    id: 'cambridge-19',
    bookNumber: 19,
    title: 'Cambridge IELTS 19 Academic',
    badge: 'Official 2024',
    pdfUrl: '/cambridge/pdf/Cambridge-19.pdf',
    remotePdfUrl: `${ARCHIVE_BASE}/book%2012-20/19/Cambridge%2019.pdf`,
    totalTests: 2,
    tests: [
      {
        id: 'c19-t1',
        testNumber: 1,
        title: 'Test 1',
        pdfPageHint: 10,
        tracks: [
          {
            section: 1,
            title: 'Part 1: Hinchingbrooke Country Park',
            audioUrl: '/cambridge/audio/c19-t1-s1.mp3',
            remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/19/AUDIO/TEST1/P1%20-%20Hinchingbrooke%20Country%20Park.mp3`,
          },
          {
            section: 2,
            title: 'Part 2: Stanthrope Twinning Association',
            audioUrl: '/cambridge/audio/c19-t1-s2.mp3',
            remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/19/AUDIO/TEST1/P2%20-%20Stanthrope%20Twinning%20Association%20-%20Farley%20House.mp3`,
          },
          {
            section: 3,
            title: 'Part 3: Food Trends & Bread Project',
            audioUrl: '/cambridge/audio/c19-t1-s3.mp3',
            remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/19/AUDIO/TEST1/P3_Food_trends_Colin_find_most_satifying_about_his_bread_reuse_project.mp3`,
          },
          {
            section: 4,
            title: 'Part 4: Céide Fields Archeology',
            audioUrl: '/cambridge/audio/c19-t1-s4.mp3',
            remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/19/AUDIO/TEST1/P4%20-%20Ceide%20Fields.mp3`,
          },
        ],
      },
      {
        id: 'c19-t2',
        testNumber: 2,
        title: 'Test 2',
        pdfPageHint: 32,
        tracks: [
          {
            section: 1,
            title: 'Part 1: Cam 19 Test 2 Part 1',
            audioUrl: '/cambridge/audio/c19-t2-s1.mp3',
            remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/19/AUDIO/TEST2/Cam%2019%20-%20Test%202%20-%20Part%201.mp3`,
          },
          {
            section: 2,
            title: 'Part 2: Cam 19 Test 2 Part 2',
            audioUrl: '/cambridge/audio/c19-t2-s2.mp3',
            remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/19/AUDIO/TEST2/Cam%2019%20-%20Test%202%20-%20Part%202.mp3`,
          },
          {
            section: 3,
            title: 'Part 3: Cam 19 Test 2 Part 3',
            audioUrl: '/cambridge/audio/c19-t2-s3.mp3',
            remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/19/AUDIO/TEST2/Cam%2019%20-%20Test%202%20-%20Part%203.mp3`,
          },
          {
            section: 4,
            title: 'Part 4: Cam 19 Test 2 Part 4',
            audioUrl: '/cambridge/audio/c19-t2-s4.mp3',
            remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/19/AUDIO/TEST2/Cam%2019%20-%20Test%202%20-%20Part%204.mp3`,
          },
        ],
      },
    ],
  },
  {
    id: 'cambridge-13',
    bookNumber: 13,
    title: 'Cambridge IELTS 13 Academic',
    badge: 'Official 2018',
    pdfUrl: '/cambridge/pdf/Cambridge-13.pdf',
    remotePdfUrl: `${ARCHIVE_BASE}/book%2012-20/13/Cambridge%2013.pdf`,
    totalTests: 2,
    tests: [
      {
        id: 'c13-t1',
        testNumber: 1,
        title: 'Test 1',
        pdfPageHint: 10,
        tracks: [
          {
            section: 1,
            title: 'Section 1',
            audioUrl: '/cambridge/audio/c13-t1-s1.mp3',
            remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/13/IELTS13-Test%201%2CSection-1.mp3`,
          },
          {
            section: 2,
            title: 'Section 2',
            audioUrl: '/cambridge/audio/c13-t1-s2.mp3',
            remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/13/IELTS13-Test%201%2C%20Section%202.mp3`,
          },
          {
            section: 3,
            title: 'Section 3',
            audioUrl: '/cambridge/audio/c13-t1-s3.mp3',
            remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/13/IELTS13-Test%201%2C%20Section%203.mp3`,
          },
          {
            section: 4,
            title: 'Section 4',
            audioUrl: '/cambridge/audio/c13-t1-s4.mp3',
            remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/13/IELTS13-Test%201%2C%20Section%204.mp3`,
          },
        ],
      },
      {
        id: 'c13-t2',
        testNumber: 2,
        title: 'Test 2',
        pdfPageHint: 34,
        tracks: [
          {
            section: 1,
            title: 'Section 1',
            audioUrl: '/cambridge/audio/c13-t2-s1.mp3',
            remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/13/IELTS13-Test%202%2C%20Section%201.mp3`,
          },
          {
            section: 2,
            title: 'Section 2',
            audioUrl: '/cambridge/audio/c13-t2-s2.mp3',
            remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/13/IELTS13-Test%202%2C%20Section%202.mp3`,
          },
          {
            section: 3,
            title: 'Section 3',
            audioUrl: '/cambridge/audio/c13-t2-s3.mp3',
            remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/13/IELTS13-Test%202%2C%20Section%203.mp3`,
          },
          {
            section: 4,
            title: 'Section 4',
            audioUrl: '/cambridge/audio/c13-t2-s4.mp3',
            remoteAudioUrl: `${ARCHIVE_BASE}/book%2012-20/13/IELTS13-Test%202%2C%20Section%20%204.mp3`,
          },
        ],
      },
    ],
  },
  {
    id: 'cambridge-11',
    bookNumber: 11,
    title: 'Cambridge IELTS 11 Academic',
    badge: 'Official 2016',
    pdfUrl: '/cambridge/pdf/Cambridge-11.pdf',
    remotePdfUrl: `${ARCHIVE_BASE}/CAMBRIDGE%20IELTS%20%28BOOK%201-%2011%29/IELTS%20Cambridge%20book%2011/Cambridge%20IELTS%2011%20-%20Clear%20PDF%20Version.pdf`,
    totalTests: 4,
    tests: [1, 2, 3, 4].map((t) => ({
      id: `c11-t${t}`,
      testNumber: t,
      title: `Test ${t}`,
      pdfPageHint: 12 + (t - 1) * 24,
      tracks: [1, 2, 3, 4].map((s) => ({
        section: s as 1 | 2 | 3 | 4,
        title: `Section ${s}`,
        audioUrl: `/cambridge/audio/c11-t${t}-s${s}.mp3`,
        remoteAudioUrl: `${ARCHIVE_BASE}/CAMBRIDGE%20IELTS%20%28BOOK%201-%2011%29/IELTS%20Cambridge%20book%2011/Audio%20Files/IELTS11_Test${t}_Section${s}.mp3`,
      })),
    })),
  },
];

export const getCambridgeBookById = (
  id: string
): CambridgeBookItem | undefined => {
  return CAMBRIDGE_BOOKS.find((b) => b.id === id);
};
