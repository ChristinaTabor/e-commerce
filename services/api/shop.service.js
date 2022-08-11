import { getAll, get, buckets } from "./data.service";

export async function getColors(options) {
  return getAll(buckets.COLOR, options);
}

export async function getSizes(options) {
  return getAll(buckets.SIZE, options);
}

export async function getBrands(options) {
  return getAll(buckets.BRAND, options);
}

export async function getProducts(options) {
  return getAll(buckets.PRODUCT, options);
}

export async function getProduct(id, options) {
  return get(buckets.PRODUCT, id, options);
}
