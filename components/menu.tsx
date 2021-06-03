import React, { useState } from "react";
import onClickOutside from "react-onclickoutside";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  Menu.handleClickOutside = () => setIsOpen(false);
  return (
    <li className={isOpen ? "m-menu -active" : "m-menu "} onClick={toggle}>
      <div> Open Menu </div>
      <ul className="m-menu__list">
        <li className="m-menu__item">
          <div className="m-menu__link">Log Out</div>
        </li>
      </ul>
    </li>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => Menu.handleClickOutside,
};

export default onClickOutside(Menu, clickOutsideConfig);
