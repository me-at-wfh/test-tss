import React, { useState, useEffect } from "react";
import { Header } from "nhsuk-react-components";
import Logout from "../authentication/Logout";
import { NavLink } from "react-router-dom";
import { Auth } from "aws-amplify";

interface navProps {
  showMenu: boolean;
  updateMenuStatus: any;
}

const Navbar = (props: navProps) => {
  const [open, setOpen] = useState<boolean | undefined>(props.showMenu);
  useEffect(() => {
    setOpen(props.showMenu);
  }, [props.showMenu]);

  const handleClick = () => {
    setOpen(false);
    props.updateMenuStatus(false);
  };
  return (
    <Header.Nav open={open} title="Menu">
      <li className="nhsuk-header__navigation-item">
        <NavLink
          className="nhsuk-header__navigation-link"
          onClick={handleClick}
          to="/profile"
        >
          Profile
        </NavLink>
      </li>
      <li className="nhsuk-header__navigation-item">
        <NavLink
          onClick={handleClick}
          className="nhsuk-header__navigation-link"
          to="/formr-a"
        >
          Form R (Part A)
        </NavLink>
      </li>

      <li className="nhsuk-header__navigation-item">
        <NavLink
          onClick={handleClick}
          className="nhsuk-header__navigation-link"
          to="/formr-b"
        >
          Form R (Part B)
        </NavLink>
      </li>
      <li className="nhsuk-header__navigation-item">
        <NavLink
          onClick={handleClick}
          className="nhsuk-header__navigation-link"
          to="/support"
        >
          Support
        </NavLink>
      </li>
      <Logout
        onClick={async (event: MouseEvent) => {
          event.preventDefault();
          handleClick();
          await Auth.signOut();
        }}
      ></Logout>
    </Header.Nav>
  );
};

export default Navbar;
