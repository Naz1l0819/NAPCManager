import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata = {
  title: 'Not a Parent Company',
  description: 'We are not your parents. We build things anyway.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}