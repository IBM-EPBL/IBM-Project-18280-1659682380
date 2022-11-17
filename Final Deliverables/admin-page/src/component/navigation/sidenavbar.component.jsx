import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./navbar.component";
import { Link } from "react-router-dom";

const SideNavBar = () => {
  return (
    <Fragment>
      <NavBar />
<div class="offcanvas offcanvas-start" style={{width:"250px"}} data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Dashboard</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
      <Link to='/'>
        <button className="btn btn-light" style={{width:"200px",margin:'15px 0px'}}>
          Order Details
        </button>
      </Link>
      <Link to='/users'>
        <button className="btn btn-light" style={{width:"200px",margin:'15px 0px'}}>
          User Details
        </button>
      </Link>
      {/* <Link to='/products'>
        <button className="btn btn-light" style={{width:"200px",margin:'15px 0px'}}>
          Product Details
        </button>
      </Link>    */}
  </div>
</div>
    <Outlet />
    </Fragment>
  );
};

export default SideNavBar;
