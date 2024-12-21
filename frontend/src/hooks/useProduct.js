import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://e-commerce-data-one.vercel.app/api/products';

const useProduct = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [cproduct, setCProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategory = async (categoryName, subcategoryName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://e-commerce-data-one.vercel.app/api/subcategory/${categoryName}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setCProduct(Array.isArray(response.data.products) ? response.data.products : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };  
  const fetchSubCategory = async (categoryName, subcategoryName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://e-commerce-data-one.vercel.app/api/subcategory/${categoryName}/${subcategoryName}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setProduct(Array.isArray(response.data.products) ? response.data.products : []);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      setProducts(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };
  const fetchProductById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching product');
    } finally {
      setLoading(false);
    }
  };
  const addProduct = async (productData) => {
    setError(null);
    try {
      const response = await axios.post(API_BASE_URL, productData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setProducts((prev) => [...prev, response.data]);
      fetchProducts()
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding product');
    }
  };
  const updateProduct = async (id, updatedData) => {
    setError(null);
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setProducts((prev) =>
        prev.map((product) => (product._id === id ? response.data : product))
      );
      fetchProducts()
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating product');
    }
  };
  const deleteProduct = async (id) => {
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      fetchProducts()
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    product,
    products,
    loading,
    error,
    cproduct,
    fetchCategory,
    fetchProducts,
    fetchProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchSubCategory,
  };
};

export default useProduct;
