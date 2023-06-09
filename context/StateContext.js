import React, {createContext, useContext, useState,useEffect} from 'react';
import {toast} from 'react-hot-toast';

const Context = createContext();

export const StateContext =  ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity, size) => {
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)
        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        if (checkProductInCart){

            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            product.size = size
            setCartItems([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id)
        setTotalPrice(prev => prev - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prev => prev - foundProduct.quantity)
        setCartItems(newCartItems)
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((product) => product._id === id);
      
        if (value === 'inc') {
          const updatedItem = { ...foundProduct, quantity: foundProduct.quantity + 1 };
          const updatedCartItems = [
            ...cartItems.slice(0, index),
            updatedItem,
            ...cartItems.slice(index + 1)
          ];
      
          setCartItems(updatedCartItems);
          setTotalPrice((prev) => prev + foundProduct.price);
          setTotalQuantities((prev) => prev + 1);
        } else if (value === 'dec') {
          if (foundProduct.quantity > 1) {
            const updatedItem = { ...foundProduct, quantity: foundProduct.quantity - 1 };
            const updatedCartItems = [
              ...cartItems.slice(0, index),
              updatedItem,
              ...cartItems.slice(index + 1)
            ];
      
            setCartItems(updatedCartItems);
            setTotalPrice((prev) => prev - foundProduct.price);
            setTotalQuantities((prev) => prev - 1);
          }
        }
      };
      

    const incrQty = () => {
        setQty((prevQty) => prevQty + 1)
    }

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1
            return prevQty - 1
        })
    }

    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incrQty,
                decQty,
                onAdd,
                setShowCart,
                toggleCartItemQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities, 
            }}
        >
            {children}
        </Context.Provider>
    )
}


export const useStateContext = () => useContext(Context);