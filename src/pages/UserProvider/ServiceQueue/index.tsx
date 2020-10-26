import React, { useEffect, useState } from 'react';

import api from '../../../services/api';

import {
  Container,
  Content,
  LastUserCalled,
  UsersCalledRow,
  UserInfo,
} from './styles';

interface ServiceQueueData {
  date: Date;
  employee: string;
  user: string;
}

const ServiceQueue: React.FC = () => {
  const [serviceQueueCalled, setServiceQueueCalled] = useState<
    ServiceQueueData[]
  >([] as ServiceQueueData[]);

  useEffect(() => {
    api.get('/service_queue').then(response => {
      setServiceQueueCalled(response.data);
    });
  }, []);

  return (
    <Container>
      <Content>
        {serviceQueueCalled[0] && (
          <LastUserCalled>
            <h3>{serviceQueueCalled[0].date}</h3>
            <h1>{serviceQueueCalled[0].user}</h1>
            <h4>Atendente: {serviceQueueCalled[0].employee}</h4>
          </LastUserCalled>
        )}

        <UsersCalledRow>
          {serviceQueueCalled.length >= 2 &&
            serviceQueueCalled.map(serviceQueue => (
              <UserInfo>
                <h3>{serviceQueue.date}</h3>
                <h2>{serviceQueue.user}</h2>
                <h4>Atendente: {serviceQueue.employee}</h4>
              </UserInfo>
            ))}
        </UsersCalledRow>
      </Content>
    </Container>
  );
};

export default ServiceQueue;
