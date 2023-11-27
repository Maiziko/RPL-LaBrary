// Import React, hooks, Next.js Link, Supabase client, dan CSS
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '@src/components/Navbar';
import Sidebar from '@src/components/Sidebar';

// Interface untuk representasi objek buku
interface Buku {
  id_buku: number;
  judul: string;
  penulis: string;
  penerbit: string;
  cover_buku: string;
  tahun_terbit: number;
  deskripsi: string;
}

// Interface untuk representasi objek riwayat peminjaman
interface RiwayatPeminjaman {
  id_peminjaman: any;
  id_buku: number;
  id_akun: any;
  tanggal_pengembalian: Date;
  tanggal_peminjaman: Date;
  status_peminjaman: string;
}

// Komponen utama
const RiwayatPeminjaman: React.FC = () => {
  // State untuk menyimpan data riwayat peminjaman dan daftar buku
  const [riwayatPeminjaman, setRiwayatPeminjaman] = useState<RiwayatPeminjaman[]>([]);
  const [daftarBuku, setDaftarBuku] = useState<Buku[]>([]);

  // Hook useEffect untuk memanggil data saat komponen dimount
  useEffect(() => {
    // Fungsi async untuk fetch data dari Supabase
    const fetchRiwayatData = async () => {
      try {
        // Mengambil data riwayat peminjaman
        const { data: riwayatData, error: riwayatError } = await supabase
          .from<RiwayatPeminjaman>('riwayat_peminjaman')
          .select('*');

        if (riwayatError) {
          console.error('Error fetching peminjaman data:', riwayatError.message);
          return;
        }

        const idBukus = riwayatData.map((riwayat) => riwayat.id_buku);

        if (idBukus.length === 0) {
          // Jika tidak ada id_buku, set array kosong untuk bukuData
          setRiwayatPeminjaman([]);
          setDaftarBuku([]);
          return;
        }

        // Mengambil data buku berdasarkan id_bukus
        const { data: bukuData, error: bukuError } = await supabase
          .from('buku')
          .select('id_buku, judul, penulis, penerbit, cover_buku, tahun_terbit,deskripsi')
          .in('id_buku', idBukus);

        if (bukuError) {
          console.error('Error fetching buku data:', bukuError.message);
          return;
        }

        // Menggabungkan data riwayat peminjaman dengan bukuData
        const combinedData = riwayatData.map((riwayat) => {
          const buku = bukuData.find((buku) => buku.id_buku === riwayat.id_buku);
          return { ...riwayat, buku };
        });

        setRiwayatPeminjaman(combinedData || []);
      } catch (error) {
        console.error('Error fetching peminjaman data:', (error as any).message);
      }
    };

    fetchRiwayatData();
  }, []);

  // Di dalam komponen utama
const handlePinjamLagi = (idBuku: number) => {
  // Mendapatkan instance router
  const router = useRouter();

  // Navigasi ke halaman /detailbuku/[idBuku]
  router.push(`/detailbuku/${idBuku}`);
};
  // JSX untuk tampilan komponen
  return (
    <div className='font-poppins'>
      <Navbar setSearchValue={function (value: React.SetStateAction<string>): void {
        throw new Error('Function not implemented.');
      } }/>
      <Sidebar/>
      {/* Bagian Header */}
      <div>
        <img src="/images/BackgroundLabrary.png" className='w-full h-full' alt="gambar background"/>
      </div>
        
      <div className='flex pt-8 pb-4'>
        <div className='pl-9 pr-5 text-xl flex items-center justify-between'>
          {/* Button untuk kembali ke halaman utama */}
          <Link href="/koleksibuku">
            <img src="/icon/BackButton.png" alt="" />
          </Link>
        </div>
        <div className='text-[#426E6D] text-3xl font-bold flex items-center'>Riwayat Peminjaman</div>
      </div>

      {/* Kontainer untuk menampilkan daftar riwayat peminjaman */}
      <div className="flex flex-col px-12" style={{ paddingLeft: '200px', paddingRight: '220px' }}>
      {/* Repeat the following code block for each book */}
      {riwayatPeminjaman.map((riwayat, index) => (
        <div key={index} className="py-2">
        <div className="rounded-lg bg-[#dfeff2] shadow-lg p-4 cursor-pointer">
          <div className="flex flex-col md:flex-row">
              <div className="md:mr-4 w-60 rounded-lg">
                <img src={riwayat.buku.cover_buku} className='m-3 p-3 w-[200px] h-[255px] rounded-lg' />
              </div>
            <div className="flex flex-col md:flex-row mt-4 md:mt-0">
            <div className="flex-1 md:mx-1 mb-4 md:mb-0">
                <div className="max-w-md mx-auto rounded-md">
                      <h2 className="text-xl font-semibold mt-2 overflow-hidden line-clamp-1">
                        {riwayat.buku.judul}
                      </h2>
                      <p className="text-gray-500">
                        {riwayat.buku.penulis}
                      </p>
                      <p className="pt-2 text-base text-gray-500 overflow-hidden line-clamp-2">
                        {riwayat.buku.deskripsi}
                      </p>
                </div>
                <div className={`my-4 py-1 px-3 ${riwayat.status_peminjaman === "Sedang dipinjam" ? 'bg-[#E47B47] bg-opacity-70' : 'bg-[#426E6D] bg-opacity-70 px-6'} text-[#ffffff] rounded-2xl text-center w-[180px]`}>
                    {riwayat.status_peminjaman}
                </div>
                <div className='mt-10'>
                      <p className='text-base text-[12px] italic text-gray-500'>Tanggal pengembalian: {riwayat.tanggal_pengembalian}</p>
                </div>
            </div>
            <div className="flex flex-row-reverse md:flex-row justify-end items-end">
                <div className="py-2">
                    <button className={`mr-5 w-[120px] h-[50px] bg-[#C86F43] rounded-xl border-2 text-m text-white flex items-center justify-center ${riwayat.status_peminjaman === "Sedang dipinjam" ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        Ulas
                    </button>
                </div>
                <div className="py-2">
                    <button className={`w-[120px] h-[50px] bg-[#426E6D] rounded-xl border-2 text-m text-white flex items-center justify-center ${riwayat.status_peminjaman === "Sedang dipinjam" ? 'pointer-events-none opacity-50' : ''} ${riwayat.status_peminjaman === "Selesai" ? '' : 'cursor-not-allowed'}`} onClick={() => handlePinjamLagi(riwayat.buku.id_buku)}>
                        Pinjam Lagi
                    </button>
                </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      ))}
    </div>
    </div>
  );
};

export default RiwayatPeminjaman;
