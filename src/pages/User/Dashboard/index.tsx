import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import pt from 'date-fns/locale/pt-BR';
import { parseISO, format } from 'date-fns';

import * as Yup from 'yup';

import api from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationErrors';
import {
  holidays,
  libraryVacation,
  mumpsMigration,
} from '../../../config/holiday';

import 'react-datepicker/dist/react-datepicker.css';

import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/auth';

import Header from '../../../components/Header';
import ConfirmModal from './Modal';
import Message from './Message';

import {
  Container,
  Content,
  MobileNavigation,
  AvailableTimesContainer,
  SectorSelect,
  Picker,
  AvailableTimes,
  Times,
  Subtitle,
  ConfirmButton,
} from './styles';

interface AvailableTime {
  time: string;
  value: Date;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState<AvailableTime[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState({
    time: new Date(),
    parsedTime: '',
  });
  const [hourIsSelected, setHourIsSelected] = useState(false);

  const history = useHistory();

  const { addToast } = useToast();

  const { user } = useAuth();

  if (user.isProvider === 1) {
    history.push('/provider/appointments');
  }

  useEffect(() => {
    setSelectedHour({
      time: new Date(),
      parsedTime: '',
    });
    setHourIsSelected(false);

    async function loadAvailableTimes(): Promise<void> {
      const response = await api.get('availables', {
        params: {
          date: selectedDate.getTime(),
          sector_id: selectedSector,
        },
      });

      const available = response.data;

      setAvailableTimes(available);
    }

    loadAvailableTimes();
  }, [selectedDate, selectedSector]);

  function handleSelectHour(time: Date): void {
    const parsedDate = format(
      parseISO(String(time)),
      "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
      {
        locale: pt,
      },
    );

    setSelectedHour({
      time,
      parsedTime: parsedDate,
    });
    setHourIsSelected(true);
  }

  function handleToggleModal(): void {
    if (hourIsSelected) {
      setIsOpen(!isOpen);
      return;
    }

    addToast({
      type: 'info',
      title: 'Agendamento',
      description: 'Por favor, selecione uma hora para agendamento.',
    });
  }

  function handleSelectSector(e: React.ChangeEvent<HTMLSelectElement>): void {
    setSelectedSector(Number(e.target.value));

    setSelectedHour({
      time: new Date(),
      parsedTime: '',
    });
    setHourIsSelected(false);
  }

  async function handleAddAppointment(
    sector: number,
    date: Date,
    subject: string,
  ): Promise<void> {
    try {
      const schema = Yup.string()
        .min(6, 'Assunto deve ter pelo menos 6 caracteres')
        .required('Assunto obrigatório');

      await schema.validate(subject, {
        abortEarly: false,
      });

      await api.post('appointments', {
        sector_id: sector,
        date,
        subject,
      });

      const parsedDate = format(
        parseISO(String(date)),
        "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
        {
          locale: pt,
        },
      );

      addToast({
        type: 'success',
        title: 'Agendamento realizado com sucesso!',
        description: `Seu agendamento para o dia ${parsedDate} foi realizado com sucesso!`,
      });

      setIsOpen(!isOpen);

      history.push('/user/my_appointments');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        addToast({
          type: 'error',
          title: 'Erro no agendamento',
          description: errors.undefined,
        });

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro no agendamento',
        description:
          'Ocorreu um erro ao realizar o agendamento, por favor tente novamente.',
      });
    }
  }

  return (
    <Container>
      <ConfirmModal
        isOpen={isOpen}
        time={selectedHour}
        sector={selectedSector}
        toggleModalVisible={handleToggleModal}
        handleAddAppointment={handleAddAppointment}
      />
      <Header />

      <Content>
        <MobileNavigation>
          <p>
            Ir para <Link to="my_appointments">MEUS AGENDAMENTOS</Link>
          </p>
        </MobileNavigation>

        <AvailableTimesContainer>
          <SectorSelect name="sectorSelect" onChange={handleSelectSector}>
            <option value="1">Atendimento</option>
            <option value="2">Biblioteca - Serviços</option>
            <option value="3">Biblioteca - Estudo</option>
          </SectorSelect>

          <Picker
            locale={pt}
            dateFormat="dd/MM/yyyy"
            showPopperArrow={false}
            selected={selectedDate}
            excludeDates={
              selectedSector === 1
                ? holidays.concat(mumpsMigration)
                : holidays.concat(libraryVacation)
            }
            onChange={(date: Date) => setSelectedDate(date)}
          />

          <h3>
            <strong>Atenção!!</strong>

            <Message sector={selectedSector} />
          </h3>

          <Times columns={selectedSector === 3 ? 2 : 4}>
            {availableTimes.map(availableTime => (
              <AvailableTimes
                enabled={availableTime.available}
                key={availableTime.time}
                onClick={() => handleSelectHour(availableTime.value)}
                className={
                  selectedHour.parsedTime.includes(`${availableTime.time}`)
                    ? 'selected'
                    : ''
                }
              >
                {availableTime.time}
              </AvailableTimes>
            ))}
          </Times>

          <Subtitle>
            <div>
              <div className="first-square" />
              Horários Disponíveis
            </div>
            <div>
              <div className="second-square" />
              Horários Indisponíveis
            </div>
          </Subtitle>

          <ConfirmButton type="button" onClick={handleToggleModal}>
            Agendar
          </ConfirmButton>
        </AvailableTimesContainer>
      </Content>
    </Container>
  );
};

export default Dashboard;
