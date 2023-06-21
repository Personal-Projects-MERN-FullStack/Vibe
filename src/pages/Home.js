import React, { useEffect } from "react";
import ProductBar from "../components/product/ProductBar";
import { useSelector } from "react-redux";
import ProductCard from "../components/product/ProductCard";
// import Sidecart from "../components/UI/Sidecart";
import "../index";
const Home = () => {
  const products = useSelector((state) => state.product.products);

  
  return (
    <div>
      <ProductBar />
      <div className="lg:m-8 grid grid-cols-1 gap-4 m-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.length> 0 && products.map((pro) => {
          return <ProductCard product={pro} key={pro.id} />;
        })}
      

      </div>
      {products.length === 0 && 
           <div className="h-screen w-screen flex justify-center "> 
           <div class="flex  justify-center items-center lg:items-start space-x-2">
	<div class="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
	<div class="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
	<div class="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
</div>
           </div>
          }
    </div>
  );
};

export default Home;
