import React, { Fragment } from "react";
import { Header } from "nhsuk-react-components";
import HEEFooter from "../navigation/HEEFooter";
import {
  Authenticator,
  SignIn,
  ForgotPassword,
  RequireNewPassword
} from "aws-amplify-react";

import styles from "./Login.module.scss";

interface LoginProps {
  setAuthenticationStatus: (state: string) => Promise<void>;
}

const Login = (props: LoginProps) => {
  return (
    <Fragment>
      <Header className={styles.header}>
        <Header.Container>
          <Header.Logo></Header.Logo>
        </Header.Container>
      </Header>
      <main className="nhsuk-main-wrapper" id="maincontent">
        <Authenticator
          hideDefault={true}
          onStateChange={props.setAuthenticationStatus}
        >
          <SignIn />
          <ForgotPassword />
          <RequireNewPassword />
        </Authenticator>
      </main>
      <HEEFooter></HEEFooter>
    </Fragment>
  );
};

export default Login;
