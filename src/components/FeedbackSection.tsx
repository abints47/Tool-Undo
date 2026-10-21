'use client';

import { useState, FormEvent } from 'react';

export default function FeedbackSection() {
  const [feedback, setFeedback] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKcIty0dbcDMriLS-FOnFIn2JvMmYwNZX3tqhQX8-1Sh73sPzKd1X57PvkOtz8x7fb/exec';

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback, contact }),
      });

      setSubmitted(true);
      setFeedback('');
      setContact('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-section px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div 
          className="w-full max-w-6xl mx-auto rounded-4xl bg-linear-to-br from-warm-100 via-accent-bg/60 to-warm-200 border border-border p-8 md:p-14 text-center flex flex-col items-center shadow-xs" 
          data-aos="zoom-in" 
          data-aos-once="true"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
            Drop your Suggestions here! 🔥
          </h2>
          <p className="mt-2 text-base text-ink-muted max-w-5xl">
            Bug-O suggestion-O, a single word helps us improve a lot! 👇
          </p>

          {submitted ? (
            <div className="mt-8 p-6 bg-white/80 rounded-2xl border border-border text-ink">
              <p className="font-semibold text-lg">Thank you! 🙏</p>
              <p className="text-sm text-ink-muted mt-1">Your message reached the developer safely.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-semibold text-accent hover:underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit}
              className="mt-6 w-full max-w-3xl flex flex-col gap-4 text-left"
            >
              <div>
                <textarea
                  required
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts or report a bug here..."
                  className="w-full rounded-2xl border border-border bg-white/70 backdrop-blur-sm p-4 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none transition-all shadow-xs"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Your Name or Email (optional)"
                  className="w-full sm:flex-1 rounded-full border border-border bg-white/70 backdrop-blur-sm px-5 py-3 text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all shadow-xs"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-full font-semibold text-sm transition-all hover:shadow-lg hover:shadow-accent/15 active:scale-[0.98] cursor-pointer whitespace-nowrap disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Feedback →'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}