// src/app/experimental/fine-tune/page.tsx
'use client';

import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { AppLayout, FeaturePages } from '@/components/AppLayout';
import FineTuning from '@/components/Experimental/FineTuning';

const FineTune: React.FunctionComponent = () => {
  return (
    <AppLayout requiredFeature={FeaturePages.Experimental}>
      <FineTuning />
    </AppLayout>
  );
};

export default FineTune;
