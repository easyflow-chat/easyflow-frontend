import { TFunction } from 'next-i18next';
import { ObjectSchema, object, string } from 'yup';

export const validationSchema = (
  t: TFunction,
): ObjectSchema<{
  email: string;
  password: string;
}> => {
  return object().shape({
    email: string().email(t('login:errors.invalidEmail')).required(t('login:errors.notEmpty')),
    password: string().required(t('login:errors.notEmpty')),
  });
};
