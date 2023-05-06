import PropTypes from 'prop-types';

export const Button = ({ onClick }) => (
  <button type="button" onClick={() => onClick()} className="Button">
    Load more
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
