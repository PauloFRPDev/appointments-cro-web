import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg';
import logoRed from '../../assets/logo-red.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, LogoContent, AnimationContainer, Content } from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no sistema de Agendamento',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        err.response.data.message.includes('E-mail adress already used')
          ? addToast({
              type: 'info',
              title: 'Erro no cadastro',
              description: 'E-mail já utilizado em outro cadastro',
            })
          : addToast({
              type: 'info',
              title: 'Erro no cadastro',
              description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
            });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <img src={logoRed} alt="CRO-RJ" />

            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmar senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>

      <LogoContent>
        <img src={logo} alt="CRO-RJ" />
        <h1>
          Seja bem vindo ao <br /> sistema de agendamentos do CRO-RJ
        </h1>
      </LogoContent>
    </Container>
  );
};

export default SignUp;
