import * as Bucket from "@spica-devkit/bucket";

export const publicUrl = "https://e-commerce-672ba.hq.spicaengine.com/api";
export const publicApiKey = "3qa5e17l6268ks3";
export const CAT_ID = "62f9f058452333002c0029e3";

export const buckets = {
  PRODUCT: "62dfc35af3ffc4002b57b7f1",
  COLOR: "62dfc61bf3ffc4002b57b847",
  SIZE: "62dfc5def3ffc4002b57b83a",
  BRAND: "62dfc3d2f3ffc4002b57b7f9",
  USER: "62e12d0af3ffc4002b57c2fc",
  ADDRESS: "62e2811ef3ffc4002b57c587",
  COMMON: "62f4b619452333002c001d63",
  ORDER: "62e3ca58f3ffc4002b57c717"
};

function init() {
  let initializeConfig;
  if (typeof window !== "undefined" && localStorage.getItem("spicaToken")) {
    initializeConfig = {
      publicUrl,
      identity: localStorage.getItem("spicaToken"),
    };
  } else {
    initializeConfig = {
      publicUrl,
      apikey: publicApiKey,
    };
  }
  Bucket.initialize(initializeConfig);
}

export async function getAll(bucketId, options) {
  init();
  return Bucket.data.getAll(bucketId, options);
}

export async function get(bucketId, documentId, options) {
  init();
  return Bucket.data.get(bucketId, documentId, options);
}

export async function post(bucketId, data) {
  init();
  data = normalizeData(data);
  return Bucket.data.insert(bucketId, data);
}

export async function update(bucketId, documentId, data) {
  init();
  data = normalizeData(data);
  return Bucket.data.update(bucketId, documentId, data);
}

export async function patch(bucketId, documentId, data) {
  init();
  data = normalizeData(data);
  return Bucket.data.patch(bucketId, documentId, data);
}

export async function remove(bucketId, documentId) {
  init();
  return Bucket.data.remove(bucketId, documentId);
}

export async function httpGet() {}

export async function httpPost(path, data) {
  let token = localStorage.getItem("spicaToken");
  const obj = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token ? `IDENTITY ${token}` : `APIKEY ${publicApiKey}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(`${publicUrl}/fn-execute/${path}`, obj)
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }

      const resErr = await res.json();
      throw new Error(resErr.message || "Something went wrong");
    })
    .then((resJson) => {
      return resJson;
    });
}

function normalizeData(data) {
  Object.entries(data).forEach(([field, value]) => {
    if (data[field] && data[field][0] && data[field][0]._id) {
      data[field] = data[field].map((item) => item._id);
    }
  });
  return data;
}
