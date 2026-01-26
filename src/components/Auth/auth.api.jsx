import React from 'react'
import axios from 'axios';

export function loginApi(formValues) {
  return axios.post(
    'https://e-comm.free.beeceptor.com/login',
    formValues
  );
}

export function registerApi(formValues) {
  return axios.post(
    'https://e-comm.free.beeceptor.com/login',
    formValues
  );
}
