import { Form, Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { ChangeEvent, useContext, useRef } from 'react';
import { GlobalContext } from '../../context/gloabl.context';
import useProfile from '../../hooks/useProfile';
import editPen from '../../public/images/edit-pen.svg';
import Button from '../button/Button';
import Input from '../input/Input';
import Modal, { ModalRef } from '../modal/Modal';
import ModalContent from '../modal/ModalContent';
import ModalTrigger from '../modal/ModalTrigger';
import Textarea from '../textarea/Textarea';
import { validationSchema } from './validtation-schema';

const EditProfile = (): JSX.Element => {
  const modalRef = useRef<ModalRef>(null);
  const { t } = useTranslation();
  const { user } = useContext(GlobalContext);
  const { updateUser, isLoading } = useProfile();

  const handleSubmit = async (name: string, bio: string | undefined): Promise<void> => {
    await updateUser(name, bio);
    modalRef.current?.close();
  };

  //This is shit but seems to work
  if (!user) return <></>;

  return (
    <div className="tw-relative tw-m-4 tw-h-full tw-min-h-96 tw-w-[calc(100%-64px)] tw-rounded-lg tw-p-4 tw-shadow-md tw-shadow-black/20 tw-backdrop-brightness-90 xl:tw-w-[60%]">
      <Modal title={t('profile:profile.modal.title')} ref={modalRef}>
        <ModalTrigger>
          <Image
            src={editPen}
            alt="Edit pen"
            className="tw-absolute tw-right-3 tw-top-3 tw-h-8 tw-w-8 tw-rounded-md tw-bg-transparent hover:tw-cursor-pointer hover:tw-bg-black/10 dark:tw-invert"
          />
        </ModalTrigger>
        <ModalContent>
          <div className="tw-w-[calc(100vw-150px)] xl:tw-w-[700px]">
            <Formik
              initialValues={{ name: user.name, bio: user.bio }}
              validationSchema={() => validationSchema(t)}
              onSubmit={async values => {
                await handleSubmit(values.name, values.bio);
                modalRef.current?.close();
              }}
            >
              {({ errors, values, touched, isValid, setFieldValue, setFieldTouched }) => (
                <Form className="tw-w-full">
                  <Input
                    maxLength={255}
                    label={t('profile:profile.name')}
                    type="text"
                    value={values.name}
                    onInput={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('name', e.currentTarget.value)}
                    onBlur={() => setFieldTouched('name')}
                    errors={touched.name && errors.name ? errors.name : undefined}
                    required
                  />
                  <Textarea
                    label={t('profile:profile.bio')}
                    maxLength={1000}
                    value={values.bio}
                    onInput={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setFieldValue('bio', e.currentTarget.value || null)
                    }
                    onBlur={() => setFieldTouched('bio')}
                    errors={touched.bio && errors.bio ? errors.bio : undefined}
                  />
                  <div className="tw-flex tw-w-full tw-justify-center">
                    <Button type="submit" disabled={!isValid} isLoading={isLoading} invertedStyle>
                      {t('profile:profile.modal.save')}
                    </Button>
                    <Button onClick={() => modalRef.current?.close()}>{t('profile:profile.modal.abort')}</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </ModalContent>
      </Modal>
      <h1>{t('profile:profile.title')}</h1>
      <h3>{t('profile:profile.name')}</h3>
      <p className="tw-w-[95%] tw-rounded-md tw-p-2 tw-backdrop-brightness-90">{user?.name}</p>
      <h3>{t('profile:profile.bio')}</h3>
      <p className="tw-w-[95%] tw-rounded-md tw-p-2 tw-backdrop-brightness-90">{user?.bio || '-'}</p>
    </div>
  );
};

export default EditProfile;
