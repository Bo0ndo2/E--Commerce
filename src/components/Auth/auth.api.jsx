import React from 'react'
import axios from 'axios';

export function loginApi(formValues) {
  return axios.post(
    'https://fakestoreapi.com/auth/login',
    formValues
  );
}

export function registerApi(formValues) {
  return axios.post(
    'https://ecommerce.routemisr.com/api/v1/auth/signup',
    formValues
  );
}
