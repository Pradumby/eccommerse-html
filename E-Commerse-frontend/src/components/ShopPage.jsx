import React, { useEffect, useState } from "react";
import axios from "axios";
import prod_img_w from "../assets/prod-img-w.png";
import prod_img from "../assets/prod-img.png";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const ShopPage = () => {
  const { addToCart } = useCart();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="category-type">
        <div className="wrapper">
          <ul className="category-wrap">
            {categories.map((category, index) => (
              <li key={index}>
                <div className="item">
                  <div className="img-box">
                    <img src={prod_img_w} alt="category" />
                  </div>
                  <div className="data">
                    <h4>{category.name}</h4>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container">
        <section>
          <div className="wrapper">
            <h2 className="title">Category1</h2>
            <ul className="prod-list">
              {products.map((product) => (
                <li key={product._id}>
                  <div className="item">
                    <div className="img-box">
                      {/* Make the product image clickable */}
                      <Link to={`/product/${product._id}`}>
                        <img src={prod_img} alt="product" />
                      </Link>
                    </div>
                    <div className="data">
                      <h4>{product.name}</h4>
                      <div className="price-wrap">
                        <span className="old-price price">
                          ₹{product.oldPrice}
                        </span>
                        <span className="price">₹{product.price}</span>
                      </div>
                      <button
                        className="btn"
                        onClick={() => addToCart(product, 1)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShopPage;
