import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { pd } from "../store/Product-handler";
import { useParams } from "react-router";
import ProductCard from "../components/product/ProductCard";
import { UiSlice } from "../store/ui-slice";
import Option from "../components/common/Option";
import Pagination from "../components/common/Pagination";

const ProductList = () => {
  const [FilteredList, setFilteredList] = useState([]);
  const [ProductAvail, setProductAvail] = useState({
    status: true,
    msg: "Searching product",
  });
  const [FilteredProducts, setFilteredProducts] = useState({
    state: false,
    data: [],
  });
  // const [Products, setProducts] = useState([]);
  const { search } = useParams();
  const dispatch = useDispatch();
  const Product = useSelector((state) => state.product.SearchedProducts);
  const searchitem = useSelector((state) => state.ui.search);
  useEffect(() => {
    dispatch(UiSlice.updatesearchcontent(search));
  }, [dispatch, search]);
  useEffect(() => {
    if (Product.data.length <= 0) {
      setProductAvail({
        status: true,
        msg: "product is not available",
      });
    } else {
      setProductAvail({
        status: false,
        msg: "Searching Products",
      });
    }
  }, [Product]);
  useEffect(() => {
    setFilteredProducts({
      state: false,
      data: [],
    });
  }, [searchitem]);
  function updateOrPushJsonInArray(array, json) {
    if (array.length > 0) {
      let notExist = true;

      for (let i = 0; i < array.length; i++) {
        if (array[i].hasOwnProperty(json[0])) {
          notExist = false;
          array[i][json[0]] = json[1];
          break;
        }
      }

      if (notExist) {
        array.push({ [json[0]]: json[1] });
      }
    } else {
      array.push({ [json[0]]: json[1] });
    }

    return array;
  }

  const updatedlisthandler = (set) => {
    setFilteredList(updateOrPushJsonInArray(FilteredList, set));
    OnApplyHandler();
  };
  const OnApplyHandler = () => {
    const applyFilters = (products, filters) => {
      return products
        .filter((product) => {
          const brandMatch =
            !filters.brand || filters.brand.includes(product.brand);
          const categoryMatch =
            !filters.category || filters.category.includes(product.category);
          const priceMatch =
            filters.price === "LowToHigh" || filters.price === "HighToLow";
          // console.log(brandMatch,categoryMatch)
          return brandMatch && categoryMatch && priceMatch;
        })
        .sort((a, b) => {
          if (filters.price === "LowToHigh") {
            return a.price - b.price;
          }
          if (filters.price === "HighToLow") {
            return b.price - a.price;
          }
          return 0;
        });
    };
    const filterProducts = (products, filteredList) => {
      let filteredProducts = [...products];
      // let chance = 0;
      filteredList.forEach((filter) => {
        for (const key in filter) {
          // console.log(key);
          console.log(filter[key]);
          if (Array.isArray(filter[key])) {
            filteredProducts = filteredProducts.filter((product) =>
              filter[key].includes(product[key])
            );
          } else if (key === "price") {
            if (filter[key] === "LowToHigh") {
              filteredProducts = filteredProducts.sort(
                (a, b) => a.price - b.price
              );
            } else if (filter[key] === "HighToLow") {
              filteredProducts = filteredProducts.sort(
                (a, b) => b.price - a.price
              );
            }
            // else if(((key === "brand") && filter[key].length === 0) && ((key === "category") && filter[key].length === 0) ){
            //   chance++;
            // }
          }
          // if(chance > 1){
          //   filteredProducts = [...Product.data]
          // }
        }
      });

      return filteredProducts;
    };

    let filteredProducts = [...Product.data];
    let filterp = filterProducts(filteredProducts, FilteredList);

    if (filterp.length > 0) {
      setFilteredProducts({ status: true, data: filterp });
    } else {
      // setFilteredProducts({ status: true, data: filteredProducts });
    }
    // FilteredList.map((item)=>{
    //   if (item.price) {
    //     if (item.price === "LowToHigh") {

    //       filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    //     } else if (item.price === "HighToLow") {
    //       filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    //     } else {
    //       // Handle invalid price value
    //     }
    //   }

    // if (item.brand) {
    //   const filterByBrand = (products, brand) => {
    //     return products.filter(product => product.brand === brand);
    //   };
    //   // console.log(item.brand)
    //  if(item.brand.length > 0 ){
    //   let brand = []
    //   item.brand.map((item)=>{

    //     brand  = [...brand,filterByBrand(filteredProducts,item)[0]]

    //   })
    //   filteredProducts = brand
    //  }else{
    //   filteredProducts  = [...Product.data];
    //  }
    // }
    // if (item.category) {
    //   const filterByBrand = (products, brand) => {
    //     return products.filter(product => product.brand === brand);
    //   };
    //   // console.log(item.brand)
    //  if(item.category.length > 0 ){
    //   let category = []
    //   item.brand.map((item)=>{

    //     category  = [...category,filterByBrand(filteredProducts,item)[0]]

    //   })
    //   filteredProducts = category
    //  }else{
    //   filteredProducts  = [...Product.data];
    //  }
    // }

    // console.table(filteredProducts)
    // setFilteredProducts({status:true,data:filteredProducts});
    // })
  };

  return (
    <>
      <Pagination pagename={"Product List"} />
      {!ProductAvail.status && (
        <div className="flex items-center bg-gray-200 py-2 px-4">
          <span className="mr-2">Sort By:</span>
          <Option
            cataname="price"
            options={Product.data}
            updatedlist={updatedlisthandler}
          />
          <Option
            cataname="brand"
            options={Product.data}
            updatedlist={updatedlisthandler}
          />
          <Option
            cataname="category"
            options={Product.data}
            updatedlist={updatedlisthandler}
          />
          {/* <button
            onClick={OnApplyHandler}
            className="bg-blue-500 ml-4 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            Apply
          </button> */}
        </div>
      )}
      <div>
        {ProductAvail.status && <LoadingSpinner message={ProductAvail.msg} />}
      </div>
      {Product.status && (
        <div className="lg:m-8 grid grid-cols-1 gap-4 m-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {!FilteredProducts.status &&
            Product.data.map((item) => {
              return (
                <div key={item.id}>
                  <ProductCard product={item} addtocart="true" />
                </div>
              );
            })}
          {FilteredProducts.status &&
            FilteredProducts.data.map((item) => {
              return (
                <div key={item.id}>
                  <ProductCard product={item} addtocart="true" />
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default ProductList;
