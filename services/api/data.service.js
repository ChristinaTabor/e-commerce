import * as Bucket from "@spica-devkit/bucket";

export const FASHION_CAT_ID = "62dfc8a6f3ffc4002b57b8e7";

const publicUrl = "https://e-commerce-672ba.hq.spicaengine.com/api";
const publicApiKey = "3qa5e17l6268ks3";
const buckets = {
  PRODUCT: "62dfc35af3ffc4002b57b7f1",
  COLOR: "62dfc61bf3ffc4002b57b847",
  SIZE: "62dfc5def3ffc4002b57b83a",
  BRAND: "62dfc3d2f3ffc4002b57b7f9",
};

function init() {
  let initializeConfig;
  //   if (localStorage.getItem("spicaToken")) {
  //     initializeConfig = {
  //       publicUrl,
  //       identity: localStorage.getItem("spicaToken"),
  //     };
  //   } else {
  initializeConfig = {
    publicUrl,
    apikey: publicApiKey,
  };
  //   }
  Bucket.initialize(initializeConfig);
}

export async function getColors(options) {
  init();
  return Bucket.data.getAll(buckets.COLOR, options);
}

export async function getSizes(options) {
  init();
  return Bucket.data.getAll(buckets.SIZE, options);
}

export async function getBrands(options) {
  init();
  return Bucket.data.getAll(buckets.BRAND, options);
}

export async function getProducts(options) {
  init();
  return Bucket.data.getAll(buckets.PRODUCT, options);
}
