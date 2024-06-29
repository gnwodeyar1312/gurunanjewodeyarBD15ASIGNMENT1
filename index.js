const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

//Server-side values
const freeShippingTreshold = 100;
const taxRate = 5; //5%
const discountPercentage = 10; //10%
const loyaltyRate = 2; //2 points per $1

//Endpoint 1: Calculate the total price of items in the cart
app.get("/cart-total", (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  let totalcartPrice = newItemPrice + cartTotal;
  res.send(totalcartPrice.toString());
});

//Endpoint 2 : Apply a discount based on membership status
app.get("/membership-discount", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  let result = "";

  if (isMember === "true") {
    result = cartTotal - cartTotal * (discountPercentage / 100);
  } else {
    result = cartTotal;
  }
  res.send(result.toString());
});

//Endpoint 3 : Calculate tax on the cart total
app.get("/calculate-tax", (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let result = "";
  result = cartTotal * (taxRate / 100);

  res.send(result.toString());
});

//Endpoint 4 : Estimate delivery time based on shipping method
app.get("/estimate-delivery", (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let result = "";

  if (shippingMethod === "standard") {
    result = distance / 50;
  } else if (shippingMethod === "express") {
    result = distance / 100;
  } else {
    result =
      "Please select either express or standard delivery for delivery type";
  }

  res.send(result.toString());
});

//Endpoint 5 : Calculate the shipping cost based on weight and distance
app.get("/shipping-cost", (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let result = "";

  result = weight * distance * 0.1;
  res.send(result.toString());
});

//Endpoint 6 : Calculate loyalty points earned from a purchase
app.get("/loyalty-points", (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let result = "";

  result = purchaseAmount * loyaltyRate;
  res.send(result.toString());
});

let port = 3000;
app.listen(port, () => {
  console.log("Server is running on the port http://localhost:", port);
});
