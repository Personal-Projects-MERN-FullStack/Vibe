import React, { useEffect, useState } from "react";

const Option = ({ cataname, options, updatedlist }) => {
  const [option, setOption] = useState(false);
  const priceoption =["LowToHigh","HighToLow"];
  const [SelectedItems, setSelectedItems] = useState([])
  const onClickHandler = () => {
    setOption(!option);
    
  };
  function toggleItemInArray(array, item) {
    const index = array.indexOf(item);
    if (index === -1) {
      // Item doesn't exist in the array, so push it
      array.push(item);
    } else {
      // Item already exists in the array, so remove it
      array.splice(index, 1);
    }
    return array;
  }
  
  const onItemCheckHandler = (event) => {
    if(cataname === "price"){
      // console.log(cataname,event.target.value)
      updatedlist([cataname,event.target.value])
    }else{
      updatedlist([cataname,toggleItemInArray(SelectedItems, event.target.value)])}
  };

  


  return (
    <div>
      <div className="relative mr-2">
        <button
          onClick={onClickHandler}
          className="bg-white border border-gray-300 rounded px-2 py-1"
        >
          {cataname}
        </button>
        {option && cataname !== "price" && (
          <div className="absolute bg-white border border-gray-300 mt-2 py-1 px-2 rounded">
            {options.map((item) => (
              <label className="inline-flex items-center" key={item[cataname]}>
                <input
                  type="checkbox"
                  className="form-checkbox"
                  value={item[cataname]}
                  onChange={onItemCheckHandler}
                />
                {item[cataname]}
              </label>
            ))}
          </div>
        )}
        {option && cataname === "price" && (
          <div className="absolute bg-white border border-gray-300 mt-2 py-1 px-2 rounded">
            {priceoption.map((item) => (
              <label className="inline-flex items-center" key={item[cataname]}>
                <input
                  type="radio"
                  className="form-checkbox"
                  value={item}
                  name="price"
                  onChange={onItemCheckHandler}
                />
                {item}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Option;





