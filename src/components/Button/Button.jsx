import PropTypes from 'prop-types';

import '../../styles.css';

const Button = ({ loadMore }) => {
  return (
    <button onClick={loadMore} className="button">
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
