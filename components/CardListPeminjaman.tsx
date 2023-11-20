// pages/BorrowList.tsx
import React, { useState } from 'react';
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

const CardListPeminjaman: React.FC = () => {
  const [cardStates, setCardStates] = useState([]); 
  // Initial Jumlah Card akan di load saat fetching database list peminjaman, pada bagian ini card states boleh nol dan akan bertambah saat user menekan + list peminjaman
  
  const [quantity, setQuantity] = useState(1);
  // Kode diatas menunjukkan kuantitas yang ditunjukan pada apitan tombol + dan minus pada card 
  // jika user menekan button + maka kuantitas akan bertambah 1 dan jika menekan tombol - akan berkurang 1 
  // kuantitas tidak boleh nol, apabila nol maka card pada list peminjaman akan hilang dan sebelumnya muncul konfirmasi penghapusan card 

  const [isChecked, setIsChecked] = useState(false);
  // Kode diatas menunjukkan status check box apakah dicentang atau tidak, dan statusnya didasarkan pada banyaknya cardstates

  const [totalItems, setTotalItems] = useState(0);
  // Kode diatas akan menunjukkan jumlah total buku pada card rincian peminjaman, total items akan meningkat ketika status checkbox menjadi checked dan juga dipengaruhi 
  // oleh jumlah buku pada kuantitas

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
    setTotalItems((prevTotal) => (isChecked ? prevTotal - quantity : prevTotal + quantity));
  };

  return (
    <div className="flex">
      <div className="grid grid-rows-4" style={{ paddingLeft: '100px' }}>
        {/* Repeat the following code block for each book */}
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="flex py-2" style={{ width: '650px' }}>
            {/* Checkbox */}
            <div className="flex items-center me-4">
              <input
                checked={isChecked}
                onChange={handleCheckboxChange}
                type="checkbox"
                value=""
                className="w-6 h-6 accent-strong-bro"
              />
            </div>

            {/* Card List Peminjaman */}
            <div className="rounded-lg bg-white shadow p-4 hover:scale-105 cursor-pointer" style={{ width: '600px' }}>
              <div className="flex">
                {/* Gambar Buku */}
                <div>
                  <BGL />
                </div>

                {/* Paragraf */}
                <div className="px-4" style={{ width: '300px' }}>
                  <h2 className="text-xl font-semibold mt-2">{judulBuku}</h2>
                  <p className="text-gray-500">J.R.R. Tolkien</p>
                  <p>Buku ini adalah</p>
                </div>

                {/* Pembungkus Tombol + 1 - */}
                <div className="flex flex-col justify-end items-end ml-auto">
                  {/* Button + 1 - */}
                  <div className="flex items-center">
                    <button className="bg-gray-200 rounded-lg px-3 py-1" onClick={() => onAddToCart(id)}>
                      -
                    </button>
                  <span className="mx-2 text-gray-600">
                    {quantity}
                  </span>
                  <button className="bg-gray-200 rounded-lg px-3 py-1" onClick={() => onRemoveFromCart(id)}>
                    +
                  </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
      {/* ... (rest of your code) */}
      <div className="mx-auto rounded-lg bg-white shadow" style={{ height: '300px', width: '400px' }}>
      <div className="my-[15px] px-10 py-2">
        <h2 className="text-xl text-center font-semibold text-strong-green mt-4">Ringkasan Peminjaman</h2>
      </div>
      <div className="grid grid-rows-2">
        <div className="grid grid-rows-3 py-2" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
          <div className="grid grid-cols-2">
            <div>
              <span className="text-lg font-medium text-strong-green dark:text-white">Total Buku</span>
            </div>
            <span className="ms-3 text-lg font-medium text-strong-green dark:text-white">
              {totalItems}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <span className="text-lg font-medium text-strong-green dark:text-white">Tanggal Pinjam</span>
            </div>
            <div>
              <span className="ms-3 text-lg font-medium text-strong-green dark:text-white">08/11/2023</span>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <span className="text-lg font-medium text-strong-green dark:text-white">Tanggal Kembali</span>
            </div>
            <div>
              <span className="ms-3 text-lg font-medium text-strong-green dark:text-white">08/11/2023</span>
            </div>
          </div>
        </div>
        <div className="mx-auto" style={{ paddingTop: '40px' }}>
          <button className="w-[140px] h-[40px] shadow bg-strong-orange rounded-lg text-white font-semibold">
            Pinjam
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};
export default CardListPeminjaman;
