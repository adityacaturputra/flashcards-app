// app/layout.tsx
import React from 'react';
import { AppProvider } from '../context/appContext';
import { ThemeProvider } from '@/context/themeContext';
import { SearchTemplateProvider } from '@/context/searchTemplateContext';
import './globals.css';

export const metadata = {
  title: 'Flashcards App - Smart Learning Platform',
  description:
    'Create, study, and master flashcards with AI-powered generation, spaced repetition, and smart review sessions. Perfect for students and professionals.',
  keywords:
    'flashcards, learning, study, education, spaced repetition, AI, memory, quiz',
  authors: [{ name: 'Flashcards App' }],
  creator: 'Flashcards App',
  publisher: 'Flashcards App',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://flashcards-app.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Flashcards App - Smart Learning Platform',
    description:
      'Create, study, and master flashcards with AI-powered generation, spaced repetition, and smart review sessions.',
    url: 'https://flashcards-app.vercel.app',
    siteName: 'Flashcards App',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Flashcards App - Smart Learning Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flashcards App - Smart Learning Platform',
    description:
      'Create, study, and master flashcards with AI-powered generation, spaced repetition, and smart review sessions.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='scroll-smooth'>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=5'
        />
        <meta name='theme-color' content='#3b82f6' />
        <meta name='color-scheme' content='light dark' />
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/icon.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link rel='dns-prefetch' href='https://api.openrouter.ai' />
        <link rel='dns-prefetch' href='https://fonts.googleapis.com' />
        <link rel='dns-prefetch' href='https://fonts.gstatic.com' />
        <link rel='stylesheet' href='/styles/critical.css' />
        <noscript>
          <link rel='stylesheet' href='/styles/critical.css' />
        </noscript>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Flashcards App',
              description:
                'Smart learning platform with AI-powered flashcard generation and spaced repetition',
              url: 'https://flashcards-app.vercel.app',
              applicationCategory: 'EducationalApplication',
              operatingSystem: 'Web Browser',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              author: {
                '@type': 'Organization',
                name: 'Flashcards App',
              },
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className='antialiased'>
        <ThemeProvider>
          <AppProvider>
            <SearchTemplateProvider>{children}</SearchTemplateProvider>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
