import { Form, Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import useUser from '../../hooks/useUser';
import Input from '../input/Input';
import { validationSchema } from './validation-schema';

const Login: FunctionComponent = () => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string>();
  const { isLoading, login } = useUser();

  return (
    <div className="tw-m-auto tw-mt-16 tw-flex tw-w-[calc(100%-32px)] tw-flex-col tw-items-center tw-rounded-lg tw-p-4 tw-backdrop-brightness-90 xl:tw-w-96">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema(t)}
        onSubmit={async values => setErrorMessage(await login(values.email, values.password))}
      >
        {({ errors, touched, values, isValid, setFieldTouched, setFieldValue }) => (
          <Form className="tw-w-full">
            <h2 className="tw-mt-0">{t('login:login')}</h2>
            <Input
              label={t('login:email')}
              placeholder="example@example.com"
              type="email"
              value={values.email}
              errors={touched.email && errors.email ? errors.email : undefined}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('email', e.currentTarget.value)}
              onBlur={() => setFieldTouched('email')}
              required
            />
            <Input
              label={t('login:password')}
              type="password"
              value={values.password}
              errors={touched.password && errors.password ? errors.password : undefined}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('password', e.currentTarget.value)}
              onBlur={() => setFieldTouched('password')}
              required
            />
            {errorMessage && <p className="tw-text-red-500">{errorMessage}</p>}
            <div className="tw-ml-[-8px]">
              <ewc-button type="submit" disabled={!isValid} loading={isLoading} label={t('login:login')} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
