import PropTypes from 'prop-types';
import FilmCard from './FilmCard';

const FilmList = ({ films, loadingMore, hasMore, language }) => {
  return (
    <div>
      {films.map((film, index) => (
        <FilmCard key={`${film.episodeID}-${index}`} film={film} language={language} />
      ))}

      {/* Show "loading more" message if needed */}
      {loadingMore && (
        <div className="text-center mt-4">
          <p>{language === 'en' ? 'Loading more films...' : 'Учитај повеќе филмови...'}</p>
        </div>
      )}

      {/* Show "no more" message if no more films  */}
      {!hasMore && (
        <div className="text-center mt-4">
          <p>{language === 'en' ? 'No more films to load.' : 'Нема повеќе филмови за учитање.'}</p>
        </div>
      )}
    </div>
  );
};

FilmList.propTypes = {
  films: PropTypes.array.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool.isRequired,
  language: PropTypes.string.isRequired,
};

export default FilmList;
