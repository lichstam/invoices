import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { postLogin, postRegister } from '../../api';
import { useUser } from '../../hooks';

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setUser } = useUser();

  const onRequest = (postRequest) => () => {
    if (email && password) {
      postRequest({ email, password }).then((res) => {
        const token = res.headers.get('x-auth-token');
        localStorage.setItem('token', JSON.stringify(token));
        res.json().then((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
        });
      }).catch(console.log);
    }
  };

  const onRegister = onRequest(postRegister);

  const onLogin = onRequest(postLogin);

  return (
    <div className="register">
      <h2>Register/Login</h2>
      <Input onChange={({ target }) => setEmail(target.value)} />
      <Input onChange={({ target }) => setPassword(target.value)} />
      <Button type="primary" onClick={onLogin}>Login</Button>
      <center>or</center>
      <Button type="primary" onClick={onRegister}>Register</Button>
    </div>
  );
};

export default Register;
