// PinjamModal.tsx
import React from 'react';

interface ModalListPeminjamanProps {
    isOpen: boolean;
    onClose: () => void;
    selectedBooks: string[]; 
    returnDate: string;
  }

  const ModalListPeminjaman: React.FC<ModalListPeminjamanProps> = ({ isOpen, onClose, selectedBooks, returnDate }) => {
    if (!isOpen) {
      return null;
    }
  
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 font-poppins">
            <div className="bg-white p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4">Konfirmasi Peminjaman</h2>
                <div className='text-left my-1'>
                    <div className='mb-2'>
                        <p>Apakah Anda yakin ingin meminjam buku di bawah</p>  
                    </div>
                    {selectedBooks.map((book, index) => (
                        <p key={index}>{index + 1}. {book}</p>
                    ))}
                    <div className='mt-2'>
                        dan dikembalikan pada {returnDate} ?
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button className="px-4 py-2 mr-2 bg-gray-300 rounded" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-[#C86F43] text-white rounded" onClick={onClose}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};
  
 export default ModalListPeminjaman;