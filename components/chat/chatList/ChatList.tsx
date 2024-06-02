import { Form, Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, Dispatch, FunctionComponent, SetStateAction, useEffect, useRef, useState } from 'react';
import useChat from '../../../hooks/useChat';
import imageIcon from '../../../public/images/image.svg';
import { UserType } from '../../../types/user.type';
import FileUpload from '../../fileUpload/FileUpload';
import Input from '../../input/Input';
import Modal, { ModalRef } from '../../modal/Modal';
import ModalContent from '../../modal/ModalContent';
import ModalTrigger from '../../modal/ModalTrigger';
import Textarea from '../../textarea/Textarea';
import ChatListItem from '../chatListItem/ChatListItem';
import { validationSchema } from './validation-schema';

interface ChatListProps {
  user: UserType;
  setSelectedChatId: Dispatch<SetStateAction<string | undefined>>;
  selectedChatId?: string;
}

const ChatList: FunctionComponent<ChatListProps> = ({ user, setSelectedChatId, selectedChatId }): JSX.Element => {
  const modalRef = useRef<ModalRef>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { createChat, chatsPreviews, getChatsPreview } = useChat();
  const { t } = useTranslation();

  const [file, setFile] = useState<File>();

  useEffect(() => {
    void getChatsPreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <div className="tw-flex tw-h-full tw-flex-col tw-rounded-l-xl tw-border tw-border-solid tw-border-transparent tw-border-r-gray-300 dark:tw-border-r-gray-700">
      <div className="tw-sticky tw-top-0 tw-h-16 tw-w-full">
        <Modal ref={modalRef} title="Create Chat">
          <ModalTrigger>
            <ewc-button label="New Chat" />
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
            </div>
            <Formik
              initialValues={{ name: '', description: undefined, users: [] }}
              onSubmit={async values => {
                await createChat(
                  values.name,
                  values.description,
                  canvasRef.current?.toDataURL('image/jpeg').split(',')[1],
                  [...values.users, { id: user.id, publicKey: user.publicKey }],
                );
                modalRef.current?.close();
              }}
              validationSchema={validationSchema(t)}
            >
              {({ values, touched, errors, setFieldValue, setFieldTouched }) => (
                <Form>
                  <Input
                    label="Name"
                    type="text"
                    value={values.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('name', e.currentTarget.value)}
                    onBlur={() => setFieldTouched('name')}
                    errors={touched.name && errors.name ? errors.name : undefined}
                    required
                  />
                  <Textarea
                    label="Description"
                    value={values.description}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setFieldValue('description', e.currentTarget.value)
                    }
                    onBlur={() => setFieldTouched('description')}
                    errors={touched.description && errors.description ? errors.description : undefined}
                  />
                  <ewc-button type="submit" label="Submit" />
                </Form>
              )}
            </Formik>
          </ModalContent>
        </Modal>
      </div>
      <div className="tw-h-[calc(100%-72px)] tw-w-full tw-overflow-y-auto">
        {chatsPreviews.map((chatPreview, i) => (
          <ChatListItem
            chatPreview={chatPreview}
            key={`${chatPreview}-${i}`}
            setSelectedChat={setSelectedChatId}
            selected={chatPreview.id === selectedChatId}
          />
        ))}
      </div>
    </div>
  );
};
export default ChatList;
