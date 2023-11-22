import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
interface Buku {
  judul: string;
  penulis: string;
  deskripsi: string;
  status_ketersediaan: string;
  coverbuku: string;
  kategori: string;
}
type KategoriBuku = Record<string, Buku[]>;

const ImageComponent = () => (
  <Image
    src="/images/sandwichMenu.svg"
    alt="My Image"
    width={40}
    height={40}
  />
);

const SearchImage = () => (
  <Image
    src="/images/searchBar.svg"
    alt="My Image"
    width={30}
    height={30}
  />
);

const LaBraryLogo = () => (
  <Image
    src="/images/libraryLogo.svg"
    alt="My Image"
    width={152}
    height={40}
  />
);

const ProfilePicture = () => (
  <Image
    src="/images/ProfilePictureSideMenu.svg"
    alt="My Image"
    width={40}
    height={40}
  />
);

const koleksiBuku: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState('Semua');
  const [screenWidth, setScreenWidth] = useState(0);
  const [daftarBuku, setDaftarBuku] = useState<Buku[]>([]);

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
    ? daftarBuku
    : daftarBuku.filter(book => {
      console.log('Selected Button:', selectedButton);
      console.log('Book Kategori:', book.kategori);
      return book.kategori.toLowerCase() === selectedButton.toLowerCase();
    });
    
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
        <Navbar/>
        <Sidebar/>
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
      <div className="grid justify-center px-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
      {filteredBooks.map((book, index) => (
        <div key={index} className='rounded-lg bg-white shadow p-4 hover:bg-yel-bro cursor-pointer'>
          <img src={book.coverbuku} className='w-auto h-48 object-cover rounded-md' alt={`${book.judul} Image`}/>
          <div className="my-4">
          <h2 className="text-xl font-semibold mt-2 overflow-hidden line-clamp-1">{book.judul}</h2>
        <p className="text-gray-500">{book.penulis}</p>
        <p className='text-gray-500 text-[12px] overflow-hidden line-clamp-2'>{book.deskripsi}</p>
          <div className={book.status_ketersediaan === 'Tersedia' ? 'mx-3 my-4 h-[30px] bg-[#CCFBF1] text-[#047857] flex rounded-2xl items-center justify-center' : 'mx-3 my-4 h-[30px] bg-[#F88C91] text-[#DA121B] flex rounded-2xl items-center justify-center'} style={{ fontSize: '14px' }}>{book.status_ketersediaan === 'Tersedia' ? 'Tersedia' : 'Tidak tersedia'}</div>
          </div>
        </div>
      ))}
      </div>
    </div>

  );
};

export default koleksiBuku;
