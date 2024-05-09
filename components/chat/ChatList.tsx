import { Form, Formik } from 'formik';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from 'react';
import useChat from '../../hooks/useChat';
import imageIcon from '../../public/images/image.svg';
import { ChatType } from '../../types/chat.type';
import { UserType } from '../../types/user.type';
import Button from '../button/Button';
import FileUpload from '../fileUpload/FileUpload';
import Input from '../input/Input';
import Modal from '../modal/Modal';
import ModalContent from '../modal/ModalContent';
import ModalTrigger from '../modal/ModalTrigger';
import Textarea from '../textarea/Textarea';
import ChatListItem from './ChatListItem';
import { validationSchema } from './validation-schema';

interface ChatListProps {
  chats: Partial<ChatType>[];
  user: UserType;
}

const ChatList: FunctionComponent<ChatListProps> = ({ chats, user }): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { createChat } = useChat();
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
  return (
    <div className="tw-relative tw-h-[calc(100%-2px)] tw-w-screen tw-max-w-[450px] tw-rounded-l-xl tw-border tw-border-solid tw-border-transparent tw-border-r-gray-300 dark:tw-border-r-gray-700">
      <div className="tw-sticky tw-top-0 tw-h-16 tw-w-full">
        <Modal title="Create Chat">
          <ModalTrigger>
            <Button>New Chat</Button>
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
              onSubmit={async values =>
                await createChat(
                  values.name,
                  values.description,
                  canvasRef.current?.toDataURL('image/jpeg').split(',')[1],
                  [...values.users, { id: user.id, publicKey: user.publicKey }],
                )
              }
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
                  <Button type="submit" invertedStyle>
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalContent>
        </Modal>
      </div>
      <div className="tw-h-[calc(100%-72px)] tw-w-full tw-overflow-scroll">
        {chats.map((chat, i) => (
          <ChatListItem chat={chat} key={`${chat}-${i}`} />
        ))}
      </div>
    </div>
  );
};
export default ChatList;
