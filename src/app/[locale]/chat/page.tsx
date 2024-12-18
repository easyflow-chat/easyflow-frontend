'use server';
import { checkLogin } from '@src/utils/check-login';
import { FunctionComponent, ReactElement } from 'react';

const Chat: FunctionComponent = async (): Promise<ReactElement> => {
  await checkLogin('/chat');
  return <div>Chat</div>;
};

export default Chat;
