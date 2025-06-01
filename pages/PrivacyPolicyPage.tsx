
import React from 'react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { AREUM_ACCENT_COLOR } from '../constants';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <SectionTitle title="Privacy Policy" />
      <div className={`prose dark:prose-invert max-w-none bg-bg-secondary p-6 rounded-lg shadow
                      prose-headings:font-primary prose-headings:text-text-primary
                      prose-p:text-text-secondary prose-li:text-text-secondary
                      prose-strong:text-text-primary
                      prose-a:text-${AREUM_ACCENT_COLOR} dark:prose-a:text-${AREUM_ACCENT_COLOR} hover:prose-a:underline`}>
        <p><em>Last Updated: {new Date().toLocaleDateString()}</em></p>

        <h2>1. Introduction</h2>
        <p>Welcome to Areum Knits. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

        <h2>2. Information We Collect</h2>
        <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
        <ul>
          <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.</li>
          <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
          <li><strong>Data from Social Networks:</strong> User information from social networking sites, such as Instagram, Pinterest, Ravelry, including your name, your social network username, location, gender, birth date, email address, profile picture, and public data for contacts, if you connect your account to such social networks.</li>
        </ul>

        <h2>3. Use of Your Information</h2>
        <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Email you regarding your account or order.</li>
          <li>Enable user-to-user communications.</li>
          <li>Improve our website and offerings.</li>
          <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
        </ul>

        <h2>4. Disclosure of Your Information</h2>
        <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows: ...</p>
        <p>[...]</p>
        <p><em>This is a template. A complete privacy policy would include more sections like: Security of Your Information, Policy for Children, Controls for Do-Not-Track Features, California Privacy Rights, Contact Us.</em></p>
        <p><strong>Please consult with a legal professional to create a privacy policy that is compliant with all applicable laws and regulations for your specific situation.</strong></p>
      </div>
    </div>
  );
};
