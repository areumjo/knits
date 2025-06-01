import React from 'react';
import { SectionTitle } from '../components/ui/SectionTitle';
import { Button } from '../components/ui/Button';
import { ExclamationTriangleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface NotFoundPageProps {
  message?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ message }) => {
  const defaultMessage = "Oops! The page you're looking for doesn't seem to exist. It might have been moved, deleted, or maybe you just mistyped the address.";
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center">
        <ExclamationTriangleIcon className="h-20 w-20 md:h-28 md:w-28 text-accent-rust mx-auto mb-6" />
        <SectionTitle title="404 - Page Not Found" />
        <p className="text-base md:text-lg text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
          {message || defaultMessage}
        </p>
        <Button to="/" variant="primary" size="lg" leftIcon={ArrowLeftIcon}>
          Go Back Home
        </Button>
      </div>
    </div>
  );
};
