import React from "react";
import PropTypes from "prop-types";
import "./text.css";

/**
 * Primary UI component for user interaction
 */
export const Text = ({ primary, label, ...props }) => {
  const mode = primary
    ? "storybook-text--primary"
    : "storybook-text--secondary";

  return (
    <span
      className={["storybook-text", mode].join(
        " "
      )}
      {...props}
    >
      {label}
    </span>
  );
};

Text.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * text contents
   */
  label: PropTypes.string.isRequired,
};

Text.defaultProps = {
  primary: false,
};
