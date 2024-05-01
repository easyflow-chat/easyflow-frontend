import { GetServerSideProps } from 'next';
import { APIOperation } from '../../services/api-services/common';
import { serverSideRequest } from '../../services/api-services/server-side';

const Chat = (): JSX.Element => {
  return <h1>redirecting</h1>;
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async ctx => {
  try {
    const res = await serverSideRequest<APIOperation.GET_USER>(ctx.req, { op: APIOperation.GET_USER });
    if (!res) {
      throw Error('Unauthorized');
    } else {
      return { redirect: { permanent: false, destination: `/chat/${res.data.id}` } };
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
