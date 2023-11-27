// PinjamModal.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import router from 'next/router';

interface Buku {
  id_buku: number;
  judul: string;
  penulis: string;
  penerbit: string;
  deskripsi: string;
  status_ketersediaan: string;
  cover_buku: string;
  kategori: string;
  tahun_terbit: string;
  stokbuku:number;
}

interface ModalListPeminjamanProps {
    isOpen: boolean;
    onClose: () => void;
    selectedBooks: {id_buku:number; id_akun: any;tanggal_peminjaman: Date; tanggal_pengembalian:Date; status_peminjaman: string}[]; 
    returnDate: string;
  }

  const ModalListPeminjaman: React.FC<ModalListPeminjamanProps> = ({ isOpen, onClose, selectedBooks, returnDate }) => {
    if (!isOpen) {
      return null;
    }
    const [bookInfo, setBookInfo] = useState<Buku[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [showModalSuccess, setShowModalSuccess] = useState(false);
    const closeModal = () => {
        setShowModalSuccess(false);
        router.reload();
    };
    
  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        // Ambil informasi buku dari tabel buku berdasarkan id_buku dalam selectedBooks
        const { data: bookData, error: bookError } = await supabase
          .from('buku')
          .select('id_buku, judul')
          .in('id_buku', selectedBooks.map((selectedBook) => selectedBook.id_buku.toString()));

        if (bookError) {
          console.error('Error fetching book data:', bookError.message);
          return;
        }

        setBookInfo(bookData || []);
      } catch (error) {
        console.error('Error fetching book data:', (error as any).message);
      }
    };

    fetchBookInfo();
  }, [selectedBooks]);
    
    const handleConfirmPeminjaman = async () => {
        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;
        try {
            const insertData = selectedBooks.map(selectedBook => ({
                id_buku: selectedBook.id_buku.toString(),
                id_akun: user?.id,
                tanggal_peminjaman: new Date().toISOString(),
                tanggal_pengembalian: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                status_peminjaman: 'Sedang dipinjam',
            }));

                await supabase
                    .from('riwayat_peminjaman')
                    .insert(insertData, { onConflict: ['id_buku', 'id_akun'] });

                // Mengumpulkan array ID buku yang akan dipinjam
                const idBukuYangDipinjam = selectedBooks.map(selectedBook => selectedBook.id_buku.toString());

                // Melakukan pengurangan stok buku secara masal
                
                // Perbarui stok buku secara masal
                const { data: bukuData, error: bukuError } = await supabase
                .from('buku')
                .select('id_buku, stokbuku')
                .in('id_buku', idBukuYangDipinjam);

                if (bukuError) {
                console.error('Error fetching book data:', bukuError.message);
                return;
                }

                const updateStokPromises = bukuData.map(async (buku: { stokbuku: number; id_buku: any; }) => {
                const updatedStok = buku.stokbuku - 1;
                // Update stok buku berdasarkan id_buku
                await supabase.from('buku').update({ stokbuku: updatedStok }).eq('id_buku', buku.id_buku);
                  if (updatedStok === 0) {
                    // Jika stok buku 0, ubah status_ketersediaan menjadi "Tidak Tersedia"
                    await supabase.from('buku').update({ status_ketersediaan: "Tidak Tersedia" }).eq('id_buku', buku.id_buku);
                  }
                });
                await Promise.all(updateStokPromises);
                
                console.log('idBukuYangDipinjam:', idBukuYangDipinjam); // Tambahkan log ini untuk memeriksa nilai idBukuYangDipinjam
                // Menghapus data peminjaman dari list_peminjaman
                await supabase
                    .from('list_peminjaman')
                    .delete()
                    .in('id_buku', idBukuYangDipinjam);
                setShowModalSuccess(true);
                // Refresh the list page
                // router.reload();
            }catch(error){
                console.error('Error menambahkan peminjaman data:', (error as any).message);
            }
    }; 
    const handleRefresh = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };
  
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 font-poppins">
            <div className="bg-white p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-4">Konfirmasi Peminjaman</h2>
                <div className='text-left my-1'>
                    <div className='mb-2'>
                        <p>Apakah Anda yakin ingin meminjam buku di bawah</p>  
                    </div>
                    {bookInfo.map((book, index) => (
                        <p key={index}>{index + 1}. {book.judul}</p>
                    ))}
                    <div className='mt-2'>
                        dan dikembalikan pada {returnDate} ?
                    </div>
                </div>
                <div className="flex justify-end mt-4">
                    <button className="px-4 py-2 mr-2 bg-gray-300 rounded" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-[#C86F43] text-white rounded" onClick={handleConfirmPeminjaman} >
                        Confirm
                    </button>
                </div>
            </div>
            {/* Modal Peminjaman Berhasil */}
      {showModalSuccess && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md text-[#426E6D]">
            <h2 className="text-xl font-bold mb-3">Peminjaman Berhasil!</h2>
            <p>Anda telah berhasil meminjam buku</p>
            <button onClick={closeModal} className="bg-[#7a7a7a] text-white px-3 py-1 rounded-md mt-4">
              Tutup
            </button>
          </div>
        </div>
      )}
        </div>
    );
};
  
 export default ModalListPeminjaman;