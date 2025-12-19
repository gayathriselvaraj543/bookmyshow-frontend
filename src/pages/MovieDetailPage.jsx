import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Badge, Accordion } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/MovieDetail.css';

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails();
    fetchTheaters();
  }, [movieId]);

  const fetchMovieDetails = async () => {
    try {
      // Mock movie data (expanded to include Tamil cinema)
      const mockMovies = {
        '1': {
          _id: '1',
          title: 'Inception',
          genre: ['Sci-Fi', 'Thriller'],
          duration: '148 min',
          language: 'English',
          rating: 8.8,
          reviews: 2847,
          releaseDate: '16 July 2010',
          description: 'A skilled thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O. is the pinnacle of science fiction filmmaking.',
          posterUrl: 'https://images.unsplash.com/photo-1540224477063-df0d0d3a58ab?w=400&h=600&fit=crop',
          trending: true,
          cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Ellen Page'],
          director: 'Christopher Nolan',
          budget: '$160 Million',
          boxOffice: '$839 Million'
        },
        '2': {
          _id: '2',
          title: 'The Dark Knight',
          genre: ['Action', 'Crime'],
          duration: '152 min',
          language: 'English',
          rating: 9.0,
          reviews: 3256,
          releaseDate: '18 July 2008',
          description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests to fight injustice.',
          posterUrl: 'https://images.unsplash.com/photo-1489599849228-eb342a5694d1?w=400&h=600&fit=crop',
          trending: true,
          cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
          director: 'Christopher Nolan',
          budget: '$185 Million',
          boxOffice: '$1.005 Billion'
        },
        '3': {
          _id: '3',
          title: 'Interstellar',
          genre: ['Adventure', 'Drama', 'Sci-Fi'],
          duration: '169 min',
          language: 'English',
          rating: 8.6,
          reviews: 2934,
          releaseDate: '6 November 2014',
          description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival. A masterpiece of scientific imagination and human emotion.',
          posterUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop',
          trending: false,
          cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
          director: 'Christopher Nolan',
          budget: '$165 Million',
          boxOffice: '$731 Million'
        },
        '4': {
          _id: '4',
          title: 'Pulp Fiction',
          genre: ['Crime', 'Drama'],
          duration: '154 min',
          language: 'English',
          rating: 8.9,
          reviews: 2156,
          releaseDate: '14 October 1994',
          description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
          posterUrl: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop',
          trending: false,
          cast: ['John Travolta', 'Samuel L. Jackson', 'Uma Thurman'],
          director: 'Quentin Tarantino',
          budget: '$8 Million',
          boxOffice: '$213.9 Million'
        },
        '5': {
          _id: '5',
          title: 'Forrest Gump',
          genre: ['Drama', 'Romance'],
          duration: '142 min',
          language: 'English',
          rating: 8.8,
          reviews: 1987,
          releaseDate: '6 July 1994',
          description: 'The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man with an IQ of 75.',
          posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop',
          trending: false,
          cast: ['Tom Hanks', 'Sally Field', 'Gary Sinise'],
          director: 'Robert Zemeckis',
          budget: '$55 Million',
          boxOffice: '$677.9 Million'
        },
        '6': {
          _id: '6',
          title: 'The Matrix',
          genre: ['Action', 'Sci-Fi'],
          duration: '136 min',
          language: 'English',
          rating: 8.7,
          reviews: 3102,
          releaseDate: '31 March 1999',
          description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
          posterUrl: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=400&h=600&fit=crop',
          trending: false,
          cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
          director: 'Lana Wachowski, Lilly Wachowski',
          budget: '$63 Million',
          boxOffice: '$467.2 Million'
        },
        '7': {
          _id: '7',
          title: 'Oppenheimer',
          genre: ['Biography', 'Drama', 'History'],
          duration: '180 min',
          language: 'English',
          rating: 8.4,
          reviews: 4562,
          releaseDate: '21 July 2023',
          description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
          posterUrl: 'https://images.unsplash.com/photo-1618519032000-cd4628902d4a?w=400&h=600&fit=crop',
          trending: true,
          cast: ['Cillian Murphy', 'Robert Downey Jr.', 'Emily Blunt'],
          director: 'Christopher Nolan',
          budget: '$100 Million',
          boxOffice: '$952 Million'
        },
        '8': {
          _id: '8',
          title: 'Avatar',
          genre: ['Action', 'Adventure', 'Sci-Fi'],
          duration: '162 min',
          language: 'English',
          rating: 7.8,
          reviews: 3478,
          releaseDate: '18 December 2009',
          description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
          posterUrl: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop',
          trending: true,
          cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
          director: 'James Cameron',
          budget: '$237 Million',
          boxOffice: '$2.923 Billion'
        },
        '9': {
          _id: '9',
          title: 'Vikram',
          genre: ['Action', 'Thriller'],
          duration: '176 min',
          language: 'Tamil',
          rating: 8.5,
          reviews: 1824,
          releaseDate: '03 June 2022',
          description: 'A high-octane action thriller from South Indian cinema.',
          posterUrl: 'https://images.unsplash.com/photo-1581905764498-3a2d5d0e9f5a?w=400&h=600&fit=crop',
          trending: true,
          cast: ['Kamal Haasan', 'Vijay Sethupathi', 'Fahadh Faasil'],
          director: 'Lokesh Kanagaraj',
          budget: '$35 Million',
          boxOffice: '$120 Million'
        },
        '10': {
          _id: '10',
          title: 'Jai Bhim',
          genre: ['Drama'],
          duration: '164 min',
          language: 'Tamil',
          rating: 8.6,
          reviews: 1420,
          releaseDate: '02 November 2021',
          description: 'A courtroom drama based on true events.',
          posterUrl: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=600&fit=crop',
          trending: false,
          cast: ['Suriya', 'Lijomol Jose'],
          director: 'T.J. Gnanavel',
          budget: '$10 Million',
          boxOffice: '$30 Million'
        },
        '11': {
          _id: '11',
          title: 'Soorarai Pottru',
          genre: ['Drama', 'Biography'],
          duration: '153 min',
          language: 'Tamil',
          rating: 8.7,
          reviews: 1980,
          releaseDate: '12 November 2020',
          description: 'An inspiring tale about taking on the aviation industry.',
          posterUrl: 'https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=400&h=600&fit=crop',
          trending: true,
          cast: ['Suriya', 'Aparna Balamurali'],
          director: 'Sudha Kongara',
          budget: '$15 Million',
          boxOffice: '$45 Million'
        },
        '12': {
          _id: '12',
          title: 'Master',
          genre: ['Action', 'Drama'],
          duration: '175 min',
          language: 'Tamil',
          rating: 7.9,
          reviews: 1675,
          releaseDate: '13 January 2021',
          description: 'A clash between a professor and a gangster in college backdrop.',
          posterUrl: 'https://images.unsplash.com/photo-1513185158878-7f01b5f9c6b3?w=400&h=600&fit=crop',
          trending: false,
          cast: ['Vijay', 'Vijay Sethupathi'],
          director: 'Lokesh Kanagaraj',
          budget: '$20 Million',
          boxOffice: '$70 Million'
        },
        '13': {
          _id: '13',
          title: 'Enthiran (Robot)',
          genre: ['Sci-Fi', 'Action'],
          duration: '158 min',
          language: 'Tamil',
          rating: 7.3,
          reviews: 2012,
          releaseDate: '01 October 2010',
          description: 'A scientist creates a humanoid robot with unexpected consequences.',
          posterUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=600&fit=crop',
          trending: false,
          cast: ['Rajinikanth', 'Aishwarya Rai Bachchan'],
          director: 'S. Shankar',
          budget: '$30 Million',
          boxOffice: '$280 Million'
        },
        '14': {
          _id: '14',
          title: 'Kabali',
          genre: ['Action', 'Drama'],
          duration: '141 min',
          language: 'Tamil',
          rating: 7.0,
          reviews: 980,
          releaseDate: '22 July 2016',
          description: 'A gangster drama starring a megastar of Tamil cinema.',
          posterUrl: 'https://images.unsplash.com/photo-1508610048659-a06a7b1f8a3b?w=400&h=600&fit=crop',
          trending: false,
          cast: ['Rajinikanth'],
          director: 'Pa. Ranjith',
          budget: '$25 Million',
          boxOffice: '$150 Million'
        }
      };

      setMovie(mockMovies[movieId]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movie:', error);
      setLoading(false);
    }
  };

  const fetchTheaters = async () => {
    try {
      // Mock theater data
      const mockTheaters = [
        {
          _id: 'theater_1',
          name: 'PVR Cinemas',
          city: 'Mumbai',
          address: '123 Main Street, Mumbai',
          screens: 5
        },
        {
          _id: 'theater_2',
          name: 'Inox',
          city: 'Mumbai',
          address: '456 Park Avenue, Mumbai',
          screens: 4
        },
        {
          _id: 'theater_3',
          name: 'IMAX',
          city: 'Delhi',
          address: '789 MG Road, Delhi',
          screens: 3
        }
      ];
      setTheaters(mockTheaters);
    } catch (error) {
      console.error('Error fetching theaters:', error);
    }
  };

  const handleTheaterSelect = (theaterId) => {
    setSelectedTheater(theaterId);
    fetchShowsByTheater(theaterId);
  };

  const fetchShowsByTheater = async (theaterId) => {
    try {
      // Mock shows data
      const mockShows = {
        'theater_1': [
          {
            _id: 'show_1',
            startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
            endTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
            price: 200,
            availableSeats: 30,
            totalSeats: 48
          },
          {
            _id: 'show_2',
            startTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
            endTime: new Date(Date.now() + 8 * 60 * 60 * 1000),
            price: 200,
            availableSeats: 42,
            totalSeats: 48
          },
          {
            _id: 'show_4',
            startTime: new Date(Date.now() + 10 * 60 * 60 * 1000),
            endTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
            price: 150,
            availableSeats: 20,
            totalSeats: 48
          }
        ],
        'theater_2': [
          {
            _id: 'show_1',
            startTime: new Date(Date.now() + 2.5 * 60 * 60 * 1000),
            endTime: new Date(Date.now() + 4.5 * 60 * 60 * 1000),
            price: 220,
            availableSeats: 25,
            totalSeats: 48
          },
          {
            _id: 'show_3',
            startTime: new Date(Date.now() + 7 * 60 * 60 * 1000),
            endTime: new Date(Date.now() + 9 * 60 * 60 * 1000),
            price: 250,
            availableSeats: 55,
            totalSeats: 72
          }
        ],
        'theater_3': [
          {
            _id: 'show_2',
            startTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
            endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
            price: 200,
            availableSeats: 40,
            totalSeats: 48
          }
        ]
      };

      setShows(mockShows[theaterId] || []);
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  };

  const handleSelectSeats = (showId) => {
    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }
    navigate(`/seat-selection/${showId}`);
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <div className="loader-spinner">Loading...</div>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container className="mt-5 text-center">
        <div className="alert alert-warning">Movie not found</div>
      </Container>
    );
  }

  return (
    <div className="movie-detail-page">
      {/* Movie Header Section */}
      <div className="movie-header" style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${movie.posterUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <Container className="py-5">
          <Row className="align-items-end">
            <Col md={3} className="mb-3">
              <div className="movie-poster">
                <img src={movie.posterUrl} alt={movie.title} className="img-fluid rounded shadow-lg" />
              </div>
            </Col>
            <Col md={9} className="text-white">
              <h1 className="display-4 fw-bold mb-2">{movie.title}</h1>
              
              <div className="badges-container mb-3">
                {movie.trending && <Badge className="badge-trending me-2">🔥 Trending</Badge>}
                <Badge bg="danger" className="me-2">⭐ {movie.rating}/10</Badge>
                <Badge bg="info" className="me-2">{movie.reviews?.toLocaleString() || 0} Reviews</Badge>
              </div>

              <div className="movie-meta mb-4">
                <p className="mb-2"><strong>📅 Release Date:</strong> {movie.releaseDate}</p>
                <p className="mb-2"><strong>⏱️ Duration:</strong> {movie.duration}</p>
                <p className="mb-2"><strong>🗣️ Language:</strong> {movie.language}</p>
                <p className="mb-2">
                  <strong>🎭 Genres:</strong> {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                </p>
              </div>

              <p className="lead">{movie.description}</p>

              <div className="additional-info mt-4">
                {movie.director && <p><strong>Director:</strong> {movie.director}</p>}
                {movie.cast && <p><strong>Cast:</strong> {movie.cast.join(', ')}</p>}
                {movie.budget && <p><strong>Budget:</strong> {movie.budget}</p>}
                {movie.boxOffice && <p><strong>Box Office:</strong> {movie.boxOffice}</p>}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Theater Selection Section */}
      <Container className="py-5">
        <div className="theaters-section">
          <h2 className="mb-4 text-center">Select a Theater to Book Tickets</h2>
          
          <Accordion className="theaters-accordion">
            {theaters.map((theater, index) => (
              <Accordion.Item eventKey={index.toString()} key={theater._id} className="theater-item">
                <Accordion.Header className="theater-header">
                  <div className="theater-info">
                    <h5 className="mb-0 me-3">{theater.name}</h5>
                    <span className="theater-details">{theater.city} • {theater.screens} screens</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="theater-body">
                  <p className="text-muted mb-3">📍 {theater.address}</p>
                  
                  <h6 className="mt-3 mb-3">Available Shows</h6>
                  <Row>
                    {selectedTheater === theater._id && shows.length > 0 ? (
                      shows.map((show) => (
                        <Col md={6} lg={4} key={show._id} className="mb-3">
                          <Card className="show-card h-100 shadow-sm">
                            <Card.Body>
                              <div className="show-time">
                                {new Date(show.startTime).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true
                                })}
                              </div>
                              <p className="text-muted small">
                                {new Date(show.startTime).toLocaleDateString()}
                              </p>
                              <hr />
                              <div className="show-details mb-3">
                                <p><strong>💰 Price:</strong> ₹{show.price}</p>
                                <p><strong>🪑 Seats:</strong> {show.availableSeats}/{show.totalSeats} available</p>
                              </div>
                              <Button
                                className="w-100 btn-book-seats"
                                onClick={() => handleSelectSeats(show._id)}
                                disabled={show.availableSeats === 0}
                              >
                                {show.availableSeats > 0 ? '🎫 Select Seats' : '❌ Show Full'}
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))
                    ) : selectedTheater === theater._id && shows.length === 0 ? (
                      <Col md={12}>
                        <div className="alert alert-info">No shows available for this theater</div>
                      </Col>
                    ) : (
                      <Col md={12}>
                        <Button
                          className="btn-view-shows"
                          onClick={() => handleTheaterSelect(theater._id)}
                        >
                          View Shows
                        </Button>
                      </Col>
                    )}
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </Container>
    </div>
  );
};

export default MovieDetailPage;
