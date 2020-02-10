export function addToCartRequest(
  sku,
  imageURL,
  name,
  price,
  quantityAvailable
) {
  return {
    type: '@cart/ADD_REQUEST',
    sku,
    imageURL,
    name,
    price,
    quantityAvailable,
  };
}

export function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_SUCCESS',
    product,
  };
}

export function removeFromCart(sku) {
  return {
    type: '@cart/REMOVE',
    sku,
  };
}

export function updateAmountRequest(sku, amount, quantityAvailable) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    sku,
    amount,
    quantityAvailable,
  };
}

export function updateAmountSuccess(sku, amount) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    sku,
    amount,
  };
}
