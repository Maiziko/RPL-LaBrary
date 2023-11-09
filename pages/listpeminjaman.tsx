import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const colors ={
  primary: "#42898C",
  background : "#E0E0E0",
  disabled: "#D9D9D9"
  {
    image:buku,
    
  }
}

const listPeminjaman: React.FC = () => {
  return (
    <div>
        <div>
            <img src="/images/BackgroundLabrary.png" className='w-full h-full' alt="gambar background"/>
        </div>
        
        <div className='flex'>
            <div className='px-3 text-xl flex items-center justify-between'>
                (-
            </div>
            <div className='text-[#426E6D] font-semibold flex items-center'>
                List Peminjaman
            </div>
        </div>

        <div className='rounded-lg border-2 border-slate-200 shadow-md flex flex-col px-6'>
            <div>
                <img src=""
            </div>
        </div>

    </div>
    
      
  )
}

export default listPeminjaman;