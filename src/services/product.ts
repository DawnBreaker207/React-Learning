import instance from '../configs/axios';
import { Product } from '../interfaces/Product';

const Get_All = async () => {
  try {
    const { data } = await instance.get('/products');
    return data;
  } catch (error) {
    console.log(error);
  }
};
const Get_One = async (id: string | number) => {
  try {
    const { data } = await instance.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const Create = async (dataInput: Product) => {
  try {
    const { data } = await instance.post('/products', dataInput);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const Update = async (id: string | number, dataInput: Product) => {
  try {
    const { data } = await instance.put(`/products/${id}`, dataInput);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const Delete = async (id: string | number) => {
  try {
    await instance.delete(`/products/${id}`);
  } catch (error) {
    console.log(error);
  }
};
export { Get_All, Get_One, Create, Update, Delete };
