import { React, Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/Layout/NavBar";
import Landing from "./components/Layout/Landing";
import Routes from "./components/routing/Routes";
import { loaduser } from "./action/auth";
import setAuthToken from "./utills/setAuthToken";
import "./App.css";
//redux
import { Provider } from "react-redux";
import store from "./store";
import { LOGOUT } from "./action/types";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loaduser());
    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
