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
        router.push('/listpeminjaman'); // Redirect pengguna ke halaman utama jika sudah masuk
      }
    }

    checkSession();
  }, [router]);

  const handleLogin = async () => {
    try {
      const response = await (supabase as NonNullable<typeof supabase>).auth.signInWithPassword({
        email: email,
        password: password,
      });  

      console.log('Berhasil login: ');
      router.push('/listpeminjaman');
    } catch (error) {
      console.log('Gagal login:', error);
    }
  };
  
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
    <div className='md:h-full' style={{ backgroundImage: "url('/images/LibraryImage.png')"}}>
    </div>
    <div className='bg-[#42898C] w-full h-full'>
        <div className='max-w-[400] w-full mx-auto p-4'>
            <div className='my-4 py-auto'>
                <h2 className='text-5xl font-bold font-poppins text-center py-auto my-auto text-white'>Welcome</h2>
            </div>
            <div className='flex-col py-8'>
                <div className='flex flex-col py-2'>
                    <div className='px-4 md:px-12'>
                        <label className='text-white text-2xl font-poppins'>Email:</label>
                    </div>
                    <div className='px-4 md:px-12'>
                        <input 
                            type="email"
                            placeholder='Type your email'
                            className='mx-auto text-black text-2xl px-4 md:px-8 font-poppins py-4 w-full my-2 outline-none focus:outline-none rounded-lg' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>   
                </div>
                <div className='flex flex-col py-2'>
                    <div className='px-4 md:px-12'>
                        <label className='text-white text-2xl font-poppins'>Password:</label>
                    </div>
                    <div className='px-4 md:px-12'>
                        <input 
                            type="Password"
                            placeholder='Type your password'
                            className='mx-auto text-black text-2xl px-4 md:px-8 font-poppins py-4 w-full my-2 outline-none focus:outline-none rounded-lg' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className='px-4 md:px-12 flex justify-between'>
                    <p className='flex items-center text-white text-lg'>
                        <input className='mx-auto' type="checkbox" />Remember Me
                    </p>
                    <p className='text-white underline text-lg'>Forgot Password?</p>
                </div>
                <div className='py-4 my-6 flex justify-center items-center'>
                    <button onClick={handleLogin} className='mx-auto text-white text-3xl font-poppins px-8 md:px-16 py-4 bg-[#C86F43] outline-none focus:outline-none rounded-lg'>Login</button>
                </div>
            </div>
        </div>
    </div>
</main>

  )
    
}

export default Login;