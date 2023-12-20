import styles from "./main.module.css";
import { EventBanner } from "../components/eventBanner/eventBanner";
import { useEffect } from "react";
import { getProducts } from "../service/fetcher";
import { Link } from "react-router-dom";
import style from "./product.module.css";

const Home = ({products, setProducts, convertPrice}) => {
  useEffect(()=>{
    getProducts().then((data) => {
      setProducts(data.data.products);
    });
  }, [setProducts]);
  const sortProduct = (type) => {
    const newProduct = [...products];
    if(type === "recent"){
      newProduct.sort((a,b) => a.id-b.id);
      setProducts(newProduct);
    }else if(type === "row"){
      newProduct.sort((a,b) => a.price-b.price);
      setProducts(newProduct);
    }else if(type === "high"){
      newProduct.sort((a,b) => b.price-a.price);
      setProducts(newProduct);
    }
  }
  return (
    <>
      <EventBanner />
      <div className={styles.filter}>
        <p onClick={() => sortProduct("recent")}>최신순</p>
        <p onClick={() => sortProduct("row")}>낮은 가격</p>
        <p onClick={() => sortProduct("high")}>높은 가격</p>
      </div>
      <main className={styles.flex_wrap}>
        {products.map((product) =>{
            return <div className={style.product}>
            <Link to={`/product/${product.id}`}>
              <div className={style.product_image}>
                <img src={product.image} alt="product" />
              </div>
            </Link>
            <div className={style.store}>
              <span>{product.provider}</span>
            </div>
      
            <div className={style.product_name}>
              <span>{product.name}</span>
            </div>
      
            <div className={style.product_price}>
              <span className={style.price}>{convertPrice(product.price)}</span>
              <span className={style.unit}>원</span>
            </div>
          </div>
        })}
      </main>
    </>
  );
};

export default Home;
