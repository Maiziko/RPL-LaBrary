import Link from 'next/link';
import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { supabase } from '../supabase';
import Navbar from '../src/components/Navbar';
import Sidebar from '../src/components/Sidebar';
import ModalListPeminjaman from '../src/components/ModalListPeminjaman';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
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
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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

        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        console.log(user?.id);
        if (!user){
          router.push('/')
          console.log('helo')
          console.log(user)
          return
        };
  
        const idBukus = peminjamanData.map((peminjaman) => peminjaman.id_buku);
  
        if (idBukus.length === 0) {
          setDaftarPeminjaman([]);
          setDaftarBuku([]);
          setIsListEmpty(true); // Set isListEmpty to true when there are no items
          return;
        }
  
        const { data: bukuData, error: bukuError } = await supabase
          .from('buku')
          .select('id_buku, judul, penulis, penerbit, tahun_terbit, cover_buku')
          .in('id_buku', idBukus);
  
        if (bukuError) {
          console.error('Error fetching buku data:', bukuError.message);
          return;
        }
  
        const combinedData = peminjamanData.map((peminjaman) => {
          const buku = bukuData.find((buku) => buku.id_buku === peminjaman.id_buku);
          return { ...peminjaman, buku };
        });
  
        setDaftarPeminjaman(combinedData || []);
        setIsListEmpty(combinedData.length === 0); // Update isListEmpty based on combinedData length
      } catch (error) {
        console.error('Error fetching peminjaman data:', (error as any).message);
      }
    };
  
    fetchPeminjamanData();
  }, []);
   
  const handleCheckboxChange = (index: number) => {
    setCheckboxStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = !prevStatus[index];
      return newStatus;
    });
  };

  // Add state to track whether the list is empty
  const [isListEmpty, setIsListEmpty] = useState<boolean>(false);

  /* handle delete */
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

  const handlePinjamClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

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

      <div className='flex' style={{ marginTop: isListEmpty ? '0' : 'initial' }}>
        {isListEmpty ? (
          <div className='mx-auto text-center mt-12'>
            <p className='text-2xl font-bold mb-4'>List Peminjaman Kosong</p>
            <Link href="/koleksibuku">
              <button className='bg-[#C86F43] text-white py-3 px-6 rounded-lg'>
                Lihat Koleksi Buku
              </button>
            </Link>
          </div>
        ) : (
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
                  <div className='h-[50px] mt-[50px] w-[395px] text-right'>
                    <button
                      className='text-[15px] text-white rounded-lg bg-[#DA121B] py-1 px-3 mt-[19px]'
                      onClick={() => handleDelete(peminjaman.buku.id_buku)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {!isListEmpty && (
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
              <button
                className={`w-[126px] text-white py-3 mt-10 mb-4 bg-[#C86F43] rounded-lg ${totalBuku === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                style={{ fontSize: '20px' }}
                onClick={totalBuku > 0 ? handlePinjamClick : undefined}
                disabled={totalBuku === 0}
              >
                Pinjam
              </button>
              <ModalListPeminjaman
                isOpen={modalOpen}
                onClose={handleModalClose}
                selectedBooks={daftarPeminjaman
                  .filter((_, index) => checkboxStatus[index])
                  .map(peminjaman => peminjaman.buku.judul)}
                returnDate={format(returnDate, 'dd/MM/yyyy')} // Pass the return date
              />
            </div>
            {/* <TambahPeminjaman onTambah={handleTambahPeminjaman}/> */}
          </div>
        )}
      </div>    
    </div>
  )
}

export default ListPeminjaman;
