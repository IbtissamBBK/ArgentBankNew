import React from "react";
import chatIcon from "../assets/icon-chat.webp";
import moneyIcon from "../assets/icon-money.webp";
import securityIcon from "../assets/icon-security.webp";

const Features = () => (

    <section className="features">
        <h2 className="sr-only">Features</h2>

        <div className="feature-item">
            <img src={chatIcon} alt="Chat Icon" className="feature-icon" />
            <h3 className="feature-item-title">You are our #1 priority</h3>
            <p>Need to talk to a representative? You can get in touch through our 24/7 chat or phone call.</p>
        </div>

        <div className="feature-item">
            <img src={moneyIcon} alt="Money Icon" className="feature-icon" />
            <h3 className="feature-item-title">More savings means higher rates</h3>
            <p>The more you save with us, the higher your interest rate will be!</p>
        </div>

        <div className="feature-item">
            <img src={securityIcon} alt="Security Icon" className="feature-icon" />
            <h3 className="feature-item-title">Security you can trust</h3>
            <p>We use top-notch encryption to keep your data safe.</p>
        </div>
    </section>

    );


export default Features;