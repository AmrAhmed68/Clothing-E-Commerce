import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import UploadImage from '../UploadImage/UploadImage';
import axios from 'axios';

function Profile() {
  const { user, userData, updateUser, logout } = useAuth();
  const [photo, setPhoto] = useState({});
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/photo/${id}`);
        setPhoto(response.data);
      } catch (error) {
        console.error('Error fetching photo:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const user = await userData(id);
        setData(user.user || user); 
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchPhoto();
  }, [id, userData]);

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: prev.user ? { ...prev.user, [field]: value } : value,
    }));
  };

  const handleSave = async (field) => {
    try {
      const updatedData = { [field]: data[field] }; 
      const updatedUser = await updateUser(id, updatedData);
      console.log('User updated successfully:', updatedUser);
      setData((prev) => ({ ...prev, [field]: updatedUser[field] }));

      setIsEditing((prev) => ({ ...prev, [field]: false }));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        {photo && (
          <img
            src={`http://localhost:8000/${photo}`}
            alt="Profile"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
        )}
        {!photo && <UploadImage />}
        <h1>{user.username}</h1>
      </div>
      <div className="profile-info">
        {['username', 'email', 'age', 'phone'].map((field) => (
          <div className="profile-row" key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            {isEditing[field] ? (
              <div className="input-container">
                <input
                  type="text"
                  value={(data.user ? data.user[field] : data[field]) || ''} 
                  onChange={(e) => handleInputChange(field, e.target.value)}
                />
                <button onClick={() => handleSave(field)}>Save</button>
              </div>
            ) : (
              <div className="value-container">
                <span>{(data.user ? data.user[field] : data[field]) || ''}</span>
                <FaPen className="edit-icon" onClick={() => handleEditClick(field)} />
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
