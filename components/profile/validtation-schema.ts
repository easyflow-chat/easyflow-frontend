import { TFunction } from 'next-i18next';
import { ObjectSchema, object, string } from 'yup';

export const validationSchema = (
  t: TFunction,
): ObjectSchema<{
  name: string;
  bio: string | null | undefined;
}> => {
  return object().shape({
    name: string().required(t('profile:profile.modal.errors.required')),
    bio: string().max(1000, t('profile:profile.modal.errors.maxLength')).nullable(),
  });
};
