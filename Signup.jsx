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
    <div className="flex justify-center items-center h-screen">   
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
      <h1 className='text-2xl font-semibold mb-4'>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className="block text-gray-700"  htmlFor="username">Username</label>
          <input className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"  type="text" id="username" name="username" value={formData.username} onChange={handleChange} required/>
        </div>
        <div className='mb-4'>
          <label className="block text-gray-700" htmlFor="email">Email</label>
          <input className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-gray-700" htmlFor="password">Password</label>
          <input className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500" type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mt-2" type="submit">Signup</button><br />
        
      </form>
      <p className='text-gray-600 text-sm mt-4'>Already have an account ? <Link href="/components/Login" className='text-blue-500'>Login</Link></p>
      
    </div>
    </div>
 
    </>
  );
};

export default Signup;

