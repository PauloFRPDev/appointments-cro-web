import styled from 'styled-components';

import BackgroundImage from '../../assets/background.png';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;

  background: url(${BackgroundImage}) no-repeat center;
  background-size: cover;
`;

export const Content = styled.div`
  width: 40%;
  background: #dcdcdc;
  padding: 0 0 20px;
  border-radius: 10px;
  border: 1px solid #990000;

  @media (max-width: 1235px) {
    width: 80%;
  }

  header {
    display: flex;
    justify-content: center;

    background: #990000;
    padding: 10px 0;

    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-top: 1px solid #990000;

    h2 {
      color: #fff;
    }
  }

  h3 {
    font-size: 22px;
    text-align: center;
    margin: 20px 0;

    @media (max-width: 1235px) {
      font-size: 18px;
      padding: 0 30px;
    }
  }

  form {
    padding: 0 30px;

    > div {
      display: flex;
      justify-content: flex-end;

      button,
      a {
        width: 150px;
        height: 50px;

        @media (max-width: 1235px) {
          font-size: 15px;
          width: 115px;
          height: 40px;
        }
      }

      > button {
        margin-right: 15px;

        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          width: 30px;
          height: 40px;
        }
      }
    }
  }
`;
