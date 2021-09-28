import React, { Fragment } from "react";
import "./App.scss";
import Profile from "./components/profile/Profile";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Login from "./components/authentication/Login";
import PageNotFound from "./components/common/PageNotFound";
import HEEFooter from "./components/navigation/HEEFooter";
import FormRPartA from "./components/forms/formr-part-a/FormRPartA";
import FormRPartB from "./components/forms/formr-part-b/FormRPartB";
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

    return isAuthenticated && checkLatestVersion ? (
      <Fragment>
        <Navbar />
        <main className="nhsuk-width-container nhsuk-u-margin-top-5">
          <BrowserRouter>
            <Switch>
              <Route path="/profile" component={Profile} />
              <Route path="/formr-a" component={FormRPartA} />
              <Route path="/formr-b" component={FormRPartB} />
              <Redirect exact path="/" to="/profile" />
              <Route path="/*" component={PageNotFound} />
            </Switch>
          </BrowserRouter>
        </main>
        <HEEFooter appVersion={appVersion} />
      </Fragment>
    ) : (
      <Login setAuthenticationStatus={this.setAuthenticationStatus}></Login>
    );
  }
}

export default App;
