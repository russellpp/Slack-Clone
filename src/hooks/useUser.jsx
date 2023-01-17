import { useContext } from 'react';
import AuthContext from '../context/AuthProvider'; 
import { useLocalStorage } from './useLocalStorage';


export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (user) => {
    setUser(user);
    setItem('user', user);
  };

  const removeUser = () => {
    setUser(null);
    setItem('user', null);
  };

  return { user, addUser, removeUser };
};
