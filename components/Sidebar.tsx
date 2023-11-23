// components/Sidebar.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../supabase';

interface ProfileData {
  full_name: string;
  email: string;
  avatar_url: string;
}

// Fungsi untuk menampilkan sidebar
function showSidebar() {
  const sidebar = document.getElementById("sidebar") as HTMLElement | null;

  if (sidebar) {
    sidebar.classList.remove("transform", "translate-x-[-240px]");
  }
}
// Fungsi untuk menyembunyikan sidebar
function hideSidebar() {
  const sidebar = document.getElementById("sidebar") as HTMLElement | null;
  if (sidebar) {
    sidebar.classList.add("transform", "translate-x-[-240px]");
  }
}


const Sidebar = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const fetchProfileData = async () => {
    try {
      // Ganti ID di bawah dengan ID yang sebenarnya
      const profileId = '69effe1b-2e4f-44bd-846b-b237c824b903';

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, email, avatar_url')
        .eq('id', profileId)
        .single();

      if (error) {
        console.error('Error fetching profile data:', error.message);
      } else {
        setProfileData(data);
      }
    } catch (error) {
      console.error('Error fetching profile data:', (error as Error).message);
    }
  };

  const handleLogout = async () => {
    try {
      const { error }: { error: Error | null } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error.message);
      } else {
        // Redirect to the home page after successful logout
        router.push('/');
        console.log('User logged out successfully');
      }
    } catch (error) {
      console.error('Error logging out:', (error as Error).message);
    }
  };
  

  useEffect(() => {
    const burgerMenuButton = document.getElementById("burger-menu");
    if (burgerMenuButton) {
      burgerMenuButton.addEventListener("click", showSidebar);
    }

    const closeSidebarButton = document.getElementById("close-sidebar");
    if (closeSidebarButton) {
      closeSidebarButton.addEventListener("click", hideSidebar);
    }

    return () => {
      if (burgerMenuButton) {
        burgerMenuButton.removeEventListener("click", showSidebar);
      }
      if (closeSidebarButton) {
        closeSidebarButton.removeEventListener("click", hideSidebar);
      }
    };
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, []);


  return (
    <div className="fixed rounded-r-[5px] top-0 left-0 lg:left-0 lg:w-[240px] w-60 h-screen bg-primary text-gray-100 transform translate-x-[-240px] transition-transform duration-300" id="sidebar">
      {/* Tombol Tutup Sidebar */}
      <button className="bg-gray-green py-4 px-3 rounded-full cursor-pointer absolute top-5 left-4" id="close-sidebar">
        <img src="icon/BackButtonSideBar.png" className='w-[30px]' alt="" />
      </button>
      
      {/* Informasi Profil */}
      <div className="mt-[70px] text-center">
        {profileData && (
          <>
            <img src={profileData.avatar_url} className='w-16 h-16 mx-auto rounded-full' alt="" />
            <h2 className="text-xl font-semibold mt-2">{profileData.full_name}</h2>
            <p className="text-sm mt-1">{profileData.email}</p>
          </>
        )}
      </div>

      {/* Menu Sidebar */}
      <ul className="mt-14">
        <li className="">
          <Link href="/koleksibuku" className="flex px-10 py-3 w-[240px] text-white hover:bg-gray-green rounded-r-full hover:text-strong-orange text-14">
            <div className="w-[24px] h-[24px] relative group">
              <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-100">
                <img src="/images/Homeon.svg" alt="" />
              </div>
              <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-0 absolute inset-0">
                <img src="/images/Homeoff.svg" alt="" />
              </div>
            </div>
            <span className="pl-5 my-auto text-sm">Home</span>
          </Link>
        </li>
        <li className="">
          <Link href="/listpeminjaman" className="flex px-10 py-3 w-[240px] text-white hover:bg-gray-green rounded-r-full hover:text-strong-orange text-14">
            <div className="w-[24px] h-[24px] relative group">
              <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-100">
                <img src="/images/ListPeminjamanOn.svg" alt="" />
              </div>
              <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-0 absolute inset-0">
                <img src="/images/listPeminjamanOff.svg" alt="" />
              </div>
            </div>
            <span className="pl-5 my-auto text-sm">List Peminjaman</span>
          </Link>
        </li>
        <li className="">
          <Link href="/koleksibuku" className="flex px-10 py-3 w-[240px] text-white hover:bg-gray-green rounded-r-full hover:text-strong-orange text-14">
            <div className="w-[24px] h-[24px] relative group">
              <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-100">
                <img src="/images/koleksiBukuOn.png" alt="" />
              </div>
              <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-0 absolute inset-0">
                <img src="/images/koleksiBukuOffsvg.svg" alt="" />
              </div>
            </div>
            <span className="pl-5 my-auto text-sm">Koleksi Buku</span>
          </Link>
        </li>
        <li className="">
          <Link href="/riwayatbuku" className="flex px-10 py-3 w-[240px] text-white hover:bg-gray-green rounded-r-full hover:text-strong-orange text-14">
            <div className="w-[24px] h-[24px] relative group">
              <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-100">
                <img src="/images/riwayatOn.svg" alt="" />
              </div>
              <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-0 absolute inset-0">
                <img src="/images/riwayatOff.svg" alt="" />
              </div>
            </div>
            <span className="pl-5 my-auto text-sm">Riwayat</span>
          </Link>
        </li>
      </ul>
      <div className='mt-[200px]'>
        <button
            className="flex px-10 py-3 w-[240px] text-white hover:bg-gray-green rounded-r-full hover:text-strong-orange text-14"
            onClick={handleLogout}
          >
        <div className="w-[24px] h-[24px] relative group">
          <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-100">
            <img src="/icon/LogOutHoverIcon.svg" alt="" />
          </div>
          <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-0 absolute inset-0">
            <img src="/icon/LogOutICON.svg" alt="" />
          </div>
        </div>
        <span className="pl-5 my-auto text-sm">Log Out</span>
        </button>
      </div>
    </div>
  );
};
export default Sidebar;