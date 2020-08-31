import React from 'react';

interface MessageData {
  sector: number;
}

const Message: React.FC<MessageData> = ({ sector }) => {
  switch (sector) {
    case 1:
      return (
        <p>
          Os agendamentos são feitos para o setor de Atendimento da{' '}
          <strong>SEDE</strong> do CRO-RJ, para agendamento nas{' '}
          <strong>DELEGACIAS</strong>, favor entrar em contato através do
          telefone.
        </p>
      );
    case 2:
      return (
        <p>
          Agendamento para Serviços de Levantamento Bibliográfico, Pesquisa
          Bibliográfica e Ficha Catalográfica.
          <br />
          <strong>Observação:</strong> Todos esses serviços podem ser
          solicitados através do link{' '}
          <strong>
            <a href="http://www.cro-rj.org.br/servicos/biblioteca/">
              http://www.cro-rj.org.br/servicos/biblioteca/
            </a>
          </strong>
          .
          <br />
          <strong>Dúvidas:</strong> biblioteca@cro-rj.org.br / 3505-7639
        </p>
      );
    case 3:
      return (
        <p>
          Para permanência na Biblioteca para leitura/estudo.
          <br />
          <strong>Horários:</strong> De <strong>09:00h às 12:00h</strong> e de{' '}
          <strong>13:00h às 16:00h</strong>
          <br />
          <strong>Dúvidas:</strong> biblioteca@cro-rj.org.br / 3505-7639
        </p>
      );
    default:
      return <p />;
  }
};

export default Message;
