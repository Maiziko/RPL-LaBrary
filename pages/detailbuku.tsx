import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Navbar from '@src/components/Navbar';
import Sidebar from '@src/components/Sidebar';
import { User } from '@supabase/supabase-js';

interface BukuDetail {
  id_buku: number;
  judul: string;
  penulis: string;
  penerbit: string;
  deskripsi: string;
  status_ketersediaan: string;
  stokbuku: number;
  cover_buku: string;
  kategori: string;
  tahun_terbit: string;
}

const DetailBuku: React.FC<{ bukuJudul: string }> = ({ bukuJudul }) => {
  const [bukuDetail, setBukuDetail] = useState<BukuDetail | null>(null);
  const [showModalPinjam, setShowModalPinjam] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalSedangDipinjam, setShowModalSedangDipinjam] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id_buku } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    const fetchBukuDetail = async () => {
      try {
        if (!id_buku || !supabase) {
          console.error('ID buku tidak ditemukan atau Supabase tidak terinisialisasi');
          return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        console.log(user?.id);
        if (!user){
          router.push('/')
          console.log('helo')
          console.log(user)
          return
        };
    
        const { data, error } = await supabase
          .from('buku')
          .select('*')
          .eq('id_buku', id_buku.toString())
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
  }, [id_buku, supabase]);

  const [peminjamanData, setPeminjamanData] = useState({
    judul: '',
    tanggalPeminjaman: '',
    tanggalPengembalian: '',
  });
  
  const handlePinjamClick = () => {
    if (bukuDetail?.status_ketersediaan === 'Tersedia') {
      setPeminjamanData({
        judul: bukuDetail?.judul || '', // Sesuaikan dengan data yang ingin ditampilkan
        tanggalPeminjaman: new Date().toLocaleDateString(),
        tanggalPengembalian: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      });
      setShowModalPinjam(true);
    } else {
      setShowModalNotAvailablePinjam(true);
    }
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

  const handleConfirmPinjam = async () => {
    try {
      if (!user || !bukuDetail) {
        console.error('User or bukuDetail is not available');
        return;
      }
  
      // Cek apakah buku dengan ID tertentu sudah ada dalam riwayat_peminjaman dengan status "Sedang dipinjam"
      const { data: existingPeminjaman, error: existingPeminjamanError } = await supabase
        .from('riwayat_peminjaman')
        .select('*')
        .eq('id_buku', bukuDetail.id_buku)
        .eq('id_akun', user.id)
        .eq('status_peminjaman', 'Sedang dipinjam')
        .single();
  
      if (existingPeminjaman) {
        // If the book is already being borrowed, show the corresponding modal
        setShowModalPinjam(false);
        setShowModalSedangDipinjam(true);
        return;
      }
  
      // Insert data into riwayat_peminjaman table
      const { data: riwayatData, error: riwayatError } = await supabase
        .from('riwayat_peminjaman')
        .insert([
          {
            id_buku: bukuDetail.id_buku,
            id_akun: user.id, // Assuming the user's ID is stored in the 'id' field
            tanggal_peminjaman: new Date().toISOString(), // Save the current date and time
            tanggal_pengembalian: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Set return date
            status_peminjaman: 'Sedang dipinjam',
          },
        ]);
  
      if (riwayatError) {
        throw new Error(riwayatError.message);
      }
  
      // Update stokbuku in the buku table
      const { data: updateBukuData, error: updateBukuError } = await supabase
        .from('buku')
        .update({ stokbuku: bukuDetail.stokbuku - 1 }) // Assuming stokbuku is the field representing the book stock
        .eq('id_buku', bukuDetail.id_buku);
  
      if (updateBukuError) {
        throw new Error(updateBukuError.message);
      }
  
      // Show success modal
      setShowModalPinjam(false);
      setShowModalSuccess(true);
    } catch (error) {
      console.error('Error confirming peminjaman:', error instanceof Error ? error.message : error);
    }
  };
  

  const closeModal = () => {
    setShowModalSuccess(false);
  };

  const [showModalListPeminjaman, setShowModalListPeminjaman] = useState(false);
  const [showModalExistingPeminjaman, setShowModalExistingPeminjaman] = useState(false);
  const [showModalNotAvailable, setShowModalNotAvailable] = useState(false);
  const [showModalNotAvailablePinjam, setShowModalNotAvailablePinjam] = useState(false);

  const handleListPeminjamanClick = async () => {
    try {
      // Ensure there is book data and Supabase is initialized
      if (!id_buku || !supabase) {
        console.error('ID buku tidak ditemukan atau Supabase tidak terinisialisasi');
        return;
      }
  
      // Retrieve book data
      const { data: bookData, error: bookError } = await supabase
        .from('buku')
        .select('*')
        .eq('id_buku', id_buku.toString())
        .single();
  
      if (bookError) {
        throw new Error(bookError.message);
      }
  
      // Check book availability
      if (bookData && bookData.status_ketersediaan === 'Tersedia') {
        // Get the user data
        const { data: { user } } = await supabase.auth.getUser();
  
        // Check if the book is already in the list_peminjaman table for the user
        const { data: existingData, error: existingError } = await supabase
          .from('list_peminjaman')
          .select('*')
          .eq('id_buku', id_buku.toString())
          .eq('id', user?.id)
          .single();
  
        if (existingData) {
          // If the book is already in the list, show the existing modal
          setShowModalExistingPeminjaman(true);
        } else {
          // If not, add the book to the list_peminjaman
          const { data: peminjamanData, error: peminjamanError } = await supabase
            .from('list_peminjaman')
            .insert([
              {
                id_buku: id_buku.toString(),
                id: user?.id, // Assuming user ID is stored in the 'id' field
                // Add other data as needed
              },
            ]);
  
          if (peminjamanError) {
            throw new Error(peminjamanError.message);
          }
  
          // Show success modal
          setShowModalListPeminjaman(true);
        }
      } else {
        // If the book is not available, show the not available modal
        setShowModalNotAvailable(true);
      }
    } catch (error) {
      console.error('Error handling list peminjaman:', error instanceof Error ? error.message : error);
    }
  };
  
  

  const handleCloseExistingPeminjamanModal = () => {
    setShowModalExistingPeminjaman(false);
  };

  const handleCloseListPeminjamanModal = () => {
    setShowModalListPeminjaman(false);
  };

  const handleLihatListPeminjamanClick = () => {
    router.push('/listpeminjaman');
  };

  const handleNotAvailableModalClose = () => {
    setShowModalNotAvailable(false);
  };

  const handleNotAvailablePinjamModalClose = () => {
    setShowModalNotAvailablePinjam(false);
  };
  

  return (
    <div className='font-poppins'>
      <Navbar setSearchValue={setSearchValue} />
      <Sidebar/>
      <div>
        <img src="/images/BackgroundLabrary.png" className='w-full h-full' alt="gambar background"/>
      </div>
        
      <div className='flex pt-8 pb-4'>
        <div className='pl-9 pr-5 text-xl flex items-center justify-between'>
          <Link href="/koleksibuku">
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
            <img src={bukuDetail?.cover_buku} className='w-[180px] h-[250px]' alt='Book cover' />
            <div className="ml-[50px] text-[#858585]" style={{ fontSize: '18px', flex: '1' }}>
              <div className="text-[#858585]" style={{ fontSize: '18px' }}>
                <div className="text-[#858585]" style={{ fontSize: '18px' }}>Judul Buku</div>
                <div className="text-[#000000] font-bold" style={{ fontSize: '24px' }}>{bukuDetail?.judul}</div>
                <div className='flex' style={{ fontSize: '18px' }}>Penulis
                  <div className='ml-[69px] mb-2 text-[#000000]'>{bukuDetail?.penulis}</div>
                </div>
                {/* Sisipkan properti lainnya seperti penerbit, kategori, tahun terbit, dsb. */}
                {/* Contoh: */}
                <div className='flex' style={{ fontSize: '18px' }}>Penerbit
                  <div className='ml-[58px] mb-2 text-[#000000]'>{bukuDetail?.penerbit}</div>
                </div>
                <div className='flex' style={{ fontSize: '18px' }}>Kategori
                  <div className='ml-[57px] mb-2 text-[#000000]'>{bukuDetail?.kategori}</div>
                </div>
                <div className='flex' style={{ fontSize: '18px' }}>Tahun Terbit
                  <div className='ml-[21px] mb-2 text-[#000000]'>{bukuDetail?.tahun_terbit}</div>
                </div>
              </div>
              <div
                className={
                  bukuDetail?.status_ketersediaan === 'Tersedia'
                    ? 'mx-3 h-[30px] bg-[#CCFBF1] text-[#047857] flex rounded-2xl items-center justify-center'
                    : 'mx-3 h-[30px] bg-[#F88C91] text-[#DA121B] flex rounded-2xl items-center justify-center'
                }
                style={{ fontSize: '14px', marginTop: '1rem' }}
              >
                {bukuDetail?.status_ketersediaan === 'Tersedia' ? 'Tersedia' : 'Tidak tersedia'}
              </div>
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
            </div>
          </div>
          <div className="flex justify-between items-center mb-2">
        <p className="text-m">Clara Ng</p>
        </div>
          <div className='bg-[#C6E7ED] bg-opacity-50 p-3 rounded-xl mt-1 text-justify'>Buku ini sangat baik</div>
        </div>
      </div>
      <div className='my-[50px] ml-[162px] mr-[590px] flex'>
        <button
          onClick={handleListPeminjamanClick}
          className='p-2 text-center rounded-lg ml-[200px] bg-[#426e6d] text-[#fefbfb]'
        >
          + List Peminjaman
        </button>
        <button
          onClick={handlePinjamClick}
          className='px-10 py-3 text-center rounded-lg ml-[30px] bg-[#c86f43] text-[#fefbfb]'
        >
          Pinjam
        </button>
      </div>

      {showModalExistingPeminjaman && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white py-8 px-10 rounded-md">
          {/* Content for List Peminjaman Modal */}
          <h2 className="text-2xl font-bold mb-5 text-center">Gagal Menambah ke List Peminjaman</h2>
          {/* Add your list content here */}
          <p>Buku sudah terdapat di list peminjaman</p>
          {/* Close button */}
          <div className="mt-8 flex justify-end text-white">
            <button onClick={handleCloseExistingPeminjamanModal} className="bg-[#7A7A7A] px-7 py-3 rounded-lg mr-3">
              Tutup
            </button>
            <button onClick={handleLihatListPeminjamanClick} className='bg-[#426E6D] rounded-lg px-4'>
              Lihat List Peminjaman
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Modal for book already being borrowed */}
      {showModalSedangDipinjam && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white py-8 px-10 rounded-md">
            <h2 className="text-2xl font-bold mb-5 text-center">Gagal Meminjam</h2>
            <p>Anda sedang meminjam buku dengan judul yang sama</p>
            <div className="items-center justify-center mt-8 flex">
              <button onClick={() => setShowModalSedangDipinjam(false)} className="bg-[#7A7A7A] text-white px-7 py-3 rounded-lg">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalNotAvailable && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white py-8 px-10 rounded-md w-[400px]">
            <div className='text-center'>
              <h2 className="text-2xl font-bold mb-5">Gagal Menambah ke List Peminjaman</h2>
              <p>Buku sedang tidak tersedia</p>
            </div>
            <div className="items-center justify-center mt-8 flex">
              <button onClick={handleNotAvailableModalClose} className="bg-[#7A7A7A] text-white px-7 py-3 rounded-lg">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalPinjam && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white py-8 px-10 rounded-md w-[450px]">
            <h2 className="text-2xl font-bold mb-5 text-center">Ringkasan Peminjaman</h2>
            <div className="flex flex-col ">
              <p className='mb-2 flex justify-between' style={{fontSize: '18px'}}>Judul Buku: {peminjamanData.judul}</p>
              <p className='mb-2 flex justify-between' style={{fontSize: '18px'}}>Tanggal Peminjaman: {peminjamanData.tanggalPeminjaman}</p>
              <p className='mb-2 flex justify-between' style={{fontSize: '18px'}}>Tanggal Pengembalian: {peminjamanData.tanggalPengembalian}</p>
            </div>
            <div className="pl-[150px] mt-4 flex">
              <button onClick={handleBatalPinjam} className="bg-[#7A7A7A] text-white px-7 py-3 mr-4 rounded-lg">
                Tutup
              </button>
              <button onClick={handleConfirmPinjam} className="bg-[#C86F43] text-white px-6 py-3 rounded-lg">
                Pinjam
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalNotAvailablePinjam && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white py-8 px-10 rounded-md w-[400px]">
            <div className='text-center'>
              <h2 className="text-2xl font-bold mb-5">Gagal Meminjam</h2>
              <p>Buku sedang tidak tersedia</p>
            </div>
            <div className="items-center justify-center mt-8 flex">
              <button onClick={handleNotAvailablePinjamModalClose} className="bg-[#7A7A7A] text-white px-7 py-3 rounded-lg">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Peminjaman Berhasil */}
      {showModalSuccess && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white py-8 px-10 rounded-md">
            <div className='text-center'>
              <h2 className="text-2xl font-bold mb-5">Peminjaman Berhasil!</h2>
              <p>Anda berhasil meminjam buku {peminjamanData.judul}</p>
            </div>
            <div className="items-center justify-center mt-8 flex">
              <button onClick={closeModal} className="bg-[#7a7a7a] text-white px-7 py-3 rounded-lg">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalListPeminjaman && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white py-8 px-10 rounded-md">
            {/* Content for List Peminjaman Modal */}
            <h2 className="text-2xl font-bold mb-5 text-center">Berhasil</h2>
            {/* Add your list content here */}
            <p>Buku berhasil ditambah ke list peminjaman</p>
            {/* Close button */}
            <div className="mt-4 flex justify-end text-white">
              <button onClick={handleCloseListPeminjamanModal} className="bg-[#7A7A7A] px-7 py-3 rounded-lg mr-10">
                Tutup
              </button>
              <button onClick={handleLihatListPeminjamanClick} className='bg-[#426E6D] rounded-lg px-4'>
                Lihat List Peminjaman
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailBuku;
