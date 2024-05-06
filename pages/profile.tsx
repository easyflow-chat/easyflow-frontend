import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ChangeProfilePicture from '../components/profile/ChangeProfilePicture';
import EditProfile from '../components/profile/EditProfile';
import NEXT_I18NEXT_CONFIG from '../config/i18n.config';
import { I18nNamespace } from '../enums/i18n.enum';
import { APIOperation } from '../services/api-services/common';
import { serverSideRequest } from '../services/api-services/server-side';

const Profile = (): JSX.Element => {
  return (
    <div className="tw-flex tw-h-fit tw-flex-col xl:tw-h-fit xl:tw-flex-row">
      <ChangeProfilePicture />
      <EditProfile />
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
