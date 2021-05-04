import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Hello from "../Overview";
import { UserProfileContext } from "../providers/UserProfileProvider";
import GroupOverview from "./Groups/GroupOverview";
import Login from "./Login";
import Register from "./Register";



export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello/> : <Redirect to="/login" />}
        </Route>

        <Route path="/group" exact>
          {isLoggedIn ? <GroupOverview /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
