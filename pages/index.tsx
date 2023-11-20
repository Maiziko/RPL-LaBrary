import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useRouter } from 'next/router';
import Image from 'next/image';

const LaBraryLogo = () => (
  <Image
    src="/images/libraryLogo.svg"
    alt="My Image"
    width={200}
    height={60}
    className="left-10 top-10"
  />
);

// const UserIcon = () => (
//   <Image
//     src="/images/UserIcon.svg"
//     alt="My Image"
//     width={24}
//     height={24}
//   />
// );

// const LockIcon = () => (
//   <Image
//     src="/images/LockIcon.svg"
//     alt="My Image"
//     width={24}
//     height={24}
//   />
// );

// const SeekIcon = () => (
//   <Image
//     src="/images/SeekIcon.svg"
//     alt="My Image"
//     width={24}
//     height={24}
//   />
// );

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
    <div className="flex min-h-screen">
        <div className="flex-1 bg-[#42898C] relative backdrop-brightness-50" style={{background: 'url(/images/labraryLoginPict.png)', backgroundSize: 'cover',}}>
            <div className="left-10 p-10 backdrop-brightness-90">
              <LaBraryLogo />
            </div>
            
            <div className="absolute left-10 right-10 bottom-10 rounded-lg backdrop-brightness-50 p-10 text-white font-poppins">
                <h3 className='mb-1 text-3xl font-medium'>
                    Selamat Datang,
                </h3>
                <span className="text-3xl font-medium">Temukan Bukumu di <b>LaBrary!</b></span>
            </div>
        </div>
        <div className="flex-1 flex items-center justify-center bg-[#42898C]">
            
                      <div className="w-full mx-auto p-4 flex flex-col items-center justify-center h-screen">
      <div className="my-4">
        <h2 className="text-5xl font-bold font-poppins text-center text-white">Welcome</h2>
      </div>
      <div className="flex-col py-8">
        <div className="flex flex-col py-2 w-full md:w-auto">
          <div className="px-4 md:px-12">
            <label className="text-white text-2xl font-poppins">Email:</label>
          </div>
          <div className="flex px-4 md:px-12">
            {/* <UserIcon/> */}
            <input
              type="email"
              placeholder="Type your email"
              className="mx-auto text-black text-2xl  md:px-8 lg:px-12 font-poppins py-4 w-full my-2 outline-none focus:outline-none rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col py-2 w-full md:w-auto">
          <div className="px-4 md:px-12">
            <label className="text-white text-2xl font-poppins">Password:</label>
          </div>
          <div className="flex px-4 md:px-12">
            {/* <LockIcon/> */}
            <input
              type="password"
              placeholder="Type your password"
              className="mx-auto text-black text-2xl px-4 md:px-8 lg:px-12 font-poppins py-4 w-full my-2 outline-none focus:outline-none rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <SeekIcon/> */}
          </div>
        </div>
        <div className="px-4 md:px-12 flex justify-between">
          <p className="flex items-center text-white text-lg">
            <input className="mx-auto" type="checkbox" />Remember Me
          </p>
          <p className="text-white underline text-lg">Forgot Password?</p>
        </div>
        <div className="py-4 my-6 flex justify-center items-center">
          <button onClick={handleLogin} className="mx-auto text-white text-3xl font-poppins px-8 md:px-16 py-4 bg-[#C86F43] outline-none focus:outline-none rounded-lg">Login</button>
        </div>
      </div>
    </div>


        </div>
    </div>
  )
    
}

export default Login;