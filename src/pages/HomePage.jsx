import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedMovie } from '../redux/movieSlice';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  const mockMovies = [
    {
      _id: '1',
      title: 'Inception',
      genre: ['Sci-Fi', 'Thriller'],
      duration: 148,
      rating: 8.8,
      language: 'English',
      releaseDate: '2010-07-16',
      posterUrl: 'https://images.unsplash.com/photo-1540224477063-df0d0d3a58ab?w=400&h=600&fit=crop',
      description: 'A skilled thief who steals corporate secrets through dream-sharing technology',
      reviews: 2847,
      price: '₹200-₹300',
      trending: true
    },
    {
      _id: '2',
      title: 'The Dark Knight',
      genre: ['Action', 'Crime', 'Drama'],
      duration: 152,
      rating: 9.0,
      language: 'English',
      releaseDate: '2008-07-18',
      posterUrl: 'https://images.unsplash.com/photo-1489599849228-eb342a5694d1?w=400&h=600&fit=crop',
      description: 'When the Joker wreaks havoc on Gotham, Batman must accept the challenge',
      reviews: 3256,
      price: '₹200-₹250',
      trending: true
    },
    {
      _id: '3',
      title: 'Interstellar',
      genre: ['Adventure', 'Drama', 'Sci-Fi'],
      duration: 169,
      rating: 8.6,
      language: 'English',
      releaseDate: '2014-11-07',
      posterUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop',
      description: 'A team of explorers travel through a wormhole in space',
      reviews: 2934,
      price: '₹200-₹300',
      trending: true
    },
    {
      _id: '4',
      title: 'Pulp Fiction',
      genre: ['Crime', 'Drama'],
      duration: 154,
      rating: 8.9,
      language: 'English',
      releaseDate: '1994-10-14',
      posterUrl: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop',
      description: 'The lives of two mob hitmen intertwine in this masterpiece',
      reviews: 2156,
      price: '₹180-₹220',
      trending: false
    },
    {
      _id: '5',
      title: 'Forrest Gump',
      genre: ['Drama', 'Romance'],
      duration: 142,
      rating: 8.8,
      language: 'English',
      releaseDate: '1994-07-06',
      posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
      description: 'The presidency unfolds from an unique perspective',
      reviews: 1987,
      price: '₹180-₹220',
      trending: false
    },
    {
      _id: '6',
      title: 'The Matrix',
      genre: ['Action', 'Sci-Fi'],
      duration: 136,
      rating: 8.7,
      language: 'English',
      releaseDate: '1999-03-31',
      posterUrl: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=400&h=600&fit=crop',
      description: 'Reality is not what you think it is',
      reviews: 3102,
      price: '₹200-₹280',
      trending: false
    },
    {
      _id: '7',
      title: 'Oppenheimer',
      genre: ['Biography', 'Drama', 'History'],
      duration: 180,
      rating: 8.4,
      language: 'English',
      releaseDate: '2023-07-21',
      posterUrl: 'https://images.unsplash.com/photo-1618519032000-cd4628902d4a?w=400&h=600&fit=crop',
      description: 'The story of J. Robert Oppenheimer and the atomic bomb',
      reviews: 4562,
      price: '₹250-₹350',
      trending: true
    },
    {
      _id: '8',
      title: 'Avatar',
      genre: ['Action', 'Adventure', 'Sci-Fi'],
      duration: 162,
      rating: 7.8,
      language: 'English',
      releaseDate: '2009-12-18',
      posterUrl: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop',
      description: 'A paraplegic Marine is sent to an alien world',
      reviews: 3478,
      price: '₹220-₹320',
      trending: false
    },
    {
      _id: '9',
      title: 'Vikram',
      genre: ['Action', 'Thriller'],
      duration: 176,
      rating: 8.5,
      language: 'Tamil',
      releaseDate: '2022-06-03',
      posterUrl: 'https://images.unsplash.com/photo-1581905764498-3a2d5d0e9f5a?w=400&h=600&fit=crop',
      description: 'A high-octane action thriller from South Indian cinema',
      reviews: 1824,
      price: '₹200-₹350',
      trending: true
    },
    {
      _id: '10',
      title: 'Jai Bhim',
      genre: ['Drama'],
      duration: 164,
      rating: 8.6,
      language: 'Tamil',
      releaseDate: '2021-11-02',
      posterUrl: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=600&fit=crop',
      description: 'A courtroom drama based on true events.',
      reviews: 1420,
      price: '₹150-₹250',
      trending: false
    },
    {
      _id: '11',
      title: 'Soorarai Pottru',
      genre: ['Drama', 'Biography'],
      duration: 153,
      rating: 8.7,
      language: 'Tamil',
      releaseDate: '2020-11-12',
      posterUrl: 'https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=400&h=600&fit=crop',
      description: 'An inspiring tale about taking on the aviation industry.',
      reviews: 1980,
      price: '₹180-₹300',
      trending: true
    },
    {
      _id: '12',
      title: 'Master',
      genre: ['Action', 'Drama'],
      duration: 175,
      rating: 7.9,
      language: 'Tamil',
      releaseDate: '2021-01-13',
      posterUrl: 'https://images.unsplash.com/photo-1513185158878-7f01b5f9c6b3?w=400&h=600&fit=crop',
      description: 'A clash between a professor and a gangster in college backdrop.',
      reviews: 1675,
      price: '₹170-₹300',
      trending: false
    },
    {
      _id: '13',
      title: 'Enthiran (Robot)',
      genre: ['Sci-Fi', 'Action'],
      duration: 158,
      rating: 7.3,
      language: 'Tamil',
      releaseDate: '2010-10-01',
      posterUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=600&fit=crop',
      description: 'A scientist creates a humanoid robot with unexpected consequences.',
      reviews: 2012,
      price: '₹200-₹350',
      trending: false
    },
    {
      _id: '14',
      title: 'Kabali',
      genre: ['Action', 'Drama'],
      duration: 141,
      rating: 7.0,
      language: 'Tamil',
      releaseDate: '2016-07-22',
      posterUrl: 'https://images.unsplash.com/photo-1508610048659-a06a7b1f8a3b?w=400&h=600&fit=crop',
      description: 'A gangster drama starring a megastar of Tamil cinema.',
      reviews: 980,
      price: '₹180-₹320',
      trending: false
    }
  ];

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [searchTerm, selectedGenre, sortBy, movies]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setMovies(mockMovies);
      setLoading(false);
    } catch (error) {
      console.error('Error loading movies:', error);
      setMovies(mockMovies);
      setLoading(false);
    }
  };

  const filterMovies = () => {
    let filtered = [...movies];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Genre filter
    if (selectedGenre !== 'All') {
      filtered = filtered.filter(movie =>
        movie.genre.includes(selectedGenre)
      );
    }

    // Sort
    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    } else if (sortBy === 'reviews') {
      filtered.sort((a, b) => b.reviews - a.reviews);
    }

    setFilteredMovies(filtered);
  };

  const handleBookClick = (movie) => {
    dispatch(setSelectedMovie(movie));
    navigate(`/movie/${movie._id}`);
  };

  const allGenres = ['All', ...new Set(movies.flatMap(m => m.genre))];

  if (loading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" role="status" variant="danger">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">🎬 Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center hero-content">
            <Col lg={8}>
              <h1 className="hero-title">🎬 Book Your Favorite Movies</h1>
              <p className="hero-subtitle">Experience cinema like never before with amazing deals</p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Search and Filter Section */}
      <Container className="my-5">
        <Row className="mb-4 g-3">
          <Col lg={5}>
            <div className="search-box">
              <Form.Control
                type="text"
                placeholder="🔍 Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </Col>
          <Col lg={3}>
            <Form.Select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="filter-select"
            >
              {allGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </Form.Select>
          </Col>
          <Col lg={4}>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="rating">Sort by: Rating ⭐</option>
              <option value="newest">Sort by: Newest 🆕</option>
              <option value="reviews">Sort by: Most Popular 🔥</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Results Info */}
        <Row className="mb-4">
          <Col>
            <p className="results-info">
              ✨ Showing <strong>{filteredMovies.length}</strong> of <strong>{movies.length}</strong> movies
              {searchTerm && ` • Searching for "${searchTerm}"`}
              {selectedGenre !== 'All' && ` • Genre: ${selectedGenre}`}
            </p>
          </Col>
        </Row>

        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <Row className="g-4">
            {filteredMovies.map((movie) => (
              <Col lg={3} md={6} sm={12} key={movie._id} className="movie-col">
                <Card className="movie-card">
                  <div className="movie-poster-container">
                    {movie.trending && <div className="trending-badge">🔥 TRENDING</div>}
                    <Card.Img
                      variant="top"
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="movie-poster"
                    />
                    <div className="rating-badge">
                      <span className="rating-star">⭐</span>
                      <span className="rating-value">{movie.rating}</span>
                    </div>
                    <div className="price-badge">{movie.price}</div>
                  </div>
                  <Card.Body className="movie-body">
                    <Card.Title className="movie-title">{movie.title}</Card.Title>
                    <p className="movie-meta">
                      <span className="duration">⏱️ {movie.duration} min</span>
                      <span className="language">🗣️ {movie.language}</span>
                    </p>
                    <div className="genres-container">
                      {movie.genre.map(g => (
                        <Badge key={g} bg="danger" className="genre-badge">
                          {g}
                        </Badge>
                      ))}
                    </div>
                    <p className="movie-description">{movie.description.substring(0, 60)}...</p>
                    <div className="reviews-section">
                      <small className="text-muted">👥 {movie.reviews.toLocaleString()} Reviews</small>
                    </div>
                    <Button
                      variant="danger"
                      className="book-btn w-100 mt-3"
                      onClick={() => handleBookClick(movie)}
                    >
                      Book Now 🎫
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Row>
            <Col className="text-center py-5">
              <p className="no-results">😔 No movies found. Try a different search!</p>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
