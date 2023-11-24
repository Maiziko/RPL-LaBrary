import Image from 'next/image';
<<<<<<< HEAD

interface Buku{
  id_peminjaman: number;
  id_buku: number;
  judul: string;
  penulis: string;
  deskripsi: string;
  cover_buku: string;
  tanggal_peminjaman: string;
  tanggal_pengembalian: string;
}

const riwayatPeminjaman: React.FC = () => {
  const [daftarPeminjaman, setDaftarPeminjaman] = useState<any[]>([]);
  const [daftarBuku, setDaftarBuku] = useState<Buku[]>([]);
  
  useEffect(() => {
    const fetchPeminjamanData = async () => {
      try {
        const { data: peminjamanData, error: peminjamanError} = await supabase
          .from ('riwayat_peminjaman')
          .select('id_buku');

        if (peminjamanError) {
          console.error('Error fetching peminjaman data:', peminjamanError.message);
          return;
        }

        const idBukus = peminjamanData.map ((peminjaman) => peminjaman.id_buku);

        if (idBukus.length === 0) {
          setDaftarPeminjaman([]);
          setDaftarBuku([]);
          return;
        }

        const { data: bukuData, error: bukuError} = await supabase
          .from ('buku')
          .select('id_buku, judul, penulis, deskripsi, cover_buku')
          .in ('id_buku', idBukus);

        if (bukuError) {
          console.error('Error fetching buku data:', bukuError.message);
          return;
        }
        const combinedData = peminjamanData.map((peminjaman) => {
          const buku = bukuData?.find((buku) => buku.id_buku === peminjaman.id_buku);
          return{...peminjaman, buku};
        });

        setDaftarPeminjaman(combinedData || []);
      }
      catch(error){
        console.error('Error fetching peminjaman data:', (error as any).message);
      }
      };
      fetchPeminjamanData();
    },[]);

=======
import Sidebar from '../src/components/Sidebar';
import Navbar from '../src/components/Navbar';
// import CardRiwayat from '../components/CardRiwayat';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import CardRiwayat from '../src/components/CardRiwayat';
// ./pages/index.tsx or ./pages/_app.tsx

const Arrowleft = () => (
  <Image
    src="/images/arrowleft.svg"
    alt="My Image"
    width={21}
    height={16}
  />
);

const Page = () => {
  // Mark the parent component as a client component
  // const [isLogin, setIsLogin] = useState(false);
  // const {push} = useRouter();

  // useEffect(() => {
  //   if (!isLogin){
  //     push("/");
  //   }
  // },[]);
>>>>>>> 686695b176f2dcb4a4c6d99f835cccd955300c1b
  return (
    <main className="bg-soft-green">
      <Head>
        <title>Riwayat Peminjaman</title>
      </Head>
          <Navbar/>
          {/* <!-- Bagian Akhir Component Navigasi Bar --> */}
          <Sidebar/>
          <div className="flex py-10" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 500px))', paddingTop: '24px', paddingLeft: '106px', paddingBottom: '24px' }}>
            <button className="bg-gray-green hover:bg-white py-4 px-3 rounded-full cursor-pointer top-5 left-4">
                <Arrowleft/>
            </button>
            <div className="px-[30px] font-poppins">
                <span className="text-4xl font-semibold text-primary">Riwayat Peminjaman</span>
            </div>
        </div>
<<<<<<< HEAD
        <div className='text-[#426E6D] text-3xl font-bold flex items-center'>Riwayat Peminjaman</div>
      </div>

      <div className='ml-40 mr-40 h-[250px] rounded-lg border-2 border-slate-200 shadow-md flex flex-col mt-2 h-1/2 mx-4'>
  <div className='flex items-start font-poppins'>
    <div className='m-3 p-3 w-[180px] h-[230px]' style={{backgroundImage: 'url(${peminjaman.buku.cover_buku})', backgroundSize:'cover'}}></div>
    <div className="flex flex-col">
      <p className="pt-[20px] text-xl font-bold">test</p>
      <p className="pt-[10px] text-base">jk rowling</p>
      <p className='pt-[10px] text-base text-[#9E9FA1] overflow-hidden'>
        <span className="block w-[500px] overflow-hidden overflow-ellipsis" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}> 123545
        </span>
      </p>
      <div className='flex items-center pt-2 text-[#9E9FA1] mt-8'>
        <p className='text-base italic'>Tanggal pengembalian: 08 Oktober 2023</p>
        <div className='mx-6 w-[180px] h-[50px] bg-[#C86F43] rounded-xl border-2 text-m text-white flex items-center justify-center'>
          Ulas
        </div>
        <div className='w-[180px] h-[50px] bg-[#426E6D] rounded-xl border-2 text-m text-white flex items-center justify-center'>
          Pinjam Lagi
        </div>
      </div>
    </div>
  </div>
</div>

</div>     
=======
          <CardRiwayat/>
    </main>
>>>>>>> 686695b176f2dcb4a4c6d99f835cccd955300c1b
  );
};

export default Page;