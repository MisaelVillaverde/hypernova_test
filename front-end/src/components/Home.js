import React from 'react';
import './Home.css';
import Forms from './Forms';
import ReportHist from './ReportHist';
import { Hr } from './theme';

const Home = () => {
  return (
    <>
      <Forms />
      <Hr />
      <ReportHist />
    </>
  );
};

export default Home;
