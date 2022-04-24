import React from "react";
import PropTypes from "prop-types";
import "./button.css";

/**
 * Primary UI component for user interaction
 */
export const Button = ({ type, backgroundColor, size, label, ...props }) => {
  return (
    <button
      type="button"
      className={["storybook-button", `storybook-button--${type}`].join(
        " "
      )}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  type: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warn']),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'primary',
  onClick: undefined,
};
