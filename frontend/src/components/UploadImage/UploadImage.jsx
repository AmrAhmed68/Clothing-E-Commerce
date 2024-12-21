import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const UploadImage = () => {
  const id = localStorage.getItem("id");
  const [file, setFile] = useState(null);
  const { fetchPhoto } = useAuth();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('profilePhoto', file);

    try {
      const response = await axios.post(`https://e-commerce-data-one.vercel.app/api/photo/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchPhoto(id)
      alert('Profile photo uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to upload the profile photo.');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Photo</button>
    </div>
  );
};

export default UploadImage;
