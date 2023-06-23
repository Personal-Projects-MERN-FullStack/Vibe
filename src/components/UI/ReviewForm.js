import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UiSlice } from "../../store/ui-slice";
import { CustomerReviewChecker } from "../../store/Actions/proudct-action";

const ReviewForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [previewImage, setPreviewImage] = useState(null); // Added state for preview image
  const authed = useSelector((state) => state.auth.auth);
  const product = useSelector((state) => state.product.product);
  const apiurl = process.env.REACT_APP_API_KEY;
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.product.orders);
  const dispatch = useDispatch();
  const imageInputRef = useRef(null); // Reference to the input element

  const handleOpenForm = () => {
    if (authed) {
      setIsOpen(true);
    } else {
      dispatch(
        UiSlice.shownotificationbar({
          active: true,
          msg: `You are Not Logged In `,
          path: "/",
          pathname: "Login To Enjoy Shopping",
        })
      );
    }
  };

  const handleCloseForm = () => {
    setIsOpen(false);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(URL.createObjectURL(file))
    setPreviewImage(URL.createObjectURL(file)); // Set preview image using object URL
  
    convertImageToBase64(file)
      .then((base64Image) => {
        // Do something with the base64Image
        setBase64Image(base64Image)
      })
      .catch((error) => {
        console.error(error);
      });
  };
  


  
  const convertImageToBase64 = (imageFile, maxSizeKB = 50) => {
    return new Promise((resolve, reject) => {
      if (!imageFile) {
        resolve("");
        return;
      }
  
      const maxSizeBytes = maxSizeKB * 1024;
  
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
  
        if (img.size > maxSizeBytes) {
          const scaleFactor = Math.sqrt(img.size / maxSizeBytes);
          width = Math.floor(width / scaleFactor);
          height = Math.floor(height / scaleFactor);
        }
  
        canvas.width = width;
        canvas.height = height;
  
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
  
        canvas.toBlob(
          (blob) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.onerror = () => {
              reject(new Error("Error occurred while reading the file."));
            };
            reader.readAsDataURL(blob);
          },
          "image/jpeg",
          0.5 // Adjust the quality factor to compress the image further (e.g., 0.5 for 50% quality)
        );
      };
  
      img.onerror = () => {
        reject(new Error("Error occurred while loading the image."));
      };
  
      img.src = URL.createObjectURL(imageFile);
    });
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    // const value =  await handleImageUpload();
    // console.log(base64Image)

     

      const review = dispatch(
        CustomerReviewChecker(user, orders, product[0])
      );

      if (review) {
        const response = await fetch(
          `${apiurl}/product/products/${product[0].id}/reviews`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: user.email,
              rating,
              comment: description,
              image: base64Image,
            }),
          }
        );

        console.log(base64Image);

        if (!response.ok) {
          console.log("Not Succeed to Add Review");
          return;
        }

        setIsOpen(false);
        setRating("");
        setDescription("");
        setImage(null);
        setPreviewImage(null); // Reset preview image

        dispatch(
          UiSlice.shownotificationbar({
            active: true,
            msg: "Review Added",
            path: `/product/${product[0].id}`,
            pathname: "see your review",
          })
        );
      }
    } catch (error) {
      console.error("Error occurred while updating cart:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg mx-auto">
      {isOpen ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-gray-700 font-medium">
              Rating:
            </label>
            <select
              id="rating"
              name="rating"
              value={rating}
              onChange={handleRatingChange}
              className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              rows="4"
              required
              className="border border-gray-300 rounded-lg px-4 py-2 mt-1 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 font-medium">
              Image:
            </label>
            <input
              ref={imageInputRef}
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {previewImage && ( // Show preview image if available
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 rounded-lg max-h-48"
              />
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCloseForm}
              className="bg-red-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={handleOpenForm}
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Write a Review
        </button>
      )}
    </div>
  );
};

export default ReviewForm;
