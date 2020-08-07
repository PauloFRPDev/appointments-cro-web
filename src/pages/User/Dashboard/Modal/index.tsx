import React, { useRef } from 'react';
import Modal from 'react-modal';

import { ConfirmInformation } from './styles';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    margin: '0 auto',
    padding: '25px',
    overflow: 'hidden',
    zIndex: 3,
  },
  overlay: {
    zIndex: 3,
    backgroundColor: '#44444480',
  },
};

interface Props {
  time: {
    time: Date;
    parsedTime: string;
  };
  sector: number;
  isOpen: boolean;
  toggleModalVisible: () => void;
  handleAddAppointment(
    sector: number,
    time: Date,
    subject: string,
  ): Promise<void>;
}

Modal.setAppElement('#root');

const ConfirmModal: React.FC<Props> = ({
  time,
  sector,
  isOpen,
  toggleModalVisible,
  handleAddAppointment,
}: Props) => {
  const subjectRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModalVisible}
        style={customStyles}
      >
        <ConfirmInformation>
          <strong>CONFIRMAR AGENDAMENTO</strong>

          <p>
            Confirmar atendimento para
            <strong> {time.parsedTime}</strong>?
          </p>

          <input
            ref={subjectRef}
            type="text"
            placeholder="Assunto"
            maxLength={30}
          />

          <button
            type="button"
            onClick={
              () =>
                handleAddAppointment(
                  sector,
                  time.time,
                  String(subjectRef.current?.value),
                )
              // eslint-disable-next-line react/jsx-curly-newline
            }
          >
            Confirmar
          </button>
        </ConfirmInformation>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
