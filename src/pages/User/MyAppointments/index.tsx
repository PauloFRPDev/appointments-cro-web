import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FiSearch, FiTrash2 } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

import 'react-perfect-scrollbar/dist/css/styles.css';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import Header from '../../../components/Header';

import {
  Container,
  Content,
  MobileNavigation,
  AppointmentsContainer,
  SearchContainer,
  DateInput,
  AppointmentsList,
  Scroll,
  AppointmentData,
  DateInformation,
  AppointmentStatus,
} from './styles';

interface AppointmentsData {
  id: string;
  date: string;
  sector: {
    id: number;
    title: string;
  };
  formattedDay: string;
  formattedHour: string;
  status: {
    id: number;
    title: string;
  };
}

const MyAppointments: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const { addToast } = useToast();

  const [appointments, setAppointments] = useState<AppointmentsData[]>([]);
  const [dateSearched, setDateSearched] = useState('');

  const [needRefresh, setNeedRefresh] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isFuture, setIsFuture] = useState(true);

  useEffect(() => {
    async function loadAppointments(): Promise<void> {
      const response = await api.get('appointments', {
        params: {
          future: isFuture,
          dateSearched,
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
  }, [isFuture, dateSearched, needRefresh]);

  function handleFilter(): void {
    setIsFuture(!isFuture);
  }

  function handleSearch(e: { target: HTMLInputElement }): void {
    setDateSearched(e.target.value);
  }

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  async function handleDeleteAppointment(id: string): Promise<void> {
    try {
      const confirmation = confirm('Tem certeza que deseja cancelar o seu agendamento?'); // eslint-disable-line

      if (!confirmation) {
        return;
      }

      await api.delete(`appointments/${id}`);

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

  return (
    <Container>
      <Header />

      <Content>
        <MobileNavigation>
          <p>
            Ir para <Link to="dashboard">AGENDAMENTOS</Link>
          </p>
        </MobileNavigation>

        <AppointmentsContainer>
          <SearchContainer>
            <div>
              <p>Deseja mostrar somente agendamentos futuros?</p>
              <select
                name="Filtro de agendamento"
                ref={selectRef}
                onChange={handleFilter}
              >
                <option value="1" defaultChecked>
                  SIM
                </option>
                <option value="0">NÃO</option>
              </select>
            </div>
            <DateInput
              style={{ display: 'none' }}
              isFilled={isFilled}
              isFocused={isFocused}
            >
              <FiSearch size={20} />
              <input
                placeholder="Digite uma data para procura"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                ref={inputRef}
                onChange={handleSearch}
                type="text"
              />
            </DateInput>
          </SearchContainer>

          <Scroll>
            <AppointmentsList>
              {appointments.map(appointment => (
                <AppointmentData key={appointment.id}>
                  <DateInformation>
                    <div>
                      <p>Dia: {appointment.formattedDay}</p>
                      <p>Hora: {appointment.formattedHour}</p>
                      <p>Setor: {appointment.sector.title}</p>
                    </div>
                    <p>{appointment.status.title}</p>
                  </DateInformation>
                  <AppointmentStatus>
                    <FiTrash2
                      size={20}
                      color="#990000"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    />
                  </AppointmentStatus>
                </AppointmentData>
              ))}
            </AppointmentsList>
          </Scroll>
        </AppointmentsContainer>
      </Content>
    </Container>
  );
};

export default MyAppointments;
