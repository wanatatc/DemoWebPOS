let APP_NAME = "Demo POS";

if(process.env.REACT_APP_ENV && process.env.REACT_APP_ENV !== "PROD"){
    APP_NAME += "[" + process.env.REACT_APP_ENV + "]"
};

export const APP_INFO = {
  name: APP_NAME,
  version: "1.0.0",
  since: "2021",
  description: "",
  contactUrl: "https://www.siamsmile.co.th",
};

export const VERSION_CHECKER = {
  ENABLE_VERSION_CHECKER: true,
  CONFIRM_BEFORE_REFRESH: true,
  CHECK_VERSION_EVERY_MINUTE: 1,
};

export const BASEURL = {
    LOCAL: `http://localhost:3000`,
    DEV: `https://demopos.devsiamsmile.com`,
    UAT: `https://demopos.uatsiamsmile.com`,
    PROD: `https://demopos.siamsmile.co.th`,
};


export const API_BASEURL = {
    LOCAL: `https://demoposapi.devsiamsmile.com/api`,
    DEV: `https://demoposapi.devsiamsmile.com/api`,
    UAT: `https://demoempapi.devsiamsmile.com/api`,
    PROD: `https://demoempapi.devsiamsmile.com/api`,
};


export const APIGW_BASEURL = { 
    LOCAL: `https://api.devsiamsmile.com`,
    DEV: `https://api.devsiamsmile.com`,
    UAT: `https://apigw.uatsiamsmile.com`,
    PROD: `https://apigw.siamsmile.co.th`,
};


export const AUTH_BASEURL = { 
    LOCAL: `https://demoauthserver.devsiamsmile.com`,
    DEV: `https://demoauthserver.devsiamsmile.com`,
    UAT: `https://authlogin.uatsiamsmile.com`,
    PROD: `https://oauthlogin.siamsmile.co.th`,
};

export const CLIENT_ID = {
  LOCAL: `1a50bc79-85c7-4ed3-863e-8a67abe3de11`,
  DEV: `1a50bc79-85c7-4ed3-863e-8a67abe3de11`,
  UAT: `1a50bc79-85c7-4ed3-863e-8a67abe3de11`,
  PROD: `1a50bc79-85c7-4ed3-863e-8a67abe3de11`,
};

export const SSO_CONFIG = {
  authority: !process.env.REACT_APP_ENV 
      ? AUTH_BASEURL[`LOCAL`] 
      : AUTH_BASEURL[process.env.REACT_APP_ENV],
  client_id: !process.env.REACT_APP_ENV
      ? CLIENT_ID[`LOCAL`] 
      : CLIENT_ID[process.env.REACT_APP_ENV],
  redirect_uri: !process.env.REACT_APP_ENV 
      ? `${BASEURL[`LOCAL`]}/signin-callback` 
      : `${BASEURL[process.env.REACT_APP_ENV]}/signin-callback`,
  silent_redirect_uri: !process.env.REACT_APP_ENV 
      ? `${BASEURL[`LOCAL`]}/silent-callback` 
      : `${BASEURL[process.env.REACT_APP_ENV]}/silent-callback`,
  response_type: `code`,
  scope: `openid profile roles employeeapi demo_pos`,
  
  automaticSilentRenew: true,
  monitorSession: true,
};

export const API_URL = !process.env.REACT_APP_ENV 
    ? API_BASEURL[`LOCAL`] 
    : API_BASEURL[process.env.REACT_APP_ENV];

export const APIGW_URL = !process.env.REACT_APP_ENV 
    ? APIGW_BASEURL[`LOCAL`] 
    : APIGW_BASEURL[process.env.REACT_APP_ENV];

export const AUTH_LOGOUT_REDIRECT =  (!process.env.REACT_APP_ENV 
    ? AUTH_BASEURL[`LOCAL`] 
    : AUTH_BASEURL[process.env.REACT_APP_ENV]) + "/Account/Logout";

export const PERMISSIONS = {
  employee_read: "employee:read",
  employee_write: "employee:write",
  employee_delete: "employee:delete",
};
