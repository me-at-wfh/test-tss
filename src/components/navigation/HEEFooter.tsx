import React from "react";
import { Footer } from "nhsuk-react-components";
import styles from "./HEEFooter.module.scss";

const HEEFooter = (props: any) => {
  const { appVersion } = props;
  return (
    <Footer>
      <Footer.List>
        <Footer.ListItem className={styles.refLink} href="#">
          Contact us
        </Footer.ListItem>
        <Footer.ListItem className={styles.refLink} href="#">
          Privacy policy
        </Footer.ListItem>
        <Footer.ListItem className={styles.refLink} href="#">
          Terms and conditions
        </Footer.ListItem>
        <Footer.ListItem className={styles.refLink} href="#">
          Cookie policy
        </Footer.ListItem>
      </Footer.List>
      <Footer.Copyright>
        &copy; <a href="https://www.hee.nhs.uk">hee.nhs.uk</a>
      </Footer.Copyright>
      {appVersion ? (
        <Footer.List>
          <Footer.ListItem>
            <span style={{ fontSize: "10pt" }}>{`version: ${appVersion}`}</span>
          </Footer.ListItem>
        </Footer.List>
      ) : null}
    </Footer>
  );
};

export default HEEFooter;
