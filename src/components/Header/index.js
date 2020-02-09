import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';

import nexfar from '../../assets/images/nexfar.png';

export default function Header() {
  const cartSize = useSelector(state => state.cart.length);

  return (
    <Container>
      <Link to="/">
        <img src={nexfar} alt="Nexfar" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
}
