import  { useState, useEffect } from 'react';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import FilmList from './components/FilmList';
import Filters from './components/Filters';
import LanguageToggle from './components/LanguageToggle';
import client from './apolloClient';
import './index.css';

const GET_FILMS = gql`
  query getFilms($first: Int, $after: String) {
    allFilms(first: $first, after: $after) {
      films {
        episodeID
        title
        director
        releaseDate
        producers
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const App = () => {
  const [language, setLanguage] = useState('en');
  const [filters, setFilters] = useState({ director: '', releaseYear: 'all', sort: 'title' });
  const [films, setFilms] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [endCursor, setEndCursor] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const { data, fetchMore, loading, error } = useQuery(GET_FILMS, {
    variables: { first: 10, after: endCursor },
    notifyOnNetworkStatusChange: true,
  });

  // Fetch more films when the data changes
  useEffect(() => {
    if (data) {
      console.log('Fetched data from API', data); 
      
      const fetchedFilms = data.allFilms.films;
      if (fetchedFilms.length > 0) {
        setFilms((prevFilms) => [...prevFilms, ...fetchedFilms]);
        setHasMore(data.allFilms.pageInfo.hasNextPage);
        setEndCursor(data.allFilms.pageInfo.endCursor);
      }
      setLoadingMore(false);
    }
  }, [data]); 

  // infinite scroll
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && hasMore && !loadingMore) {
      setLoadingMore(true);
      fetchMore({
        variables: { first: 10, after: endCursor },
      });
    }
  };

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'mk' : 'en');
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredFilms = films.filter((film) => {
    const matchesDirector =
      filters.director ? film.director.toLowerCase().includes(filters.director.toLowerCase()) : true;


    const matchesReleaseYear =
      filters.releaseYear === 'all'
        ? true
        : filters.releaseYear === 'before2000'
        ? new Date(film.releaseDate).getFullYear() < 2000
        : filters.releaseYear === 'after2000'
        ? new Date(film.releaseDate).getFullYear() >= 2000
        : true;

    return matchesDirector && matchesReleaseYear;
  });

  const sortedFilms = filteredFilms.sort((a, b) => {
    if (filters.sort === 'title') {
      return a.title.localeCompare(b.title);
    } else if (filters.sort === 'releaseDateNewest') {
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    } else if (filters.sort === 'releaseDateOldest') {
      return new Date(a.releaseDate) - new Date(b.releaseDate);
    }
    return 0;
  });

  return (
    <div
      onScroll={handleScroll}
      className="container mx-auto p-6"
      style={{ maxHeight: '80vh', overflowY: 'auto' }}
    >
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {language === 'en' ? 'Star Wars Films' : 'Ѕвездени Војни Филмови'}
        </h1>
        <LanguageToggle onToggle={handleLanguageToggle} language={language} />
      </header>

      <Filters filters={filters} onFilterChange={handleFilterChange} language={language} />

      {/* Show error message if there`s an error in the query */}
      {error && (
        <div className="text-red-500 text-center mt-4">
          <p>{language === 'en' ? 'Error fetching films.' : 'Грешка при повлекувањето на филмовите.'}</p>
        </div>
      )}

      {/* Show loading spinner when loading */}
      {loading && (
        <div className="text-center mt-4">
          <p>{language === 'en' ? 'Loading films...' : 'Набавка на филмови...'}</p>
        </div>
      )}

      {/* Show error message if no films match */}
      {noResults && (
        <div className="text-red-500 text-center mt-4">
          <p>{language === 'en' ? 'No films found for the specified director.' : 'Нема филмови за дадениот режисер.'}</p>
        </div>
      )}

      {/* Show films list */}
      <FilmList films={sortedFilms} loadingMore={loadingMore} hasMore={hasMore} language={language} />
    </div>
  );
};

const AppWrapper = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default AppWrapper;
