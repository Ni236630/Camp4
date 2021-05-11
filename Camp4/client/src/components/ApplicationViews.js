import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Hello from "../Overview";
import { UserProfileContext } from "../providers/UserProfileProvider";
import GroupEditForm from "./Groups/GroupEditForm";
import GroupOverview from "./Groups/GroupOverview";
import PersonnelOverview from './OverViews/PersonnelOverview';
import NewGroup from "./Groups/NewGroupForm";
import Login from "./Login";
import Register from "./Register";
import NewAttendee from "./Attendees/NewAttendee";
import EditUser from "./UserProfile/EditUserProfile";



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

        <Route path="/newGroup" exact>
          {isLoggedIn ? <NewGroup /> : <Redirect to="/login" />}
        </Route>

        <Route path="/editGroup/:id"  exact>
          {isLoggedIn ? <GroupEditForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/editUser/:id"  exact>
          {isLoggedIn ? <EditUser /> : <Redirect to="/login" />}
        </Route>

        <Route path="/personnel" exact>
          {isLoggedIn ? <PersonnelOverview /> : <Redirect to="/login" />}
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
