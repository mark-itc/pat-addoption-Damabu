import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import load from '../assets/loading.json';

const Loading = () => {
  return (
    <MainContAnimation>
      <Lottie animationData={load} loop={false} />
    </MainContAnimation>
  );
};

export default Loading;

const MainContAnimation = styled.div`
  width: 140px;
  position: absolute;
  top: -46px;
`;
