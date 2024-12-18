import React, { useState, useEffect } from "react";
import useAdmin from '../../hooks/useAdmin';
import AdminTable from './AdminTable';
import AdminSlider from './AdminSlider';
import './Admin.css'
import ProductAdmin from "./ProductAdmin";

function AdminDasboard() {
    const {data, fetchData, addItem, deleteItem , editItem , photo  ,fetchPhoto , deletePhoto , addPhoto } = useAdmin()
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
    }, [photo]);
  
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

  
    return (
        <div className="dashboard-container">
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

        <AdminSlider data={photo} onDelete={deletePhoto}  />
        <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={image} 
            onChange={(e) => imageHandler(e.target.value)}
            required
          />
          <button onClick={handleAddPhoto}>Add</button>
          {message && <p>{message}</p>}

          <ProductAdmin product={data} />
      </div>
    );
  }

export default AdminDasboard;