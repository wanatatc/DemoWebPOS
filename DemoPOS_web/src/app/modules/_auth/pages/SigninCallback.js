/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { UserManager, WebStorageStateStore } from "oidc-client";
import * as CONST from "../../../../Constant";

function SigninCallback() {
  const userStore = new WebStorageStateStore({
    // store: localStorage,
    store: localStorage,
  });

  const userManager = new UserManager({
    ...CONST.SSO_CONFIG,
    userStore: userStore,
  });

  React.useEffect(() => {
    userManager.signinRedirectCallback().then(function (user) {
      window.history.replaceState(
        {},
        window.document.title,
        window.location.origin + window.location.pathname
      );

      window.location = user.state || "/";
    });
  }, []);
  return <div></div>;
}

export default SigninCallback;