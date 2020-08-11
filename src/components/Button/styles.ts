import styled from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  loading?: boolean;
}

export const Container = styled.button<ContainerProps>`
  background: #990000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  font-size: 20px;
  margin-top: 16px;
  transition: background-color 0.2s;

  opacity: ${props => (props.loading ? 0.6 : 1)};

  &:hover {
    background: ${shade(0.2, '#990000')};
  }
`;
