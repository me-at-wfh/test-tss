import React from "react";

import { Container, Table, Details } from "nhsuk-react-components";
import SetTOTPForm from "./SetTOTPForm";
import imgAuthenticator1 from "../../static/images/mfa/authenticator_1.jpg";
import imgAuthenticator2 from "../../static/images/mfa/authenticator_2.jpg";
import imgAuthenticator3 from "../../static/images/mfa/authenticator_3.png";
import imgAuthy1 from "../../static/images/mfa/authy_1.png";
import imgAuthy2 from "../../static/images/mfa/authy_2.png";
import imgAuthy3 from "../../static/images/mfa/authy_3.png";
import imgAuthy4 from "../../static/images/mfa/authy_4.png";
import imgAuthy5 from "../../static/images/mfa/authy_5.png";
import imgSignIn from "../../static/images/mfa/signin_totp.png";
const SetTOTP: React.FC = () => {
  return (
    <Container>
      <h1>Two-factor authentication</h1>
      <p>
        Trainee Self-Service uses two-factor authentication to improve security
        and help safeguard your data. SMS messaging is currently used as the
        second authentication factor but due to security concerns, the
        application will be switching to the safer approach using authenticator
        applications, which require set-up by the user first.
      </p>

      <p>
        If you are already familiar with authenticator apps, then simply scan
        the barcode below in the Authenticator Setup section
      </p>

      <SetTOTPForm />
      <p>
        If you are less familiar with or would like an alternative to a
        phone-based authenticator then please click on the links below.
      </p>
      <Details.ExpanderGroup>
        <Details expander>
          <Details.Summary>
            Choosing an authentication application
          </Details.Summary>
          <Details.Text>
            <p>
              There are a couple of different options available for
              authentication application; either mobile or desktop. Please use
              the following table to help you decide which option to use:{" "}
            </p>
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.Cell>If you...</Table.Cell>
                  <Table.Cell>You should use...</Table.Cell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    Have a smartphone and are familiar with using apps or intend
                    to access Self-Service from different devices.
                  </Table.Cell>
                  <Table.Cell>
                    Google Authenticator on your smartphone.
                    <br />
                    Other authenticator apps will also work, such as Authy or
                    Microsoft Authenticator, but we have provided instructions
                    for Google Authenticator only.
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    Do not have (or do not want to use) a smartphone and need an
                    internet/web-based solution.
                    <br />
                    <strong>
                      You will need to enter a telephone number to validate
                      this.
                    </strong>
                  </Table.Cell>
                  <Table.Cell>
                    <a
                      target="_blank"
                      href="https://authy.com/download/"
                      rel="noreferrer"
                    >
                      Authy Desktop
                    </a>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Details.Text>
        </Details>
        <Details expander>
          <Details.Summary>
            Set up Google Authenticator mobile app
          </Details.Summary>
          <Details.Text>
            <p>
              <strong>
                The following instructions are for Google Authenticator but
                other authenticator apps such as Authy or Microsoft
                Authenticator will work just as well.
              </strong>
            </p>
            <ol>
              <li>Visit your smartphone App Store.</li>
              <li>
                Search for Google Authenticator and install the App on your
                smartphone.
              </li>
              <li>
                Launch the app and navigate through the welcome screens.
                <div>
                  <img
                    width="300"
                    alt="Google Authenticator welcome screen"
                    src={imgAuthenticator1}
                  />
                </div>
              </li>
              <li>
                At the screen titled <strong>Set up your first account</strong>,
                touch Scan a QR code. This will launch your camera.{" "}
                <strong>
                  You may be prompted at this point to grant permission to allow
                  Google Authenticator access to your camera.
                </strong>
                <div>
                  <img
                    width="300"
                    alt="Google Authenticator scan a QR code"
                    src={imgAuthenticator2}
                  />
                </div>
              </li>
              <li>
                Point the camera at the barcode below. The QR code will read
                automatically without any buttons being pressed and a 6-digit
                code will be displayed on your smartphone.
                <div>
                  <img
                    width="300"
                    alt="Google Authenticator 6-digit code"
                    src={imgAuthenticator3}
                  />
                </div>
                <strong>
                  Only scan the QR code once. You will know that the QR code has
                  been read successfully as the page will change to display the
                  authentication code.
                </strong>
              </li>
              <li>
                Enter this code into the box below and click Verify. If
                successful, you will be redirected to the Profile page and your
                account is now authenticated.
              </li>
            </ol>
            <p>
              <strong>
                If you receive an error code after clicking Submit, it is likely
                the Mobile Authenticator Setup screen refreshed before the setup
                was complete.
              </strong>
            </p>
          </Details.Text>
        </Details>
        <Details expander>
          <Details.Summary>Set up Authy Desktop</Details.Summary>
          <Details.Text>
            <p>
              If you do not have a smartphone, or you do not want to use your
              smartphone, you can use the Authy two-factor authentication app on
              your desktop computer to activate your account.
            </p>

            <p>
              <strong>
                You will need to enter a telephone number to validate your
                Twilio Authy Account Setup.
              </strong>
            </p>
            <ol>
              <li>
                Visit the{" "}
                <a
                  target="_blank"
                  href="https://authy.com/download/"
                  rel="noreferrer"
                >
                  Authy website
                </a>
                , download and install the desktop application for your
                operating system.
              </li>
              <li>
                Select your country from the drop-down menu, enter your
                telephone number and click <strong>Next</strong>.
                <div>
                  <img
                    width="300"
                    alt="Authy desktop telephone"
                    src={imgAuthy1}
                  />
                </div>
              </li>
              <li>
                Enter your email address and click <strong>Next</strong>.
              </li>
              <li>
                Select how you would like to receive your verification code,
                either as an <strong>SMS</strong> text message or a{" "}
                <strong>phone call</strong>.
                <div>
                  <img
                    alt="Authy desktop verification method"
                    src={imgAuthy2}
                  />
                </div>
              </li>
              <li>
                Enter the 6 digit code you have received.{" "}
                <div>
                  <img alt="Authy desktop enter verification" src={imgAuthy3} />
                </div>
              </li>
              <li>
                Click the + sign to add your first account.{" "}
                <div>
                  <img alt="Authy desktop add account" src={imgAuthy4} />
                </div>
              </li>
              <li>
                In the section <strong>Authenticator Setup</strong> below, click{" "}
                <strong>Unable to scan QR code</strong> to reveal a 30-digit
                code.
              </li>
              <li>
                Copy this 30-digit code, return to Authy Desktop setup and paste
                it into textbox labelled{" "}
                <strong>Enter code given by the website</strong>.
                <div>
                  <img alt="Authy desktop add account" src={imgAuthy5} />
                </div>
              </li>
              <li>
                Click <strong>Add Account</strong>
              </li>
              <li>
                Give the account a name, choose a colour. Make certain the token
                length is set to <strong>'6-digit' (default)</strong> and click{" "}
                <strong>Save</strong>.
              </li>
              <li>
                Copy or make a note of the 6-digit code that appears in Authy.
              </li>
              <li>
                Return to this page and enter the code into the box below and
                click <strong>Verify</strong>. If successful, you will be
                redirected to the Profile page and your account is now
                authenticated.
              </li>
            </ol>
            <p>
              <strong>
                If you receive an error code after clicking Submit, it is likely
                the code generated by Authy Desktop refreshed before the setup
                was complete. Simply reverify with the new code.
              </strong>
            </p>
          </Details.Text>
        </Details>

        <Details expander>
          <Details.Summary>
            How to login using an authentication application
          </Details.Summary>
          <Details.Text>
            <p>
              Once the authenticator application has been setup, you will need
              to use it each time you login. Simply enter your username and
              password as before, after which you will be prompted to{" "}
              <strong>Confirm TOTP code.</strong>{" "}
            </p>
            <div>
              <img width="400" alt="Self-Service sign in" src={imgSignIn} />
            </div>
            <p>
              Refer to the account created previously using your chosen
              authenticator application. Enter the 6-digit code displayed on
              authenticator app into the Confirm TOTP code text box and click{" "}
              <strong>Confirm.</strong>
            </p>
          </Details.Text>
        </Details>
      </Details.ExpanderGroup>
    </Container>
  );
};

export default SetTOTP;
