'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' }
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <div style={{ background:'#111', borderBottom:'1px solid #222' }}>
      <div className="container" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{fontFamily:'var(--font-alt)', fontWeight:700}}>NAPC</div>
        <nav className="nav">
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{opacity: pathname === l.href ? 1 : 0.6}}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}