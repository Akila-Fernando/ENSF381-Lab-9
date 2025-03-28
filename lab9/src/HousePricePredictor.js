import React, { useState } from 'react';
import './HousePricePredictor.css';

const HousePricePredictor = () => {
    const [features, setFeatures] = useState({
        city: '',
        province: '',
        latitude: '',
        longitude: '',
        lease_term: '',
        type: '',
        beds: '',
        baths: '',
        sq_feet: '',
        furnishing: 'Unfurnished',
        smoking: 'No',
        pets: false,
    });

    const [predictedPrice, setPredictedPrice] = useState(null); 

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFeatures({
          ...features,
          [name]: type === 'checkbox' ? checked : value,
        });
      };
      
      const submission = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('/predict_house_price', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(features),
          });
          const data = await response.json();
          setPredictedPrice(data.predicted_price);
        } catch (error) {
          console.error('Error predicting house price:', error);
        }
      };

      return (
        <div className="container">
            <h1 className="title">House Price Predictor</h1>
          <form onSubmit={submission} className="form">
            <label className="label">City</label>
            <input
              name="city"
              value={features.city}
              onChange={handleChange}
              required
              className="input"
            />
    
            <label className="label">Province</label>
            <input
              name="province"
              value={features.province}
              onChange={handleChange}
              required
              className="input"
            />
    
            <label className="label">Latitude</label>
            <input
              name="latitude"
              value={features.latitude}
              onChange={handleChange}
              required
              className="input"
            />
    
            <label className="label">Longitude</label>
            <input
              name="longitude"
              value={features.longitude}
              onChange={handleChange}
              required
              className="input"
            />
    
            <label className="label">Lease Term</label>
            <input
              name="lease_term"
              value={features.lease_term}
              onChange={handleChange}
              required
              className="input"
            />
    
            <label className="label">Type of House</label>
            <input
              name="type"
              value={features.type}
              onChange={handleChange}
              required
              className="input"
            />
    
            <label className="label">Number of Beds</label>
            <input
              name="beds"
              value={features.beds}
              onChange={handleChange}
              required
              className="input"
            />
    
            <label className="label">Number of Baths</label>
            <input
              name="baths"
              value={features.baths}
              onChange={handleChange}
              required
              className="input"
            />
    
            <label className="label">Square Feet</label>
            <input
              name="sq_feet"
              value={features.sq_feet}
              onChange={handleChange}
              required
              className="input"
            />
    
            <label className="label">Furnishing</label>
            <select
              name="furnishing"
              value={features.furnishing}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="Unfurnished">Unfurnished</option>
              <option value="Partially Furnished">Partially Furnished</option>
              <option value="Fully Furnished">Fully Furnished</option>
            </select>
    
            <label className="label">Smoking</label>
            <select
              name="smoking"
              value={features.smoking}
              onChange={handleChange}
              required
              className="input"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
    
            <label className="label">
              <input
                name="pets"
                type='checkbox'
                checked={features.pets}
                onChange={handleChange}
                className="checkbox"
              />
              Pets
            </label>
    
            <button type="submit" className="button">
              Predict Price
            </button>
          </form>
    
          {predictedPrice !== null && (
            <div className="result">
              Predicted Rental Price: <strong>${predictedPrice}</strong>
            </div>
          )}
        </div>
      );
};




export default HousePricePredictor;