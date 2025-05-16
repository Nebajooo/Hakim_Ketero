import React from "react";
import image from "../images/heroimg.jpg";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          ጤናዎ በቤትዎ <br />
          ጤና ያለዉያለዉ ሰው ሀብት ያለው ነው፤ ጤና የጐደለች ሀብት ቢኖረውም ድካም ነው።
        </h1>
        <p>
          ይህ የፈጠራ ጽሑፍ (Lorem ipsum) ነው፣ በተለምዶ በድርጅቶች እና በድህረ ገጾች የሚጠቀም እና የሚታይ
          የቅድሚያ ጽሁፍ ነው። ትርጉሙ አማርኛ እንደሚሆን ተገልጿል፣ ምንም አስተሳሰብ የለውም። ከተጨማሪ እንደ አማርኛ
          ጽሑፍ ወይም ትርጉም እንደሚፈልግህ እንደምታውቅ አስታውስ። ምን ልርዳ?
        </p>
      </div>
      <div className="hero-img">
        <img src={image} alt="hero" />
      </div>
    </section>
  );
};

export default Hero;
