import React, { FunctionComponent } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Result } from "./Result";
export const Routes: FunctionComponent = () => {
  return (
    <div className="p-4">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/search" />
        </Route>
        <Route exact path="/search">
          <Result />
        </Route>
        <Route path="/images">
          <Result />
        </Route>
        <Route path="/news">
          <Result />
        </Route>
        <Route path="/videos">
          <Result />
        </Route>
      </Switch>
    </div>
  );
};
