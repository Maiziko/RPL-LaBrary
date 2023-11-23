import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='h-[0px]'>
      <nav className="fixed top-0 left-0 right-0 bg-primary p-3">
        <div>
          <div className='flex'>
            <button className="cursor-pointer mr-[40px] ml-[50px]" id="burger-menu">
              <img src="/icon/sandwichMenu.png" alt="Burger Menu" />
            </button>
            <div className='mr-[70px]'>
              <Link href="/koleksibuku">
                  <img src="/images/libraryLogo.svg" alt="Library Logo" />
              </Link>
            </div>
            <div className="w-[600px] h-10 pl-4 flex items-center justify-center rounded-full px-4 duration-300 cursor-pointer bg-white">
              <img src="/images/searchBar.svg" alt="Search Bar" />
              <input className="text-[15px] ml-4 w-full bg-transparent focus:outline-none" placeholder="Cari di LaBrary..." />
            </div>
            <div className="mr-[50px] pl-[207px]">
              <img src="/images/ProfilePictureSideMenu.svg" alt="Profile Picture" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
