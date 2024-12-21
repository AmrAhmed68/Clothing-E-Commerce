import React, { useState, useEffect } from "react";
import useAdmin from '../../hooks/useAdmin';
import AdminTable from './AdminTable';
import AdminSlider from './AdminSlider';
import AdminSection from './AdminSection';
import './Admin.css'
import axios from "axios";

function AdminDasboard() {
    const {data, fetchData, addItem, deleteItem , editItem , photo  ,fetchPhoto , deletePhoto , addPhoto , loading , error} = useAdmin()
    const [currentProduct, setCurrentProduct] = useState(null); 
    const [message, setMessage] = useState(''); 
    const [image, setImage] = useState(""); 
    const [formState, setFormState] = useState({
      name: "",
      description: "",
      category: "",
      subcategory: "",
      size: [],
      color: [],
      price: "",
      discount:"",
      stock: "",
      brand: "",
      imageUrl: "",
    });

    useEffect(() => {
      fetchData()
      fetchPhoto()
    }, []);

    if (loading) {
      return (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      );
    }

    if (error) return <p className="error-message">{error}</p>; 
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleAddOrUpdate = async (e) => {
      e.preventDefault();
      try {
        if (currentProduct) {
          await editItem(currentProduct._id , formState)
        } else { 
          await addItem(formState)
        }
        fetchData()
        resetForm();
      } catch (err) {
        console.error("Error saving product:", err);
      }
    };

    const handleUpdateSection = async (section , Id) => {
      try {
          const token = localStorage.getItem('token');
        const response = await axios.put(
          `https://e-commerce-data-one.vercel.app/api/section`,
          { section : section , productId : Id} ,
          { headers: { Authorization: `Bearer ${token}`} }
        );
        console.log("Section updated:", response.data);
      } catch (err) {
        console.error("Error updating section:", err);
      }
    };
  
    const handleEdit = (product) => {
      setCurrentProduct(product);
      setFormState(product); 
    };
   
    const resetForm = () => {
      setCurrentProduct(null);
      setFormState({
        name: "",
        description: "",
        category: "",
        subcategory: "",
        size: [],
        color: [],
        price: 0,
        discount: 0,
        stock: 0,
        brand: "",
        imageUrl: "",
      });
    };

    const imageHandler = (value) => {
      setImage(value)
    };

    const handleAddPhoto = async () => {
      if (!image.trim()) {
        setMessage('Please enter a valid image URL.');
      }
      try {
        addPhoto(image)
      } catch{
        setMessage('Error adding photo');
      }
    };

    const scrollToSection = (id) => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    return (
        <div className="dashboard-container">
           <nav>
            <button onClick={() => scrollToSection('product')}>Go to Products</button>
            <button onClick={() => scrollToSection('slider')}>Go to Slider</button>
            <button onClick={() => scrollToSection('sections')}>Go to Sections</button>
          </nav>
          <div id="product">
        <h1>Admin Dashboard</h1>
        <form onSubmit={handleAddOrUpdate}>
          <h2>{currentProduct ? "Edit Product" : "Add Product"}</h2>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formState.name}
            onChange={handleInputChange}
            required
          />
          <input
            name="description"
            placeholder="Description"
            value={formState.description}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formState.category}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="subcategory"
            placeholder="Subcategory"
            value={formState.subcategory}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formState.price}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formState.stock}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formState.brand}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formState.imageUrl}
            onChange={handleInputChange}
            required
          />
          
          <button type="submit">{currentProduct ? "Update" : "Add"}</button>
          {currentProduct && (
            <button type="button" className="cancel" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
        <AdminTable data={data} onDelete={deleteItem}  onEdit={handleEdit}/>
        </div>

        <div id="slider">
          <h1>add Photo to Slider</h1>
        <input
            type="text"
            name="image"
            className="admin"
            placeholder="Image URL"
            value={image} 
            onChange={(e) => imageHandler(e.target.value)}
            required
            />
          <button onClick={handleAddPhoto}>Add</button>
          {message && <p>{message}</p>}
          <AdminSlider data={photo} onDelete={deletePhoto}  />
            </div>

          <div id="sections">
            <AdminSection data={data} handleUpdateSection={handleUpdateSection}/>
          </div>
      </div>
    );
  }

export default AdminDasboard;
