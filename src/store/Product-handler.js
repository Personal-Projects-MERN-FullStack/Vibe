import { createSlice } from "@reduxjs/toolkit";

const products = [
  {
    "id": "123456789",
    "category": "Electronics",
    "name": "Smart TV",
    "price": 799,
    "brand": "Samsung",
    "description": "Experience stunning visuals with this high-definition smart TV.",
    "features": [
      "55-inch display",
      "4K Ultra HD resolution",
      "Smart functionality",
      "Built-in Wi-Fi",
      "Multiple HDMI and USB ports"
    ],
    "reviews": [
      {
        "username": "JohnDoe",
        "rating": 4.5,
        "comment": "Great TV, excellent picture quality!"
      },
      {
        "username": "JaneSmith",
        "rating": 5,
        "comment": "The smart features are very convenient."
      }
    ],
    "availability": {
      "inStock": false,
      "quantity": 10,
      "sellerId": "user@client.com"
    },
    "image": "https://example.com/smart_tv.jpg"
  },
  {
    "id": "123456790",
    "category": "Clothing",
    "name": "T-Shirt",
    "price": 19,
    "brand": "Nike",
    "description": "Comfortable and stylish t-shirt for everyday wear.",
    "features": [
      "100% cotton",
      "Available in various sizes and colors"
    ],
    "reviews": [
      {
        "username": "JohnDoe",
        "rating": 2,
        "comment": "Great TV, excellent picture quality!"
      },
      {
        "username": "JaneSmith",
        "rating": 5,
        "comment": "The smart features are very convenient."
      }
    ],
    "availability": {
      "inStock": false,
      "quantity": 50,
      "sellerId": "user@client.com"
    },
    "image": "https://example.com/tshirt.jpg"
  },
  {
    "id": "123456791",
    "category": "Home Decor",
    "name": "Table Lamp",
    "price": 49,
    "brand": "ModernDesign",
    "description": "Illuminate your living space with this stylish table lamp.",
    "features": [
      "Contemporary design",
      "Adjustable brightness",
      "Energy-efficient LED bulb"
    ],
    "reviews": [],
    "availability": {
      "inStock": true,
      "quantity": 20,
      "sellerId": "user@client.com"
    },
    "image": "https://example.com/table_lamp.jpg"
  },
  {
    "id": "123456792",
    "category": "Books",
    "name": "Science Fiction Novel",
    "price": 14,
    "brand": "SciFiBooks",
    "description": "Embark on an exciting journey with this gripping science fiction novel.",
    "features": [
      "Engaging storyline",
      "Thrilling plot twists",
      "Well-developed characters"
    ],
    "reviews": [],
    "availability": {
      "inStock": true,
      "quantity": 30,
      "sellerId": "user@client.com"
    },
    "image": "https://example.com/science_fiction_novel.jpg"
  },
  {
    "id": "123456793",
    "category": "Beauty",
    "name": "Facial Cleanser",
    "price": 9,
    "brand": "GlowBeauty",
    "description": "Cleanse and refresh your skin with this gentle facial cleanser.",
    "features": [
      "Suitable for all skin types",
      "Removes dirt and impurities",
      "Leaves skin feeling soft and smooth"
    ],
    "reviews": [],
    "availability": {
      "inStock": true,
      "quantity": 40,
      "sellerId": "user@client.com"
    },
    "image": "https://example.com/facial_cleanser.jpg"
  },
  {
    "id": "123456794",
    "category": "Sports",
    "name": "Basketball",
    "price": 24,
    "brand": "SportZone",
    "description": "Enjoy a game of basketball with this durable and high-quality ball.",
    "features": [
      "Official size and weight",
      "Suitable for indoor and outdoor use",
      "Enhanced grip for better control"
    ],
    "reviews": [],
    "availability": {
      "inStock": true,
      "quantity": 15,
      "sellerId": "user@client.com"
    },
    "image": "https://example.com/basketball.jpg"
  },
  {
    "id": "123456795",
    "category": "Toys",
    "name": "Remote Control Car",
    "price": 39,
    "brand": "ToyTech",
    "description": "Have fun racing with this remote control car.",
    "features": [
      "Fast and agile",
      "Rechargeable battery",
      "Suitable for indoor and outdoor use"
    ],
    "reviews": [],
    "availability": {
      "inStock": true,
      "quantity": 25,
      "sellerId": "user@client.com"
    },
    "image": "https://example.com/remote_control_car.jpg"
  },
  {
    "id": "123456796",
    "category": "Jewelry",
    "name": "Diamond Necklace",
    "price": 999,
    "brand": "LuxuryJewels",
    "description": "Adorn yourself with elegance with this stunning diamond necklace.",
    "features": [
      "Genuine diamonds",
      "18k white gold chain",
      "Classic and timeless design"
    ],
    "reviews": [],
    "availability": {
      "inStock": true,
      "quantity": 5,
      "sellerId": "user@client.com"
    },
    "image": "https://example.com/diamond_necklace.jpg"
  },
  {
    "id": "123456797",
    "category": "Furniture",
    "name": "Sofa",
    "price": 599,
    "brand": "ComfortLiving",
    "description": "Relax and unwind on this comfortable sofa.",
    "features": [
      "Plush cushions",
      "Durable upholstery",
      "Spacious seating for multiple people"
    ],
    "reviews": [],
    "availability": {
      "inStock": true,
      "quantity": 8,
      "sellerId": "user@client.com"
    },
    "image": "https://example.com/sofa.jpg"
  },
  {
    "id": "123456798",
    "category": "Grocery",
    "name": "Organic Apples",
    "price": 2,
    "brand": "HealthyEats",
    "description": "Enjoy the freshness and flavor of organic apples.",
    "features": [
      "Certified organic",
      "Locally sourced",
      "Rich in vitamins and antioxidants"
    ],
    "reviews": [],
    "availability": {
      "inStock": true,
      "quantity": 100,
      "sellerId": "user@client.com"
    },
    "image": "https://example.com/organic_apples.jpg"
  }
]


