import React, { useState } from "react";

const Accordion = ({ customer, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <h3 onClick={() => setIsOpen(!isOpen)}>
        {customer.name} {isOpen ? "-" : "+"}
      </h3>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default Accordion;
