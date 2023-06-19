import axios from "axios";

const baseUrl = "https://is207n12-be-production.up.railway.app//api";

export const getAllProducts = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`${baseUrl}/sanpham/?page=${id || 1}`);
      console.log(data);

      resolve(data);
    } catch (error) {
      reject(error.response.data);
    }
  });
};

export const getAllProductsAdmin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`${baseUrl}/sanpham`);
      console.log(data);

      resolve(data);
    } catch (error) {
      reject(error.response.data);
    }
  });
};
