"use client"

import Link from 'next/link';
import MenuItems from '../utils/menuitems';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const path = usePathname();
  return (
    <nav className=" text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard" className='text-3xl font-bold'>
          Erudite
        </Link>

        <ul className="flex space-x-4 ">
          {MenuItems.map((item, index) => {
          console.log(item.url);
          return (
            <li>
              <Link href={item.url} key={index} className={`rounded-xl p-2 ${path === item.url ? "bg-green-500 text-white" : "bg-white text-black"}`}>
                {item.label}
              </Link>
            </li>
          );})}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
