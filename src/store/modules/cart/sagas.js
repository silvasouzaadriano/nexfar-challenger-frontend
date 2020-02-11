import { select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ sku, imageURL, name, price, quantityAvailable }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.sku === sku)
  );

  const stockAmount = quantityAvailable;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora do estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(sku, amount));
    toast.info('Quantidade adicionada com sucesso!');
  } else {
    const data = {
      sku,
      imageURL,
      name,
      price,
      quantityAvailable,
      amount: 1,
      priceFormatted: formatPrice(price),
    };

    yield put(addToCartSuccess(data));

    toast.info('Produto adicionado ao carrinho com sucesso!');
  }
}

function* updateAmount({ sku, amount, quantityAvailable }) {
  if (amount <= 0) return;

  if (amount > quantityAvailable) {
    toast.error('Quantidade solicitada fora do estoque');
    return;
  }

  yield put(updateAmountSuccess(sku, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
