import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// layouts
import Navbar from "./components/layout/Navbar";
import Spacer from "./components/layout/Spacer";

// bodys
import Home from "./components/body/Home";
import NotFound from "./components/body/NotFound";
import Register from "./components/body/Register";
import EditPost from "./components/body/EditPost";
import Login from "./components/body/Login";
import MyPosts from "./components/body/MyPosts";
import ViewPost from "./components/body/ViewPost";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/AlertMaker";

// utils
import { loadUser } from "./actions/auth";
import PrivateRoute from "./routing/PrivateRoute";
import Spinner from "./components/layout/Spinner";

// auth
if (localStorage.token) {
  store.dispatch(loadUser());
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <Navbar />
        <Spacer />
        <Alert />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/signin" component={Login} exact />
          <Route path="/signup" component={Register} exact />
          <Route path="/spinner" component={Spinner} exact />
          <PrivateRoute path="/editpost" component={EditPost} exact />
          <PrivateRoute path="/editpost/:id" component={EditPost} exact />
          <PrivateRoute path="/myposts" component={MyPosts} exact />
          <Route path="/post/:id" component={ViewPost} exact />
          <Route component={NotFound} />
        </Switch>
        <Spacer />
      </Router>
    </Provider>
  );
};

export default App;
