import produce from 'immer';
import { toast } from 'react-toastify';

const options = {
  autoClose: 2000,
};

export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(state, draft => {
        const { product } = action;

        draft.push(product);
      });
    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.sku === action.sku);

        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
          toast.info('Produto removido do carrinho com sucesso!', options);
        }
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS': {
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.sku === action.sku);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
        }
      });
    }
    default:
      return state;
  }
}
