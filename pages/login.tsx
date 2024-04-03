import { Form, Formik } from 'formik';
import { ChangeEvent, FunctionComponent } from 'react';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import useUser from '../hooks/useUser';
import { validationSchema } from '../validation-schemas/login/validation-schema';

const Login: FunctionComponent = () => {
  const { login } = useUser();
  return (
    <div className="tw-mt-16 tw-flex tw-flex-col tw-items-center">
      <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={async values => await login(values.email, values.password)}>
        {({ errors, touched, values, isValid, setFieldTouched, setFieldValue }) => (
          <Form>
            <h2>Login</h2>
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
            <Button type="submit" disabled={!isValid} invertedStyle>
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
