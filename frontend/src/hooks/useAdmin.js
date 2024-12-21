import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const API_BASE_URL = 'https://e-commerce-data-one.vercel.app/api';

const useAdmin = () => {
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const fetchPhoto = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/slider`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPhoto(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const addPhoto = async (item) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/slider`,
        {image : item} ,
        {
          headers: { Authorization: `Bearer ${token}` },
      });
      setPhoto(response.data);
      fetchPhoto()
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding item');
    }
  };

  const addItem = async (item) => {
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/products`, item, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prev) => [...prev, response.data]);
      fetchData()
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding item');
    }
  };

  const editItem = async (id, updatedItem) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, updatedItem, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData((prev) =>
        prev.map((item) => (item._id === id ? response.data : item))
      );
      fetchData()
    } catch (err) {
      setError(err.response?.data?.message || 'Error editing item');
    }
  };

  const deleteItem =  (id) => {
    try {
      Swal.fire({
        title: 'You are sure to delete this produuct!',
        icon: 'warning',
        confirmButtonText: 'Sure',
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem('token');
          await axios.delete(`${API_BASE_URL}/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setData((prev) => prev.filter((item) => item._id !== id));
          fetchData()
        }
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting item');
    }
  };

  const deletePhoto =  (id) => {
    try {
      Swal.fire({
        title: 'You are sure to delete this Photo!',
        icon: 'warning',
        confirmButtonText: 'Sure',
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem('token');
          await axios.delete(`${API_BASE_URL}/slider/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPhoto((prev) => prev.filter((item) => item._id !== id));
        }
      });
      fetchPhoto()
    } catch (err) {
      setError(err.response?.data?.message || 'Error deleting item');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { photo ,data, loading, error, fetchPhoto ,fetchData, addItem, deleteItem , editItem , addPhoto , deletePhoto };
};

export default useAdmin;
