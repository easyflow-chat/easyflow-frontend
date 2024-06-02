import { TFunction } from 'next-i18next';
import { ObjectSchema, array, object, string } from 'yup';

export const validationSchema = (
  t: TFunction,
): ObjectSchema<{
  name: string;
  description?: string | null;
  users: string[];
}> => {
  return object().shape({
    name: string().required(t('chat:errors.notEmpty')),
    description: string().nullable(),
    users: array().required(t('chat:errors.notEmpty')),
  });
};
