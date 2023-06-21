import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UiSlice } from "../../store/ui-slice";
import axios from "axios";
import { pd } from "../../store/Product-handler";
import { UploadAddress } from "../../store/Actions/proudct-action";

const Addresses = ({ setselectedAdress }) => {
  const [state, setState] = useState("");
  const [AdressCardShow, setAdressCardShow] = useState(false);
  const Addresses = useSelector((state) => state.product.address);
  const user = useSelector((state) => state.auth.user);
  // console.log(Addresses);
  // const [Address, setAddress] = useState([
  //     {
  //       id: 1,
  //       fullname: "vaibhav Mohanalkar",
  //       Phone_Number: 9284378620,
  //       address1: "yamuna socity , old ausa road , latur, 413512 ",
  //       landmark: "Next lane of sai baba mandir",
  //       pincode: "413512",
  //       block: "Gangakhed",
  //       city: "latur",
  //       state: "Maharastra",
  //     },
  //   ]);
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [block, setblock] = useState("");
  const [citygotted, setcitygotted] = useState(true);
  const dispatch = useDispatch();
  // const handlePincodeChange = (event) => {
  //     setPincode(event.target.value);
  //     handleLookup();
  //     if (event.target.value.length > 5) {
  //     }
  //   };
  const OnAddresAddHandler = (e) => {
    e.preventDefault();
    handleLookup(e.target.zip.value).then(() => {
      if (citygotted) {
        // console.log(block, city, state);
        const newAdress = {
          id: Math.floor(Math.random() * (5000 - 1000) + 1000),
          fullname: e.target.name.value,
          Phone_Number: e.target.phone.value,
          address1: e.target.address.value,
          landmark: e.target.landmark.value,
          pincode: e.target.zip.value,
          block,
          city,
          state,
        };
        dispatch(UploadAddress(user, [...Addresses, newAdress]));
        dispatch(pd.updateaddress([...Addresses, newAdress]));
        document.getElementById("myForm").reset();

        setAdressCardShow(false);
        dispatch(
          UiSlice.shownotificationbar({
            active: true,
            msg: `Adress Added Succefully`,
            path: "Select One Adress to CheckOut",
            pathname: "",
          })
        );
      } else {
        console.log("tatti");
      }
    });
  };
  const handleLookup = async (pin) => {
    try {
      
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pin}`
      );
      console.log(response.data[0].PostOffice[0]);
      const data = response.data[0];
      if (data.Status === "Success" && data.PostOffice.length > 0) {
        const { District, State, Block } = data.PostOffice[0];

        setCity(District);
        setState(State);
        setblock(Block);
        setcitygotted(true);
        return;
      } else {
        setcitygotted(false);
        // setTimeout(() => {
        //   setcitygotted(true)
        // }, 4000);
        setblock("");
        setCity("");
        setState("");
        return;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-lg font-bold mb-4">Shipping Address</h2>

      <div class="mb-6">
        <h3 class="text-lg font-bold mb-2">Saved Addresses</h3>
        {Addresses.length === 0 && (
          <p className="text-red-500 ">You have no saved addresses</p>
        )}
        <ul class="space-y-2">
          {Addresses.length > 0 &&
            Addresses.map((add) => {
              return (
                <li key={add.id}>
                  <div class="flex items-center">
                    <input
                      type="radio"
                      id="address1"
                      name="address"
                      class="form-radio mr-2"
                      onChange={() => {
                        setselectedAdress(add);
                      }}
                    />
                    <label for="address1" class="font-bold">
                      {add.name}
                    </label>
                    <span class="text-gray-500 ml-2">{add.address1}</span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>

      <hr class="border-t border-gray-300 my-4" />
      {!AdressCardShow && (
        <button
          onClick={() => {
            setAdressCardShow(true);
          }}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Address
        </button>
      )}

      {AdressCardShow && (
        <div>
          <h3 class="text-lg font-bold mb-2">Add New Address</h3>

          <form onSubmit={OnAddresAddHandler} id="myForm">
            <div className="flex md:space-x-8 space-x-1">
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="name"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="form-input w-full"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="name"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  class="form-input w-full"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="address"
              >
                Address Line 1
              </label>
              <input
                type="text"
                id="address"
                name="address"
                class="form-input w-full"
                placeholder="123 Main St"
                required
              />
            </div>

            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="landmark"
              >
                Landmark
              </label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                class="form-input w-full"
                placeholder="Entery Nearby Landmark."
                required
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="zip"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  class="form-input w-full"
                  placeholder="12345"
                  required
                />
              </div>
              {!citygotted && <p className="text-red-500">Wrong pin code</p>}
            </div>

            <div class="mt-6">
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add Address
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Addresses;
