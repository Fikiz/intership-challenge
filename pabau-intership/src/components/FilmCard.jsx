import PropTypes from 'prop-types'; 

const FilmCard = ({ film, language }) => {
  return (
    <div className="film-card">
      <h3>{film.title}</h3>
      <p>{language === 'en' ? 'Director' : 'Режисер'}: {film.director}</p>
      <p>{language === 'en' ? 'Release Date' : 'Дата на издавање'}: {new Date(film.releaseDate).toLocaleDateString()}</p>
      <p>{language === 'en' ? 'Producers' : 'Продуценти'}: {film.producers.join(', ')}</p>
    </div>

  );
};

// PropTypes for validation
FilmCard.propTypes = {
  film: PropTypes.shape({
    episodeID: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    producers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  language: PropTypes.string.isRequired,
};

export default FilmCard;
