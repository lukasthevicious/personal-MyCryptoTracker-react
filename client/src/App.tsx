import HomeDashboard from "./pages/HomeDashboard";
import { DashboardContextProvider } from "./state/DashboardContext";
import Holdings from "./pages/Holdings";
import Transactions from "./pages/Transactions";
import Auth from "./components/auth/Auth";
import { Route, Redirect, Switch } from "react-router-dom";
import { FormContextProvider } from "./state/FormContext";
import Navbar from "./components/layout/Navbar";
import { useAppSelector } from "./state/hooks";
import { RootState } from ".";
import ErrorScreen from "./pages/screens/ErrorScreen";
import Footer from "./components/layout/Footer";
import { PageContainer, ContentWrapper } from "./components/layout/styled";
import FloatingScrollButton from "./components/layout/FloatingScrollButton";

const App: React.FC = () => {
  const error = useAppSelector((state: RootState) => state.errorAndLoading);

  return (
    <DashboardContextProvider>
      <FloatingScrollButton />
      <Navbar />
      <PageContainer>
        <ContentWrapper>
          {error.isError ? (
            <ErrorScreen />
          ) : (
            <div>
              <Route path="/" exact>
                <Redirect to="/dashboard" />
              </Route>
              <Switch>
                <FormContextProvider>
                  <Route path="/dashboard" exact component={HomeDashboard} />
                  <Route path="/holdings" exact component={Holdings} />
                  <Route path="/transactions" exact component={Transactions} />
                  <Route path="/auth" exact component={Auth} />
                </FormContextProvider>
              </Switch>
            </div>
          )}
        </ContentWrapper>
        <Footer />
      </PageContainer>
    </DashboardContextProvider>
  );
};

export default App;
