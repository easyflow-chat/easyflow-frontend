import { object, string } from 'yup';

export const validationSchema = object().shape({
  email: string().email('Must be a valid email!').required('Cannot be empty!'),
  password: string()
    .min(8, 'Must be at lest 8 characters long!')
    .matches(RegExp('[a-z]'), 'Must contain at least one lowercase character!')
    .matches(RegExp('[A-Z]'), 'Must contain at least on uppercase character!')
    .matches(RegExp('[0-9]'), 'Must contain at least one digit')
    .required('Cannot be empty!'),
  confirmPassword: string().test({
    name: 'passwords-equals',
    message: "Passwords don't match",
    test: function (val) {
      const { password } = this.parent;
      return password === val;
    },
  }),
});
