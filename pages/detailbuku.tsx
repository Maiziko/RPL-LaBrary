import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface BukuDetail {
  judul: string;
  penulis: string;
  penerbit: string;
  deskripsi: string;
  availability: string;
  coverbuku: string;
  kategori: string;
  tahunterbit: string;
}
const daftarBuku: BukuDetail[] = [
  {
    judul: 'The Lord of the Rings',
    penulis: 'JRR Tolkien',
    penerbit: 'Britania Raya',
    kategori: "Fantasi",
    tahunterbit: '1954',
    coverbuku: '/images/lordoftherings.png',
    availability: 'Tersedia',
    deskripsi:'Menyajikan epik yang menggambarkan Perang Besar Cincin, perjuangan antara yang baik dan yang jahat di Dunia Tengah, mengikuti pengembaraan Frodo si hobbit dan teman-temannya dalam upaya menghancurkan Cincin Kekuasaan.'
  }
]
const DetailBuku: React.FC<{ buku: BukuDetail }> = ({ buku }) => {
  const [showModal, setShowModal] = useState(false);

  const handlePinjamClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  }
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
          <div className='text-[#426E6D] text-3xl font-bold flex items-center'>Detail Buku</div>
        </div>
        <div className="mx-[130px] width-screen border-0 flex flex-wrap flex-row">

  {/* Bagian Detail Buku */}
  <div className='w-[560px] h-[320px] rounded-lg border-2 border-slate-200 shadow-md mr-2 mb-3 p-5 flex'>
    {/* Isi Detail Buku */}
    <div className="flex flex-wrap">
      <img src='/images/hungergames.png' className='w-[180px] h-[250px]' alt='Book cover' />
      <div className="ml-[50px] text-[#858585]" style={{ fontSize: '18px' }}>
        <div className="text-[#858585]" style={{ fontSize: '18px' }}>Judul Buku</div>
        <div className="text-[#000000] font-bold" style={{ fontSize: '24px' }}>The Lord of the Rings</div>
        <div className='flex text-[#858585]  mt-2' style={{fontSize : '18px'}}>Penulis
            <div className='ml-[70px] mb-2 text-[#000000]'>JRR Tolkien</div></div>
            <div className='flex' style={{fontSize : '18px'}}>Penerbit
            <div className='ml-[58px] mb-2 text-[#000000]'>Britania Raya</div></div>
            <div className='flex' style={{fontSize : '18px'}}>Kategori
            <div className='ml-[57px] mb-2 text-[#000000]'>Fantasi</div></div>
            <div className='flex' style={{fontSize : '18px'}}>Tahun Terbit
            <div className='ml-[21px] mb-2 text-[#000000]'>1954</div></div>
            <div className='mx-3 my-2 h-[30px] bg-[#CCFBF1] text-[#047857] flex rounded-2xl items-center justify-center'>Tersedia</div>
      </div>
    </div>
  </div>
  {/* Kotak sinopsis */}
  <div className='flex-1 px-5 rounded-lg'>
    <div className='text-[#426E6D] font-bold' style={{ fontSize: '22px' }}>Sinopsis</div>
    <div className='bg-[#C6E7ED] bg-opacity-50 p-3 rounded-xl mt-3 text-justify'>
      Menyajikan epik yang menggambarkan Perang Besar Cincin, perjuangan antara yang baik dan yang jahat di Dunia Tengah, mengikuti pengembaraan Frodo si hobbit dan teman-temannya dalam upaya menghancurkan Cincin Kekuasaan.
    </div>
    <div className='mt-4 text-[#426E6D] font-bold' style={{ fontSize: '22px' }}>Ulasan terkait</div>
    <div>
            {/* Rating Ulasan */}
            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              {/* Tambahkan ikon rating lainnya sesuai kebutuhan */}
              <div className="px-2">
                <h3 className="ms-2 text-sm font-semibold text-gray-600 dark:text-white">Sangat Baik</h3>
              </div>
            </div>
          </div>
    <div className='bg-[#C6E7ED] bg-opacity-50 p-3 rounded-xl mt-3 text-justify'>Buku ini sangat baik</div>
  </div>
</div>
  <div className='my-[50px] ml-[162px] mr-[590px] flex'>
    <button className='p-2 text-center rounded-lg ml-[200px] bg-[#426e6d] text-[#fefbfb]'>+ List Peminjaman</button>
    <button onClick={handlePinjamClick} className='px-10 py-3 text-center rounded-lg ml-[30px] bg-[#c86f43] text-[#fefbfb]'>Pinjam</button>
  </div>
  {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md">
            <h2 className="text-xl font-bold mb-3">Peminjaman Berhasil!</h2>
            <button onClick={closeModal} className="bg-blue-500 text-white px-3 py-1 rounded-md">
              Tutup
            </button>
          </div>
        </div>
      )}
</div>


  );
};

export default DetailBuku;
