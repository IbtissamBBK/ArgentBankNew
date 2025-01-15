import React from "react";
import "..styles/main.css";

const Features = ({ icon, title, description }) => {
    return (
        <div className="feature-item">
            <img src={icon} alt={title} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default Features;