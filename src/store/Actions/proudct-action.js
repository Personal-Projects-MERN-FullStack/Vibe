import { useSelector } from "react-redux";
import { pd } from "../Product-handler";
import { UiSlice } from "../ui-slice";

const apiurl = process.env.REACT_APP_API_KEY;

export const updateCartItems = (user) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(`${apiurl}/cart/getcart/${user.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (!response.ok) {
        alert("Not Succeed to Update Cart");
        return;
      }
      if (response.ok) {
        dispatch(pd.UpdateCart(responseData.items));
      }
    } catch (error) {
      dispatch(pd.ClearCart());
      console.error("Error occurred while updating cart:", error);
    }
  };
};

export const UploadCart = ( user, cart ) => {
    return async (dispatch) => {
        
      try {
       
        const response = await fetch(`http://localhost:5000/cart/addtocart/${user.email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({userId:user.email,items:cart}),
        });
        
        if (!response.ok) {
          console.log("Not Succeed to Update Cart");
          return;
        }
        if (response.ok) {
          dispatch(
            UiSlice.shownotificationbar({
              active: true,
              msg: "Cart Updated",
              path: "/",
              pathname: "Enjoy Shopping",
            })
          );
        }
      } catch (error) {
        // dispatch(pd.ClearCart());
        console.error("Error occurred while updating cart:", error);
      }
    };
  };
  
