import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Press_Start_2P } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const gastromond = localFont({
  src: [
    {
      path: '../public/fonts/gastromondtest-regular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-gastromond',
  display: 'swap',
});

const pressStart = Press_Start_2P({
  variable: '--font-press-start',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'tomas_ferreras_portfolio',
  description:
    "I'm a software developer with over a year of professional experience, mostly focused on React, React Native, Next.js, TypeScript, GraphQL and Node.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gastromond.variable} ${pressStart.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
