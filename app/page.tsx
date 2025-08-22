import LiquidBackground from '../components/LiquidBackground';

export default function Home() {
  return (
    <div className="hero">
      <LiquidBackground />
      <div className="hero-content">
        <h1>Not a Parent Company</h1>
        <p style={{fontSize:'1.1rem', maxWidth:620, margin:'1rem auto 2rem', lineHeight:1.4}}>
          We’re not your parents, but we do care. Just kidding — we don’t. We make websites and apps
          with questionable levels of caffeine and overconfident elegance.
        </p>
        <p style={{opacity:0.75, fontSize:'0.85rem'}}>Scroll if you insist on more substance.</p>
      </div>
    </div>
  );
}