import React from "react";

export default function Product({ image, title, price, rating }) {
  return (
    <div className="product w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
      <div className="content border border-gray-400 rounded-xl p-6 shadow-xl">
        <img
          className="w-full h-[250px] object-contain"
          src={image}
          alt={title}
        />
        <div className="info">
          <h2 className="text-emerald-700 text-3xl font-medium mt-6">
            {title.split(" ").slice(0, 1).join(" ")}
          </h2>
          <div className="box flex justify-between items-center mt-3">
            <p className="text-gray-600 text-2xl">Price: ${price}</p>
            <p className="text-gray-900 text-2xl">
              {rating.rate}{" "}
              <i className="fa-solid fa-star" style={{ color: "#FFD43B" }}></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
