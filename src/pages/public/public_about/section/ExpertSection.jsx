import React from 'react';
import MissionSection from './components/MissionSection';
import ExpertiseSection from './components/ExpertiseSection';

const ExpertSection = () => {
  return (
    <div className="bg-[#FAF9F7]">
      <section className="space-y-0">
        <MissionSection />
        <ExpertiseSection />
      </section>
    </div>
  );
};

export default ExpertSection;