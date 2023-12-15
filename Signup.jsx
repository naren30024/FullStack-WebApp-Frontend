import { useState } from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import style from './style.module.css'
import Link from 'next/link';

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.username === '' && formData.email === '' && formData.password === ''){
      alert("Enter All fields")
    }
    else{
      try {
        const response = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data);
        if (data.status === 201) {
          
          console.log("login");
          router.push("/components/Login");
        }else if(data.status === 200){
          alert("Email already exist");
        }
    
        
      } catch (error) {
        console.error('Error during signup:', error.message);
      }
      
    }

    
  };

  return (
    <>
    <div>   
      <div className={style.center}>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className={style.label}  htmlFor="username">Username</label>
          <input className={style.user}  type="text" id="username" name="username" value={formData.username} onChange={handleChange} required/>
        </div>
        <div>
          <label className={style.label} htmlFor="email">Email</label>
          <input className={style.email} type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label className={style.label}htmlFor="password">Password</label>
          <input className={style.password} type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button className={style.signup} type="submit">Signup</button><br />
        Already have an account ? <Link href="/components/Login">Login</Link>
      </form>
    </div>
    </div>
 
    </>
  );
};

export default Signup;

