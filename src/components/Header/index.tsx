import React from 'react';

import { useAuth } from '../../hooks/auth';

import logo from '../../assets/logo.svg';

import { Container, HeaderContent, Navigation, Nav, UserInfo } from './styles';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  function handleLogout(): void {
    signOut();
  }

  return (
    <Container>
      <img src={logo} alt="CRO-RJ" />

      <HeaderContent>
        {user.isProvider === 0 ? (
          <Navigation>
            <Nav to="/user/dashboard">Agendar</Nav>
            <Nav to="/user/my_appointments">Meus agendamentos</Nav>
          </Navigation>
        ) : (
          <Navigation>
            <Nav to="/provider/appointments">Agendamentos</Nav>
          </Navigation>
        )}

        <UserInfo>
          <h2>Bem vindo, {user.name}</h2>

          <button type="button" onClick={handleLogout}>
            Sair do sistema
          </button>
        </UserInfo>
      </HeaderContent>
    </Container>
  );
};

export default Header;
