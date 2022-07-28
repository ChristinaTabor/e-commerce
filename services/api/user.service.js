import { useContext } from "react";
import * as Identity from "@spica-devkit/identity";
import { publicUrl, publicApiKey, httpPost } from "./data.service";
import { buckets, get, getAll } from "./data.service";
import jwt_decode from "jwt-decode";

function init() {
  let initializeConfig = {
    publicUrl,
    apikey: publicApiKey,
  };
  Identity.initialize(initializeConfig);
}

export async function userLogin(identifier, password) {
  init();
  const res = await Identity.login(identifier, password).catch((err) => {
    console.log(err);
  });

  localStorage.setItem("spicaToken", res);

  let decodedToken = tokenDecode(res);

  return getAll(buckets.USER, {
    queryParams: { filter: { identity: decodedToken._id } },
  }).then((data) => {
    if (data.length) localStorage.setItem("userId", data[0]._id);
    return data[0];
  });
}

export function userLogout(){
  localStorage.clear();
}

export async function userRegister(data) {
  return httpPost("register", data);
}

export async function getUser(userId, options) {
  return get(buckets.USER, userId, options);
}

function tokenDecode(token) {
  if (token) return jwt_decode(token);
  return false;
}
