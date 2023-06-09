import React from "react";
import ProductBar from "../components/product/ProductBar";
import { useSelector } from "react-redux";
import ProductCard from "../components/product/ProductCard";

const Home = () => {
  const products = useSelector(state=>state.product.products)
  return (
    <div>
      <ProductBar />
      <div class="lg:m-8 grid grid-cols-1 gap-4 m-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((pro)=>{
       return <ProductCard product={pro} key={pro.id}/>
      })}
</div>
    
    </div>
  );
};

export default Home;
