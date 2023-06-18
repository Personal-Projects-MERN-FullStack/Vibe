import { auth } from "../auth-handler";

export const LoginHanlder = (Logindata) => {
  return async (dispatch) => {
    console.log(Logindata);
  };
};



export const SignupHandler = (SignUpdata) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:5000/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SignUpdata),
      });

      if (!response.ok) {
        console.log("error ")
        throw new Error("Request failed with status " + response.status);
      }

      const responseData = await response.json();
    //   console.log(responseData);
      
      dispatch(auth.Login(responseData))
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error as needed
    }
  };
};

