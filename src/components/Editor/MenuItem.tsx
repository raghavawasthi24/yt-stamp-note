import "./MenuItem.scss";
import React from "react";
import remixiconUrl from "remixicon/fonts/remixicon.symbol.svg";

interface MenuItemProps {
  icon: string | React.ReactNode;
  title: string;
  action: () => void;
  isActive?: () => boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  action,
  isActive = null,
}) => (
  <button
    className={`menu-item${isActive && isActive() ? " is-active" : ""}`}
    onClick={action}
    title={title}
  >
    {/* <svg className="remix">
      <use xlinkHref={`${remixiconUrl}#ri-${icon}`} />
    </svg> */}
    <div className="w-5 h-5">{icon}</div>
  </button>
);

export default MenuItem;
