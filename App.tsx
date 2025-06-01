
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { PatternsPage } from './pages/PatternsPage';
import { PatternDetailPage } from './pages/PatternDetailPage';
import { NotebookPage } from './pages/NotebookPage';
import { NotebookPostPage }  from './pages/NotebookPostPage';
import { LearningPathsPage } from './pages/LearningPathsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SearchPage } from './pages/SearchPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfUsePage } from './pages/TermsOfUsePage';
import { NotFoundPage } from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Routes that use the main Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="patterns" element={<PatternsPage />} />
          {/* PatternDetailPage is now outside this Layout route */}
          <Route path="notebook" element={<NotebookPage />} />
          <Route path="notebook/:postSlug" element={<NotebookPostPage />} />
          <Route path="learning-paths" element={<LearningPathsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-of-use" element={<TermsOfUsePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        {/* PatternDetailPage route - renders without the main Layout */}
        <Route path="patterns/:patternSlug" element={<PatternDetailPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
