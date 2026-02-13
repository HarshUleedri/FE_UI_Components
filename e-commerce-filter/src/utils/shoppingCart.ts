interface productType {
  id: number;
  title: string;
  description: string;
  availabilityStatus: string;
  price: number;
  rating: number;
  tags: string[];
  images: string[];
  quantity: number;
}

export type shoppingCartState = { cart: productType[] };
export type shoppingCartAction =
  | {
      type: "ADD_PRODUCT";
      payload: {
        id: number;
        title: string;
        description: string;
        availabilityStatus: string;
        price: number;
        rating: number;
        tags: string[];
        images: string[];
      };
    }
  | {
      type: "REMOVE_PRODUCT";
      payload: { id: number };
    }
  | {
      type: "QUANTITY_PRODUCT";
      payload: { id: number; quantity: number };
    };

export const shoppingCartReducer = (
  state: shoppingCartState,
  action: shoppingCartAction,
) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return { cart: [...state.cart, { ...action.payload, quantity: 1 }] };
    case "REMOVE_PRODUCT":
      return {
        cart: state.cart.filter((prod) => prod.id !== action.payload.id),
      };
    case "QUANTITY_PRODUCT":
      return {
        cart: state.cart.map((prod) =>
          prod.id === action.payload.id
            ? { ...prod, quantity: action.payload.quantity }
            : prod,
        ),
      };

    default:
      return state;
  }
};
