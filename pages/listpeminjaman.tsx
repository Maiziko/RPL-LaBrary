import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';


const listPeminjaman: React.FC = () => {
  return (
    <div className='font-poppins grid grid-cols-2' >
      <div>
        <img src="/images/BackgroundLabrary.png" className='w-full h-full' alt="gambar background"/>
      </div>
        
      <div className='flex pt-8 pb-4'>
        <div className='pl-9 pr-5 text-xl flex items-center justify-between'>
          <Link href="/">
            <img src="/icon/BackButton.png" alt="" />
          </Link>
        </div>
          <div className='text-[#426E6D] text-3xl font-bold flex items-center'>List Peminjaman</div>
        </div>
        <div className='rounded-lg border-2 border-slate-200 shadow-md flex flex-col mx-12 mt-2 h-1/2'>
          <div>
            <img src="/images/LibraryImage.png"></img>
          </div>
        </div>

    </div>
  )
}

export default listPeminjaman;