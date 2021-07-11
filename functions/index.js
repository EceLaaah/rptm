const addProduct = require("./product/addProduct");
const updateProduct = require("./product/updateProduct");
const updateUserInformation = require("./User/updateUserInformation");
const updateUserProfile = require("./User/updateUserProfile");
const register = require("./User/register");

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
  }
};

const userInformationComponent = async (event) => {
  switch (event.queryStringParameters["name"]) {
    case "signIn":
      if (event.httpMethod === httpRequest.POST) {
        return await register(event);
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
