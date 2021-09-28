import React, { useState, useEffect, FocusEvent } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { CognitoUser } from "amazon-cognito-identity-js";
import {
  Panel,
  Input,
  Button,
  Details,
  ErrorSummary,
  WarningCallout
} from "nhsuk-react-components";
import QRCode from "qrcode.react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInputField from "../forms/TextInputField";

const SetTOTPForm: React.FC = () => {
  const [user, setUser] = useState<CognitoUser>();
  const [mfaType, setMFAType] = useState("");
  const [code, setCode] = useState("");
  const [qrCode, setQRCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser: CognitoUser = await Auth.currentAuthenticatedUser();
        const currentMFA: string = await Auth.getPreferredMFA(currentUser);
        const totpCode: string = await Auth.setupTOTP(currentUser);
        const authCode: string =
          "otpauth://totp/AWSCognito:" +
          currentUser.getUsername() +
          "?secret=" +
          totpCode +
          "&issuer=AWSCognito";
        setUser(currentUser);
        setMFAType(currentMFA);
        setCode(totpCode);
        setQRCode(authCode);
      } catch (err) {
        setErrorMessage("Enable to get user. " + err);
      }
    };
    getUser();
  }, []);

  const handleSubmit = (values: { confirmTOTPCode: string }) => {
    Auth.verifyTotpToken(user, values.confirmTOTPCode)
      .then(() => {
        Auth.setPreferredMFA(user, "TOTP")
          .then(data => {
            if (data === "SUCCESS") {
              // This step is necessary to prevent MFA reverting to SMS. It's a Cognito bug.
              // https://github.com/aws-amplify/amplify-js/issues/7254
              // https://github.com/aws-amplify/amplify-js/issues/1226

              Auth.currentAuthenticatedUser()
                .then(currentUser => history.push(`/profile`))
                .catch(err => {
                  setErrorMessage(err.message);
                });
            }
          })
          .catch(err => {
            setErrorMessage("Unable to set MFA as TOTP. " + err.message);
          });
      })
      .catch(err =>
        setErrorMessage("Unable to verify token error. " + err.message)
      );
  };

  return (
    <Panel label="Authenticator Setup">
      {qrCode !== "" && (
        <div>
          {mfaType === "SOFTWARE_TOKEN_MFA" && (
            <WarningCallout label="Authenticator already setup">
              <p>
                You have already registered Self-Service with an authenticator
                application. You can continue with the setup process to
                re-register but this will disable the previously registered
                authenticator account.
              </p>
            </WarningCallout>
          )}
          <p>Open the application and scan the barcode.</p>
          <div>
            <div style={{ padding: "20px" }}>
              <QRCode size={192} value={qrCode} />
            </div>

            <Details>
              <Details.Summary>Unable to scan QR code?</Details.Summary>
              <Details.Text>
                <p>
                  If you are not using a mobile authentication app or are unable
                  to see the QR code, you can enter the following code manually
                  into your authentication application.
                </p>
                <Input
                  onFocus={(event: FocusEvent<HTMLInputElement>) =>
                    event.target.select()
                  }
                  defaultValue={code}
                  label=""
                  readOnly
                />
              </Details.Text>
            </Details>

            <Formik
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={{ confirmTOTPCode: "" }}
              validationSchema={Yup.object({
                confirmTOTPCode: Yup.string()
                  .required("TOTP code required")
                  .min(6, "Code must be min 6 characters in length")
                  .max(6, "Code must be max 6 characters in length")
              })}
              onSubmit={values => handleSubmit(values)}
            >
              {() => (
                <Form>
                  <TextInputField
                    width={10}
                    name="confirmTOTPCode"
                    label="Enter the one-time code provided by the application and click Verify code to finish the setup."
                  />
                  <Button type="submit" data-cy="BtnContinue">
                    Verify code
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      {errorMessage && (
        <ErrorSummary
          aria-labelledby="error-summary-title"
          role="alert"
          tabIndex={-1}
        >
          <ErrorSummary.Title id="error-summary-title">
            An error has occurred.
          </ErrorSummary.Title>

          <ErrorSummary.Body>{errorMessage}</ErrorSummary.Body>
        </ErrorSummary>
      )}
    </Panel>
  );
};

export default SetTOTPForm;
