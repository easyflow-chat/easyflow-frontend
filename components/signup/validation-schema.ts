import { TFunction } from 'next-i18next';
import { ObjectSchema, object, string } from 'yup';

export const validationSchema = (
  t: TFunction,
): ObjectSchema<{
  email: string;
  name: string;
  password: string;
  confirmPassword: string | undefined;
}> => {
  return object().shape({
    email: string().email(t('signup:errors.invalidEmail')).required(t('signup:errors.notEmpty')),
    name: string().required(t('signup:errors.notEmpty')),
    password: string()
      .min(8, t('signup:errors.short'))
      .matches(RegExp('[a-z]'), t('signup:errors.lowerCaseCharacter'))
      .matches(RegExp('[A-Z]'), t('signup:errors.upperCaseCharacter'))
      .matches(RegExp('[0-9]'), t('signup:errors.digit'))
      .required(t('signup:errors.notEmpty')),
    confirmPassword: string().test({
      name: 'passwords-equals',
      message: t('signup:errors.passwordsNotEqual'),
      test: function (val) {
        const { password } = this.parent;
        return password === val;
      },
    }),
  });
};
