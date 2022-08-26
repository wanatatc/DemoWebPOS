/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { UserManager, WebStorageStateStore } from "oidc-client";
import { useHistory } from "react-router";
import { CircularProgress, Grid, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import * as authRedux from "../_redux/authRedux";
import * as authCRUD from "../_redux/authCrud";
import * as CONST from "../../../../Constant";

function SSOHandler(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const authReducer = useSelector(({ auth }) => auth);

  const userStore = new WebStorageStateStore({
    store: localStorage,
  });

  const userManager = new UserManager({
    ...CONST.SSO_CONFIG,
    userStore: userStore,
  });

  userManager.events.addUserSignedOut(() => {
    //TODO: Remove redux auth values
    dispatch(authRedux.actions.logout());
    userManager.removeUser().then(() => {
      userManager.clearStaleState().then(() => {
        history.push("/");
      });
    });
  });

  userManager.events.addAccessTokenExpiring(() => {
    console.log("token expiring...");
  });

  userManager.events.addSilentRenewError(() => {
    console.log("renew error");
  });

  userManager.events.addUserSignedIn((res) => {
    console.log("logged in");
    // getUser();
  });

  userManager.events.addAccessTokenExpired(() => {
    console.log("expired");
    //Remove redux auth values
    dispatch(authRedux.actions.logout());
    userManager.signinRedirect();
  });

  userManager.events.addUserLoaded(() => {
    console.log("user loaded");
    getUser();
  });

  // userManager.events.addUserSessionChanged(() => {
  //   console.log("session changed");
  // });

  userManager.events.addUserUnloaded(() => {
    console.log("user unloaded");
    //Remove redux auth values
    dispatch(authRedux.actions.logout());
    userManager.signinRedirect();
  });

  const getUser = () => {
    userManager
      .getUser()
      .then((user) => {
        if (user) {
          //console.log(user);
          //keep user detail in redux
          let payload = {
            user: authCRUD.getUserByToken(user.id_token),
            authToken: user.access_token,
            roles: authCRUD.getRoles(user.id_token),
            permissions: authCRUD.getPermissions(user.id_token),
            userManager: userManager,
            client_version: authCRUD.getClientVersion(user.access_token)
          };
          dispatch(authRedux.actions.login(payload));
        } else {
          //Remove redux auth values
          dispatch(authRedux.actions.logout());
          userManager.signinRedirect();
        }
      })
      .catch((err) => alert(err));
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <React.Fragment>
      {!authReducer.user && (
        <Grid
          container
          alignContent="center"
          justifyContent="center"
          direction="row"
        >
          <Grid
            item
            container
            alignContent="center"
            justifyContent="center"
            alignItems="center"
            xs={12}
            lg={12}
            style={{ marginTop: 30 }}
          >
            <CircularProgress></CircularProgress>
          </Grid>
          <Grid
            item
            container
            alignContent="center"
            justifyContent="center"
            alignItems="center"
            xs={12}
            lg={12}
            style={{ marginTop: 30 }}
          >
            <Typography>Redirecting to login page ...</Typography>
          </Grid>
        </Grid>
      )}
      {authReducer.user && props.children}
    </React.Fragment>
  );
}

export default SSOHandler;
