import React from 'react';
import { Container, Table, Button, Alert, Card, Row, Col, Badge } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { bookingService } from '../services/services';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/MyBookings.css';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, confirmed, cancelled
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.id) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const userId = user?.id || user?._id || 'user_123';
      const response = await bookingService.getUserBookings(userId);
      if (response.data && response.data.data) {
        setBookings(response.data.data);
      } else if (response.data) {
        setBookings(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Mock bookings for demo
      setBookings([
        {
          _id: 'booking_1',
          movieTitle: 'Inception',
          theaterName: 'PVR Cinemas',
          showTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleString(),
          seats: ['A1', 'A2'],
          totalAmount: 600,
          status: 'Confirmed',
          bookingId: 'BMS1704067890'
        },
        {
          _id: 'booking_2',
          movieTitle: 'The Dark Knight',
          theaterName: 'Inox',
          showTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleString(),
          seats: ['B5', 'B6', 'B7'],
          totalAmount: 900,
          status: 'Confirmed',
          bookingId: 'BMS1704067891'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await bookingService.cancelBooking(bookingId);
      fetchBookings();
      alert('Booking cancelled successfully');
    } catch (error) {
      alert('Error cancelling booking');
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status?.toLowerCase() === filter;
  });

  if (!user) {
    return (
      <Container className="mt-5">
        <Alert variant="warning" className="alert-login">
          <h5>📋 Please login to view your bookings</h5>
          <Button variant="primary" onClick={() => navigate('/login')}>Go to Login</Button>
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <div className="loader-spinner">Loading your bookings...</div>
      </Container>
    );
  }

  return (
    <div className="my-bookings-page">
      <Container className="py-5">
        <div className="bookings-header mb-5">
          <h1 className="display-5 fw-bold">📋 My Bookings</h1>
          <p className="text-muted">Manage and view all your movie bookings</p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs mb-4">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline-primary'}
            className="me-2"
            onClick={() => setFilter('all')}
          >
            All Bookings ({bookings.length})
          </Button>
          <Button
            variant={filter === 'confirmed' ? 'success' : 'outline-success'}
            className="me-2"
            onClick={() => setFilter('confirmed')}
          >
            Confirmed ({bookings.filter(b => b.status?.toLowerCase() === 'confirmed').length})
          </Button>
          <Button
            variant={filter === 'cancelled' ? 'danger' : 'outline-danger'}
            onClick={() => setFilter('cancelled')}
          >
            Cancelled ({bookings.filter(b => b.status?.toLowerCase() === 'cancelled').length})
          </Button>
        </div>

        {/* No Bookings */}
        {filteredBookings.length === 0 ? (
          <Alert variant="info" className="alert-no-bookings">
            <h5>🎬 No {filter !== 'all' ? filter : ''} bookings found</h5>
            <p className="mb-0">Start booking your favorite movies now!</p>
            <Button variant="primary" className="mt-3" onClick={() => navigate('/')}>
              Browse Movies
            </Button>
          </Alert>
        ) : (
          /* Bookings Grid */
          <Row>
            {filteredBookings.map((booking) => (
              <Col md={6} lg={4} key={booking._id} className="mb-4">
                <Card className="booking-card h-100 shadow-sm">
                  {/* Status Badge */}
                  <div className="booking-status-badge">
                    {booking.status?.toLowerCase() === 'confirmed' ? (
                      <Badge bg="success">✓ Confirmed</Badge>
                    ) : booking.status?.toLowerCase() === 'cancelled' ? (
                      <Badge bg="danger">✗ Cancelled</Badge>
                    ) : (
                      <Badge bg="warning">⏳ Pending</Badge>
                    )}
                  </div>

                  <Card.Body>
                    {/* Movie Title */}
                    <h5 className="booking-movie-title">
                      🎬 {booking.movieTitle || booking.movieId?.title || 'Movie'}
                    </h5>

                    {/* Booking Details */}
                    <div className="booking-details mt-3">
                      <p className="detail-item">
                        <strong>🎭 Theater:</strong> {booking.theaterName || 'N/A'}
                      </p>
                      <p className="detail-item">
                        <strong>🕐 Show Time:</strong> {booking.showTime || 'N/A'}
                      </p>
                      <p className="detail-item">
                        <strong>🪑 Seats:</strong> 
                        <div className="seats-display">
                          {booking.seats && booking.seats.length > 0
                            ? booking.seats.map((seat, idx) => (
                                <span key={idx} className="seat-badge">{seat}</span>
                              ))
                            : 'N/A'}
                        </div>
                      </p>
                    </div>

                    {/* Price and ID */}
                    <div className="booking-footer mt-4 pt-3 border-top">
                      <Row>
                        <Col>
                          <p className="mb-1 text-muted small">Total Amount</p>
                          <h6 className="price">₹{booking.totalAmount || 0}</h6>
                        </Col>
                        <Col className="text-end">
                          <p className="mb-1 text-muted small">Booking ID</p>
                          <p className="booking-id">{booking.bookingId || booking._id}</p>
                        </Col>
                      </Row>
                    </div>

                    {/* Action Button */}
                    <div className="booking-actions mt-3">
                      {booking.status?.toLowerCase() === 'confirmed' ? (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="w-100"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to cancel this booking?')) {
                              handleCancelBooking(booking._id);
                            }
                          }}
                        >
                          ❌ Cancel Booking
                        </Button>
                      ) : (
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-100"
                          disabled
                        >
                          {booking.status?.toLowerCase() === 'cancelled' ? 'Cancelled' : 'No Action Available'}
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default MyBookingsPage;
