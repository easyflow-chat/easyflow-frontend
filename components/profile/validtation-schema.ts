import { TFunction } from 'next-i18next';
import { ObjectSchema, object, string } from 'yup';

export const validationSchema = (
  t: TFunction,
): ObjectSchema<{
  name: string;
  bio: string | null | undefined;
}> => {
  return object().shape({
    name: string().max(255, t('profile:profile.modal.errors.255')).required(t('profile:profile.modal.errors.required')),
    bio: string().max(1000, t('profile:profile.modal.errors.maxLength1000')).nullable(),
  });
};
