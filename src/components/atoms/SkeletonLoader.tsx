// src/components/atoms/SkeletonLoader.tsx
'use client';
import React, { memo } from 'react';

const SkeletonLoader: React.FC<{ count: number }> = memo(({ count }) => {
  return (
    <div className='flex flex-col space-y-4'>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className='animate-pulse rounded-lg border p-4'
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <div className='bg-muted mb-2 h-4 w-3/4 animate-pulse rounded'></div>
          <div className='bg-muted mb-2 h-4 w-1/2 animate-pulse rounded'></div>
          <div className='bg-muted mb-2 h-4 w-4/5 animate-pulse rounded'></div>
          <div className='bg-muted mb-2 h-4 w-2/3 animate-pulse rounded'></div>
          <div className='bg-muted h-4 w-1/4 animate-pulse rounded'></div>
        </div>
      ))}
    </div>
  );
});

SkeletonLoader.displayName = 'SkeletonLoader';

export default SkeletonLoader;
