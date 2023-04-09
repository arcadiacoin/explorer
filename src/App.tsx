import * as React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Helmet } from "react-helmet";
import { Route, Switch } from "react-router-dom";
import { Layout, ConfigProvider, theme } from "antd";
import { PreferencesContext, Theme } from "api/contexts/Preferences";
import NodeHealth from "components/NodeHealth";
import Notification from "components/Notification";
import AppHeader from "components/AppHeader";
import AppFooter from "components/AppFooter";
import HomePage from "pages/Home";
import RepresentativesPage from "pages/Representatives";
import DeveloperFundPage from "pages/DeveloperFund";
import DeveloperFundTransactionsPage from "pages/DeveloperFund/Transactions";
import DistributionPage from "pages/Distribution";
import ExchangeTrackerPage from "pages/ExchangeTracker";
import LargeTransactionsPage from "pages/LargeTransactions";
import KnownAccountsPage from "pages/KnownAccounts";
import AccountPage from "pages/Account";
import BlockPage from "pages/Block";
import NodeStatusPage from "pages/NodeStatus";
import NetworkStatusPage from "pages/NetworkStatus";
import PreferencesPage from "pages/Preferences";
import BookmarksPage from "pages/Bookmarks";
import "components/utils/analytics";

//import "antd/dist/antd.css";
import "leaflet/dist/leaflet.css";
import "leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css";
import "./App.css";
import "./Theme.css";

const { Content } = Layout;


const App: React.FC = () => {
  const { t } = useTranslation();
  const { theme:userTheme } = React.useContext(PreferencesContext);

  return (
    <>
      <Helmet>
        <html lang={i18next.language} />
        <title>Arcadia {t("common.blockExplorer")}</title>
        <meta
          name="description"
          content="Block explorer of the Arcadia cryptocurrency"
        />
        <meta
          name="theme-color"
          content={userTheme === Theme.DARK ? "#131313" : "#eff2f5"}
        />
      </Helmet>
	  <ConfigProvider theme={{
		  algorithm: userTheme === Theme.DARK ? theme.darkAlgorithm : theme.defaultAlgorithm ,
		  token: {
			colorPrimary: '#cd8f1d',
		  },
		}}
      >
      <Layout
        style={{ minHeight: "100vh" }}
        className={userTheme === Theme.DARK ? `theme-dark` : undefined}
      >
        <NodeHealth />
        <AppHeader />
        <Notification />
        <Content>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/representatives" component={RepresentativesPage} />
            <Route exact path="/developer-fund" component={DeveloperFundPage} />
            <Route
              path="/developer-fund/transactions"
              component={DeveloperFundTransactionsPage}
            />
            <Route path="/known-accounts" component={KnownAccountsPage} />
            <Route path="/distribution" component={DistributionPage} />
            <Route path="/exchange-tracker" component={ExchangeTrackerPage} />
            <Route
              path="/large-transactions/:sortBy?"
              component={LargeTransactionsPage}
            />
            <Route
              path="/account/:account?/:section?"
              component={AccountPage}
            />
            <Route path="/block/:block?" component={BlockPage} />
            <Route path="/node-status" component={NodeStatusPage} />
            <Route path="/network-status" component={NetworkStatusPage} />
            <Route path="/preferences" component={PreferencesPage} />
            <Route path="/bookmarks" component={BookmarksPage} />
          </Switch>
        </Content>
        <AppFooter />
      </Layout>
	  </ConfigProvider>
    </>
  );
};

export default App;
