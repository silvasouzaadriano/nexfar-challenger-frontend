import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.sku] = product.amount;

      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('product');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddProduct(sku, imageURL, name, price, quantityAvailable) {
    dispatch(
      CartActions.addToCartRequest(
        sku,
        imageURL,
        name,
        price,
        quantityAvailable
      )
    );
  }

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.sku}>
          <img src={product.imageURL} alt={product.name} />
          <strong>{product.name}</strong>
          <strong>SKU: {product.sku}</strong>
          <strong>Categoria: {product.category}</strong>
          <strong>Fabricante: {product.maker}</strong>
          <strong>
            Quantidade disponível: {product.quantityAvailable}{' '}
            {product.quantityAvailable < 10 ? (
              <span className="qtd"> (últimas unidades)</span>
            ) : (
              ''
            )}
          </strong>
          <span>Preço: {product.priceFormatted}</span>

          <button
            type="button"
            onClick={() =>
              handleAddProduct(
                product.sku,
                product.imageURL,
                product.name,
                product.price,
                product.quantityAvailable
              )
            }
          >
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />{' '}
              {amount[product.sku] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
