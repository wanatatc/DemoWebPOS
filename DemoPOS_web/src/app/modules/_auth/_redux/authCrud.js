import jwt_decode from "jwt-decode";

export function getUserByToken(token) {
  let decoded = jwt_decode(token)["name"];
  return decoded;
}

export function getClientVersion(token) {
  // debugger
  let decoded = jwt_decode(token)["client_version"];
  return decoded;
}

export function getRoles(token) {
  let decoded = jwt_decode(token);
  let result = [];

  if (!decoded.role) {
    return [];
  }

  //push role ลง array(fix bug role --> "r","o","l","e")
  if (Array.isArray(decoded.role)) {
    result = decoded.role;
  } else {
    result.push(decoded.role);
  }

  return result;
}

export function getPermissions(token) {
  let decoded = jwt_decode(token);
  let result = [];

  if (!decoded.permission) {
    return [];
  }

  //push permission ลง array(fix bug permission --> "p","e","r","m","i","s","s","i","o","n")
  if (Array.isArray(decoded.permission)) {
    result = decoded.permission;
  } else {
    result.push(decoded.permission);
  }

  return result;
}
