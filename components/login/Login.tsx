import { Form, Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import useUser from '../../hooks/useUser';
import Button from '../Button/Button';
import Input from '../Input/Input';
import { validationSchema } from './validation-schema';

const Login: FunctionComponent = () => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string>();
  const { isLoading, login } = useUser();
  return (
    <div className="tw-mt-16 tw-flex tw-flex-col tw-items-center">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema(t)}
        onSubmit={async values => setErrorMessage(await login(values.email, values.password))}
      >
        {({ errors, touched, values, isValid, setFieldTouched, setFieldValue }) => (
          <Form>
            <h2>{t('login:login')}</h2>
            <Input
              label={t('login:email')}
              placeholder="example@example.com"
              type="email"
              value={values.email}
              errors={touched.email && errors.email ? errors.email : undefined}
              onInput={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('email', e.currentTarget.value)}
              onBlur={() => setFieldTouched('email')}
              required
            />
            <Input
              label={t('login:password')}
              type="password"
              value={values.password}
              errors={touched.password && errors.password ? errors.password : undefined}
              onInput={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('password', e.currentTarget.value)}
              onBlur={() => setFieldTouched('password')}
              required
            />
            {errorMessage && <p className="tw-text-red-500">{errorMessage}</p>}
            <Button type="submit" disabled={!isValid} isLoading={isLoading} invertedStyle>
              {t('login:login')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
