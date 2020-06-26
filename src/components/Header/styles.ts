import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  align-items: center;

  height: 60px;
  padding: 10px 30px;
  background: #990000;

  img {
    max-height: 40px;
  }

  @media (max-width: 650px) {
    padding: 10px 15px;
    justify-content: space-between;
  }

  @media (min-width: 651px) {
    > svg {
      display: none;
    }
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  @media (max-width: 650px) {
    justify-content: flex-end;
  }
`;

export const Navigation = styled.div`
  display: flex;
  align-items: center;

  margin-left: 30px;

  @media (max-width: 650px) {
    display: none;
  }
`;

export const Nav = styled(NavLink).attrs({
  activeStyle: {
    color: '#333',
  },
})`
  font-size: 20px;
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 18px;
    margin-right: 20px;
    color: #fff;

    @media (max-width: 650px) {
      display: none;
    }
  }

  button {
    background: 0;
    border: none;
    color: #fff;
    transition: color 0.2s;

    &:hover {
      color: #999;
    }

    @media (max-width: 650px) {
      align-self: flex-end;
    }
  }
`;
