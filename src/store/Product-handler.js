import { createSlice } from "@reduxjs/toolkit";

const products = [
  {
    "id": "123456789",
    "category": "Electronics",
    "name": "Smart TV",
    "price": 799.99,
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
      "inStock": true,
      "quantity": 10,
      "locations": [
        {
          "storeName": "ElectroTech",
          "address": "123 Main St, City",
          "stock": 5
        },
        {
          "storeName": "TechWorld",
          "address": "456 Elm St, City",
          "stock": 5
        }
      ]
    },
    "image": "https://example.com/smart_tv.jpg"
  },
  {
    "id": "123456790",
    "category": "Clothing",
    "name": "T-Shirt",
    "price": 19.99,
    "brand": "Nike",
    "description": "Comfortable and stylish t-shirt for everyday wear.",
    "features": [
      "100% cotton",
      "Available in various sizes and colors"
    ],
    "reviews": [],
    "availability": {
      "inStock": true,
      "quantity": 50,
      "locations": [
        {
          "storeName": "FashionZone",
          "address": "789 Oak St, City",
          "stock": 25
        },
        {
          "storeName": "StyleHub",
          "address": "321 Pine St, City",
          "stock": 25
        }
      ]
    },
    "image": "https://example.com/tshirt.jpg"
  },
  {
    "id": "123456791",
    "category": "Home Decor",
    "name": "Table Lamp",
    "price": 49.99,
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
      "locations": [
        {
          "storeName": "HomeStyle",
          "address": "567 Maple St, City",
          "stock": 10
        },
        {
          "storeName": "DecorWorld",
          "address": "987 Birch St, City",
          "stock": 10
        }
      ]
    },
    "image": "https://example.com/table_lamp.jpg"
  },
  {
    "id": "123456792",
    "category": "Books",
    "name": "Science Fiction Novel",
    "price": 14.99,
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
      "locations": [
        {
          "storeName": "BookZone",
          "address": "345 Cedar St, City",
          "stock": 15
        },
        {
          "storeName": "ReadersParadise",
          "address": "543 Oak St, City",
          "stock": 15
        }
      ]
    },
    "image": "https://example.com/science_fiction_novel.jpg"
  },
  {
    "id": "123456793",
    "category": "Beauty",
    "name": "Facial Cleanser",
    "price": 9.99,
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
      "locations": [
        {
          "storeName": "BeautyZone",
          "address": "234 Pine St, City",
          "stock": 20
        },
        {
          "storeName": "SkinCareHub",
          "address": "876 Cedar St, City",
          "stock": 20
        }
      ]
    },
    "image": "https://example.com/facial_cleanser.jpg"
  },
  {
    "id": "123456794",
    "category": "Sports",
    "name": "Basketball",
    "price": 24.99,
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
      "locations": [
        {
          "storeName": "SportWorld",
          "address": "543 Elm St, City",
          "stock": 7
        },
        {
          "storeName": "GameZone",
          "address": "765 Oak St, City",
          "stock": 8
        }
      ]
    },
    "image": "https://example.com/basketball.jpg"
  },
  {
    "id": "123456795",
    "category": "Toys",
    "name": "Remote Control Car",
    "price": 39.99,
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
      "locations": [
        {
          "storeName": "ToyWorld",
          "address": "234 Oak St, City",
          "stock": 12
        },
        {
          "storeName": "PlayZone",
          "address": "876 Maple St, City",
          "stock": 13
        }
      ]
    },
    "image": "https://example.com/remote_control_car.jpg"
  },
  {
    "id": "123456796",
    "category": "Jewelry",
    "name": "Diamond Necklace",
    "price": 999.99,
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
      "locations": [
        {
          "storeName": "JewelryZone",
          "address": "543 Cedar St, City",
          "stock": 3
        },
        {
          "storeName": "LuxuryJewelry",
          "address": "765 Pine St, City",
          "stock": 2
        }
      ]
    },
    "image": "https://example.com/diamond_necklace.jpg"
  },
  {
    "id": "123456797",
    "category": "Furniture",
    "name": "Sofa",
    "price": 599.99,
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
      "locations": [
        {
          "storeName": "FurnitureZone",
          "address": "234 Elm St, City",
          "stock": 4
        },
        {
          "storeName": "ComfortLiving",
          "address": "876 Oak St, City",
          "stock": 4
        }
      ]
    },
    "image": "https://example.com/sofa.jpg"
  },
  {
    "id": "123456798",
    "category": "Grocery",
    "name": "Organic Apples",
    "price": 2.99,
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
      "locations": [
        {
          "storeName": "HealthyGrocery",
          "address": "543 Pine St, City",
          "stock": 50
        },
        {
          "storeName": "OrganicEats",
          "address": "765 Cedar St, City",
          "stock": 50
        }
      ]
    },
    "image": "https://example.com/organic_apples.jpg"
  }
]


let initialState = {
  products
};
const Producthandler = createSlice({
  name: "product",
  initialState,
  reducers: {
    Login(state, action, payload) {
      alert("someone is trying to login ");
    },
  },
});

export default Producthandler.reducer;