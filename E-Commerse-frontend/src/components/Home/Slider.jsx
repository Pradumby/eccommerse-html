import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import banner from "../../assets/banner.png";
// import "./Slider.css";

const Slider = () => {
  const slides = [
    {
      image: banner,
      title: "Title 1",
      description: "Lorem Ipsum is simply dummy text of the industry.",
      ctaText: "Buy 1 get 1",
      link: "/shop",
    },
    {
      image: banner,
      title: "Title 2",
      description: "Lorem Ipsum is simply dummy text of the industry.",
      ctaText: "Shop Now",
      link: "/shop",
    },
    {
      image: banner,
      title: "Title 3",
      description: "Lorem Ipsum is simply dummy text of the industry.",
      ctaText: "Check Out Offers",
      link: "/shop",
    },
  ];

  return (
    <section className="banner">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        speed={500}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slider">
              <div className="img-box">
                <img src={slide.image} alt={slide.title} />
              </div>

              <div className="content">
                <h1>{slide.title}</h1>
                <p>{slide.description}</p>
                <a href={slide.link} className="btn btn-wht">
                  {slide.ctaText}
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Slider;
