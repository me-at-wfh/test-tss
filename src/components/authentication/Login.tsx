import React from "react";
import { Container } from "nhsuk-react-components";
import {
  Authenticator,
  SignIn,
  ForgotPassword,
  RequireNewPassword
} from "aws-amplify-react";

import styles from "./Login.module.scss";
import { LoginTheme } from "./LoginTheme";

interface LoginProps {
  setAuthenticationStatus: (state: string) => Promise<void>;
}

const Login = (props: LoginProps) => {
  return (
    <main className="nhsuk-main-wrapper" id="maincontent">
      <Container>
        <div className={styles.row}>
          <div className={styles.colText}>
            <h1 className="nhsuk-u-padding-0 nhsuk-u-margin-bottom-2">
              Trainee Self-Service
            </h1>
            <hr className="nhsuk-u-padding-0 nhsuk-u-margin-3" />
            <p>
              Trainee Self-Service enables trainees to log in and see some data
              HEE hold about them and undertake the Form R process for junior
              doctors.
            </p>
            <p>
              For further information and support, visit the{" "}
              <a
                style={{ whiteSpace: "nowrap" }}
                href="https://tis-support.hee.nhs.uk"
              >
                TIS Support website
              </a>
              .
            </p>
          </div>
          <div className={styles.colForm}>
            <Authenticator
              theme={LoginTheme}
              hideDefault={true}
              onStateChange={props.setAuthenticationStatus}
            >
              <SignIn />
              <ForgotPassword />
              <RequireNewPassword />
            </Authenticator>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Login;
