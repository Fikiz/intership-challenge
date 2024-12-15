import PropTypes from 'prop-types'; 


const Filters = ({ filters, onFilterChange, language }) => {
  return (
    <div className="filters">
      
    {/* Director Filter */}
    <div className="mb-4">
      <label>{language === 'en' ? 'Director' : 'Режисер'}</label>
      <input
        type="text"
        name="director"
        value={filters.director}
        onChange={onFilterChange}
        placeholder={language === 'en' ? 'Search Director...' : 'Барај Режисер...'}
      />
    </div>

  {/* Release Year Filter */}
      <div className="mb-4">
        <label>{language === 'en' ? 'Release Year' : 'Година на објавување'}</label>
        <select
          name="releaseYear"
          value={filters.releaseYear}
          onChange={onFilterChange}
        >
          <option value="all">{language === 'en' ? 'All' : 'Сите'}</option>
          <option value="before2000">{language === 'en' ? 'Before 2000' : 'Пред 2000'}</option>
          <option value="after2000">{language === 'en' ? 'After 2000' : 'По 2000'}</option>
        </select>
      </div>

      {/* Sort Filter */}
      <div className="mb-4">
        <label>{language === 'en' ? 'Sort by' : 'Сортирај по'}</label>
        <select
          name="sort"
          value={filters.sort}
          onChange={onFilterChange}
        >
          <option value="title">{language === 'en' ? 'Title (A-Z)' : 'Наслов (A-Z)'}</option>
          <option value="releaseDateNewest">{language === 'en' ? 'Release Date (Newest First)' : 'Дата на објавување (Најново прво)'}</option>
          <option value="releaseDateOldest">{language === 'en' ? 'Release Date (Oldest First)' : 'Дата на објавување (Најстаро прво)'}</option>
        </select>
      </div>
    </div>


  );
};

// PropTypes
Filters.propTypes = {
  filters: PropTypes.shape({
    director: PropTypes.string.isRequired,
    releaseYear: PropTypes.string.isRequired,
    sort: PropTypes.string.isRequired,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default Filters;
