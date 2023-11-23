import React from 'react';
import Image from 'next/image';

const BGL = () => (
  <Image
    src="/images/backgroundLibrary.png"
    alt="My Image"
    width={21}
    height={48}
    className="w-full h-48 object-cover rounded-md"
    style={{ width: '160px' }}
  />
);


const CardRiwayat: React.FC = () => {
  return (
    <div className="flex flex-col px-12 font-poppins" style={{ paddingLeft: '200px', paddingRight: '220px' }}>
      {/* Repeat the following code block for each book */}
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className="py-2">
        <div className="rounded-lg bg-white shadow p-4 cursor-pointer">
          <div className="flex flex-col md:flex-row">
              <div className="md:mr-4 w-40">
                <BGL/>
              </div>
            <div className="flex flex-col md:flex-row mt-4 md:mt-0">
            <div className="flex-1 md:mx-1 mb-4 md:mb-0">
                <div className="max-w-md mx-auto rounded-md">
                      <h2 className="text-xl font-semibold mt-2 overflow-hidden line-clamp-1">
                        The Lord of the Rings
                      </h2>
                      <p className="text-gray-500">
                        J.R.R. Tolkien
                      </p>
                      <p className="pt-2 text-base text-gray-500 overflow-hidden line-clamp-2">
                        Harry Potter telah keluar dari rumah dua orang yang baru saja meninggal dan melihat kemenangannya atas Lord Voldemort ketika dia masih kecil.
                      </p>
                </div>
                <div className='mt-10'>
                      <p className='text-base italic text-gray-500'>Tanggal pengembalian: 08 Desember 2023</p>
                </div>
            </div>
            <div className="flex flex-row-reverse md:flex-row justify-end items-end">
                <div className="py-2 mx-2 md:mx-2">
                    <button className="w-[140px] h-[50px] shadow bg-strong-orange rounded-lg text-white font-semibold">
                        Ulas
                    </button>
                </div>
                <div className="py-2 mx-2 md:mx-2">
                    <button className="w-[140px] h-[50px] shadow bg-primary rounded-lg text-white font-semibold">
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
  );
};

export default CardRiwayat;