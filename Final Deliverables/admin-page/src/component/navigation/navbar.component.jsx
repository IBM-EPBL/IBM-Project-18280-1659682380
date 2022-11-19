import React from 'react'
import { IconContext } from 'react-icons'
import {AiOutlineMenu} from 'react-icons/ai'
import icon from '../../assets/crown.svg'

const NavBar = ()=> {
  return (
    <>
      <nav className="navbar" style={{boxShadow:'4px 4px 10px grey'}}>
      <div className="d-inline-flex " style={{marginLeft:'10px'}}>
      <button className="btn btn-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            <IconContext.Provider value={{size:"30px"}}>
                <AiOutlineMenu />
            </IconContext.Provider>
        </button>
    <a className="navbar-brand" href='#' style={{marginLeft:'20px'}}>
      <img src={icon} alt="Logo" width="35" height="35" style={{marginRight:'10px'}} />
        Crown Clothings - Admin
    </a>
  </div>
</nav>
    </>
  )
}

export default NavBar
