import React from 'react';

import {
  Container,
  Content,
  LastUserCalled,
  UsersCalledRow,
  UserInfo,
} from './styles';

const ServiceQueue: React.FC = () => {
  return (
    <Container>
      <Content>
        <LastUserCalled>
          <h3>09:00</h3>
          <h1>Paulo Felippe Ribeiro Pinheiro</h1>
          <h4>Atendente: Paulo Felippe</h4>
        </LastUserCalled>

        <UsersCalledRow>
          <UserInfo>
            <h3>09:00</h3>
            <h2>Paulo Felippe Ribeiro Pinheiro</h2>
            <h4>Atendente: Paulo Felippe</h4>
          </UserInfo>
          <UserInfo>
            <h3>09:00</h3>
            <h2>Paulo Felippe Ribeiro Pinheiro</h2>
            <h4>Atendente: Paulo Felippe</h4>
          </UserInfo>
          <UserInfo>
            <h3>09:00</h3>
            <h2>Paulo Felippe Ribeiro Pinheiro</h2>
            <h4>Atendente: Paulo Felippe</h4>
          </UserInfo>
        </UsersCalledRow>
      </Content>
    </Container>
  );
};

export default ServiceQueue;
