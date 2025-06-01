
import React, { useState } from 'react';
import { SectionTitle } from '../../components/ui/SectionTitle'; 
import { Button } from '../../components/ui/Button'; 
import { AREUM_ACCENT_COLOR } from '../../constants'; // This is 'accent-clay'
import { EnvelopeIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert("Please fill in all fields.");
        return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        alert("Please enter a valid email address.");
        return;
    }
    console.log("Form data submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
        // Potentially reset isSubmitted as well if user might submit again
        // setIsSubmitted(false); 
        setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);

  };

  return (
    <div className="max-w-2xl mx-auto">
      <SectionTitle title="Let's Connect" subtitle="I love hearing from fellow knitters!" />
      
      <div className="bg-bg-secondary p-6 md:p-8 rounded-lg shadow-xl">
        <p className="text-text-secondary mb-6">
          Whether you have a question about a pattern, a thought to share about a notebook article, or just want to talk yarn, please feel free to reach out. While I try my best to respond to everyone, please understand that I'm a one-woman studio.
        </p>

        {isSubmitted ? (
          <div className="p-6 text-center bg-accent-emerald/10 dark:bg-accent-emerald/20 border border-accent-emerald dark:border-accent-emerald rounded-md">
            <PaperAirplaneIcon className={`h-12 w-12 text-accent-emerald mx-auto mb-3`} />
            <h3 className="text-xl font-semibold text-accent-emerald">Thank You!</h3>
            <p className="text-accent-emerald mt-1">Your message has been sent. I'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary">Full Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`mt-1 block w-full px-3 py-2 border border-border-medium rounded-md shadow-sm focus:outline-none focus:ring-${AREUM_ACCENT_COLOR} focus:border-${AREUM_ACCENT_COLOR} sm:text-sm bg-bg-primary text-text-primary`}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`mt-1 block w-full px-3 py-2 border border-border-medium rounded-md shadow-sm focus:outline-none focus:ring-${AREUM_ACCENT_COLOR} focus:border-${AREUM_ACCENT_COLOR} sm:text-sm bg-bg-primary text-text-primary`}
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-text-secondary">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className={`mt-1 block w-full px-3 py-2 border border-border-medium rounded-md shadow-sm focus:outline-none focus:ring-${AREUM_ACCENT_COLOR} focus:border-${AREUM_ACCENT_COLOR} sm:text-sm bg-bg-primary text-text-primary`}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-secondary">Message</label>
              <textarea
                name="message"
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className={`mt-1 block w-full px-3 py-2 border border-border-medium rounded-md shadow-sm focus:outline-none focus:ring-${AREUM_ACCENT_COLOR} focus:border-${AREUM_ACCENT_COLOR} sm:text-sm bg-bg-primary text-text-primary`}
              />
            </div>
            <div>
              <Button type="submit" variant="primary" size="lg" className="w-full" leftIcon={EnvelopeIcon}>
                Send Message
              </Button>
            </div>
          </form>
        )}
         <div className="mt-8 pt-6 border-t border-border-light text-center">
            <h3 className="text-md font-semibold text-text-secondary mb-2">You can also find me on:</h3>
            <div className="flex justify-center space-x-4">
                <a href="#" className={`text-text-muted hover:text-${AREUM_ACCENT_COLOR} dark:hover:text-${AREUM_ACCENT_COLOR} transition-colors`} aria-label="Instagram">
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 3.808s-.012 2.723-.06 3.808a6.72 6.72 0 01-.465 2.427 4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-3.808.06s-2.723-.012-3.808-.06a6.72 6.72 0 01-2.427-.465 4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772 6.72 6.72 0 01-.465-2.427c-.048-1.067-.06-1.407-.06-3.808s.012-2.723.06-3.808a6.72 6.72 0 01.465-2.427 4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.023.047 1.351.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344.467-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353-.3-.882.344-1.857.047-1.023.058-1.351.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a3.097 3.097 0 00-.748-1.15 3.097 3.097 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
                 <a href="#" className={`text-text-muted hover:text-${AREUM_ACCENT_COLOR} dark:hover:text-${AREUM_ACCENT_COLOR} transition-colors`} aria-label="Ravelry">
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg> {/* Placeholder Ravelry Icon */}
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};
