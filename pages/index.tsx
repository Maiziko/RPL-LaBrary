import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useRouter } from 'next/router';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const { data, error } = await (supabase as NonNullable<typeof supabase>).auth.getSession();
      if (data.session) {
        router.push('/koleksibuku'); // Redirect pengguna ke halaman utama jika sudah masuk
      }
    }

    checkSession();
  }, [router]);

  const handleLogin = async () => {
    const { data, error } = await (supabase as NonNullable<typeof supabase>).auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Gagal login:', error.message);
      console.log('user : ', data);
    } else {
      console.log('Berhasil login:', data);
      router.push('/koleksibuku')
    }
  };
  
  return (
    <div className='flex font-poppins'>      
      <div className='w-1/2 h-screen flex flex-col'>
        <img src = '/images/LibraryImage.png' className='h-full object-cover'/>
      </div> 

      <div className='w-1/2 h-screen bg-[#42898C] flex flex-col justify-between'>
        <div className='w-full px-[90px] pt-12'>
          <h2 className='text-6xl font-bold font-poppins text-center pt-9 mb-11 text-white'>Login</h2>
          <div className='flex flex-col py-2 mx-auto w-[475px]'>
            <label className='text-white text-2xl font-poppins'>Email:</label>   
            <input 
              type="email"
              placeholder='Masukkan email Anda'
              className='text-black text-xl font-poppins py-6 px-8 my-2 outline-none focus:outline-none rounded-lg' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className='flex flex-col py-2 mx-auto w-[475px]'>
            <label className='text-white text-2xl font-poppins'>Password:</label>
            <input 
              type="password"
              placeholder='Masukkan password Anda'
              className='w-full text-black text-xl font-poppins py-6 px-8 my-2 outline-none focus:outline-none rounded-lg' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className='flex justify-between mx-auto w-[475px]'>
            <p className='flex items-center text-white text-lg'>
              <input className='mr-2' type="checkbox" />Remember Me
            </p>
            <p className='text-white underline text-lg'>Lupa Kata Sandi?</p>
          </div>
          <button onClick={handleLogin} className='w-[475px] text-white text-2xl py-6 font-bold my-12 bg-[#C86F43] outline-none focus:outline-none rounded-lg'>Login</button>
        </div>
      </div>
    </div>
  )  
}

export default Login;
