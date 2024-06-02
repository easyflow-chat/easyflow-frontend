import { useRouter } from 'next/router';
import { FunctionComponent, useContext, useEffect } from 'react';
import { GlobalContext } from '../context/gloabl.context';

const NotFound: FunctionComponent = (): JSX.Element => {
  const { setHideHeader } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    setHideHeader(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tw-flex tw-h-[calc(100vh-32px)] tw-w-full tw-items-center tw-justify-center">
      <div className="tw-text-center">
        <h1 className="tw-mb-3 tw-text-[200px]">404</h1> {/* If possible replace with a ilustration */}
        <p>Hmm, you sure you are right?</p>
        <div className="tw-flex tw-justify-center">
          <ewc-button-group>
            <ewc-button
              onClick={async () => {
                setHideHeader(false);
                await router.replace('/login');
              }}
              theme="secondary"
              label="Login"
            />
            <ewc-button
              onClick={async () => {
                setHideHeader(false);
                await router.replace('/signup');
              }}
              label="Signup"
            />
            <ewc-button
              onClick={async () => {
                setHideHeader(false);
                await router.replace('/');
              }}
              theme="secondary"
              label="Home"
            />
          </ewc-button-group>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
