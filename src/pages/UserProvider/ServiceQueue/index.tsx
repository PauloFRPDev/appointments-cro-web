import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
// import socketIOClient from 'socket.io-client';

import api from '../../../services/api';

import {
  Container,
  Content,
  LastUserCalled,
  UsersCalledRow,
  UserInfo,
} from './styles';

interface ServiceQueueData {
  id: string;
  date: Date;
  parsedDate: Date;
  employee: string;
  user: string;
}

const ServiceQueue: React.FC = () => {
  const [serviceQueueCalled, setServiceQueueCalled] = useState<
    ServiceQueueData[]
  >([] as ServiceQueueData[]);

  // const socket = socketIOClient('http://localhost:3333');

  useEffect(() => {
    api.get('/provider/service_queue').then(response => {
      setServiceQueueCalled(
        response.data.map((service: Omit<ServiceQueueData, 'parsedDate'>) => {
          return {
            ...service,
            parsedDate: format(parseISO(String(service.date)), 'HH:mm'),
          };
        }),
      );
    });
  }, []);

  return (
    <Container>
      <Content>
        {serviceQueueCalled[0] && (
          <LastUserCalled>
            <h3>{serviceQueueCalled[0].parsedDate}</h3>
            <h1>{serviceQueueCalled[0].user}</h1>
            <h4>Atendente: {serviceQueueCalled[0].employee}</h4>
          </LastUserCalled>
        )}

        <UsersCalledRow>
          {serviceQueueCalled.length >= 2 &&
            serviceQueueCalled.map(serviceQueue => {
              if (serviceQueueCalled.indexOf(serviceQueue) === 0) {
                return false;
              }

              return (
                <UserInfo key={serviceQueue.id}>
                  <h3>{serviceQueue.parsedDate}</h3>
                  <h2>{serviceQueue.user}</h2>
                  <h4>Atendente: {serviceQueue.employee}</h4>
                </UserInfo>
              );
            })}
        </UsersCalledRow>
      </Content>
    </Container>
  );
};

export default ServiceQueue;
