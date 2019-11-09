import React from 'react';
import axios from 'axios';

import HeroImage from '../elements/HeroImage';
import SearchBar from '../elements/SearchBar';
import FourColGrid from '../elements/FourColGrid';
import MovieThumb from '../elements/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn';
import Spinner from '../elements/Spinner';
import './Home.css';

class Home extends React.Component {
  state = {
    movies: [],
    heroImage: null,
    loading: false,
    currentPage: 0,
    totalPages: 0,
    searchTerm: '',
  };

  componentDidMount() {
    if (localStorage.getItem('HomeState')) {
      const state = JSON.parse(localStorage.getItem('HomeState'));
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });
      const endpoint = `${process.env.REACT_APP_API_URL}movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
      this.fetchItems(endpoint);
    }
  }

  fetchItems = async endpoint => {
    const { movies, heroImage } = this.state;

    const data = await axios.get(endpoint).then(res => res.data);
    this.setState(
      {
        movies: [...movies, ...data.results],
        heroImage: data.results[0] || heroImage,
        loading: false,
        currentPage: data.page,
        totalPages: data.total_pages,
      },
      () => {
        if (this.state.searchTerm === '') {
          localStorage.setItem('HomeState', JSON.stringify(this.state));
        }
      },
    );
  };

  searchItem = searchTerm => {
    let endpoint = '';
    this.setState({
      movies: [],
      loading: true,
      searchTerm,
    });

    if (searchTerm === '') {
      endpoint = `${process.env.REACT_APP_API_URL}movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${process.env.REACT_APP_API_URL}search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  };

  loadMoreItems = () => {
    let endpoint = '';
    const { searchTerm, currentPage } = this.state;

    this.setState({ loading: true });
    if (searchTerm === '') {
      endpoint = `${process.env.REACT_APP_API_URL}movie/popular?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&page=${currentPage + 1}`;
    } else {
      endpoint = `${process.env.REACT_APP_API_URL}search/movie?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
    }

    this.fetchItems(endpoint);
  };

  render() {
    const {
      movies,
      heroImage,
      searchTerm,
      loading,
      currentPage,
      totalPages,
    } = this.state;

    return (
      <div className='rmdb-home'>
        {heroImage ? (
          <HeroImage
            image={`${process.env.REACT_APP_IMAGE_BASE_URL}${process.env.REACT_APP_BACKDROP_SIZE}${heroImage.backdrop_path}`}
            title={heroImage.original_title}
          >
            {heroImage.overview}
          </HeroImage>
        ) : null}
        <SearchBar callback={this.searchItem} />
        <div className='rmdb-home-grid'>
          <FourColGrid
            header={searchTerm ? 'Search Result' : 'Popular Movies'}
            loading={loading}
          >
            {movies.map((movie, i) => (
              <MovieThumb
                key={i}
                clickable={true}
                image={
                  movie.poster_path
                    ? `${process.env.REACT_APP_IMAGE_BASE_URL}${process.env.REACT_APP_POSTER_SIZE}${movie.poster_path}`
                    : './images/no_image.jpg'
                }
                movieId={movie.id}
                movieName={movie.original_title}
              />
            ))}
          </FourColGrid>
          {loading ? <Spinner /> : null}
          {currentPage <= totalPages && !loading ? (
            <LoadMoreBtn onClick={this.loadMoreItems}>Load More</LoadMoreBtn>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
