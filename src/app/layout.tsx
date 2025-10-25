// app/layout.tsx
import React from 'react';
import { AppProvider } from '../context/appContext';
import { ThemeProvider } from '@/context/themeContext';
import { SearchTemplateProvider } from '@/context/searchTemplateContext';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider>
          <AppProvider>
            <SearchTemplateProvider>{children}</SearchTemplateProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
