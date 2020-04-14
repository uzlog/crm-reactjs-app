import React from "react";
import {Route, Switch} from "react-router-dom";

import Mail from "./Mail";

const Extensions = ({match}) => (
  <Switch>
    <Route path={`${match.url}/mail`} component={Mail}/>
  </Switch>
);

export default Extensions;
