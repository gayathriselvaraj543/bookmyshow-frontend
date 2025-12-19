import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert, Card, Badge } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/BookingConfirmation.css';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [error, setError] = useState(null);

  const bookingDetails = location.state || {};

  const mockMovies = {
    '1': { title: 'Inception', duration: 148, rating: 8.8 },
    '2': { title: 'The Dark Knight', duration: 152, rating: 9.0 },
    '3': { title: 'Interstellar', duration: 169, rating: 8.6 },
    '4': { title: 'Pulp Fiction', duration: 154, rating: 8.9 },
    '5': { title: 'Forrest Gump', duration: 142, rating: 8.8 },
    '6': { title: 'The Matrix', duration: 136, rating: 8.7 },
    '7': { title: 'Oppenheimer', duration: 180, rating: 8.4 },
    '8': { title: 'Avatar', duration: 162, rating: 7.8 },
    '9': { title: 'Vikram', duration: 176, rating: 8.5 },
    '10': { title: 'Jai Bhim', duration: 164, rating: 8.6 },
    '11': { title: 'Soorarai Pottru', duration: 153, rating: 8.7 },
    '12': { title: 'Master', duration: 175, rating: 7.9 },
    '13': { title: 'Enthiran (Robot)', duration: 158, rating: 7.3 },
    '14': { title: 'Kabali', duration: 141, rating: 7.0 }
  };

  const mockTheaters = {
    'theater_1': { name: 'PVR Cinemas', city: 'Mumbai', address: '123 Main St, Mumbai' },
    'theater_2': { name: 'Inox', city: 'Mumbai', address: '456 Park Ave, Mumbai' },
    'theater_3': { name: 'IMAX', city: 'Delhi', address: '789 MG Road, Delhi' }
  };

  const movie = mockMovies[bookingDetails.movieId] || {};
  const theater = mockTheaters[bookingDetails.theaterId] || {};

  const handleConfirmBooking = async () => {
    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate booking ID
      const newBookingId = `BMS${Date.now()}`;
      setBookingId(newBookingId);

      // Show success message for 3 seconds then redirect
      setTimeout(() => {
        navigate('/my-bookings');
      }, 3000);
    } catch (err) {
      setError('Failed to confirm booking. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (bookingId) {
    return (
      <Container className="mt-5 text-center">
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h2 className="mt-4">Booking Confirmed!</h2>
          <p className="text-muted">Your booking has been successfully completed</p>
          <Card className="mt-4 booking-card">
            <Card.Body>
              <h5>Booking ID: <span className="text-success">{bookingId}</span></h5>
              <p className="mt-3 text-muted">
                Confirmation email has been sent to: <strong>{user?.email}</strong>
              </p>
              <p className="text-muted">Redirecting to My Bookings...</p>
            </Card.Body>
          </Card>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Confirm Your Booking</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mt-4">
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Movie Details</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <div className="movie-poster-placeholder">
                    <img
                      src="https://via.placeholder.com/150x200?text=Movie"
                      alt={movie.title}
                      className="img-fluid rounded"
                    />
                  </div>
                </Col>
                <Col md={9}>
                  <h5>{movie.title}</h5>
                  <p className="text-muted">
                    <strong>Duration:</strong> {movie.duration} minutes
                  </p>
                  <p className="text-muted">
                    <strong>Rating:</strong> <span className="badge badge-info">{movie.rating}/10</span>
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Theater & Show Details</h5>
            </Card.Header>
            <Card.Body>
              <p className="mb-2">
                <strong>Theater:</strong> {theater.name}, {theater.city}
              </p>
              <p className="mb-2">
                <strong>Address:</strong> {theater.address}
              </p>
              <p className="mb-2">
                <strong>Show Time:</strong>{' '}
                {bookingDetails.showTime
                  ? new Date(bookingDetails.showTime).toLocaleString()
                  : 'N/A'}
              </p>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Selected Seats</h5>
            </Card.Header>
            <Card.Body>
              <div className="seats-summary">
                {bookingDetails.seats && bookingDetails.seats.map((seat, index) => (
                  <Badge key={index} bg="success" className="me-2 mb-2">
                    {seat}
                  </Badge>
                ))}
              </div>
              <p className="mt-3 text-muted">
                <strong>Total Seats:</strong> {bookingDetails.seats?.length || 0}
              </p>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Passenger Details</h5>
            </Card.Header>
            <Card.Body>
              <p className="mb-2">
                <strong>Name:</strong> {user?.name || 'Guest User'}
              </p>
              <p className="mb-2">
                <strong>Email:</strong> {user?.email || 'N/A'}
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> {user?.phone || 'Not provided'}
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="price-card sticky-top" style={{ top: '20px' }}>
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">Price Breakdown</h5>
            </Card.Header>
            <Card.Body>
              <div className="price-item">
                <span>Seat Charge:</span>
                <span>₹{bookingDetails.totalAmount || 0}</span>
              </div>
              <div className="price-item">
                <span>Booking Fee:</span>
                <span>₹50</span>
              </div>
              <div className="price-item">
                <span>GST (5%):</span>
                <span>₹{Math.round((bookingDetails.totalAmount || 0) * 0.05)}</span>
              </div>
              <hr />
              <div className="price-item total">
                <span>
                  <strong>Total Amount:</strong>
                </span>
                <span>
                  <strong>
                    ₹{((bookingDetails.totalAmount || 0) + 50 + Math.round((bookingDetails.totalAmount || 0) * 0.05))}
                  </strong>
                </span>
              </div>

              <Button
                variant="success"
                className="w-100 mt-4"
                onClick={handleConfirmBooking}
                disabled={loading}
                size="lg"
              >
                {loading ? 'Processing...' : 'Confirm & Pay'}
              </Button>

              <Button
                variant="secondary"
                className="w-100 mt-2"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                Back to Seat Selection
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingConfirmationPage;
