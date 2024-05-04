import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useContext, useRef, useState } from 'react';
import Button from '../components/button/Button';
import FileUpload from '../components/fileUpload/FileUpload';
import Modal, { ModalRef } from '../components/modal/Modal';
import ModalContent from '../components/modal/ModalContent';
import ModalTrigger from '../components/modal/ModalTrigger';
import NEXT_I18NEXT_CONFIG from '../config/i18n.config';
import { GlobalContext } from '../context/gloabl.context';
import { I18nNamespace } from '../enums/i18n.enum';
import editPen from '../public/images/edit-pen.svg';
import { APIOperation } from '../services/api-services/common';
import { serverSideRequest } from '../services/api-services/server-side';

const Profile = (): JSX.Element => {
  const modalRef = useRef<ModalRef>(null);
  const { profilePicture, user } = useContext(GlobalContext);
  const { t } = useTranslation();
  // eslint-disable-next-line
  const [file, setFile] = useState<File>();

  return (
    <div>
      <div className="tw-flex tw-flex-col tw-items-center">
        <div className="tw-relative">
          <Modal ref={modalRef} title={t('profile:profilePicture.modalTitle')}>
            <ModalTrigger>
              <Image
                src={editPen}
                alt="Edit pen"
                className="tw-absolute tw-right-0 tw-top-0 tw-h-8 tw-w-8 hover:tw-cursor-pointer dark:tw-invert"
              />
            </ModalTrigger>
            <ModalContent>
              <div className="tw-flex tw-flex-col tw-items-center">
                {/* process that file and send to the backend for storing */}
                <FileUpload allowedFileTypes={['image/png', 'image/jpg']} icon="" setFile={setFile} />
                <Button invertedStyle>{t('profile:profilePicture.save')}</Button>
              </div>
            </ModalContent>
          </Modal>
          {profilePicture ? (
            <img
              className="tw-h-64 tw-w-64 tw-rounded-full tw-border-2 tw-border-solid tw-border-black dark:tw-border-white"
              src={`data:image;base64,${profilePicture}`}
              alt="Profile"
              draggable="false"
            />
          ) : (
            <div className="tw-h-64 tw-w-64 tw-rounded-full tw-border-2 tw-border-solid tw-border-black tw-bg-gradient-to-br tw-from-lime-400 tw-to-sky-400 dark:tw-border-white" />
          )}
        </div>
        <h2 className="tw-max-w-64 tw-overflow-clip tw-font-light">{user?.email}</h2>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const translations = await serverSideTranslations(
    ctx.locale ?? NEXT_I18NEXT_CONFIG.i18n.defaultLocale,
    [I18nNamespace.COMMON, I18nNamespace.PROFILE],
    NEXT_I18NEXT_CONFIG,
  );
  try {
    const res = await serverSideRequest<APIOperation.GET_USER>(ctx.req, { op: APIOperation.GET_USER });
    if (!res.data) {
      throw Error('Unauthorized');
    } else {
      return { props: { user: res.data, ...translations } };
    }
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: '/unauthorized',
      },
    };
  }
};
