import React from "react";
import PropTypes from "prop-types";

FormErrors.propTypes = {
  errors: PropTypes.object,
};

FormErrors.defaultProps = {
  errors: {},
};

function FormErrors(props) {
  const { errors } = props;
  return (
    <ul className="form__errors">
      {Object.values(errors).map((error, key) => {
        return (
          <li className="error" key={key}>
            {error}
          </li>
        );
      })}
    </ul>
  );
}

export default FormErrors;
