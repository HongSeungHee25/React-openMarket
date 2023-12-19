import { useState } from "react";
import styles from "./cart.module.css";
import { CartHeader } from "./cartHeader";
import { CartList } from "./cartList";
import { TotalCart } from "./totalCart";

export const Cart = ({ cart,setCart,convertPrice,checkLists, setCheckLists }) => {
  const [total, setTotal] = useState(0);

  const handleQuantity = (type, id, quantity) => {
    const found = cart.filter((el) => el.id === id)[0];
    const idx = cart.indexOf(found);
      const cartItem = {
        id: found.id,
        image: found.image,
        name: found.name,
        price: found.price,
        provider: found.provider,
        quantity: quantity,
      };
    if(type === "plus"){
      setCart([...cart.slice(0,idx), cartItem, ...cart.slice(idx + 1)]);
    }else{
      if(quantity === 0) return;
      setCart([...cart.slice(0,idx), cartItem, ...cart.slice(idx + 1)]);
    }
  }
  const handleRemove = (id) => {
    setCart(cart.filter((el) => el.id !== id));
    setCheckLists(checkLists.filter((check) => check !== id));
  }
  const handleCheckList = (checked, id) => {
    if(checked){
      setCheckLists([...checkLists, id])
    }else{
      setCheckLists(checkLists.filter((check)=> check !== id));
    }
  };
  const handleAllCheck = (checked) => {
    if(checked){
      const checkItems = [];
      cart.map((cart) => checkItems.push(cart.id));
      setCheckLists(checkItems);
    }else{
      setCheckLists([]);
    }
  };
  const isAllChecked = cart.length === checkLists.length && checkLists.length !== 0;

  const found = checkLists.map((checkList) => 
    cart.filter((el) => el.id === checkList)
  );

  return (
    <>
      <header className={styles.header}>
        <h1>장바구니</h1>
      </header>
      <CartHeader handleAllCheck={handleAllCheck} isAllChecked={isAllChecked} />
      {cart.length === 0 ? (
        <div className={styles.not}>
          <h2>장바구니에 담긴 상품이 없습니다.</h2>
          <p>원하는 상품을 장바구니에 담아보세요!</p>
        </div>
        ) : (
        cart.map((cart) => {
          return <CartList 
          key={`key-${cart.id}`} 
          cart={cart} 
          setCart={setCart} 
          convertPrice={convertPrice} 
          handleQuantity={handleQuantity} 
          handleRemove={handleRemove} 
          handleCheckList={handleCheckList} 
          checkLists={checkLists}
          />
        })
      )}
      {cart.length === 0 ? "" : <TotalCart total={total} setTotal={setTotal} cart={cart} found={found} convertPrice={convertPrice} />}
    </>
  );
};
