import { GetServerSideProps } from 'next';
import { FunctionComponent, useContext, useEffect } from 'react';
import { UserContext } from '../../context/user.context';
import { APIOperation } from '../../services/api-services/common';
import { serverSideRequest } from '../../services/api-services/server-side';
import { UserType } from '../../types/user.type';

interface ChatType {
  propUser?: UserType;
}

const Chat: FunctionComponent<ChatType> = ({ propUser }): JSX.Element => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (propUser) {
      setUser(propUser);
    }
  }, [propUser, setUser]);

  return (
    <div>
      <h1>Chat</h1>
    </div>
  );
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async ctx => {
  try {
    const res = await serverSideRequest<APIOperation.GET_USER>(ctx.req, { op: APIOperation.GET_USER });
    if (res.data.id !== ctx.params?.userId) {
      throw Error('Unauthorized');
    } else {
      return { props: { user: res.data } };
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
