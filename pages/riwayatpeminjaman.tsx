import Image from 'next/image';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
// import CardRiwayat from '../components/CardRiwayat';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import CardRiwayat from '../components/CardRiwayat';
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
          <CardRiwayat/>
    </main>
  );
};

export default Page;