import React from "react";
import prod_img from "../../assets/prod-img.png";

const About = () => {
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
              <a href="/about">ABOUT US</a>
            </li>
            {/* Uncomment if needed */}
            {/* <li><a href="#">Category1</a></li> */}
            {/* <li><a href="#">Product1</a></li> */}
          </ul>
        </div>
      </div>

      {/* About Us Section */}
      <div className="container">
        <section className="about-us">
          <div className="wrapper">
            <div className="row">
              <div className="img-box">
                <img src={prod_img} alt="About Us" />
              </div>
              <div className="data">
                <h2>About us</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellendus quibusdam dolor maiores a ratione inventore.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  cum distinctio libero, dolore sequi eligendi hic molestiae
                  velit ipsam officia?
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
