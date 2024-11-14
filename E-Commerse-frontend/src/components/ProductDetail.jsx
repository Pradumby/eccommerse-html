import React, { useEffect, useState } from "react";
import prod_img from "../assets/prod-img.png";
import prod_img_w from "../assets/prod-img-w.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../contexts/CartContext"; // Import the useCart hook

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for managing quantity
  const { addToCart } = useCart(); // Get the addToCart function from the context

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/product/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Increase quantity
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Decrease quantity (with a minimum of 1)
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Handle Add to Cart with selected quantity
  const handleAddToCart = () => {
    addToCart({ ...product, quantity }); // Pass quantity to addToCart
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="wrapper">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li>
              <a href="#">Category1</a>
            </li>
            <li>
              <a href="#">{product.name}</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="container">
        <section className="prod-detail">
          <div className="wrapper">
            <div className="detail-wrap">
              <div className="prod-img">
                {/* Display product image dynamically */}
                <img src={product.imageUrl || prod_img} alt={product.name} />
              </div>
              <div className="prod-info">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <div className="rating">
                  {/* Assuming you have a rating property in your product */}
                  {Array.from({ length: product.rating }, (_, index) => (
                    <i key={index} className="fa-solid fa-star"></i>
                  ))}
                  {product.rating % 1 !== 0 && (
                    <i className="fa-solid fa-star-half-stroke"></i>
                  )}
                  {Array.from(
                    { length: 5 - Math.ceil(product.rating) },
                    (_, index) => (
                      <i key={index} className="fa-regular fa-star"></i>
                    )
                  )}
                </div>
                <div className="prod-option">
                  <label>Also Available In:</label>
                  <div className="options">
                    {/* Display additional product options dynamically */}
                    {product.options?.map((option, index) => (
                      <a key={index} href="#">
                        <img
                          src={option.imageUrl || prod_img_w}
                          alt={`Option ${index + 1}`}
                        />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="qty-wrap">
                  <label>QTY:</label>
                  <div className="qty-btn">
                    <span onClick={handleDecrease}>-</span>
                    <input
                      type="number"
                      name="qty"
                      id="qty"
                      value={quantity}
                      readOnly
                    />
                    <span onClick={handleIncrease}>+</span>
                  </div>
                </div>
                <div className="price-wrap">
                  <span className="old-price price">₹{product.oldPrice}</span>
                  <span className="price">₹{product.price}</span>
                </div>
                {/* Add to Cart Button */}
                <button
                  className="btn"
                  onClick={handleAddToCart} // Call the handleAddToCart function with selected quantity
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        <section>
          <div className="wrapper">
            <h2 className="title">Related Products</h2>
            <ul className="prod-list">
              {Array.from({ length: 4 }, (_, index) => (
                <li key={index}>
                  <div className="item">
                    <div className="img-box">
                      <img src={prod_img} alt={`Product ${index + 1}`} />
                    </div>
                    <div className="data">
                      <h4>Product {index + 1}</h4>
                      <div className="price-wrap">
                        <span className="old-price price">₹400.00</span>
                        <span className="price">₹320.00</span>
                      </div>
                      <div className="cta">
                        <a href="#" className="btn">
                          Add to Cart
                        </a>
                      </div>
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

export default ProductDetail;

{
  /* Related Products Section this dynamic code
        <section>
          <div className="wrapper">
            <h2 className="title">Related Products</h2>
            <ul className="prod-list">
              {relatedProducts.map((relatedProduct) => (
                <li key={relatedProduct._id}>
                  <div className="item">
                    <div className="img-box">
                      <img src={prod_img} alt={relatedProduct.name} />
                    </div>
                    <div className="data">
                      <h4>{relatedProduct.name}</h4>
                      <div className="price-wrap">
                        <span className="old-price price">
                          ₹{relatedProduct.oldPrice}
                        </span>
                        <span className="price">₹{relatedProduct.price}</span>
                      </div>
                      <div className="cta">
                        <a
                          href={`/product/${relatedProduct._id}`}
                          className="btn"
                        >
                          Add to Cart
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section> */
}

// import React from "react";
// import prod_img_w from "../assets/prod-img-w.png";
// import prod_img from "../assets/prod-img.png";

// const ProductDetail = () => {
//   return (
//     <div>
//       {/* Breadcrumb */}
//       <div className="breadcrumb">
//         <div className="wrapper">
//           <ul>
//             <li>
//               <a href="/">Home</a>
//             </li>
//             <li>
//               <a href="/shop">Shop</a>
//             </li>
//             <li>
//               <a href="#">Category1</a>
//             </li>
//             <li>
//               <a href="#">Product1</a>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Product Detail Section */}
//       <div className="container">
//         <section className="prod-detail">
//           <div className="wrapper">
//             <div className="detail-wrap">
//               <div className="prod-img">
//                 <img src={prod_img} alt="Product" />
//               </div>
//               <div className="prod-info">
//                 <h2>Product Name</h2>
//                 <p>Lorem Ipsum is simply dummy text of the printing</p>
//                 <div className="rating">
//                   <i className="fa-solid fa-star"></i>
//                   <i className="fa-solid fa-star"></i>
//                   <i className="fa-solid fa-star"></i>
//                   <i className="fa-solid fa-star-half-stroke"></i>
//                   <i className="fa-regular fa-star"></i>
//                 </div>
//                 <div className="prod-option">
//                   <label>Also Available In:</label>
//                   <div className="options">
//                     <a href="#">
//                       <img src={prod_img_w} alt="Option 1" />
//                     </a>
//                     <a href="#">
//                       <img src={prod_img_w} alt="Option 2" />
//                     </a>
//                   </div>
//                 </div>
//                 <div className="qty-wrap">
//                   <label>QTY:</label>
//                   <div className="qty-btn">
//                     <span>-</span>
//                     <input type="number" name="qty" id="qty" defaultValue="1" />
//                     <span>+</span>
//                   </div>
//                 </div>
//                 <div className="price-wrap">
//                   <span className="old-price price">₹400.00</span>
//                   <span className="price">₹320.00</span>
//                 </div>
//                 <a href="cart.component.html" className="btn">
//                   Add to Cart
//                 </a>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Related Products Section */}
//         <section>
//           <div className="wrapper">
//             <h2 className="title">Related Products</h2>
//             <ul className="prod-list">
//               {Array.from({ length: 4 }, (_, index) => (
//                 <li key={index}>
//                   <div className="item">
//                     <div className="img-box">
//                       <img src={prod_img} alt={`Product ${index + 1}`} />
//                     </div>
//                     <div className="data">
//                       <h4>Product {index + 1}</h4>
//                       <div className="price-wrap">
//                         <span className="old-price price">₹400.00</span>
//                         <span className="price">₹320.00</span>
//                       </div>
//                       <div className="cta">
//                         <a href="#" className="btn">
//                           Add to Cart
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
