import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-links">
          <Link className="footer-link" href="/privacy">Privacy</Link>
          <Link className="footer-link" href="/terms">Terms</Link>
          <Link className="footer-link" href="/contact">Contact</Link>
        </div>
        <div className="footer-copyright">
          <Link href="/manage">© {year} Not a Parent Company. All rights withheld greedily.</Link>
        </div>
      </div>
    </footer>
  );
}