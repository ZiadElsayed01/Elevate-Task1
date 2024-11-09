import React, { useEffect, useState } from "react";
import Prodcut from "../Components/Prodcut";
import axios from "axios";

export default function Products() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  async function getProducts() {
    try {
      setLoading(true);
      const response = await axios.get("https://fakestoreapi.com/products");
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  // Filter products when the selected category changes
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, data]);

  const categories = [
    "all",
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="tabs flex flex-wrap justify-center p-5">
        {categories.map((category) => (
          <button
            key={category}
            className={`tab-button rounded-md px-4 py-2 m-2 text-lg ${
              selectedCategory === category
                ? "bg-emerald-800 text-white font-bold"
                : "bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.toLocaleUpperCase()}
          </button>
        ))}
      </div>

      {/* Loader, Error, and Product Display */}
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <div className="h-screen flex items-center justify-center">
          <p className="error-message text-emerald-800 text-5xl">{error}</p>
        </div>
      ) : (
        <div className="products flex flex-wrap items-center w-full px-4 lg:px-8">
          {filteredData.map((product) => (
            <Prodcut
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
}
