import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';

const colors ={
  primary: "#42898C",
  background : "#E0E0E0",
  disabled: "#D9D9D9"
}

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const { data, error } = await (supabase as NonNullable<typeof supabase>).auth.getSession();
      if (data.session) {
        router.push('/'); // Redirect pengguna ke halaman utama jika sudah masuk
      }
    }

    checkSession();
  }, [router]);

  const handledLogin = async () => {
    const { data, error } = await (supabase as NonNullable<typeof supabase>).auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Gagal login:', error.message);
      console.log('user : ', data);
    } else {
      console.log('Berhasil login:', data);
      router.push('/')
    }
  };
  
  return (
    <div className='w-full h-screen flex items-start'>      
      <div className='w-1/2 h-full flex flex-col'>
        <img src = '/images/LibraryImage.png' className='w-full h-full object-cover'/>
      </div> 

      <div className='w-1/2 h-full bg-[#42898C] flex flex-col p-20 justify-between'>
        <form className='max-w-[400] w-full mx-auto p-4'>
          <h2 className='text-7xl font-bold font-poppins text-center py-9 mb-11 text-white'>Login</h2>
          <div className='flex flex-col py-2'>
            <label className='text-white text-2xl font-poppins'>Email:</label>   
            <input 
              type="email"
              placeholder='Type your email'
              className='w-full text-black text-2xl font-poppins py-8 px-8 my-2 outline-none focus:outline-none rounded-lg' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className='flex flex-col py-2'>
            <label className='text-white text-2xl font-poppins'>Password:</label>
            <input 
              type="password"
              placeholder='Type your password'
              className='w-full text-black text-2xl font-poppins py-8 px-8 my-2 outline-none focus:outline-none rounded-lg' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className='flex justify-between'>
            <p className='flex items-center text-white text-lg'>
              <input className='mr-2' type="checkbox" />Remember Me
            </p>
            <p className='text-white underline text-lg'>Forgot Password?</p>
          </div>
          <button onClick={handledLogin} className='w-full text-white text-3xl font-poppins py-7 my-12 bg-[#C86F43] outline-none focus:outline-none rounded-lg'>Login</button>
        </form>
        
      </div>
    </div>
  )
    
}

export default Login;