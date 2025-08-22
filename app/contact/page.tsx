'use client';
import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState<string | null>(null);
  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Replace with actual handler or endpoint
    setTimeout(() => setStatus('Your message crawled into our inbox. Maybe.'), 500);
  }
  return (
    <div className="container">
      <h1>Contact</h1>
      <p>Three fields. Infinite judgement.</p>
      <form onSubmit={submit} style={{maxWidth:480}}>
        <div className="row">
          <label>Name</label>
          <input required name="name" placeholder="Your identity (or a fake one)" />
        </div>
        <div className="row">
          <label>Email</label>
            <input required type="email" name="email" placeholder="We promise mild restraint" />
        </div>
        <div className="row">
          <label>Message</label>
          <textarea required name="message" rows={5} placeholder="Say something clever"></textarea>
        </div>
        <button type="submit">Launch Message</button>
      </form>
      {status && <p style={{marginTop:'1rem'}}>{status}</p>}
    </div>
  );
}