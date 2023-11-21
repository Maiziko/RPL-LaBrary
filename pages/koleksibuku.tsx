import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Buku {
  judul: string;
  penulis: string;
  deskripsi: string;
  availability: string;
  image: string;
  kategori: string;
}
type KategoriBuku = Record<string, Buku[]>;

const koleksiBuku: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState('Semua');
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const updateWindowDimensions = () => {
      const maxWidth = 1024;
      const width = window.innerWidth > maxWidth ? maxWidth : window.innerWidth;
      setScreenWidth(width);
    };

    window.addEventListener('resize', updateWindowDimensions);

    updateWindowDimensions();

    return() => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);

  // data buku per kategori
  const daftarBuku: Buku[] = [
    {
      judul: 'Harry Potter EA Pedra Filosofal',
      penulis: 'JK Rowling',
      deskripsi: 'Harry Potter telah keluar dari rumah dua orang yang baru saja meninggal dan melihat kemenangannya atas Lord Voldemort ketika dia masih kecil.',
      availability: 'Tersedia',
      image: '/images/harrypotter.png',
      kategori: 'Fiksi'
    },
    {
      judul: 'Harry Potter EA Pedra Filosofal',
      penulis: 'JK Rowling',
      deskripsi: 'Harry Potter telah keluar dari rumah dua orang yang baru saja meninggal dan melihat kemenangannya atas Lord Voldemort ketika dia masih kecil.',
      availability :'Tidak Tersedia',
      image: '/images/hungergames.png',
      kategori: 'Petualangan'
    },
    {
      judul: 'Harry Potter EA Pedra Filosofal',
      penulis: 'JK Rowling',
      deskripsi: 'Harry Potter telah keluar dari rumah dua orang yang baru saja meninggal dan melihat kemenangannya atas Lord Voldemort ketika dia masih kecil.',
      availability :'Tidak Tersedia',
      image: '/images/hungergames.png',
      kategori: 'Komedi'
    },
    {
      judul: 'Harry Potter EA Pedra Filosofal',
      penulis: 'JK Rowling',
      deskripsi: 'Harry Potter telah keluar dari rumah dua orang yang baru saja meninggal dan melihat kemenangannya atas Lord Voldemort ketika dia masih kecil.',
      availability :'Tidak Tersedia',
      image: '/images/hungergames.png',
      kategori: 'Fantasi'
    },
    {
      judul: 'Harry Potter EA Pedra Filosofal',
      penulis: 'JK Rowling',
      deskripsi: 'Harry Potter telah keluar dari rumah dua orang yang baru saja meninggal dan melihat kemenangannya atas Lord Voldemort ketika dia masih kecil.',
      availability: 'Tersedia',
      image: '/images/harrypotter.png',
      kategori: 'Horor'
    },
    {
      judul: 'Harry Potter EA Pedra Filosofal',
      penulis: 'JK Rowling',
      deskripsi: 'Harry Potter telah keluar dari rumah dua orang yang baru saja meninggal dan melihat kemenangannya atas Lord Voldemort ketika dia masih kecil.',
      availability :'Tidak Tersedia',
      image: '/images/hungergames.png',
      kategori: 'Petualangan' 
    },
  ]

  // book filter
  const filteredBooks = selectedButton === 'Semua' ? daftarBuku : daftarBuku.filter(book => book.kategori === selectedButton);

  // button
  const handleButtonClick = (buttonName: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectedButton(buttonName);
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
  
  return (
    <div className='font-poppins'>
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
      <div className="book-container ml-[140px] border-0 flex flex-wrap flex-row">
      {filteredBooks.map((book, index) => (
        <div key={index} className='w-[188px] h-[400px] rounded-lg border-2 border-slate-200 shadow-md mr-4 mb-4'>
          <img src={book.image} className='m-3 w-[160px] h-[200px]' alt={'${book.judul} Image'} />
          <div className="mx-3 mb-1 font-bold overflow-hidden overflow-ellipsis" style={{ fontSize:'22px', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 1 }}>{book.judul}</div>
          <div className='mx-3 mb-1' style={{fontSize:'16px'}}>{book.penulis}</div>
          <div className="mx-3 mb-3 text-[#9E9FA1] justify-align overflow-hidden overflow-ellipsis" style={{ fontSize:'14px', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>{book.deskripsi}</div>
          <div className={book.availability === 'Tersedia' ? 'mx-3 my-4 h-[30px] bg-[#CCFBF1] text-[#047857] flex rounded-2xl items-center justify-center' : 'mx-3 my-4 h-[30px] bg-[#F88C91] text-[#DA121B] flex rounded-2xl items-center justify-center'} style={{ fontSize: '14px' }}>{book.availability === 'Tersedia' ? 'Tersedia' : 'Tidak tersedia'}</div>
        </div>
      ))}
      </div>
    </div>

  );
};

export default koleksiBuku;
