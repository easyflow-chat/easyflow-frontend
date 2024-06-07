import { ChangeEvent, FunctionComponent, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/gloabl.context';
import { decrypt, encrypt } from '../../../helpers/key.helpers';
import useChat from '../../../hooks/useChat';
import { MessageType } from '../../../types/message.type';
import Message from '../message/Message';

interface ChatAreaProps {
  selectedChatId?: string;
  privateKey: CryptoKey;
}

const ChatArea: FunctionComponent<ChatAreaProps> = ({ selectedChatId, privateKey }): JSX.Element => {
  const { getChatById, sendMessage, isLoading, chatKey, chat, setChat } = useChat();
  const { user, webSocket } = useContext(GlobalContext);
  const [decryptedMessages, setDecryptedMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState<string>();
  const [isTooLong, setIsTooLong] = useState<boolean>();
  const [isEncrypting, setIsEncrypting] = useState<boolean>();

  useEffect(() => {
    if (selectedChatId) {
      void getChatById(selectedChatId, privateKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChatId, privateKey]);

  useEffect(() => {
    // Handle incoming messages
    webSocket?.on('receive_message', async (data: MessageType) => {
      if (chat && chatKey) {
        console.log('Received message', data);
        setChat({
          ...chat,
          messages: [data, ...chat.messages],
        });
      }
    });
  }, [chat, chatKey, setChat, webSocket]);

  useEffect(() => {
    const decryptMessages = async (): Promise<void> => {
      if (chat?.messages && chatKey) {
        const decrypted = await Promise.all(
          chat.messages.map(async message => {
            const iv = Buffer.from(message.iv, 'base64');
            const decryptedContent = await decrypt(message.content, chatKey, iv);
            return { ...message, content: decryptedContent };
          }),
        );
        setDecryptedMessages(decrypted);
      }
    };
    void decryptMessages();
  }, [chat?.messages, chatKey]);

  useEffect(() => {
    const checkLength = async (): Promise<void> => {
      if (message && chatKey) {
        setIsEncrypting(true);
        const length = (await encrypt(message, chatKey, window.crypto.getRandomValues(new Uint8Array(12)))).length;
        if (length > 65535) {
          setIsTooLong(true);
        } else {
          setIsTooLong(false);
        }
        setIsEncrypting(false);
      }
    };
    void checkLength();
  }, [message, chatKey]);

  const handleSubmit = async (): Promise<void> => {
    if (message && chat && chatKey) {
      setIsEncrypting(true);
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const encrypted = await encrypt(message, chatKey, iv);
      if (encrypted.length > 65535) {
        setIsTooLong(true);
      } else {
        await sendMessage(encrypted, chat.id, iv);
      }
      setIsEncrypting(false);
    }
  };

  return (
    <div className="tw-flex tw-h-full tw-w-full">
      {isLoading && (
        <div className="tw-flex tw-h-full tw-items-center tw-justify-center">
          <ewc-loader size={64} />
        </div>
      )}
      {!chat && !isLoading && (
        <div className="tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center">
          {/* TODO: Design a empty state */}
          <h3>Select a chat to start chatting</h3>
        </div>
      )}
      {chat && !isLoading && chatKey && (
        <div className="tw-flex tw-h-[calc(100vh-113px)] tw-w-full tw-flex-col tw-items-end tw-rounded-r-xl">
          <div className="tw-flex tw-h-full tw-w-full tw-flex-col-reverse tw-overflow-y-auto tw-overflow-x-hidden">
            {decryptedMessages.map(message => (
              <Message key={message.id} message={message} isMine={message.sender.id === user?.id} />
            ))}
          </div>
          <div className="tw-flex tw-h-fit tw-w-full tw-justify-center tw-p-2">
            <div className="tw-flex-col">
              <textarea
                value={message}
                onInput={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  setMessage(e.currentTarget.value);
                }}
              />
              {isTooLong && <span>The message is to long</span>}
            </div>
            <ewc-button onClick={handleSubmit} label="Send" loading={isEncrypting} disabled={!message || isTooLong} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
