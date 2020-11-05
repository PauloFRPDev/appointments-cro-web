import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  FiTrash2,
  FiCheckCircle,
  FiEyeOff,
  FiUserCheck,
  FiFrown,
  FiPhoneCall,
} from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import 'react-datepicker/dist/react-datepicker.css';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/auth';

import Header from '../../../components/Header';

import {
  Container,
  Content,
  FilterContent,
  Picker,
  Scroll,
  AppointmentsList,
  AppointmentData,
  DateInformation,
  AppointmentStatus,
  Error,
  EmptyList,
} from './styles';

interface AppointmentsData {
  id: string;
  date: string;
  formattedDay: string;
  formattedHour: string;
  status: {
    id: number;
    title: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  subject: string;
  sector: {
    id: number;
    title: string;
  };
}

const Appointments: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();

  const [needRefresh, setNeedRefresh] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState<AppointmentsData[]>([]);

  const { addToast } = useToast();

  if (user.isProvider === 0) {
    history.push('/user/dashboard');
  }

  useEffect(() => {
    async function loadAppointments(): Promise<void> {
      const response = await api.get('provider/appointments', {
        params: {
          date: selectedDate.getTime(),
          sector: user.sector_id,
        },
      });

      const formattedAppointments = response.data.map(
        (appointment: AppointmentsData) => ({
          ...appointment,
          formattedDay: format(parseISO(appointment.date), 'dd/MM/yyyy'),
          formattedHour: format(parseISO(appointment.date), 'HH:mm'),
        }),
      );

      setAppointments(formattedAppointments);
      setNeedRefresh(false);
    }

    loadAppointments();
  }, [selectedDate, needRefresh, user.sector_id]);

  async function handleDeleteAppointment(id: string): Promise<void> {
    try {
      const confirmation = confirm('Tem certeza que deseja cancelar o seu agendamento?'); // eslint-disable-line

      if (!confirmation) {
        return;
      }

      await api.delete(`provider/appointments/${id}`);

      addToast({
        type: 'success',
        title: 'Agendamento cancelado',
        description: 'Seu agendamento foi cancelado com sucesso!',
      });

      setNeedRefresh(true);
    } catch {
      addToast({
        type: 'error',
        title: 'Erro no cancelamento',
        description:
          'Ocorreu um erro ao deletar o seu agendamento, por favor tente novamente.',
      });
    }
  }

  async function handleUpdateStatus(
    id: string,
    status_id: number,
  ): Promise<void> {
    try {
      const confirmation = confirm('Tem certeza que deseja alterar o status do agendamento?'); // eslint-disable-line

      if (!confirmation) {
        return;
      }

      await api.patch(`provider/appointments/${id}`, { status_id });

      addToast({
        type: 'success',
        title: 'Agendamento atualizado',
        description: 'Agendamento atualizado com sucesso!',
      });

      setNeedRefresh(true);
    } catch {
      addToast({
        type: 'error',
        title: 'Erro na atualização',
        description:
          'Ocorreu um erro ao atualizar o agendamento, por favor tente novamente.',
      });
    }
  }

  async function handleCallUser(
    id: string,
    appointment_id: string,
  ): Promise<void> {
    try {
      await api.post(`provider/service_queue`, {
        user_id: id,
        appointment_id,
      });

      addToast({
        type: 'success',
        title: 'Usuário chamado',
        description: 'Usuário chamado com sucesso!',
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Erro no chamado',
        description:
          'Ocorreu um erro ao chamar o profissional, por favor entre em contato com o TI.',
      });
    }
  }

  return (
    <>
      <Header />
      <Container>
        <Content>
          <FilterContent>
            <Picker
              locale={pt}
              dateFormat="dd/MM/yyyy"
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
            />
          </FilterContent>

          {appointments.length >= 1 ? (
            <Scroll>
              <AppointmentsList>
                {appointments.map(appointment => (
                  <AppointmentData key={appointment.id}>
                    <DateInformation>
                      <div>
                        <p>Nome: {appointment.user.name}</p>
                        <p>Email: {appointment.user.email}</p>
                        <p>Dia: {appointment.formattedDay}</p>
                        <p>Hora: {appointment.formattedHour}</p>
                        <p>Setor: {appointment.sector.title}</p>
                        <p>Assunto: {appointment.subject}</p>
                      </div>

                      <p>{appointment.status.title}</p>
                    </DateInformation>
                    <AppointmentStatus>
                      <Error title="Chamar">
                        <FiPhoneCall
                          size={20}
                          onClick={() => {
                            handleCallUser(appointment.user.id, appointment.id);
                          }}
                        />
                      </Error>

                      <Error title="Em andamento">
                        <FiUserCheck
                          size={20}
                          color="blue"
                          onClick={() => {
                            handleUpdateStatus(appointment.id, 2);
                          }}
                        />
                      </Error>

                      <Error title="Concluído">
                        <FiCheckCircle
                          size={20}
                          color="green"
                          onClick={() => {
                            handleUpdateStatus(appointment.id, 3);
                          }}
                        />
                      </Error>

                      <Error title="Não compareceu">
                        <FiEyeOff
                          size={20}
                          color="orange"
                          onClick={() => {
                            handleUpdateStatus(appointment.id, 4);
                          }}
                        />
                      </Error>

                      <Error title="Deletar">
                        <FiTrash2
                          size={20}
                          color="red"
                          onClick={() => {
                            handleDeleteAppointment(appointment.id);
                          }}
                        />
                      </Error>
                    </AppointmentStatus>
                  </AppointmentData>
                ))}
              </AppointmentsList>
            </Scroll>
          ) : (
            <EmptyList>
              <FiFrown size={50} color="#333" />
              <h2>Oooops... Não existem agendamentos para esse dia.</h2>
            </EmptyList>
          )}
        </Content>
      </Container>
    </>
  );
};

export default Appointments;
