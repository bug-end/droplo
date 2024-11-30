import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
      </head>
      <body className='font-sans antialiased max-w-[1208px] mx-auto px-6 py-[30px]'>{children}</body>
    </html>
  );
}
