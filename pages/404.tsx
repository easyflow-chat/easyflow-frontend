import { useRouter } from 'next/router';
import { FunctionComponent, useContext, useEffect } from 'react';
import Button from '../components/button/Button';
import { GlobalContext } from '../context/gloabl.context';

const NotFound: FunctionComponent = (): JSX.Element => {
  const { setHideHeader } = useContext(GlobalContext);
  const router = useRouter();
  useEffect(() => {
    setHideHeader(true);
  }, []);
  return (
    <div className="tw-flex tw-h-[calc(100vh-32px)] tw-w-full tw-items-center tw-justify-center">
      <div className="tw-text-center">
        <h1 className="tw-mb-3 tw-text-[200px]">404</h1> {/* If possible replace with a ilustration */}
        <p>Hmm, you sure you are right?</p>
        <div className="tw-flex tw-justify-center">
          <div className="tw-m-2">
            <Button
              onClick={async () => {
                setHideHeader(false);
                await router.replace('/login');
              }}
            >
              Login
            </Button>
          </div>
          <div className="tw-m-2">
            <Button
              onClick={async () => {
                setHideHeader(false);
                await router.replace('/signup');
              }}
              invertedStyle
            >
              Signup
            </Button>
          </div>
          <div className="tw-m-2">
            <Button
              onClick={async () => {
                setHideHeader(false);
                await router.replace('/');
              }}
            >
              Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
