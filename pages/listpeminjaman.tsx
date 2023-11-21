import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import CardListPeminjaman from '../components/CardListPeminjaman';
// ./pages/index.tsx or ./pages/_app.tsx

const Arrowleft = () => (
  <Image
    src="/images/arrowleft.svg"
    alt="My Image"
    width={21}
    height={16}
  />
);


const listPeminjaman: React.FC = () => {
  return (
    <div className='font-poppins'>
      <div>
        <img src="/images/BackgroundLabrary.png" className='w-full h-full' alt="gambar background"/>
      </div>
        
      <div className='flex pt-8 pb-4'>
        <div className='pl-9 pr-5 text-xl flex items-center justify-between'>
          <Link href="/koleksibuku">
            <img src="/icon/BackButton.png" alt="" className='w-[54px] h-[54px]'/>
          </Link>
        </div>
        <div className='text-[#426E6D] font-bold flex items-center' style={{fontSize: '40px'}}>List Peminjaman</div>
      </div>

      <div className='flex'>
        <div className='mt-5 mb-8'>
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className='flex mt-5 ml-[70px]'>
              <div>
                <input className='m-2 w-[40px] h-[40px] my-[90px] mr-5' type="checkbox" />
              </div>
              <div className='rounded-lg border-2 border-slate-200 shadow-md w-[600px] flex'>
                <div className='bg-blue-300 w-[159px] h-[203px] my-3 ml-3 rounded-lg'></div>
                <div className='pl-[18px] w-[400px]'>
                  <div className='pt-[7px] font-bold' style={{fontSize: '32px'}}>The Lord of the Rings</div>
                  <div className='pt-[7px]' style={{fontSize: '20px'}}>J.R.R. Tolkien</div>
                  <div className='text-[#9E9FA1]  w-[350px]' style={{fontSize: '16px'}}>Menyajikan epik yang menggambarkan</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-5 rounded-lg border-2 border-slate-200 mx-auto shadow-md w-[400px] h-[300px]'>
          <div className='text-[#426E6D] text-center items-center justify-center pt-4' style={{fontSize: '28px'}}>Ringkasan Peminjaman
            <div className='flex'>
              <div className='pt-7 pl-6 text-left text-[#426E6D] w-[200px]' style={{fontSize: '20px'}}>Total Buku</div>
              <div className='pt-7 pr-6 text-[#426E6D] text-right w-[200px]' style={{fontSize: '20px'}}>x</div>
            </div>
            <div className='flex'>
              <div className='pl-6 text-left text-[#426E6D] w-[200px]' style={{fontSize: '20px'}}>Tanggal Pinjam</div>
              <div className='pr-6 text-[#426E6D] text-right w-[200px]' style={{fontSize: '20px'}}>dd/mm/yyyy</div>
            </div>
            <div className='flex'>
              <div className='pl-6 text-left text-[#426E6D] w-[200px]' style={{fontSize: '20px'}}>Tanggal Kembali</div>
              <div className='pr-6 text-[#426E6D] text-right w-[200px]' style={{fontSize: '20px'}}>dd/mm/yyyy</div>
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

export default listPeminjaman;