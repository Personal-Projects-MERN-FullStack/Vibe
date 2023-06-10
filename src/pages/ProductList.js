import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { pd } from "../store/Product-handler";
import { useParams } from "react-router";
import ProductCard from "../components/product/ProductCard";

const ProductList = () => {
  const [ProductAvail, setProductAvail] = useState({
    status: true,
    msg: "Searching product",
  });
  const { search } = useParams();

  const Product = useSelector((state) => state.product.SearchedProducts);

  

  return (<>
    <div>{!Product.status && <LoadingSpinner message={ProductAvail.msg} />}</div>
    {Product.status &&  <div class="lg:m-8 grid grid-cols-1 gap-4 m-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Product.data.map((item)=>{
        return <div>
          <ProductCard product={item} addtocart="true"/>
        </div>
      })}
    </div> }

    </>
  );
};

export default ProductList;
