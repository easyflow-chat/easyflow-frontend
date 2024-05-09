import Image from 'next/image';
import { FunctionComponent } from 'react';
import arrow from '../../public/images/down-arrow.svg';
import { ChatType } from '../../types/chat.type';

interface ChatListItemProps {
  chat: Partial<ChatType>;
}

const ChatListItem: FunctionComponent<ChatListItemProps> = ({ chat }) => {
  return (
    <div className="tw-group tw-flex tw-h-20 tw-w-[calc(100%-26px)] tw-flex-row tw-items-center tw-border tw-border-solid tw-border-transparent tw-border-b-gray-300 tw-p-3 tw-transition-colors tw-duration-300 hover:tw-backdrop-brightness-[90%] dark:tw-border-b-gray-700">
      {chat.picture ? (
        <img
          className="tw-m-1 tw-mr-4 tw-h-16 tw-w-16 tw-rounded-full"
          src={`data:image;base64,${chat.picture}`}
          alt="chat"
        />
      ) : (
        <div className="tw-m-1 tw-mr-4 tw-aspect-square tw-h-16 tw-rounded-full tw-bg-gradient-to-br tw-from-lime-400 tw-to-sky-400" />
      )}
      <div className="tw-h-fit tw-w-full">
        <h2>{chat.name}</h2>
        <p>{chat.description}</p>
      </div>
      <div className="tw-hidden tw-flex-row group-hover:tw-flex">
        <Image src={arrow} alt="arrow" className="tw-aspect-square tw-h-5 tw--rotate-90 dark:tw-invert" />
      </div>
    </div>
  );
};

export default ChatListItem;
