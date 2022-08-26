/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */
import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { ContentRoute } from "./ContentRoute";
import BasePage from "./BasePage";
import Error404 from "../pages/Error404";
import Layout from "../layout/Layout";
import SSOHandler from "../modules/_auth/components/SSOHandler";
import SigninCallback from "../modules/_auth/pages/SigninCallback";
import SilentCallback from "../modules/_auth/pages/SilentCallback";

export function Routes() {
  return (
      <Switch>
        <ContentRoute
          exact
          title="redirect"
          path="/signin-callback"
          component={SigninCallback}
        />
        <ContentRoute
          exact
          title="redirect"
          path="/silent-callback"
          component={SilentCallback}
        />
        <Route path="/error404" component={Error404} />
        <SSOHandler>
          <Layout>
            <BasePage />
          </Layout>
        </SSOHandler>
        <Redirect to="/error404"></Redirect>
      </Switch>
  );
}
