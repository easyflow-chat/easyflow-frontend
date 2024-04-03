import { object, string } from 'yup';

export const validationSchema = object().shape({
  email: string().email('Must be a valid email!').required('Cannot be empty!'),
  password: string().required('Cannot be empty!'),
});
