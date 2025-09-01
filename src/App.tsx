import React from 'react';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { Calculator } from './components/Calculator';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FAQ } from './components/FAQ'

const App: React.FC = () => (
  <MantineProvider theme={theme}>
    <div style={{ paddingTop: '80px' }}>
      <Header />
      <HeroSection />
      <HowItWorks />
      <Calculator />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  </MantineProvider>
);

export default App;
