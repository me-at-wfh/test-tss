import React from "react";
import CookieConsent from "react-cookie-consent";
import "./App.scss";
import Profile from "./components/profile/Profile";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import HEEHeader from "./components/navigation/HEEHeader";
import Login from "./components/authentication/Login";
import PageNotFound from "./components/common/PageNotFound";
import HEEFooter from "./components/navigation/HEEFooter";
import FormRPartA from "./components/forms/formr-part-a/FormRPartA";
import FormRPartB from "./components/forms/formr-part-b/FormRPartB";
import Support from "./components/forms/Support";
import { CacheUtilities } from "./utilities/CacheUtilities";
import packageJson from "../package.json";

const globalAny: any = global;
globalAny.appVersion = packageJson.version;

interface AppState {
  isAuthenticated: boolean;
  checkLatestVersion: boolean;
  appVersion: any;
}

interface AppProps {}

class App extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      isAuthenticated: false,
      checkLatestVersion: false,
      appVersion: globalAny.appVersion
    };
  }

  async componentDidMount() {
    const currentVersion = globalAny.appVersion;
    const latestVersion = await CacheUtilities.FetchMetaFile();

    await this.checkAppVersion(latestVersion, currentVersion);
    this.setState(prevState => ({
      ...prevState,
      checkLatestVersion: true
    }));
  }

  setAuthenticationStatus = async (state: string) => {
    if (state === "signedIn") {
      this.setState({
        isAuthenticated: true
      });
    } else {
      this.setState({
        isAuthenticated: false
      });
    }
  };

  checkAppVersion = async (
    latestV: string | null,
    currentV: string
  ): Promise<void> => {
    if (latestV) {
      const shouldForceRefresh = CacheUtilities.SemverGreaterThan(
        latestV,
        currentV
      );
      if (shouldForceRefresh) {
        await CacheUtilities.UnregisterServiceWorker();
        await CacheUtilities.ClearCaches();
        await CacheUtilities.ReloadPage();
        this.setState(prevState => ({
          ...prevState,
          appVersion: latestV
        }));
      }
    }
  };

  render() {
    const { isAuthenticated, checkLatestVersion, appVersion } = this.state;

    return (
      <BrowserRouter>
        <HEEHeader isAuthenticated={isAuthenticated} />
        {isAuthenticated && checkLatestVersion ? (
          <main className="nhsuk-width-container nhsuk-u-margin-top-5">
            <Switch>
              <Route path="/profile" component={Profile} />
              <Route path="/formr-a" component={FormRPartA} />
              <Route path="/formr-b" component={FormRPartB} />
              <Route path="/support" component={Support} />
              <Redirect exact path="/" to="/profile" />
              <Route path="/*" component={PageNotFound} />
            </Switch>
          </main>
        ) : (
          <Login setAuthenticationStatus={this.setAuthenticationStatus}></Login>
        )}
        <HEEFooter appVersion={appVersion} />
        <CookieConsent
          disableStyles={true}
          buttonClasses="nhsuk-button nhsuk-button--reverse"
          buttonWrapperClasses="cookieConsent-button-wrapper"
          contentClasses="cookieConsent-content"
          overlayClasses="cookieConsent-overlay"
          overlay
          extraCookieOptions={{ SameSite: "Lax" }}
          location="bottom"
          buttonText="Accept and close"
        >
          <h3>Your consent is required.</h3>
          <p>
            We use necessary cookies to make our site work and analytics cookies
            to help us improve it. In order use this site, you must agree to the
            storing of such cookies on your device by clicking 'Accept and
            close'. To learn more about how we use cookies and your data, please
            see our{" "}
            <a
              target="_blank"
              style={{ color: "#ffffff" }}
              rel="noopener noreferrer nofollow"
              href="https://www.hee.nhs.uk/about/privacy-notice"
            >
              privacy policy
            </a>
            .
          </p>
        </CookieConsent>
      </BrowserRouter>
    );
  }
}

export default App;
