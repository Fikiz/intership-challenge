import PropTypes from 'prop-types'; 

const LanguageToggle = ({ onToggle, language }) => {
  return (
    <button onClick={onToggle} className="language-toggle">
        {language === 'en' ? 'Switch to Macedonian' : 'Switch to English'}
    </button>

  );
};


LanguageToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default LanguageToggle;
