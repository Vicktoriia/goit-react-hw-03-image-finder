import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled';

const Button = ({ title, onClick }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      {title}
    </StyledButton>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Button;
