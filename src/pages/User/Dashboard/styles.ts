import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { darken, lighten } from 'polished';

import BackgroundImage from '../../../assets/background.png';

interface AvailableProps {
  enabled: boolean;
}

interface TimesProps {
  columns?: number;
}

export const Container = styled.div`
  height: 100%;

  @media (min-width: 650px) {
    overflow: hidden;
  }
`;

export const Content = styled.div`
  height: 100%;
  background: url(${BackgroundImage}) no-repeat center;
  background-size: cover;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 650px) {
    height: auto;
  }
`;

export const MobileNavigation = styled.div`
  @media (max-width: 650px) {
    margin-bottom: 40px;
    margin-top: 40px;

    p {
      color: #fff;
      font-size: 16px;
      font-weight: bold;

      a {
        text-decoration: none;
        color: #990000;
        transition: color 0.2s;

        &:hover {
          color: ${lighten(0.1, '#990000')};
        }
      }
    }
  }

  @media (min-width: 651px) {
    display: none;
  }
`;

export const AvailableTimesContainer = styled.div`
  background-color: rgba(255, 255, 255);
  border-radius: 10px;

  padding: 40px;
  margin: 0 40px;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 60%;

  h3 {
    margin-top: 20px;
    text-align: center;
  }

  @media (max-width: 1000px) {
    width: 90%;

    margin-bottom: 40px;

    h3 {
      font-size: 14px;
    }
  }
`;

export const SectorSelect = styled.select`
  font-size: 20px;
  border-radius: 4px;
  background: #f0f0f0;
  margin-bottom: 16px;
  border: none;
  padding: 5px 30px;
  align-self: center;

  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
`;

export const Picker = styled(DatePicker)`
  border: none;
  font-size: 20px;
  color: #000;
  background-color: #f0f0f0;
  border-radius: 4px;
  text-align: center;
  padding: 5px 0;

  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);

  &:hover {
    cursor: pointer;
  }
`;

export const AvailableTimes = styled.div`
  background: #000;
  border-radius: 10px;
  text-align: center;
  padding: 10px 40px;
  border: 2px solid #990000;

  color: #fff;
  background-color: #990000;
  transition: opacity 0.3s;

  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);

  opacity: ${(props: AvailableProps) => (props.enabled ? 1 : 0.5)};

  ${(props: AvailableProps) => !props.enabled && 'pointer-events: none;'}

  &:hover {
    cursor: ${(props: AvailableProps) =>
      props.enabled ? 'pointer' : 'not-allowed'};
    opacity: ${(props: AvailableProps) => props.enabled && 0.8};
  }
`;

export const Times = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-columns: ${(props: TimesProps) =>
    props.columns === 2 && 'repeat(2, 1fr)'};
  row-gap: 20px;
  column-gap: 20px;

  margin-top: 40px;

  .selected {
    border: 2px solid #fff;
    background-color: ${darken(0.2, '#990000')};
  }

  @media (max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ConfirmButton = styled.button`
  border: 0;
  background: none;
  padding: 10px 40px;
  background-color: #990000;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  margin-top: 40px;
  transition: opacity 0.3s;

  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);

  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
