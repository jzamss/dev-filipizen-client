import React from "react";
import "./LguHeader.css";
import { Image } from "../rsi-react-components";

const LguHeader = ({ partner }) => {
  return (
    <header className="LguHeader">
      {partner.id && (
        <img
          className="LguHeader__icon"
          src={`/assets/${partner.id}.png`}
          alt="Lgu"
        />
      )}
      <label className="LguHeader__lgu">{partner.title}</label>
    </header>
  );
};

export default LguHeader;
