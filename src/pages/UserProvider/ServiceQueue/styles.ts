import styled from 'styled-components';

import BackgroundImage from '../../../assets/background.png';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: url(${BackgroundImage}) no-repeat center;
  background-size: cover;
  height: 100%;
  padding: 3em;
`;

export const Content = styled.div`
  width: 100%;
`;

export const LastUserCalled = styled.div`
  flex: 1;

  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 7rem 0;
  border: 2px solid #990000;
  border-radius: 1rem;

  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);

  h3 {
    font-size: 5rem;
    font-weight: bold;
  }

  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin: 1rem 0;
  }

  h4 {
    font-size: 2.5rem;
  }
`;

export const UsersCalledRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 2rem;

  text-align: center;
  margin-top: 3rem;
`;

export const UserInfo = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5rem 1rem;
  border: 2px solid #990000;
  border-radius: 1rem;

  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);

  h3 {
    font-size: 4rem;
    font-weight: bold;
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
    margin: 1rem 0;
  }

  h4 {
    font-size: 1.5rem;
  }
`;
