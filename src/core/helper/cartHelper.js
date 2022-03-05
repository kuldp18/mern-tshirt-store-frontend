export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push({
      ...item,
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    next();
  }
};

export const loadCartFromLocalStorage = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
};

export const removeItemFromCart = (productId) => {
  let cart = [];
  let newCart;
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    newCart = cart.filter((product) => product._id !== productId);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

  return newCart;
};

export const emptyTheCart = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem('cart');
    let cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    next();
  }
};
