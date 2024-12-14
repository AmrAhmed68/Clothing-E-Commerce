import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/products';

const useProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products
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

  // Fetch a single product by ID
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

  // Add a new product
  const addProduct = async (productData) => {
    setError(null);
    try {
      const response = await axios.post(API_BASE_URL, productData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setProducts((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding product');
    }
  };

  // Update a product by ID
  const updateProduct = async (id, updatedData) => {
    setError(null);
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData, {
        headers: { 'Content-Type': 'application/json' },
      });
      setProducts((prev) =>
        prev.map((product) => (product._id === id ? response.data : product))
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating product');
    }
  };

  // Delete a product by ID
  const deleteProduct = async (id) => {
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProduct;
