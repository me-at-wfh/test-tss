import React from "react";

interface LogoutProps {
  onClick: any;
}
const Logout = (props: LogoutProps) => {
  return (
    <li className="nhsuk-header__navigation-item">
      <a
        data-jest="btn-logout"
        href="/"
        className="nhsuk-header__navigation-link"
        onClick={props.onClick}
      >
        Logout
      </a>
    </li>
  );
};

export default Logout;
