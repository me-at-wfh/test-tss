import React from "react";
import { Button } from "nhsuk-react-components";
import { SignOut } from "aws-amplify-react";
import styles from "./Logout.module.scss";

class Logout extends SignOut {
  render() {
    return (
      <Button
        className={styles.logout}
        type="button"
        onClick={() => super.signOut()}
      >
        Logout
      </Button>
    );
  }
}

export default Logout;
