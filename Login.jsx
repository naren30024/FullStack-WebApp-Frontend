// pages/login.js
import { useState } from 'react';
import style from './style.module.css'
import Link from 'next/link';
import  Jwt  from 'jsonwebtoken';
import TopNavBar from './TopNavBar';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if(email === '' && password === ''){
        alert("Fill All fields");
    }
    else{
        try {
            const response = await fetch('http://localhost:5000/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            const decode = data.acesstoken
            
            
      
            if (data.status === 200) {
              const response = await fetch('http://127.0.0.1:5000/api/checkAdmin', {
                method: 'GET',
                headers: {
                  authorization: `Bearer ${decode}`,
                },
              });
              const result = await response.json();
              if(result.isAdmin){
                alert("admin");
                localStorage.setItem("isAdmin",JSON.stringify(result.isAdmin))
                window.location.href = '/components/SidenavBar';
                
                
              }
              else{
                
                window.location.href = '/components/NUsers';
              }
              
            } else if(data.status === 400) {
              
              alert("Invalid User");
            }
          } catch (error) {
            console.error('Error:', error);
          }

    }
    
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={style.center}>
      <h1>Login</h1>
      <label htmlFor="email" className={style.label}>Email</label>
      <input type="email" className={style.email} placeholder="email" value={email} onChange={handleEmailChange} /><br />
      <label htmlFor="password" className={style.label}>password</label>
      <input type="password"className={style.password} placeholder="Password" value={password} onChange={handlePasswordChange} /><br />
      <button className={style.signup} onClick={handleLogin}>Login</button><br />
      Don't have an account? <Link href="/components/Signup">Signup</Link>
    </div>
  );
};

export default Login;

