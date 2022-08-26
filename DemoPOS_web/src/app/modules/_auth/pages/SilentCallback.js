/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { UserManager, WebStorageStateStore } from "oidc-client";
import * as CONST from "../../../../Constant";

function SilentCallback() {
  const userStore = new WebStorageStateStore({
    // store: localStorage,
    store: localStorage,
  });

  const userManager = new UserManager({
    ...CONST.SSO_CONFIG,
    userStore: userStore,
  });

  React.useEffect(() => {
    // console.log("start renew token!!");
    userManager
      .signinSilentCallback()
      .then((user) => {
        // console.log(user);
      })
      .catch(function (e) {
        console.error(e);
      });
  }, []);
  return <div></div>;
}

export default SilentCallback;