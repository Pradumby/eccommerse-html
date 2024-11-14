import React from "react";
import prodImg from "../../assets/prod-img1.jpg";

const FeaturedProducts = () => (
  <section className="featured-list">
    <h2 className="title">Featured Products</h2>
    <ul className="prod-list">
      {[1, 2, 3, 4].map((_, index) => (
        <li key={index} className="item">
          <div className="img-box">
            <img src={prodImg} alt="Product" />
          </div>
          <div className="data">
            <h4>Category</h4>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default FeaturedProducts;
