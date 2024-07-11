import "./SearchPage.css";
import React, { useState } from "react";

function SearchPage() {
  const [formData, setFormData] = useState({
    sourceAirportCode: "",
    destinationAirportCode: "",
    date: "",
    returnDate: "",
    itineraryType: "ROUND_TRIP",
    sortOrder: "PRICE",
    numAdults: "1", // Treat as string
    numSeniors: "0", // Treat as string
    classOfService: "ECONOMY",
  });
  const [purchaseLinks, setPurchaseLinks] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Log form data
    console.log("Form Data:", formData);

    // Check for empty fields
    for (const key in formData) {
      if (
        formData[key] === "" ||
        formData[key] === null ||
        formData[key] === undefined
      ) {
        setError("All fields are required.");
        return;
      }
    }

    try {
      const response = await fetch("http://localhost:3002/searchFlights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const uniquePrices = new Set();
        const uniquePurchaseLinks = data.filter((link) => {
          if (!uniquePrices.has(link.totalPrice)) {
            uniquePrices.add(link.totalPrice);
            return true;
          }
          return false;
        });
        setPurchaseLinks(uniquePurchaseLinks);
      } else {
        const errorData = await response.json();
        console.error("Backend Error:", errorData);
        setError(errorData.error || "Error searching flights");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("Error searching flights");
    }
  };

  return (
    <div className="search-page">
      <h2>Please enter your travel information</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Source Airport Code (ex.BOS):</label>
          <input
            type="text"
            name="sourceAirportCode"
            value={formData.sourceAirportCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Destination Airport Code (ex.JFK):</label>
          <input
            type="text"
            name="destinationAirportCode"
            value={formData.destinationAirportCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date (YYYY-MM-DD):</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Return Date (YYYY-MM-DD):</label>
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Itinerary Type:</label>
          <select
            name="itineraryType"
            value={formData.itineraryType}
            onChange={handleChange}
            required
          >
            <option value="ONE_WAY">One Way</option>
            <option value="ROUND_TRIP">Round Trip</option>
          </select>
        </div>
        <div>
          <label>Sort Order:</label>
          <select
            name="sortOrder"
            value={formData.sortOrder}
            onChange={handleChange}
            required
          >
            <option value="PRICE">Price</option>
            <option value="DURATION">Duration</option>
          </select>
        </div>
        <div>
          <label>Number of Adults:</label>
          <input
            type="text"
            name="numAdults"
            value={formData.numAdults}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Number of Seniors:</label>
          <input
            type="text"
            name="numSeniors"
            value={formData.numSeniors}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Class of Service:</label>
          <select
            name="classOfService"
            value={formData.classOfService}
            onChange={handleChange}
            required
          >
            <option value="ECONOMY">Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST_CLASS">First Class</option>
          </select>
        </div>
        <button type="submit">Search Flights</button>
      </form>
      {error && <p className="error">{error}</p>}
      {purchaseLinks.length > 0 && (
        <div className="flight-results">
          {purchaseLinks.map((link, index) => (
            <div key={index} className="flight-card">
              <p>Provider: {link.providerId}</p>
              <p>Price: {link.totalPrice}</p>
              <p>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  Book now
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
