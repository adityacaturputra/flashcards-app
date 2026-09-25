'use client';
import React, { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import HeaderBrand from '@/components/molecules/header/HeaderBrand';
import HeaderActions from '@/components/molecules/header/HeaderActions';
import HeaderNavMenu from '@/components/molecules/header/HeaderNavMenu';
import SyncModal from '@/components/molecules/SyncModal';
import { useAppContext } from '@/context/appContext';
import { APP_ROUTES } from '@/constants/routes';

interface AppHeaderProps {
  flashcardsCount: number;
  isReviewMode: boolean;
  setIsReviewMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  flashcardsCount,
  isReviewMode,
  setIsReviewMode,
}) => {
  const router = useRouter();
  const { handleRefetchFlashCards } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleNavigate = useCallback(
    (route: string) => {
      setIsMenuOpen(false);
      router.push(route);
    },
    [router]
  );

  return (
    <>
      <header
        className='backdrop-blur-glass sticky top-0 z-50 border-b'
        style={{
          borderColor: 'var(--border)',
          background: 'var(--background)',
        }}
      >
        <div className='mx-auto max-w-7xl px-3.5 py-2.5 sm:px-6 sm:py-3.5'>
          <div className='flex items-center justify-between gap-3'>
            {/* Left: Brand Logo, Counter, and Desktop Sync Button */}
            <HeaderBrand
              flashcardsCount={flashcardsCount}
              onNavigateHome={() => handleNavigate(APP_ROUTES.HOME)}
              onOpenSyncModal={() => setIsSyncModalOpen(true)}
            />

            {/* Right: Actions, Review Toggle, and Drawer Trigger */}
            <div className='relative shrink-0'>
              <HeaderActions
                isReviewMode={isReviewMode}
                onToggleReviewMode={() => setIsReviewMode((prev) => !prev)}
                onAddFlashcard={() => handleNavigate(APP_ROUTES.ADD_FLASHCARD)}
                isMenuOpen={isMenuOpen}
                onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
                buttonRef={buttonRef}
              />

              {/* Navigation Drawer & Popover Menu */}
              <HeaderNavMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onNavigate={handleNavigate}
                onOpenSyncModal={() => setIsSyncModalOpen(true)}
                menuRef={menuRef}
                buttonRef={buttonRef}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Cloud & Local Sync Modal */}
      <SyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onSyncComplete={handleRefetchFlashCards}
      />
    </>
  );
};

export default AppHeader;
