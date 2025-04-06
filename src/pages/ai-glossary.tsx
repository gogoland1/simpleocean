import React from 'react';
import AIGlossary from '../components/analysis/AIGlossary';
import Layout from '../components/layout/Layout';

const AIGlossaryPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <AIGlossary />
      </div>
    </Layout>
  );
};

export default AIGlossaryPage;