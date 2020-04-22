import React from "react";
import {Route, Switch} from "react-router-dom";


import Extensions from "./extensions/index";
import InBuiltApps from "./inBuiltApps/index";
import Main from "./main/index";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}main`} component={Main}/>
      <Route path={`${match.url}extensions`} component={Extensions}/>
      <Route path={`${match.url}in-built-apps`} component={InBuiltApps}/>
    </Switch>
  </div>
);

export default App;
