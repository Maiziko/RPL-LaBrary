import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const detailBuku: React.FC = () => {
    return(
    <div className='font-poppins'>
      <div>
        <img src="/images/BackgroundLabrary.png" className='w-full h-full' alt="gambar background"/>
      </div>
        
      <div className='flex pt-8 pb-4'>
        <div className='pl-9 pr-5 text-xl flex items-center justify-between'>
          <Link href="/">
            <img src="/icon/BackButton.png" alt="" />
          </Link>
        </div>
        <div className='text-[#426E6D] text-3xl font-bold flex items-center'>Detail Buku</div>
      </div>

      <div className="ml-[112px] border-0 flex flex-wrap flex-row bg-red-300">tes
        <div className='w-[400px] h-[200px] rounded-lg border-2 border-slate-200 shadow-md mr-3 mb-3 flex'>
            <img src = '/images/hungergames.png' className='w-[180px] h-[200px]' />
        </div>
      </div>
    
    </div>
    );
};

export default detailBuku;
