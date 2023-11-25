import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ChakraProvider, Text } from  '@chakra-ui/react'

const riwayatPeminjaman: React.FC = () => {
  return (
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
        <div className='text-[#426E6D] text-3xl font-bold flex items-center'>Riwayat Peminjaman</div>
      </div>

<div className='ml-40 mr-40 h-[280px] rounded-lg border-2 border-slate-200 shadow-md flex flex-col mt-2 h-1/2 mx-4'>
  <div className='flex items-start font-poppins'>
    <img src="/images/harrypotter.png" className='m-3 p-3 w-[180px] h-[230px]' />
    <div className="flex flex-col">
      <p className="pt-[20px] text-xl font-bold">Harry Potter EA Pedra Filosofal</p>
      <p className="pt-[10px] text-base">JK Rowling</p>
      <p className='pt-[10px] text-base text-[#9E9FA1] overflow-hidden'>
        <span className="block w-[500px] overflow-hidden overflow-ellipsis" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
          Harry Potter telah keluar dari rumah dua orang yang baru saja meninggal dan melihat kemenangannya atas Lord Voldemort ketika dia masih kecil.
        </span>
      </p>
      <div className='my-4 py-1 px-3 bg-[#E47B47] bg-opacity-70 text-[#ffffff] rounded-2xl'>Sedang dipinjam</div>
      <div className='flex items-center pt-2 text-[#9E9FA1] '>
        
        <p className='text-base italic'>Tanggal pengembalian: 08 Oktober 2023</p>
        <div className='mx-6 w-[180px] h-[50px] bg-[#C86F43] rounded-xl border-2 text-m text-white flex items-center justify-center'>
          Ulas
        </div>
        <div className='w-[180px] h-[50px] bg-[#426E6D] rounded-xl border-2 text-m text-white flex items-center justify-center'>
          Pinjam Lagi
        </div>
      </div>
    </div>
  </div>
</div>

</div>     
  );
};

export default riwayatPeminjaman;
