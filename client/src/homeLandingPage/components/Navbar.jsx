import { useState } from 'react'
import { navLinks } from '../constants'
import  logoWhite  from '../../assets/logoWhite.png'
import { Bars3Icon,XCircleIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'


const Navbar = () => {
  
  const [toggle,setToggle] = useState(false)

  return (
    <nav className='w-full flex  justify-between items-center navbar'>
      <img src={logoWhite} alt='Brain Logo' className='h-[60px]' />

      <ul className='list-none sm:flex hidden justify-start pl-10 items-center flex-1'>
        {navLinks.map((nav)=>(
          <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[18px] text-gray mr-10`}>
            
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </ul>
      <div className='sm:hidden flex flex-1 justify-end items-center'>
        { toggle ?  <XCircleIcon  className='w-[50px] text-gray object-contain' onClick={() => setToggle((prev)=> !prev)}/> : <Bars3Icon className='w-[50px] text-gray object-contain' onClick={() => setToggle((prev)=> !prev)} /> }
        
        <div className={`${toggle ? "flex" : "hidden"} p-6 bg-white-gradient shadow-glow-inset absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
          <ul className='list-none flex flex-col justify-end items-center flex-1'>
            {navLinks.map((nav)=>(
              <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[16px] text-gray mb-0`}>
                
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      
      </div>
      
    

    </nav>
  )
}

export default Navbar
