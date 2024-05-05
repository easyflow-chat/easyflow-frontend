import { useContext } from 'react';
import { GlobalContext } from '../context/gloabl.context';
import { APIOperation } from '../services/api-services/common';
import useFetch from './useFetch';

const useProfile = (): {
  isLoading: boolean;
  submitProfilePicture: (picture: string | undefined) => Promise<void>;
  updateUser: (name: string, bio: string | undefined) => Promise<void>;
} => {
  const { fetchDataWithLoadingTimeout, isLoading } = useFetch();
  const { setUser, setProfilePicture } = useContext(GlobalContext);

  //TODO: Add notifications after they are redisigned

  const submitProfilePicture = async (picture: string | undefined): Promise<void> => {
    if (picture) {
      const base64Image = picture.split(',')[1];
      const res = await fetchDataWithLoadingTimeout({
        op: APIOperation.UPDATE_USER,
        payload: { profilePicture: base64Image, name: undefined, bio: undefined },
      });
      if (!res.success) {
        console.error('Error updating profile picture');
      } else {
        console.log('Profile picture updated');
        setProfilePicture(base64Image);
        setUser(res.data);
      }
    } else {
      console.error('No image provided');
    }
  };

  const updateUser = async (name: string, bio: string | undefined): Promise<void> => {
    const res = await fetchDataWithLoadingTimeout({
      op: APIOperation.UPDATE_USER,
      payload: { name, bio, profilePicture: undefined },
    });
    if (!res.success) {
      console.error('Error updating user');
    } else {
      console.log('User updated');
      setUser(res.data);
    }
  };

  return { isLoading, submitProfilePicture, updateUser };
};

export default useProfile;
