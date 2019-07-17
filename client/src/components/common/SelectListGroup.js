import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


const SelectListFieldGroup = ({
  name,
  value,
  info,
  error,
  onChange,
  options
}) => {

  const selectOptions = options.map(option => (
    <option value={option.value} key={option.label}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        onChange={onChange}
        value={value}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && (<div className="invalid-feedback">{error}</div>)}
    </div>
  )
};

SelectListFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
  options: PropTypes.array.isRequired
}

export default SelectListFieldGroup;
