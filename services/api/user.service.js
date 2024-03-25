import * as Identity from "@spica-devkit/identity";
import { publicUrl, publicApiKey, httpPost, update } from "./data.service";
import { buckets, get, post, getAll } from "./data.service";
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
  const res = await Identity.login(identifier, password);

  if (!res) {
    throw "Token is empty!";
  }

  localStorage.setItem("spicaToken", res);

  let decodedToken = tokenDecode(res);

  return getAll(buckets.USER, {
    queryParams: { filter: { identity: decodedToken._id } },
  }).then((data) => {
    if (data.length) localStorage.setItem("userId", data[0]._id);
    return data[0];
  });
}

export function userLogout() {
  localStorage.clear();
}

export async function userRegister(data) {
  return httpPost("register", data);
}

export async function getUser(userId, options) {
  console.log("test")
  return get(buckets.USER, userId, options);
}

export async function updateUser(data) {
  return update(buckets.USER, data._id, data);
}

export async function changeEmail(data) {
  return httpPost("changeEmail", data)
}

export async function changePassword(data) {
  return httpPost("changePassword", data)
}

function tokenDecode(token) {
  if (token) return jwt_decode(token);
  return false;
}
