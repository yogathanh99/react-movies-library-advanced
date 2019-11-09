import React from 'react';
import axios from 'axios';

import { API_KEY, API_URL } from '../../config';
import Navigation from '../elements/Navigation';
import MovieInfo from '../elements/MovieInfo';
import MovieInfoBar from '../elements/MovieInfoBar';
import FourColGrid from '../elements/FourColGrid';
import Actor from '../elements/Actor';
import Spinner from '../elements/Spinner';
import './Movie.css';

class Movie extends React.Component {
  state = {
    movie: null,
    actors: null,
    directors: [],
    loading: false,
  };

  componentDidMount() {
    const { movieId } = this.props.match.params;
    if (localStorage.getItem(`${movieId}`)) {
      const state = localStorage.getItem(`${movieId}`);
      this.setState({ ...state });
    } else {
      this.setState({ loading: true });
      const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
      this.fetchData(endpoint);
    }
  }

  fetchData = async endpoint => {
    const { movieId } = this.props.match.params;
    await axios
      .get(endpoint)
      .then(res => res.data)
      .then(data => {
        if (data.status_code) {
          this.setState({ loading: false });
        } else {
          this.setState({ movie: data }, async () => {
            let endpointData = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
            await axios
              .get(endpointData)
              .then(res => res.data)
              .then(res => {
                const directors = res.crew.filter(
                  member => member.job === 'Director',
                );
                this.setState(
                  {
                    actors: res.cast,
                    directors,
                    loading: false,
                  },
                  () => {
                    localStorage.setItem(
                      `${movieId}`,
                      JSON.stringify(this.state),
                    );
                  },
                );
              });
          });
        }
      });
  };

  render() {
    const { movieName } = this.props.location;

    const {
      state: { movie, directors, actors, loading },
    } = this;
    return (
      <div className='rmdb-movie'>
        {movie ? (
          <>
            <Navigation movieName={movieName} />
            <MovieInfo movie={movie} directors={directors} />
            <MovieInfoBar
              time={movie.runtime}
              budget={movie.budget}
              revenue={movie.revenue}
            />
          </>
        ) : null}
        {actors ? (
          <div className='rmdb-movie-grid'>
            <FourColGrid header={'Actors'}>
              {actors.map((actor, i) => (
                <Actor key={i} actor={actor} />
              ))}
            </FourColGrid>
          </div>
        ) : null}
        {!actors && !loading ? <h1>No Movie Found</h1> : null}
        {loading ? <Spinner /> : null}
      </div>
    );
  }
}

export default Movie;
