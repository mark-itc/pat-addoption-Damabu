import styled from 'styled-components';

export const MainContForm = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #74beff;
`;

export const Form = styled.form`
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  button {
    cursor: pointer;
    padding: 10px;
    width: 100%;
    border: none;
    border-radius: 5px;
    background-color: #ffbb00;
    color: white;
    font-weight: 700;
    position: relative;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }

  h1 {
    text-align: center;
  }
`;

export const MainContInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

export const MainContMsgError = styled.div`
  background-color: #ff7474;
  padding: 10px;
  border-radius: 5px;

  p {
    color: white;
    font-weight: 700;
  }
`;
