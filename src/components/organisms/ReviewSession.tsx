'use client';
import React from 'react';
import { useAppContext } from '../../context/appContext';
import { Flashcard } from '../../types/flashcard';
import Card from '../atoms/Card';

const ReviewSession: React.FC = () => {
  const { flashcards, loading } = useAppContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!flashcards.length) {
    return <div>No flashcards available.</div>;
  }

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {flashcards.map((flashcard: Flashcard) => (
        <Card key={flashcard._id}>
          <h3 className='text-lg font-bold'>{flashcard.question}</h3>
          <p>{flashcard.answer}</p>
        </Card>
      ))}
    </div>
  );
};

export default ReviewSession;
