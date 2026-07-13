import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Anchor — Everything that grounds your day, in one place',
  description:
    'Plan your day, track where your money goes, and build habits that stick — all in one connected system, organized by AI.',
  keywords: ['productivity', 'planner', 'budget', 'habits', 'AI assistant', 'family organizer'],
  openGraph: {
    title: 'Anchor — Everything that grounds your day, in one place',
    description:
      'Plan your day, track where your money goes, and build habits that stick — all in one connected system, organized by AI.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('anchor-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else{var h=new Date().getHours();var auto=(h>=6&&h<18)?'light':'dark';document.documentElement.setAttribute('data-theme',auto);}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
