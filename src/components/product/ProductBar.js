import React from "react";
import "../common/Scrollbar.css";
const ProductBar = () => {
  const catagories = [
    {
      name: "Electronics",
      image: "https://source.unsplash.com/featured/?electronics",
    },
    {
      name: "Clothing",
      image: "https://source.unsplash.com/featured/?clothing",
    },
    {
      name: "Home Decor",
      image: "https://source.unsplash.com/featured/?home-decor",
    },
    {
      name: "Books",
      image: "https://source.unsplash.com/featured/?books",
    },
    {
      name: "Beauty",
      image: "https://source.unsplash.com/featured/?beauty",
    },
    {
      name: "Sports",
      image: "https://source.unsplash.com/featured/?sports",
    },
    {
      name: "Toys",
      image: "https://source.unsplash.com/featured/?toys",
    },
    {
      name: "Jewelry",
      image: "https://source.unsplash.com/featured/?jewelry",
    },
    {
      name: "Furniture",
      image: "https://source.unsplash.com/featured/?furniture",
    },
    {
      name: "Grocery",
      image: "https://source.unsplash.com/featured/?grocery",
    },
  ];

  // let names = []
  // catagories.map((item)=>{
  //   names.push(item.name)
  // })
  // console.log(names)

  return (
    <div className="flex flex-col bg-white m-auto p-auto">
      <div className="flex overflow-x-scroll py-10 hide-scroll-bar">
        <div className="flex flex-nowrap mx-auto ">
          {catagories.map((cata) => {
            return (
              <div className="inline-block px-3" key={cata.name}>
                <div className="w-28 h-28 hover:w-32 hover:h-32 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                  <img
                    className="w-full h-full object-cover"
                    src={cata.image}
                    alt="cata.image"
                  />
                </div>
                <div className="flex justify-center items-center ">
                  {cata.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductBar;
