import React, { useRef } from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import success from '../assets/success.json';
import { useEffect } from 'react';

const Sucess = () => {
  const lottieRef = useRef();

  useEffect(() => {
    lottieRef.current.playSegments([0, 48], true);
  }, []);

  return (
    <MainContAnimation>
      <Lottie lottieRef={lottieRef} animationData={success} loop='false' />
    </MainContAnimation>
  );
};

export default Sucess;

const MainContAnimation = styled.div`
  width: 300px;
`;
