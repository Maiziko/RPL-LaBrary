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
  status_ketersediaan: string;
  cover_buku: string;
  kategori: string;
  tahun_terbit: string;
}

const DetailBuku: React.FC<{ bukuJudul: string }> = ({ bukuJudul }) => {
  const [bukuDetail, setBukuDetail] = useState<BukuDetail | null>(null);
  const [showModalPinjam, setShowModalPinjam] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBukuDetail = async () => {
      try {
        if (!supabase) {
          // Pastikan supabase sudah terinisialisasi sebelum digunakan
          console.error('Supabase not initialized');
          return;
        }
  
        const { data, error } = await supabase
          .from('buku')
          .select('*')
          .eq('judul', bukuJudul)
          .single();
  
        if (error) {
          throw new Error(error.message);
        }
  
        setBukuDetail(data || null);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching buku detail:', error instanceof Error ? error.message : error);
      }
    };
  
    fetchBukuDetail();
  }, [bukuJudul]);

  const [peminjamanData, setPeminjamanData] = useState({
    judul: '',
    tanggalPeminjaman: '',
    tanggalPengembalian: '',
  });
  
  const handlePinjamClick = () => {
    setPeminjamanData({
      judul: 'The Lord of the Rings', //JUDUL BLM SESUAI
      tanggalPeminjaman: new Date().toLocaleDateString(), // Tanggal peminjaman sesuai dengan waktu saat ini
      tanggalPengembalian: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(), // Tanggal pengembalian set 7 hari dari sekarang
    });

    setShowModalPinjam(true);
  };

  const handleBatalPinjam = () => {
    // Reset data peminjaman
    setPeminjamanData({
      judul: '',
      tanggalPeminjaman: '',
      tanggalPengembalian: '',
    });

    // Tutup modals
    setShowModalPinjam(false);
  };

  const handleConfirmPinjam = () => {
    // Lakukan logika untuk menyimpan peminjaman ke database atau tempat penyimpanan lainnya

    // Setelah peminjaman berhasil, tampilkan modals peminjaman berhasil
    setShowModalPinjam(false);
    setShowModalSuccess(true);
  };

  const closeModal = () => {
    setShowModalSuccess(false);
  };
  

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
        <div className="text-[#000000] font-bold" style={{ fontSize: '24px' }}>{bukuDetail?.judul}</div>
        <div className="text-[#858585]" style={{ fontSize: '18px' }}>Penulis</div>
<div className="text-[#000000] font-bold" style={{ fontSize: '18px' }}>{bukuDetail?.penulis}</div>
<div className='flex' style={{ fontSize: '18px' }}>Penerbit
  <div className='ml-[58px] mb-2 text-[#000000]'>{bukuDetail?.penerbit}</div>
</div>
<div className='flex' style={{ fontSize: '18px' }}>Kategori
  <div className='ml-[57px] mb-2 text-[#000000]'>{bukuDetail?.kategori}</div>
</div>
<div className='flex' style={{ fontSize: '18px' }}>Tahun Terbit
  <div className='ml-[21px] mb-2 text-[#000000]'>{bukuDetail?.tahun_terbit}</div>
</div>
<div className='mx-3 my-2 h-[30px] bg-[#CCFBF1] text-[#047857] flex rounded-2xl items-center justify-center'>{bukuDetail?.status_ketersediaan}</div>
      </div>
    </div>
  </div>
  {/* Kotak sinopsis */}
  <div className='flex-1 px-5 rounded-lg'>
    <div className='text-[#426E6D] font-bold' style={{ fontSize: '22px' }}>Sinopsis</div>
    <div className='bg-[#C6E7ED] bg-opacity-50 p-3 rounded-xl mt-3 text-justify'>
          {bukuDetail?.deskripsi}
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
    <button
          onClick={handlePinjamClick} // Ubah fungsi yang akan menampilkan modal
          className='px-10 py-3 text-center rounded-lg ml-[30px] bg-[#c86f43] text-[#fefbfb]'
        >
          Pinjam
        </button>
  </div>
  {showModalPinjam && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white py-8 px-10 rounded-md">
            <h2 className="text-2xl font-bold mb-5 text-[#426E6D] text-center">Ringkasan Peminjaman</h2>
            <div className="flex flex-col text-[#426E6D]">
              <p className='mb-2 flex justify-between' style={{fontSize: '18px'}}>Judul Buku: {peminjamanData.judul}</p>
              <p className='mb-2 flex justify-between' style={{fontSize: '18px'}}>Tanggal Peminjaman: {peminjamanData.tanggalPeminjaman}</p>
              <p className='mb-2 flex justify-between' style={{fontSize: '18px'}}>Tanggal Pengembalian: {peminjamanData.tanggalPengembalian}</p>
            </div>
            <div className="mt-4 flex justify-between">
              <button onClick={handleBatalPinjam} className="bg-[#7A7A7A] text-white px-7 py-3 rounded-lg">
                Batal
              </button>
              <button onClick={handleConfirmPinjam} className="bg-[#C86F43] text-white px-6 py-3 rounded-lg">
                Pinjam
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Peminjaman Berhasil */}
      {showModalSuccess && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md text-[#426E6D]">
            <h2 className="text-xl font-bold mb-3">Peminjaman Berhasil!</h2>
            <p>Anda telah berhasil meminjam buku dengan judul {peminjamanData.judul}</p>
            <button onClick={closeModal} className="bg-[#7a7a7a] text-white px-3 py-1 rounded-md mt-4">
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailBuku;
