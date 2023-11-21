import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Buku {
  judul: string;
  penulis: string;
  penerbit: string;
  deskripsi: string;
  availability: string;
  image: string;
  kategori: string;
  tahunterbit: string;
}

const daftarBuku: Buku[] = [
  {
    judul: 'Harry Potter EA Pedra Filosofal',
    penulis: 'JK Rowling',
    penerbit: 'Britania Raya',
    deskripsi: 'Harry Potter telah keluar dari rumah dua orang yang baru saja meninggal dan melihat kemenangannya atas Lord Voldemort ketika dia masih kecil.',
    availability: 'Tersedia',
    image: '/images/harrypotter.png',
    kategori: 'Fiksi',
    tahunterbit: '1954'
  },
  // Tambahkan buku lain di sini jika diperlukan
];

const DetailBuku: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const buku: Buku | undefined = typeof id === 'string' ?
    daftarBuku.find((buku) => buku.judul.toLowerCase() === id.toLowerCase()) :
    undefined;
    
  if (!buku) {
    return <div>Buku tidak ditemukan</div>;
  }

  return (
    <div className='font-poppins'>
      <div>
        <img src={buku.image} alt={buku.judul} className='w-full h-full' />
      </div>
      <div className='flex pt-8 pb-4'>
        <div className='pl-9 pr-5 text-xl flex items-center justify-between'>
          {/* Tambahkan tombol kembali ke halaman sebelumnya */}
        </div>
        <div className='text-[#426E6D] text-3xl font-bold flex items-center'>Detail Buku</div>
      </div>
      <div className="mx-[130px] width-screen border-0 flex flex-wrap flex-row ">
        <div className='w-[520px] h-[300px] rounded-lg border-2 border-slate-200 shadow-md mr-3 mb-3 flex'>
          <img src={buku.image} className='w-[160px] h-[200px]' alt={buku.judul} />
          <div className="ml-[50px] text-[#858585]" style={{ fontSize: '18px'}}> Judul Buku
            <div className="text-[#000000] font-bold" style={{ fontSize: '24px'}}>{buku.judul}</div>
            <div className='flex text-[#858585]' style={{fontSize : '18px'}}>Penulis
              <div className='ml-[70px] text-[#000000]'>{buku.penulis}</div>
            </div>
            <div className='flex' style={{fontSize : '18px'}}>Penerbit
              <div className='ml-[58px] text-[#000000]'>{buku.penerbit}</div>
            </div>
            <div className='flex' style={{fontSize : '18px'}}>Kategori
              <div className='ml-[57px] text-[#000000]'>{buku.kategori}</div>
            </div>
            <div className='flex' style={{fontSize : '18px'}}>Tahun Terbit
              <div className='ml-[21px] text-[#000000]'>{buku.tahunterbit}</div>
            </div>
            <div className={buku.availability === 'Tersedia' ? 'mx-3 my-4 h-[30px] bg-[#CCFBF1] text-[#047857] flex rounded-2xl items-center justify-center' : 'mx-3 my-4 h-[30px] bg-[#F88C91] text-[#DA121B] flex rounded-2xl items-center justify-center'} style={{ fontSize: '14px' }}>{buku.availability === 'Tersedia' ? 'Tersedia' : 'Tidak tersedia'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBuku;
