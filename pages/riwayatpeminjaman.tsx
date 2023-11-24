import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Buku{
  id_peminjaman: number;
  id_buku: number;
  judul: string;
  penulis: string;
  deskripsi: string;
  cover_buku: string;
  tanggal_peminjaman: string;
  tanggal_pengembalian: string;
}

const riwayatPeminjaman: React.FC = () => {
  const [daftarPeminjaman, setDaftarPeminjaman] = useState<any[]>([]);
  const [daftarBuku, setDaftarBuku] = useState<Buku[]>([]);
  
  useEffect(() => {
    const fetchPeminjamanData = async () => {
      try {
        const { data: peminjamanData, error: peminjamanError} = await supabase
          .from ('riwayat_peminjaman')
          .select('id_buku');

        if (peminjamanError) {
          console.error('Error fetching peminjaman data:', peminjamanError.message);
          return;
        }

        const idBukus = peminjamanData.map ((peminjaman) => peminjaman.id_buku);

        if (idBukus.length === 0) {
          setDaftarPeminjaman([]);
          setDaftarBuku([]);
          return;
        }

        const { data: bukuData, error: bukuError} = await supabase
          .from ('buku')
          .select('id_buku, judul, penulis, deskripsi, cover_buku')
          .in ('id_buku', idBukus);

        if (bukuError) {
          console.error('Error fetching buku data:', bukuError.message);
          return;
        }
        const combinedData = peminjamanData.map((peminjaman) => {
          const buku = bukuData?.find((buku) => buku.id_buku === peminjaman.id_buku);
          return{...peminjaman, buku};
        });

        setDaftarPeminjaman(combinedData || []);
      }
      catch(error){
        console.error('Error fetching peminjaman data:', (error as any).message);
      }
      };
      fetchPeminjamanData();
    },[]);

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

      <div className='ml-40 mr-40 h-[250px] rounded-lg border-2 border-slate-200 shadow-md flex flex-col mt-2 h-1/2 mx-4'>
  <div className='flex items-start font-poppins'>
    <div className='m-3 p-3 w-[180px] h-[230px]' style={{backgroundImage: 'url(${peminjaman.buku.cover_buku})', backgroundSize:'cover'}}></div>
    <div className="flex flex-col">
      <p className="pt-[20px] text-xl font-bold">{peminjaman.buku.judul}</p>
      <p className="pt-[10px] text-base">{peminjaman.buku.penulis}</p>
      <p className='pt-[10px] text-base text-[#9E9FA1] overflow-hidden'>
        <span className="block w-[500px] overflow-hidden overflow-ellipsis" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}> {peminjaman.buku.deskripsi}
        </span>
      </p>
      <div className='flex items-center pt-2 text-[#9E9FA1] mt-8'>
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
