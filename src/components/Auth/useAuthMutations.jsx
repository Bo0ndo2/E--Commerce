import React from 'react'

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { loginApi, registerApi } from './auth.api';

export function useLogin() {
  const navigate = useNavigate();
  const { saveUser } = useAuth();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (res, variables) => {
      // Save token AND email so we can distinguish users
      saveUser(res.data.token, { email: variables.email });
      navigate('/');
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();
  const { saveUser } = useAuth();

  return useMutation({
    mutationFn: registerApi,
    onSuccess: (res, variables) => {
      saveUser(res.data.token, { email: variables.email });
      navigate('/');
    },
  });
}
