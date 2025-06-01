
import React from 'react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { AREUM_ACCENT_COLOR } from '../constants'; // This is 'accent-clay'

export const TermsOfUsePage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <SectionTitle title="Terms of Use" />
      <div className={`prose dark:prose-invert max-w-none bg-bg-secondary p-6 rounded-lg shadow 
                      prose-headings:font-primary prose-headings:text-text-primary 
                      prose-p:text-text-secondary prose-li:text-text-secondary
                      prose-strong:text-text-primary
                      prose-a:text-${AREUM_ACCENT_COLOR} dark:prose-a:text-${AREUM_ACCENT_COLOR} hover:prose-a:underline`}>
        <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>

        <h2>1. Agreement to Terms</h2>
        <p>These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Areum Knits (“we,” “us” or “our”), concerning your access to and use of the Areum Knits website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the “Site”).</p>
        <p>You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Use. If you do not agree with all of these Terms of Use, then you are expressly prohibited from using the Site and you must discontinue use immediately.</p>

        <h2>2. Intellectual Property Rights</h2>
        <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws of the United States, foreign jurisdictions, and international conventions.</p>
        <p>Knitting patterns and content provided are for personal, non-commercial use only. You may not distribute, sell, or create derivative works from any patterns or content from this Site without express written permission.</p>

        <h2>3. User Representations</h2>
        <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; [...]</p>
        
        <h2>4. Prohibited Activities</h2>
        <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
        <p>[...]</p>
        <p><em>This is a template. A complete Terms of Use document would be more comprehensive and cover topics like User Generated Contributions, Site Management, Term and Termination, Modifications and Interruptions, Governing Law, Dispute Resolution, Corrections, Disclaimer, Limitations of Liability, Indemnification, User Data, Electronic Communications, Transactions and Signatures, Miscellaneous, and Contact Us.</em></p>
        <p><strong>Please consult with a legal professional to create a Terms of Use document suitable for your specific services and jurisdiction.</strong></p>
      </div>
    </div>
  );
};
