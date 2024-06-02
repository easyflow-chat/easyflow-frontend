import { FunctionComponent } from 'react';
import { MessageType } from '../../../types/message.type';

interface MessageProps {
  message: MessageType;
  isMine: boolean;
}

const Message: FunctionComponent<MessageProps> = ({ message, isMine }) => {
  return (
    <div className={`tw-flex tw-w-[calc(100%-16px)] ${isMine ? 'tw-flex-row-reverse' : 'tw-flex-row'} tw-m-2`}>
      <div
        className={`tw-min-h-6 tw-w-fit tw-max-w-[calc(65%-16px)] tw-break-words tw-rounded-md ${isMine ? 'tw-bg-ewc-rose-quartz' : 'tw-bg-ewc-charcoal'} tw-p-2`}
      >
        {!isMine && (
          <>
            <strong>{message.sender.name}</strong>
            <br />
          </>
        )}
        {message.content}
      </div>
    </div>
  );
};

export default Message;
