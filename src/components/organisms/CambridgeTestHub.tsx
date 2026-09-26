'use client';
import React, { useState } from 'react';
import { CAMBRIDGE_BOOKS } from '@/data/cambridgeTests';
import {
  CambridgeBookItem,
  CambridgeTestItem,
  CambridgeTrack,
} from '@/types/cambridgeTests';
import IeltsTestSelector from '@/components/molecules/IeltsTestSelector';
import IeltsPdfViewer from '@/components/molecules/IeltsPdfViewer';
import IeltsFloatingAudioPlayer from '@/components/molecules/IeltsFloatingAudioPlayer';

export const CambridgeTestHub: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<CambridgeBookItem>(
    CAMBRIDGE_BOOKS[0]
  );
  const [selectedTest, setSelectedTest] = useState<CambridgeTestItem>(
    CAMBRIDGE_BOOKS[0].tests[0]
  );
  const [activeTrack, setActiveTrack] = useState<CambridgeTrack>(
    CAMBRIDGE_BOOKS[0].tests[0].tracks[0]
  );

  const handleSelectBook = (bookId: string) => {
    const book = CAMBRIDGE_BOOKS.find((b) => b.id === bookId);
    if (!book) return;
    setSelectedBook(book);
    const firstTest = book.tests[0];
    setSelectedTest(firstTest);
    setActiveTrack(firstTest.tracks[0]);
  };

  const handleSelectTest = (testId: string) => {
    const test = selectedBook.tests.find((t) => t.id === testId);
    if (!test) return;
    setSelectedTest(test);
    setActiveTrack(test.tracks[0]);
  };

  return (
    <div className='flex flex-col gap-4 w-full'>
      {/* Test & Book Switcher */}
      <IeltsTestSelector
        books={CAMBRIDGE_BOOKS}
        selectedBook={selectedBook}
        selectedTestId={selectedTest.id}
        onSelectBook={handleSelectBook}
        onSelectTest={handleSelectTest}
      />

      {/* PDF Viewer Canvas */}
      <IeltsPdfViewer
        pdfUrl={selectedBook.pdfUrl}
        remotePdfUrl={selectedBook.remotePdfUrl}
        pageHint={selectedTest.pdfPageHint}
        bookTitle={selectedBook.title}
        testTitle={selectedTest.title}
      />

      {/* Floating Draggable Audio Player */}
      <IeltsFloatingAudioPlayer
        key={`${selectedTest.id}-${activeTrack.section}`}
        tracks={selectedTest.tracks}
        activeTrack={activeTrack}
        onSelectTrack={setActiveTrack}
      />
    </div>
  );
};

export default CambridgeTestHub;
