import Link from 'next/link';
import Image from 'next/image'
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


const Navbar = () => {
    return(
        <div>
        {/* <!-- Bagian Awal Component Navigasi Bar --> */}
          <div className="relative min-h-screen bg-cover bg-center rounded-b-[20px]" style={{ backgroundImage: "url('/images/backgroundLibrary.png')", width: "1280px", height: "150px" }}>
            <div className="absolute bottom-10 left-0 text-left p-8 text-white" style={{ paddingLeft: '150px' }}>
              <h1 className="text-4xl">Temukan Bukumu <br /> <p className="text-4xl">di <b>LaBrary</b></p></h1>
            </div>
            <nav className="fixed top-0 left-0 right-0 bg-strong-green p-3">
              <div className="container">
                <div className="flex justify-around justify-items-center">
                  {/* Tombol Burger Menu */}
                  <button className="text-white text-4xl cursor-pointer" id="burger-menu">
                    <ImageComponent/>
                  </button>
                    <LaBraryLogo />
                  <div className="relative w-96 h-10 pl-4 flex items-center rounded-full px-4 duration-300 cursor-pointer bg-white">
                    <SearchImage />
                    <input className="text-[15px] ml-4 w-full bg-transparent focus:outline-none" placeholder="Cari di LaBrary..." />
                  </div>
                    <ProfilePicture/>
                </div>
              </div>
            </nav>
          </div>
        </div>
    );
};
export default Navbar;