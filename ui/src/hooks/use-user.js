import { useContext } from 'react';
import { UserProviderContext } from '../contexts';

const useUser = () => {
  const [user, setUser] = useContext(UserProviderContext);

  return {
    setUser,
    user,
  };
};

export default useUser;
