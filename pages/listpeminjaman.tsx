import Link from 'next/link';
import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { supabase } from '../supabase';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
// import TambahPeminjaman from '../pages/detailbuku'

// ./pages/index.tsx or ./pages/_app.tsx
interface Buku {
  id_buku: string;
  judul: string;
  penulis: string;
  penerbit: string;
  coverbuku: string
  tahun_terbit: string
  cover_buku: string;
}

const ListPeminjaman: React.FC = () => {
  const [daftarPeminjaman, setDaftarPeminjaman] = useState<any[]>([]);
  const [daftarBuku, setDaftarBuku] = useState<Buku[]>([]);
  const [checkboxStatus, setCheckboxStatus] = useState<boolean[]>(Array().fill(false));

  useEffect(() => {
    const fetchPeminjamanData = async () => {
      try {
        const { data: peminjamanData, error: peminjamanError } = await supabase
          .from('list_peminjaman')
          .select('id_buku');
  
        if (peminjamanError) {
          console.error('Error fetching peminjaman data:', peminjamanError.message);
          return;
        }
  
        const idBukus = peminjamanData.map((peminjaman) => peminjaman.id_buku);
  
        if (idBukus.length === 0) {
          // If there are no id_buku values, set an empty array for bukuData
          setDaftarPeminjaman([]);
          setDaftarBuku([]);
          return;
        }
  
        // Fetching buku data based on the extracted id_bukus
        const { data: bukuData, error: bukuError } = await supabase
          .from('buku')
          .select('id_buku, judul, penulis, penerbit, tahun_terbit, cover_buku')
          .in('id_buku', idBukus);
  
        if (bukuError) {
          console.error('Error fetching buku data:', bukuError.message);
          return;
        }
  
        // Combining peminjamanData with bukuData
        const combinedData = peminjamanData.map((peminjaman) => {
          const buku = bukuData.find((buku) => buku.id_buku === peminjaman.id_buku);
          return { ...peminjaman, buku };
        });
  
        setDaftarPeminjaman(combinedData || []);
      } catch (error) {
        console.error('Error fetching peminjaman data:', (error as any).message);
      }
    };
  
    fetchPeminjamanData();
  }, []);
  
  
  const handleTambahPeminjaman = async (idBuku: string) => {
    try {
      // Menambahkan buku ke list_peminjaman
      const { data, error } = await supabase
        .from('list_peminjaman')
        .upsert([{ id_buku: idBuku }], { onConflict: ['id_buku'] });

      if (error) {
        console.error('Error adding item:', error.message);
        return;
      }

      // Menampilkan buku yang baru ditambahkan dengan memperbarui state
      const bukuBaru = daftarBuku.find((buku) => buku.id_buku === idBuku);
      setDaftarPeminjaman((prevData) => [...prevData, { buku: bukuBaru }]);
    } catch (error) {
      console.error('Error adding item:', (error as any).message);
    }
  };
  
  const handleCheckboxChange = (index: number) => {
    setCheckboxStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = !prevStatus[index];
      return newStatus;
    });
  };

  const handleDelete = async (idBuku: string) => {
    try {
      // Hapus item dari tabel list_peminjaman berdasarkan id_buku
      const { data, error } = await supabase
        .from('list_peminjaman')
        .delete()
        .eq('id_buku', idBuku);

      if (error) {
        console.error('Error deleting item:', error.message);
        return;
      }

      // Update state setelah penghapusan
      setDaftarPeminjaman((prevData) => prevData.filter((item) => item.buku.id_buku !== idBuku));
    } catch (error) {
      console.error('Error deleting item:', (error as any).message);
    }
  };

  const totalBuku = checkboxStatus.filter((isChecked) => isChecked).length;

  // Mendapatkan tanggal hari ini
  const today = new Date();

  // Mendapatkan tanggal pengembalian (7 hari ke depan)
  const returnDate = addDays(today, 7);

  return (
    <div className='font-poppins'>
      <div>
        <Navbar/>
        <Sidebar/>
        <img src='/images/BackgroundLabrary.png' className='w-full h-full' alt="gambar background"/>
      </div>
        
      <div className='flex pt-8 pb-4'>
        <div className='pl-9 pr-5 text-xl flex items-center justify-between'>
          <Link href="/koleksibuku">
            <img src="/icon/BackButton.png"/>
          </Link>
        </div>
        <div className='text-[#426E6D] font-bold flex items-center' style={{fontSize: '40px'}}>List Peminjaman</div>
      </div>

      <div className='flex' style={{ marginTop: daftarPeminjaman.length === 0 ? '0' : 'initial' }}>
        <div className='mt-5 mb-8'>
          {daftarPeminjaman.map((peminjaman, index) => (
            <div key={index} className='flex mt-5 ml-[70px]'>
              <div>
                <input
                  className='m-2 w-[40px] h-[40px] my-[90px] mr-5'
                  type="checkbox"
                  onChange={() => handleCheckboxChange(index)}
                  checked={checkboxStatus[index]}
                />
              </div>
              <div className='rounded-lg border-2 border-slate-200 shadow-md w-[600px] flex'>
                {/* Menggunakan informasi yang diambil dari hasil penggabungan */}
                <div
                  className='bg-white w-[159px] h-[203px] my-3 ml-3 rounded-lg'
                  style={{ backgroundImage: `url(${peminjaman.buku.cover_buku})`, backgroundSize: 'cover' }}
                ></div>
                <div className='pl-[18px] w-[400px]'>
                  <div className='pt-[7px] font-bold' style={{fontSize: '32px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {peminjaman.buku.judul}
                  </div>
                  <div className='pt-[7px]' style={{fontSize: '20px'}}>{peminjaman.buku.penulis}</div>
                  <div className='text-[#9E9FA1]  w-[350px] overflow-hidden' style={{fontSize: '16px', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2}}>
                    Penerbit: {peminjaman.buku.penerbit}, Tahun Terbit: {peminjaman.buku.tahun_terbit}
                  </div>
                  <button
                    className='text-right w-[400px] text-[15px] pt-[75px] pr-2'
                    onClick={() => handleDelete(peminjaman.buku.id_buku)}
                  >
                    <div className='text-[#C86F43]'>Hapus</div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-5 rounded-lg border-2 border-slate-200 mx-auto shadow-md w-[400px] h-[300px]'>
          <div className='text-[#426E6D] text-center items-center justify-center pt-4' style={{fontSize: '28px'}}>Ringkasan Peminjaman
            <div className='flex'>
              <div className='pt-7 pl-6 text-left text-[#426E6D] w-[200px]' style={{fontSize: '20px'}}>Total Buku</div>
              <div className='pt-7 pr-6 text-[#426E6D] text-right w-[200px]' style={{fontSize: '20px'}}>{totalBuku}</div>
            </div>
            <div className='flex'>
              <div className='pl-6 text-left text-[#426E6D] w-[200px]' style={{fontSize: '20px'}}>Tanggal Pinjam</div>
              <div className='pr-6 text-[#426E6D] text-right w-[200px]' style={{fontSize: '20px'}}>{format(today, 'dd/MM/yyyy')}</div>
            </div>
            <div className='flex'>
              <div className='pl-6 text-left text-[#426E6D] w-[200px]' style={{fontSize: '20px'}}>Tanggal Kembali</div>
              <div className='pr-6 text-[#426E6D] text-right w-[200px]' style={{fontSize: '20px'}}>{format(returnDate, 'dd/MM/yyyy')}</div>
            </div>
          </div>
          <div className='text-center items-center justify-center'>
            <button className='w-[126px] text-white py-3 mt-10 mb-4 bg-[#C86F43] rounded-lg' style={{fontSize: '20px'}}>Pinjam</button>
          </div>
          {/* <TambahPeminjaman onTambah={handleTambahPeminjaman}/> */}
        </div>
      </div>
    </div>
  )
}

export default ListPeminjaman;
