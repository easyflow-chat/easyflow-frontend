import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../../context/gloabl.context';
import useProfile from '../../hooks/useProfile';
import editPen from '../../public/images/edit-pen.svg';
import imageIcon from '../../public/images/image.svg';
import FileUpload from '../fileUpload/FileUpload';
import Modal, { ModalRef } from '../modal/Modal';
import ModalContent from '../modal/ModalContent';
import ModalTrigger from '../modal/ModalTrigger';

const ChangeProfilePicture: FunctionComponent = () => {
  const modalRef = useRef<ModalRef>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { profilePicture, user } = useContext(GlobalContext);
  const { submitProfilePicture, isLoading } = useProfile();
  const { t } = useTranslation();
  const [file, setFile] = useState<File>();

  useEffect(() => {
    const convertImage = async (): Promise<void> => {
      if (file && canvasRef.current) {
        const bitmap = await createImageBitmap(file);
        const ctx = canvasRef.current?.getContext('2d');
        const ratio = bitmap.width / bitmap.height;
        ctx?.drawImage(bitmap, -((384 * ratio - 384) / 2), 0, 384 * ratio, 384);
      }
    };
    void convertImage();
  }, [file]);

  const handleSubmitProfilePicture = async (): Promise<void> => {
    await submitProfilePicture(canvasRef.current?.toDataURL('image/jpeg'));
    setFile(undefined);
    modalRef.current?.close();
  };
  return (
    <div className="tw-m-4 tw-flex tw-h-full tw-min-h-96 tw-w-[calc(100%-64px)] tw-flex-col tw-items-center tw-rounded-lg tw-bg-black/10 tw-p-4 tw-shadow-md tw-shadow-black/20 xl:tw-w-[40%]">
      <div className="tw-relative tw-mt-6">
        <Modal ref={modalRef} title={t('profile:profilePicture.modalTitle')}>
          <ModalTrigger>
            <Image
              src={editPen}
              alt="Edit pen"
              className="tw-absolute tw-right-0 tw-top-0 tw-h-8 tw-w-8 tw-rounded-md hover:tw-cursor-pointer hover:tw-bg-black/10 dark:tw-invert"
            />
          </ModalTrigger>
          <ModalContent>
            <div className="tw-flex tw-flex-col tw-items-center">
              {file ? (
                <canvas
                  ref={canvasRef}
                  className="tw-mb-3 tw-h-48 tw-w-48 tw-rounded-full tw-border-solid tw-border-white xl:tw-h-96 xl:tw-w-96 dark:tw-border-black"
                  width={384}
                  height={384}
                />
              ) : (
                <FileUpload
                  allowedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
                  icon={imageIcon}
                  setFile={setFile}
                />
              )}
              <ewc-button-group>
                {file && (
                  <ewc-button
                    onClick={() => setFile(undefined)}
                    label={t('profile:profilePicture.reset')}
                    theme="secondary"
                  />
                )}
                <ewc-button
                  onClick={() => handleSubmitProfilePicture()}
                  loading={isLoading}
                  disabled={!file}
                  label={t('profile:profilePicture.save')}
                />
              </ewc-button-group>
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
  );
};

export default ChangeProfilePicture;
