import React from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { Container, ProductTable } from './styles';

export default function Cart() {
  const options = {
    autoClose: 2000,
  };

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.price * product.amount;
      }, 0)
    )
  );

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
    }))
  );

  const dispatch = useDispatch();

  function increment(product) {
    dispatch(
      CartActions.updateAmountRequest(
        product.sku,
        product.amount + 1,
        product.quantityAvailable
      )
    );
    if (product.amount < product.quantityAvailable) {
      toast.info('Quantidade adicionada com sucesso!', options);
    }
  }

  function decrement(product) {
    dispatch(
      CartActions.updateAmountRequest(
        product.sku,
        product.amount - 1,
        product.quantityAvailable
      )
    );
    if (product.amount > 1) {
      toast.info('Quantidade excluída com sucesso!', options);
    } else {
      toast.error('Quantidade não pode ser menor que 1 unidade!', options);
    }
  }

  return (
    <Container>
      <ProductTable>
        <table>
          <thead>
            <tr>
              <th />
              <th>PRODUTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <tr role="row">
                <td role="cell">
                  <img src={product.imageURL} alt={product.name} />
                </td>
                <td role="cell">
                  <strong>{product.name}</strong>
                  <span>Preço: {product.priceFormatted}</span>
                </td>
                <td role="cell">
                  <div>
                    <button type="button" onClick={() => decrement(product)}>
                      <MdRemoveCircleOutline size={20} color="#7159c1" />
                    </button>
                    <input type="number" readOnly value={product.amount} />
                    <button type="button" onClick={() => increment(product)}>
                      <MdAddCircleOutline size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
                <td role="cell">
                  <strong className="subTotal">{product.subtotal}</strong>
                </td>
                <td role="cell">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(CartActions.removeFromCart(product.sku))
                    }
                  >
                    <MdDelete size={20} color="#A52A2A" />
                  </button>
                </td>
              </tr>
            ))}
            <tr role="row">
              <td role="cell" />
              <td role="cell" />
              <td role="cell">
                <div />
              </td>
              <td role="cell">
                <strong className="Total">Total: {total}</strong>
              </td>
              <td role="cell" />
            </tr>
          </tbody>
        </table>
      </ProductTable>
    </Container>
  );
}
