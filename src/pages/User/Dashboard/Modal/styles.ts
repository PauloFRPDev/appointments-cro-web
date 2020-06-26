import styled from 'styled-components';

export const ConfirmInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;

  > strong {
    font-size: 14px;
    color: #444444;
    margin-bottom: 7px;
    border-bottom: 1px solid #999;
    padding-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #666666;
    padding: 20px 0;
    text-align: center;
  }

  input {
    border-radius: 4px;
    padding: 15px 10px;
    border: 1px solid #999;
    margin-bottom: 20px;
    font-size: 18px;
    color: #444444;
  }

  button {
    border: 0;
    background: none;
    color: #fff;
    font-size: 20px;
    background-color: #990000;
    border-radius: 10px;
    padding: 15px 0;
  }
`;
