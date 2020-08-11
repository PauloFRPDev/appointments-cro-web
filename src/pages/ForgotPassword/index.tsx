import React, { useRef, useCallback } from 'react';
import { FiMail } from 'react-icons/fi';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post(`password/forgot`, data);

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'info',
          title: 'Erro ao solicitar troca de senha',
          description:
            'Ocorreu um erro ao solicitar a troca de senha, favor confirmar o e-mail.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <header>
          <h2>Recuperar senha</h2>
        </header>

        <h3>Favor inserir o e-mail que utilizou no cadastro.</h3>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <div>
            <Button type="submit">Recuperar</Button>
            <Link to="/">
              <Button>Voltar</Button>
            </Link>
          </div>
        </Form>
      </Content>
    </Container>
  );
};

export default ForgotPassword;
