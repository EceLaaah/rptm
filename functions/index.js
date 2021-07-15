const updateUserProfile = require("./User/updateUserProfile");
const register = require("./User/register");
const farmLocation = require("./User/farmLocation");

//*Products Functions
const addProduct = require("./product/addProduct");
const updateProduct = require("./product/updateProduct");
const updateUserInformation = require("./User/updateUserInformation");
const addRiceVariety = require("./product/addRiceVariety");
const deleteRiceVariety = require("./product/deleteRiceVariety");

const httpRequest = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const productComponent = async (event) => {
  switch (event.queryStringParameters["name"]) {
    case "addProduct":
      if (event.httpMethod === httpRequest.POST) {
        return await addProduct(event);
      }
    case "updateProduct":
      if (event.httpMethod === httpRequest.PUT) {
        return await updateProduct(event);
      }
    case "addRiceVariety":
      if (event.httpMethod === httpRequest.POST) {
        return await addRiceVariety(event);
      }
    case "deleteRiceVariety":
      if (event.httpMethod === httpRequest.POST) {
        return await deleteRiceVariety(event);
      }
  }
};

const userInformationComponent = async (event) => {
  switch (event.queryStringParameters["name"]) {
    case "signIn":
      if (event.httpMethod === httpRequest.POST) {
        return await register(event);
      }
    case "farmLocation":
      if (event.httpMethod === httpRequest.POST) {
        return await farmLocation(event);
      }
    case "updateUserInformation":
      if (event.httpMethod === httpRequest.PUT) {
        return await updateUserInformation(event);
      }
    case "updateUserProfile":
      if (event.httpMethod === httpRequest.PUT) {
        return await updateUserProfile(event);
      }
  }
};

exports.handler = async (event) => {
  switch (event.queryStringParameters["component"]) {
    case "productComponent":
      return await productComponent(event);
    case "userInformationComponent":
      return await userInformationComponent(event);
  }
};
