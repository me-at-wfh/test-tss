import React from "react";
import { Header } from "nhsuk-react-components";
import styles from "./Navbar.module.scss";
import Logout from "../authentication/Logout";

const Navbar = (_: {}) => {
  return (
    <Header className={styles.header}>
      <Header.Container>
        <Header.Logo href="/profile" />
        <Header.Content>
          <Header.MenuToggle data-cy="BtnMenu" />
          <Header.Search></Header.Search>
        </Header.Content>
      </Header.Container>
      <Header.Nav title="Menu">
        <Header.NavItem href="/profile">Profile</Header.NavItem>
        <Header.NavItem href="/formr-a">Form R-a</Header.NavItem>
        <Header.NavItem href="/formr-b">Form R-b</Header.NavItem>
        <Header.NavItem>
          <Logout></Logout>
        </Header.NavItem>
      </Header.Nav>
    </Header>
  );
};

export default Navbar;
