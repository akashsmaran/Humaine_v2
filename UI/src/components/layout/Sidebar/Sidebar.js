//import useState hook to create menu collapse state
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";
const mql = window.matchMedia(`(min-width: 1200px)`);
// class Sidebar1 extends React.Component{}
const Sidebar = ({ auth: { isAuthenticated, loading }, logout }) => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  // console.log(location);

  const logoutUser = () => {
    logout();
  };

  useEffect(() => {
    function handleResize() {
      mql.matches ? setMenuCollapse(false) : setMenuCollapse(true);
    }

    window.addEventListener("resize", handleResize);
    return function cleanupListener() {
      window.removeEventListener("resize", handleResize);
    };
  });
  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              {/* <p>{menuCollapse ? "Logo" : "Big Logo"}</p> */}
              {menuCollapse ? (
                ""
              ) : (
                <div className="header-head">
                  <span className="text-one">Hum</span>
                  <span className="text-two">ai</span>
                  <span className="text-one">ne</span>
                </div>
              )}
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem
                active={pathname.includes("dashboard") ? true : false}
                icon={<FiHome />}
              >
                <Link to="/dashboard"> Dashboard</Link>
              </MenuItem>

              {/* <MenuItem icon={<FaList />}>Category</MenuItem>
              <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
              <MenuItem icon={<GoCommentDiscussion />}>Discuss</MenuItem> */}

              {/* <MenuItem
                active={pathname.includes("settings") ? true : false}
                icon={<BiCog />}
              >
                <Link to="/settings">Settings</Link>
              </MenuItem> */}
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} onClick={() => logoutUser()}>
                Logout
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Sidebar);
