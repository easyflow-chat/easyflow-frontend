import { Form, Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import useUser from '../../hooks/useUser';
import Button from '../button/Button';
import Input from '../input/Input';
import { validationSchema } from './validation-schema';

const SignUp: FunctionComponent = () => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState<string>();
  const { isLoading, signup } = useUser();
  return (
    <div className="tw-mt-16 tw-flex tw-flex-col tw-items-center">
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema(t)}
        onSubmit={async values => setErrorMessage(await signup(values.email, values.password))}
      >
        {({ errors, touched, values, isValid, setFieldTouched, setFieldValue }) => (
          <Form>
            <h2>{t('signup:signup')}</h2>
            <Input
              label={t('signup:email')}
              placeholder="example@example.com"
              type="text"
              value={values.email}
              errors={touched.email && errors.email ? errors.email : undefined}
              onInput={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('email', e.currentTarget.value)}
              onBlur={() => setFieldTouched('email')}
              required
            />
            <Input
              label={t('signup:password')}
              type="password"
              value={values.password}
              errors={touched.password && errors.password ? errors.password : undefined}
              onInput={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('password', e.currentTarget.value)}
              onBlur={() => setFieldTouched('password')}
              required
            />
            <Input
              label={t('signup:confirmPassword')}
              type="password"
              value={values.confirmPassword}
              errors={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
              onInput={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('confirmPassword', e.currentTarget.value)}
              onBlur={() => setFieldTouched('confirmPassword')}
              required
            />
            {errorMessage && <p className="tw-text-red-500">{errorMessage}</p>}
            <Button type="submit" disabled={!isValid} isLoading={isLoading} invertedStyle>
              Signup
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
