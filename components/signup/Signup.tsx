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
    <div className="tw-m-auto tw-mt-16 tw-flex tw-w-[calc(100%-32px)] tw-flex-col tw-items-center tw-rounded-lg tw-p-4 tw-backdrop-brightness-90 xl:tw-w-96">
      <Formik
        initialValues={{ email: '', name: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema(t)}
        onSubmit={async values => setErrorMessage(await signup(values.email, values.name, values.password))}
      >
        {({ errors, touched, values, isValid, setFieldTouched, setFieldValue }) => (
          <Form className="tw-w-full">
            <h2 className="tw-mt-0">{t('signup:signup')}</h2>
            <Input
              label={t('signup:email')}
              placeholder="example@example.com"
              type="email"
              value={values.email}
              errors={touched.email && errors.email ? errors.email : undefined}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('email', e.currentTarget.value)}
              onBlur={() => setFieldTouched('email')}
              required
            />
            <Input
              label={t('signup:name.label')}
              placeholder={t('signup:name.placeholder')}
              type="text"
              value={values.name}
              errors={touched.name && errors.name ? errors.name : undefined}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('name', e.currentTarget.value)}
              onBlur={() => setFieldTouched('name')}
              required
            />
            <Input
              label={t('signup:password')}
              type="password"
              value={values.password}
              errors={touched.password && errors.password ? errors.password : undefined}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('password', e.currentTarget.value)}
              onBlur={() => setFieldTouched('password')}
              required
            />
            <Input
              label={t('signup:confirmPassword')}
              type="password"
              value={values.confirmPassword}
              errors={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('confirmPassword', e.currentTarget.value)}
              onBlur={() => setFieldTouched('confirmPassword')}
              required
            />
            {errorMessage && <p className="tw-text-red-500">{errorMessage}</p>}
            <div className="tw-ml-[-8px]">
              <Button type="submit" disabled={!isValid} isLoading={isLoading} invertedStyle>
                {t('signup:signup')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
