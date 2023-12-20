// pages/login.js
import { useState } from 'react';
import style from './style.module.css'
import Link from 'next/link';
import  Jwt  from 'jsonwebtoken';
import TopNavBar from './TopNavBar';
import { json } from 'react-router-dom';


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
            localStorage.setItem("at",JSON.stringify(decode));
            
      
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
    <>
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white p-8 rounded shadow-md w-full sm:w-96'>
        <h1 className='text-2xl font-semibold mb-4'>Login</h1>
        <label htmlFor="email" className='block text-gray-700'>Email</label>
        <input type="email" className='w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500' placeholder="email" value={email} onChange={handleEmailChange} /><br />
        <label htmlFor="password" className='block text-gray-700'>password</label>
        <input type="password"className='w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500' placeholder="Password" value={password} onChange={handlePasswordChange} /><br />
        <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mt-2' onClick={handleLogin}>Login</button><br />
        <p className='text-gray-600 text-sm mt-4'> Don't have an account? <Link href="/components/Signup" className='text-blue-500'>Signup</Link> </p>
      </div>
    </div>
    </>
  );
};

export default Login;

