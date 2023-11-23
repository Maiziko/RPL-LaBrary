import Link from 'next/link';
import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { supabase } from '../supabase';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

// ./pages/index.tsx or ./pages/_app.tsx
interface Buku {
  judul: string;
  penulis: string;
  deskripsi: string;
  coverbuku: string;
}

const ListPeminjaman: React.FC = () => {
  const [daftarBuku, setDaftarBuku] = useState<Buku[]>([]);
  const [checkboxStatus, setCheckboxStatus] = useState<boolean[]>(Array().fill(false));

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const { data, error } = await supabase?.from('buku').select('coverbuku, judul, penulis, deskripsi') || {};
    
        console.log('Data:', data); // Check this log
        console.log('Error:', error); // Check this log
    
        if (error) {
          console.error('Error fetching book data:', error.message);
          return;
        }
    
        // Tetapkan data buku ke dalam state
        setDaftarBuku(data || []);
      } catch (error) {
        console.error('Error fetching book data:', (error as any).message);
      }
    };
    fetchBookData();
  }, []); // Dependency array
  
  const handleCheckboxChange = (index: number) => {
    setCheckboxStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[index] = !prevStatus[index];
      return newStatus;
    });
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
        <img src='/images/BackgroundLabrary.png' className='bg-red-300 w-full h-full' alt="gambar background"/>
      </div>
        
      <div className='flex pt-8 pb-4'>
        <div className='pl-9 pr-5 text-xl flex items-center justify-between'>
          <Link href="/koleksibuku">
            <img src="/icon/BackButton.png"/>
          </Link>
        </div>
        <div className='text-[#426E6D] font-bold flex items-center' style={{fontSize: '40px'}}>List Peminjaman</div>
      </div>

      <div className='flex'>
        <div className='mt-5 mb-8'>
          {daftarBuku.map((buku, index) => (
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
                <div className='bg-blue-300 w-[159px] h-[203px] my-3 ml-3 rounded-lg'></div>
                <div className='pl-[18px] w-[400px]'>
                  <div className='pt-[7px] font-bold' style={{fontSize: '32px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{buku.judul}</div>
                  <div className='pt-[7px]' style={{fontSize: '20px'}}>{buku.penulis}</div>
                  <div className='text-[#9E9FA1]  w-[350px] overflow-hidden' style={{fontSize: '16px', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2}}>{buku.deskripsi}</div>
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
        </div>
      </div>
    </div>
  )
}

export default ListPeminjaman;
