import React, { useState } from "react";
import { Header } from "nhsuk-react-components";
import Navbar from "./Navbar";
import HEEHeaderLogo from "./HEEHeaderLogo";

import styles from "./HEEHeader.module.scss";

const headerOpen = () => {
  return (
    <Header.Container>
      <HEEHeaderLogo />
    </Header.Container>
  );
};

const HEEHeader = (props: any) => {
  const [showMenu, setShowMenu] = useState(false);
  const updateMenuStatus = (open: boolean) => {
    setShowMenu(open);
  };
  return (
    <Header className={styles.header}>
      {props.isAuthenticated ? (
        <>
          <Header.Container>
            <HEEHeaderLogo />
            <Header.Content>
              <Header.MenuToggle
                className={`nhsuk-header__menu-toggle ${
                  showMenu ? "closeMenu" : ""
                }`}
                onClick={() => {
                  showMenu ? setShowMenu(false) : setShowMenu(true);
                }}
                data-cy="BtnMenu"
              />
            </Header.Content>
          </Header.Container>

          <Navbar showMenu={showMenu} updateMenuStatus={updateMenuStatus} />
        </>
      ) : (
        headerOpen()
      )}
    </Header>
  );
};

export default HEEHeader;
