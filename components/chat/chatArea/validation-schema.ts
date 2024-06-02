import { TFunction } from 'next-i18next';
import { ObjectSchema, object, string } from 'yup';

export const validationSchema = (
  t: TFunction,
): ObjectSchema<{
  message: string;
}> => {
  return object().shape({
    // TODO: Add translations for message
    message: string().required(t('cannot be empty')),
    encrypted: string().max(65535, 'too long').required(t('cannot be empty')),
    iv: string().required(),
  });
};
