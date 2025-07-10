// app/layout.tsx
import React from 'react';
import { AppProvider } from '../context/appContext';
import { ThemeProvider } from '@/context/themeContext';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
