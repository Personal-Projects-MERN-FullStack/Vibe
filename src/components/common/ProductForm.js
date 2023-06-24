import React, { useState } from "react";
import Pagination from "./Pagination";

const ProductForm = () => {
  const [product, setProduct] = useState({
    id: "",
    category: "",
    name: "",
    price: 0,
    brand: "",
    description: "",
    features: [],
    reviews: [],
    availability: {
      inStock: false,
      quantity: 0,
      locations: [],
    },
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(product); // Replace with your desired logic to handle the form submission
  };

  return (
    <div className="max-w-md mx-auto">
      <Pagination pagename={"Product List"} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="id"
          value={product.id}
          onChange={handleChange}
          placeholder="ID"
          className="input"
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="input"
        />
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Name"
          className="input"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="input"
        />
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="input"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="input"
        ></textarea>
        <div>
          <label className="block font-medium">Features:</label>
          {product.features.map((feature, index) => (
            <input
              key={index}
              type="text"
              value={feature}
              onChange={(e) => {
                const newFeatures = [...product.features];
                newFeatures[index] = e.target.value;
                setProduct((prevState) => ({
                  ...prevState,
                  features: newFeatures,
                }));
              }}
              className="input"
            />
          ))}
          <button
            type="button"
            onClick={() => {
              setProduct((prevState) => ({
                ...prevState,
                features: [...prevState.features, ""],
              }));
            }}
            className="btn"
          >
            Add Feature
          </button>
        </div>
        <div>
          <label className="block font-medium">Reviews:</label>
          {product.reviews.map((review, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                value={review.username}
                onChange={(e) => {
                  const newReviews = [...product.reviews];
                  newReviews[index].username = e.target.value;
                  setProduct((prevState) => ({
                    ...prevState,
                    reviews: newReviews,
                  }));
                }}
                placeholder="Username"
                className="input"
              />
              <input
                type="number"
                value={review.rating}
                onChange={(e) => {
                  const newReviews = [...product.reviews];
                  newReviews[index].rating = Number(e.target.value);
                  setProduct((prevState) => ({
                    ...prevState,
                    reviews: newReviews,
                  }));
                }}
                placeholder="Rating"
                className="input"
              />
              <textarea
                value={review.comment}
                onChange={(e) => {
                  const newReviews = [...product.reviews];
                  newReviews[index].comment = e.target.value;
                  setProduct((prevState) => ({
                    ...prevState,
                    reviews: newReviews,
                  }));
                }}
                placeholder="Comment"
                className="input"
              ></textarea>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setProduct((prevState) => ({
                ...prevState,
                reviews: [
                  ...prevState.reviews,
                  { username: "", rating: 0, comment: "" },
                ],
              }));
            }}
            className="btn"
          >
            Add Review
          </button>
        </div>
        <div>
          <label className="block font-medium">Availability:</label>
          <input
            type="checkbox"
            name="inStock"
            checked={product.availability.inStock}
            onChange={() => {
              setProduct((prevState) => ({
                ...prevState,
                availability: {
                  ...prevState.availability,
                  inStock: !prevState.availability.inStock,
                },
              }));
            }}
            className="checkbox"
          />
          <label className="ml-2">In Stock</label>
          <input
            type="number"
            name="quantity"
            value={product.availability.quantity}
            onChange={(e) => {
              setProduct((prevState) => ({
                ...prevState,
                availability: {
                  ...prevState.availability,
                  quantity: Number(e.target.value),
                },
              }));
            }}
            placeholder="Quantity"
            className="input"
          />
          {product.availability.locations.map((location, index) => (
            <div key={index} className="space-y-2">
              <input
                type="text"
                value={location.storeName}
                onChange={(e) => {
                  const newLocations = [...product.availability.locations];
                  newLocations[index].storeName = e.target.value;
                  setProduct((prevState) => ({
                    ...prevState,
                    availability: {
                      ...prevState.availability,
                      locations: newLocations,
                    },
                  }));
                }}
                placeholder="Store Name"
                className="input"
              />
              <input
                type="text"
                value={location.address}
                onChange={(e) => {
                  const newLocations = [...product.availability.locations];
                  newLocations[index].address = e.target.value;
                  setProduct((prevState) => ({
                    ...prevState,
                    availability: {
                      ...prevState.availability,
                      locations: newLocations,
                    },
                  }));
                }}
                placeholder="Address"
                className="input"
              />
              <input
                type="number"
                value={location.stock}
                onChange={(e) => {
                  const newLocations = [...product.availability.locations];
                  newLocations[index].stock = Number(e.target.value);
                  setProduct((prevState) => ({
                    ...prevState,
                    availability: {
                      ...prevState.availability,
                      locations: newLocations,
                    },
                  }));
                }}
                placeholder="Stock"
                className="input"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setProduct((prevState) => ({
                ...prevState,
                availability: {
                  ...prevState.availability,
                  locations: [
                    ...prevState.availability.locations,
                    { storeName: "", address: "", stock: 0 },
                  ],
                },
              }));
            }}
            className="btn"
          >
            Add Location
          </button>
        </div>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="input"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
