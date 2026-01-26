// validation.js
import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .required('Username is required'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'Password must contain uppercase, lowercase, and a number'
    )
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const checkoutSchema = Yup.object({
  fullName: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Full name is required'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .required('Address is required'),

  city: Yup.string()
    .required('City is required'),

  postalCode: Yup.string()
    .required('Postal code is required'),

  cardNumber: Yup.string()
    .required('Card number is required'),

  expiryDate: Yup.string()
    .required('Expiry date is required'),

  cvv: Yup.string()
    .required('CVV is required'),
});
