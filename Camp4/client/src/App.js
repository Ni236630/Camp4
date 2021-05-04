import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { GroupProvider } from './providers/GroupProvider';
import GroupOverview from './components/Groups/GroupOverview';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <GroupProvider>
          <Header />
          <ApplicationViews />    
        </GroupProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
