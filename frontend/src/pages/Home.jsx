import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [source, setSource] = useState("users"); // Users or Products
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    productName: "",
    price: "",
    category: "",
  });
  const [results, setResults] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Fetch data from backend based on selected source (users/products)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/${source}`);
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [source]);

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (Create operation)
  // Handle form submission (Create or Update operation)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = selectedId
      ? `http://localhost:5000/${source}/${selectedId}` // Update URL if selectedId exists
      : `http://localhost:5000/${source}`; // Create URL otherwise

    try {
      const res = selectedId
        ? await axios.put(url, formData) // Use PUT for update
        : await axios.post(url, formData); // Use POST for create

      if (selectedId) {
        // Update existing item in the results
        const updatedResults = results.map((item) =>
          item._id === selectedId ? res.data : item
        );
        setResults(updatedResults);
      } else {
        // Add the new item to the results
        setResults([...results, res.data]);
      }

      // Reset form and selectedId after submit
      setFormData({
        name: "",
        age: "",
        email: "",
        productName: "",
        price: "",
        category: "",
      });
      setSelectedId(null);
    } catch (err) {
      console.error("Error creating or updating data:", err);
    }
  };

  // Handle Delete operation
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/${source}/${id}`);
      setResults(results.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };

  // Handle Update operation
  const handleUpdate = async () => {
    const updatedData = {
      name: formData.name,
      age: formData.age,
      email: formData.email,
      productName: formData.productName,
      price: formData.price,
      category: formData.category,
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/${source}/${selectedId}`,
        updatedData
      );
      const updatedResults = results.map((item) =>
        item._id === selectedId ? res.data : item
      );
      setResults(updatedResults);
      setFormData({
        name: "",
        age: "",
        email: "",
        productName: "",
        price: "",
        category: "",
      });
      setSelectedId(null);
    } catch (err) {
      console.error("Error updating data:", err);
    }
  };

  // Handle selecting an item to update
  const handleSelect = (id) => {
    setSelectedId(id);
    const selectedItem = results.find((item) => item._id === id);
    setFormData({
      name: selectedItem.name || "",
      age: selectedItem.age || "",
      email: selectedItem.email || "",
      productName: selectedItem.productName || "",
      price: selectedItem.price || "",
      category: selectedItem.category || "",
    });
  };

  return (
    <div className="App font-sans bg-gray-100 min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        Unified Data Aggregation System
      </h1>

      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Select Source
          </label>
          <select
            onChange={(e) => setSource(e.target.value)}
            value={source}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="users">Users</option>
            <option value="products">Products</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {source === "users" && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleFormChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}
          {source === "products" && (
            <>
              <input
                type="text"
                name="productName"
                placeholder="Product Name"
                value={formData.productName}
                onChange={handleFormChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleFormChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleFormChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="w-full max-w-lg">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Results</h3>
        {results.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-wrap justify-center items-center gap-8"
          >
            <pre className="text-gray-700 whitespace-pre-wrap break-words">
              {JSON.stringify(item, null, 2)}
              <p className="mt-1">Database: NoSQL - MongoDB</p>
            </pre>
            <div className="flex flex-col items-center justify-center gap-4">
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-600 min-w-[100px] text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  handleSelect(item._id);
                }}
                className="bg-yellow-600 min-w-[100px] text-white py-2 px-4 rounded-md hover:bg-yellow-700"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
