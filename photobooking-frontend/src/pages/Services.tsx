import React from "react";
import "../styles/services.css";


const Services: React.FC = () => {
  const serviceList = [
    {
      title: "Wedding Photography",
      description: "Full-day coverage tailored to capture the emotion, beauty, and story of your special day.",
      price: "₱15,000 - ₱35,000",
      image: "/images/bg1.jpg",
    },
    {
      title: "Portrait Photography",
      description: "Studio or outdoor portraits for individuals, couples, or families.",
      price: "₱3,000 - ₱8,000",
      image: "/images/bg2.jpg",
    },
    {
      title: "Event Photography",
      description: "Professional coverage for birthdays, corporate events, reunions, and more.",
      price: "₱5,000 - ₱20,000",
      image: "/images/bg3.jpg",
    },
  ];

  return (
    <div className="services-container">
      <h1 className="services-title">Our Services</h1>

      {serviceList.map((service, index) => (
        <div
          className={`service-card ${index % 2 === 1 ? "reverse" : ""}`}
          key={index}
        >
          <img src={service.image} className="service-img" />

          <div className="service-info">
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <span className="service-price">{service.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Services;