let initialState = {
  SearchedProducts: { status: null, msg: "", data: [] },
  products:[],
  product: {},
  cart: [],
  orders:[],
  address:[]
};
const Producthandler = createSlice({
  name: "product",
  initialState,
  reducers: {
    UpdateCart(state, action,payload) {
      state.cart = [...action.payload]
    },
    GetProduct(state, action) {
      state.product = state.products.filter(
        (jsonObj) => jsonObj.id === action.payload
      );
    },
    AddToCart(state, action, payload) {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.cart.push({ ...action.payload, qty: 1 });
      }
    },
    RemoveFromCart(state, action) {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.cart[existingItemIndex];
        existingItem.qty -= 1;

        if (existingItem.qty === 0) {
          state.cart.splice(existingItemIndex, 1);
        }
      } else {
        state.cart.push({ ...action.payload, qty: 1 });
      }
    },
    ClearCart(state, action, payload) {
      state.cart = [];
    },
    SearchedProducts(state, action, payload) {
      function searchJson(json, searchText) {
        const results = [];
        json.forEach((item) => {
          for (let key in item) {
            if (typeof item[key] === "string") {
              if (item[key].toLowerCase().includes(searchText.toLowerCase())) {
                const existingItem = results.find(
                  (items) => items.id === item.id
                );
                if (!existingItem) {
                  results.push(item);
                }
              }
            }
          }
        });

        return results;
      }

      state.SearchedProducts = {
        status: true,
        msg: `Show Results (${
          searchJson(state.products, action.payload).length
        } items found)`,
        data: searchJson(state.products, action.payload),
      };
    },
    setorders(state,action,payload){
      state.orders = action.payload
    },
    clearorders(state,action,paylod){
      state.orders = []
    },
    updateaddress(state,action,paylod){
      state.address=[...action.payload]
    },
    ClearAddress(state,action,payload){
      state.address =[]
    },
    setproducts(state,action,payload){
      if((typeof action.payload) === "object"){
        state.products=action.payload
      }
    }
  },
});





export default Producthandler.reducer;

export const pd = Producthandler.actions;
