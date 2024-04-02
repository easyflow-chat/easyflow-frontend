import { Form, Formik } from 'formik';
import { ChangeEvent, FunctionComponent } from 'react';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import useUser from '../hooks/user.hook';
import { validationSchema } from '../validation-schemas/signup/validation-schema';

const SignUp: FunctionComponent = () => {
  const { signup } = useUser();
  return (
    <div className="tw-mt-16 tw-flex tw-flex-col tw-items-center">
      <Formik initialValues={{ email: '', password: '', confirmPassword: '' }} validationSchema={validationSchema} onSubmit={async (values) => await signup(values.email, values.password)}>
        {({ errors, touched, values, isValid, setFieldTouched, setFieldValue }) => (
          <Form>
            <h2>Sign up</h2>
            <Input
              label="E-Mail"
              placeholder="example@example.com"
              type="text"
              value={values.email}
              errors={touched.email && errors.email ? errors.email : undefined}
              onInput={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('email', e.currentTarget.value)}
              onBlur={() => setFieldTouched('email')}
              required
            />
            <Input
              label="Password"
              type="password"
              value={values.password}
              errors={touched.password && errors.password ? errors.password : undefined}
              onInput={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('password', e.currentTarget.value)}
              onBlur={() => setFieldTouched('password')}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              errors={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
              onInput={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('confirmPassword', e.currentTarget.value)}
              onBlur={() => setFieldTouched('confirmPassword')}
              required
            />
            <Button type="submit" disabled={!isValid} invertedStyle>
              Signup
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
