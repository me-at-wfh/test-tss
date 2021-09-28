import React from "react";
import { Footer } from "nhsuk-react-components";
import styles from "./HEEFooter.module.scss";

const HEEFooter = (props: any) => {
  const { appVersion } = props;
  return appVersion ? (
    <Footer>
      <Footer.List>
        <Footer.ListItem
          className={styles.refLink}
          href="http://jobs.hee.nhs.uk"
        >
          Jobs at HEE
        </Footer.ListItem>
        <Footer.ListItem className={styles.refLink} href="/about/contact-us">
          Contact us
        </Footer.ListItem>
        <Footer.ListItem
          className={styles.refLink}
          href="/about/privacy-notice"
        >
          Privacy policy
        </Footer.ListItem>
        <Footer.ListItem
          className={styles.refLink}
          href="/about/terms-conditions"
        >
          Terms and conditions
        </Footer.ListItem>
        <Footer.ListItem className={styles.refLink} href="/about/cookies">
          Cookie policy
        </Footer.ListItem>
        <Footer.ListItem>{`App version: ${appVersion}`}</Footer.ListItem>
      </Footer.List>
      <Footer.Copyright>
        See our{" "}
        <a href="https://twitter.com/NHS_HealthEdEng/lists/local-offices/members">
          local offices
        </a>{" "}
        on Twitter.
      </Footer.Copyright>
    </Footer>
  ) : null;
};

export default HEEFooter;
