import { useSelector } from "react-redux";
import { pd } from "../Product-handler";
import { UiSlice } from "../ui-slice";

const apiurl = process.env.REACT_APP_API_KEY;
// const cart = useSelector((state) => state.product.cart);
//   const user = useSelector((state) => state.auth.user);
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

export const UploadCart = (user, cart) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${apiurl}/cart/addtocart/${user.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.email, items: cart }),
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

export const UpdateAderssesLocal = (user) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${apiurl}/address/getaddress/${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        alert("Not Succeed to Update Cart");
        return;
      }
      if (response.ok) {
        dispatch(pd.updateaddress(responseData.addresses));
        // console.log(responseData.addresses);
      }
    } catch (error) {
      console.error("Error occurred while updating cart:", error);
    }
  };
};

export const UploadAddress = (user, address) => {
  return async (dispatch) => {
    // console.log(user, address);
    try {
      const response = await fetch(`${apiurl}/address/getaddress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.email, items: address }),
      });

      if (!response.ok) {
        console.log("Not Succeed to Update address");
        return;
      }
      if (response.ok) {
        // console.log();
        const responseData = await response.json();
        // console.log(responseData,"upload")
        dispatch(
          UiSlice.shownotificationbar({
            active: true,
            msg: "Adress Updated",
            path: "/",
            pathname: "Enjoy Shopping",
          })
        );
      }
    } catch (error) {
      dispatch(pd.ClearAddress());
      console.error("Error occurred while updating Address:", error);
    }
  };
};

export const OrderProduct = (cart, user, subtotal, pstatus, address) => {
  return async (dispatch) => {
    // console.log(cart,user,subtotal, pstatus, address);
    try {
      const response = await fetch(`${apiurl}/order/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerid: user.email,
          orders: cart,
          totalbill: subtotal,
          paymentstatus: pstatus,
          Address: address,
        }),
      });

      if (!response.ok) {
        console.log("Not Succeed to Order Product");
        return false;
      }
      if (response.ok) {
        dispatch(
          UiSlice.shownotificationbar({
            active: true,
            msg: "Product Orderd",
            path: "/",
            pathname: "Enjoy Shopping",
          })
        );
        return true;
      }
    } catch (error) {
      // dispatch(pd.ClearCart());
      console.error("Error occurred while Ordering Product :", error);
    }
  };
};

export const GetOrders = (user) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${apiurl}/order/getorderbycustomerid/${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        alert("Not Succeed to Orders Cart");
        return;
      }
      if (response.ok) {
        // console.log(responseData);
        dispatch(pd.setorders(responseData));
      }
    } catch (error) {
      dispatch(pd.ClearCart());
      console.error("Error occurred while updating Orders:", error);
    }
  };
};
export const CustomerReviewChecker = (user, orders, product) => {
  return (dispatch) => {
    // console.log(typeof product);
    const cusotmerexist = orders.find((order) => {
      return order.customerid === user.email;
    }); 

    if (cusotmerexist) {
      if (product.reviews.length > 0) {
        const matchingReviews = product.reviews.filter(
          (review) => review.username === user.email
        );
        if (matchingReviews.length >= 3) {
          dispatch(
            UiSlice.shownotificationbar({
              active: true,
              msg: `You Can Only Add 3 Comments`,
              path: `Buy More Products`,
              pathname: `/product-search/${product.name}`,
            })
          );
        } else {
          return true
        }
      }else{
        return true
      }
    } else {
      dispatch(
        UiSlice.shownotificationbar({
          active: true,
          msg: `Buy This Product to Add Rviews`,
          path: `/product/${product.id}`,
          pathname: "buy here",
        })
      );
    }
  };
};
