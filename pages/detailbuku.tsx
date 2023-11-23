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

interface Props {
  bukuId: number;
}

const DetailBuku: React.FC<Props> = ({ bukuId }) => {
  const [buku, setBuku] = useState<BukuDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        if (!supabase) {
          throw new Error('Supabase client is null');
        }

        const { data: bukuData, error } = await supabase
          .from('buku')
          .select('*')
          .eq('id', bukuId)
          .single();

        if (error) {
          throw error;
        }

        if (bukuData) {
          setBuku(bukuData);
        }
      } catch (error: any) {
        console.error('Error fetching book data:', error.message || error);
      }
    };
    fetchBookData();
  }, [bukuId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='font-poppins'>
      <div className='w-[560px] h-[320px] rounded-lg border-2 border-slate-200 shadow-md mr-2 mb-3 p-5 flex'>
        <div className="flex flex-wrap">
          <img src={buku?.coverbuku} className='w-[180px] h-[250px]' alt='Book cover' />
          {buku && (
  <div className="ml-[50px] text-[#858585]" style={{ fontSize: '18px' }}>
    <div className="text-[#858585]" style={{ fontSize: '18px' }}>Judul Buku</div>
    <div className="text-[#000000] font-bold" style={{ fontSize: '24px' }}>{buku.judul}</div>
    {/* Render other book details */}
    <div className='flex text-[#858585] mt-2' style={{ fontSize: '18px' }}>Penulis
      <div className='ml-[70px] mb-2 text-[#000000]'>{buku.penulis}</div>
    </div>
    <div className='flex' style={{ fontSize: '18px' }}>Penerbit
      <div className='ml-[58px] mb-2 text-[#000000]'>{buku.penerbit}</div>
    </div>
    <div className='flex' style={{ fontSize: '18px' }}>Kategori
      <div className='ml-[57px] mb-2 text-[#000000]'>{buku.kategori}</div>
    </div>
    <div className='flex' style={{ fontSize: '18px' }}>Tahun Terbit
      <div className='ml-[21px] mb-2 text-[#000000]'>{buku.tahunterbit}</div>
    </div>
    <div className='mx-3 my-2 h-[30px] bg-[#CCFBF1] text-[#047857] flex rounded-2xl items-center justify-center'>
      {buku.availability}
    </div>
  </div>
)}
      {/* Kotak sinopsis */}
        <div className='flex-1 px-5 rounded-lg'>
          <div className='text-[#426E6D] font-bold' style={{ fontSize: '22px' }}>Sinopsis</div>
          <div className='bg-[#C6E7ED] bg-opacity-50 p-3 rounded-xl mt-3 text-justify'>
            Menyajikan epik yang menggambarkan Perang Besar Cincin, perjuangan antara yang baik dan yang jahat di Dunia Tengah, mengikuti pengembaraan Frodo si hobbit dan teman-temannya dalam upaya menghancurkan Cincin Kekuasaan.
          </div>
    </div>
    <div className='mt-4 text-[#426E6D] font-bold' style={{ fontSize: '22px' }}>Ulasan terkait</div>
    <div>
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
              <div className="px-2">
                <h3 className="ms-2 text-sm font-semibold text-gray-600 dark:text-white">Sangat Baik</h3>
              </div>
            </div>
          </div>
          <div className='bg-[#C6E7ED] bg-opacity-50 p-3 rounded-xl mt-3 text-justify'>Buku ini sangat baik</div>
        </div>
      </div>
      </div>
    
  );
};

export default DetailBuku;


