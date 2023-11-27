import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Navbar from '@src/components/Navbar';
import Sidebar from '@src/components/Sidebar';
import { User } from '@supabase/supabase-js';

interface Buku {
  id_buku: number;
  judul: string;
  penulis: string;
  deskripsi: string;
  status_ketersediaan: string;
  cover_buku: string;
  kategori: string;
}

type KategoriBuku = Record<string, Buku[]>;

const itemsPerPage = 12; // Set the number of items per page

const KoleksiBuku: React.FC = () => {
  const router = useRouter();
  const [selectedButton, setSelectedButton] = useState('Semua');
  const [screenWidth, setScreenWidth] = useState(0);
  const [daftarBuku, setDaftarBuku] = useState<Buku[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!supabase) {
          throw new Error("supabase tidak didefinisikan.");
        }

        const { data, error } = await supabase.from('buku').select('*');
        if (error) {
          throw new Error(error.message);
        }
        
        setDaftarBuku(data || []);
      } catch (error) {
        console.error('Error fetching data:', (error as any).message);
      }
    };

    const updateWindowDimensions = () => {
      const maxWidth = 1024;
      const width = window.innerWidth > maxWidth ? maxWidth : window.innerWidth;
      setScreenWidth(width);
    };

    fetchData();
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);

    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);

  // book filter
  const filteredBooks =
    selectedButton === 'Semua'
    ? daftarBuku.filter(
        (book) =>
          book.judul.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.penulis.toLowerCase().includes(searchValue.toLowerCase())
      )
    : daftarBuku.filter(
        (book) =>
          book.kategori.toLowerCase() === selectedButton.toLowerCase() &&
          (book.judul.toLowerCase().includes(searchValue.toLowerCase()) ||
            book.penulis.toLowerCase().includes(searchValue.toLowerCase()))
      );
    
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
      
    // button
  const handleButtonClick = (buttonName: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectedButton(buttonName);
    setCurrentPage(1); // Reset to the first page when changing categories
  };

  const getButtonStyle = (buttonName: string) => {
      if (selectedButton === buttonName) {
        return {
          backgroundColor: '#C86F43',
          color: '#FBF3CC',
        };
      }
      return {};
    };

  const handleBookClick = (book: Buku) => {
    router.push({
      pathname: '/detailbuku',
      query: {id_buku: book.id_buku},
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <div className='font-poppins'>
      <Navbar setSearchValue={setSearchValue} />
      <Sidebar/>
      <div>
        <img src="/images/BackgroundLabrary.png" alt="gambar background" className='w-full h-full'/>
      </div>
      <div className='flex pt-8 pb-6'>
        <div className='pl-9 pr-5 text-xl flex items-center justify-between'>
        </div>
        <div className={`bg-[#FBF3CC] text-[#C86F43] text-[14px] rounded-3xl border-2 mx-[5px] flex px-[15px] h-[44px] items-center justify-center`}
        style = {{ ...getButtonStyle('Semua')}} >
          <button onClick={(event) => handleButtonClick('Semua', event)}>
            Semua
          </button> 
        </div>
        <div className={`bg-[#FBF3CC] text-[#C86F43] text-[14px] rounded-3xl border-2 mx-[5px] flex px-[15px] h-[44px] items-center justify-center`}
        style={getButtonStyle('Fiksi')}>
          <button onClick={(event) => handleButtonClick('Fiksi', event)}>
            Fiksi
          </button>  
        </div>
        <div className={`bg-[#FBF3CC] text-[#C86F43] text-[14px] rounded-3xl border-2 mx-[5px] flex px-[15px] h-[44px] items-center justify-center`}
        style={getButtonStyle('Horor')}>
          <button onClick={(event) => handleButtonClick('Horor', event)}>
            Horor
          </button> 
        </div>
        <div className={`bg-[#FBF3CC] text-[#C86F43] text-[14px] rounded-3xl border-2 mx-[5px] flex px-[15px] h-[44px] items-center justify-center`}
        style={getButtonStyle('Komedi')}>
          <button onClick={(event) => handleButtonClick('Komedi', event)}>
            Komedi
          </button>  
        </div>
        <div className={`bg-[#FBF3CC] text-[#C86F43] text-[14px] rounded-3xl border-2 mx-[5px] flex px-[15px] h-[44px] items-center justify-center`}
        style={getButtonStyle('Fantasi')}>
          <button onClick={(event) => handleButtonClick('Fantasi', event)}>
            Fantasi
          </button> 
        </div>
        <div className={`bg-[#FBF3CC] text-[#C86F43] text-[14px] rounded-3xl border-2 mx-[5px] flex px-[15px] h-[44px] items-center justify-center`}
        style={getButtonStyle('Petualangan')}>
          <button onClick={(event) => handleButtonClick('Petualangan', event)}>
            Petualangan
          </button> 
        </div>
      </div>
      <div className="book-container mx-[160px] pl-[14px] items-center border-0 flex flex-wrap flex-row">
        {currentItems.map((book, index) => (
        <div key={index} onClick={() => handleBookClick(book)} className='w-[220px] h-[400px] rounded-lg border-2 border-slate-200 shadow-md mr-4 mb-4'>
          <img src={book.cover_buku} className='m-3 w-[192px] h-[200px]' alt={`${book.judul} Image`}/>
          <div className="mx-3 mb-1 font-bold overflow-hidden overflow-ellipsis" style={{ fontSize:'22px', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1 }}>{book.judul}</div>
          <div className='mx-3 mb-1' style={{fontSize:'16px'}}>{book.penulis}</div>
          <div className="mx-3 mb-3 h-[42px] text-[#9E9FA1] justify-align overflow-hidden overflow-ellipsis" style={{ fontSize:'14px', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>{book.deskripsi}</div>
          <div className={book.status_ketersediaan === 'Tersedia' ? 'mx-3 h-[30px] bg-[#CCFBF1] text-[#047857] flex rounded-2xl items-center justify-center' : 'mx-3 h-[30px] bg-[#F88C91] text-[#DA121B] flex rounded-2xl items-center justify-center'} style={{ fontSize: '14px', marginTop: '1rem' }}>
            {book.status_ketersediaan === 'Tersedia' ? 'Tersedia' : 'Tidak tersedia'}
          </div>        
          </div>
        ))}
      </div>
      <div className="pagination text-right mr-[100px] mb-[50px] mt-[20px] text-[20px]">
        <button
          className='pr-5 text-[14px]'
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ margin: '5px', cursor: 'pointer' }}
        >
          Kembali
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <React.Fragment key={index}>
            {index > 0 && ','}
            <button
              onClick={() => setCurrentPage(index + 1)}
              style={{
                margin: '5px',
                fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
                color: currentPage === index + 1 ? '#000000' : '#9E9FA1',
                cursor: 'pointer',
              }}
            >
              {index + 1}
            </button>
          </React.Fragment>
        ))}
        <button
          className='pl-5 text-[14px]'
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ margin: '5px', cursor: 'pointer' }}
        >
          Lanjut
        </button>
      </div>
    </div>
  );
};

export default KoleksiBuku;
