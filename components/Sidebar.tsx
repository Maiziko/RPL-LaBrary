// components/Sidebar.tsx
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'

const ProfilePicture = () => (
  <Image
    src="/images/ProfilePictureSideMenu.svg"
    alt="My Image"
    width={40}
    height={40}
    className="w-16 h-16 mx-auto rounded-full"
  />
);

const TutupSidebar = () => (
  <Image
    src="/images/arrowleft.svg"
    alt="My Image"
    width={21}
    height={16}
  />
);

const Homeon = () => (
  <Image
    src="/images/Homeon.svg"
    alt="My Image"
    width={24}
    height={24}
  />
);

const Homeoff = () => (
  <Image
    src="/images/Homeoff.svg"
    alt="My Image"
    width={24}
    height={24}
  />
);

const ListPeminjamanOn = () => (
  <Image
    src="/images/ListPeminjamanOn.svg"
    alt="My Image"
    width={24}
    height={24}
  />
);
const ListPeminjamanOff = () => (
  <Image
    src="/images/listPeminjamanOff.svg"
    alt="My Image"
    width={24}
    height={24}
  />
);
const KoleksiBukuOn = () => (
  <Image
    src="/images/koleksiBukuOn.png"
    alt="My Image"
    width={24}
    height={24}
  />
);

const KoleksiBukuOffsvg = () => (
  <Image
    src="/images/koleksiBukuOffsvg.svg"
    alt="My Image"
    width={24}
    height={24}
  />
);

const RiwayatOn = () => (
  <Image
    src="/images/riwayatOn.svg"
    alt="My Image"
    width={24}
    height={21}
  />
);

const RiwayatOff = () => (
  <Image
    src="/images/riwayatOff.svg"
    alt="My Image"
    width={24}
    height={21}
  />
);
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
  useEffect(() => {
    // Event listener untuk tombol "Burger Menu"
    const burgerMenuButton = document.getElementById("burger-menu");
    if (burgerMenuButton) {
      burgerMenuButton.addEventListener("click", showSidebar);
    }

    // Event listener untuk tombol "Close Sidebar"
    const closeSidebarButton = document.getElementById("close-sidebar");
    if (closeSidebarButton) {
      closeSidebarButton.addEventListener("click", hideSidebar);
    }

    // Cleanup pada komponen di-unmount
    return () => {
      if (burgerMenuButton) {
        burgerMenuButton.removeEventListener("click", showSidebar);
      }
      if (closeSidebarButton) {
        closeSidebarButton.removeEventListener("click", hideSidebar);
      }
    };
  }, []);

  return (
    <div className="fixed rounded-r-[5px] top-0 left-0 lg:left-0 lg:w-[240px] w-60 h-screen bg-primary text-gray-100 transform translate-x-[-240px] transition-transform duration-300" id="sidebar">
      {/* Tombol Tutup Sidebar */}
      <button className="bg-gray-green py-4 px-3 rounded-full cursor-pointer absolute top-5 left-4" id="close-sidebar">
        <TutupSidebar/>
      </button>
      
      {/* Informasi Profil */}
      <div className="mt-16 text-center">
        <ProfilePicture/>
        <h2 className="text-xl font-semibold mt-2">John Doe</h2>
        <p className="text-sm mt-1">email@example.com</p>
      </div>

      {/* Menu Sidebar */}
      <ul className="mt-14">
        <li className="">
          <Link href="/homepage" className="flex px-10 py-3 w-[240px] text-white hover:bg-gray-green rounded-r-full hover:text-strong-orange text-14">
            <div className="w-[24px] h-[24px] relative group">
              <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-100">
                <Homeon/>
              </div>
              <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-0 absolute inset-0">
                <Homeoff />
              </div>
            </div>
            <span className="pl-5 my-auto text-sm">Home</span>
          </Link>
        </li>
        <li className="">
          <Link href="/listpeminjamanpage" className="flex px-10 py-3 w-[240px] text-white hover:bg-gray-green rounded-r-full hover:text-strong-orange text-14">
            <div className="w-[24px] h-[24px] relative group">
              <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-100">
                <ListPeminjamanOn />
              </div>
              <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-0 absolute inset-0">
                <ListPeminjamanOff/>
              </div>
            </div>
            <span className="pl-5 my-auto text-sm">List Peminjaman</span>
          </Link>
        </li>
        <li className="">
          <Link href="/koleksibukupage" className="flex px-10 py-3 w-[240px] text-white hover:bg-gray-green rounded-r-full hover:text-strong-orange text-14">
            <div className="w-[24px] h-[24px] relative group">
              <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-100">
                <KoleksiBukuOn/>
              </div>
              <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-0 absolute inset-0">
                <KoleksiBukuOffsvg />
              </div>
            </div>
            <span className="pl-5 my-auto text-sm">Koleksi Buku</span>
          </Link>
        </li>
        <li className="">
          <Link href="/riwayatbukupage" className="flex px-10 py-3 w-[240px] text-white hover:bg-gray-green rounded-r-full hover:text-strong-orange text-14">
            <div className="w-[24px] h-[24px] relative group">
              <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-100">
                <RiwayatOn/>
              </div>
              <div className="bg-cover bg-center w-[24px] h-[24px] transition-opacity group-hover:opacity-0 absolute inset-0">
                <RiwayatOff />
              </div>
            </div>
            <span className="pl-5 my-auto text-sm">Riwayat</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;