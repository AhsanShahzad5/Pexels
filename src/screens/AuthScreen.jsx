import React from 'react';
import Signup from '../components/Signup';
import Login from '../components/Login';
import { useRecoilValue } from 'recoil';
import authenticationAtom from '../atoms/authAtom';

const AuthenticationPage = () => {
  const authScreenState = useRecoilValue(authenticationAtom);

  return (
    <div role="main">
      {authScreenState === 'login' ? <Login /> : <Signup />}
    </div>
  );
};

export default AuthenticationPage;
