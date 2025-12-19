import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectSeats } from '../redux/bookingSlice';
import '../styles/SeatSelection.css';

const SeatSelectionPage = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedSeats = useSelector(state => state.booking.selectedSeats);
  const user = useSelector(state => state.auth.user);
  
  const [showDetails, setShowDetails] = useState(null);
  const [seatLayout, setSeatLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeatsLocal, setSelectedSeatsLocal] = useState([]);

  useEffect(() => {
    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }
    fetchShowDetails();
  }, [showId, user, navigate]);

  const fetchShowDetails = async () => {
    try {
      // Mock show details
      const mockShows = {
        'show_1': {
          _id: 'show_1',
          movieId: '1',
          theaterId: 'theater_1',
          startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
          availableSeats: 30,
          totalSeats: 48,
          price: 200,
          screen: {
            rows: ['A', 'B', 'C', 'D', 'E', 'F'],
            columns: 8,
            seatConfiguration: generateMockSeats(6, 8)
          }
        },
        'show_2': {
          _id: 'show_2',
          movieId: '1',
          theaterId: 'theater_1',
          startTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
          availableSeats: 42,
          totalSeats: 48,
          price: 200,
          screen: {
            rows: ['A', 'B', 'C', 'D', 'E', 'F'],
            columns: 8,
            seatConfiguration: generateMockSeats(6, 8, ['A2', 'B3', 'C4'])
          }
        },
        'show_3': {
          _id: 'show_3',
          movieId: '1',
          theaterId: 'theater_2',
          startTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
          availableSeats: 55,
          totalSeats: 72,
          price: 250,
          screen: {
            rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
            columns: 8,
            seatConfiguration: generateMockSeats(9, 8)
          }
        },
        'show_4': {
          _id: 'show_4',
          movieId: '2',
          theaterId: 'theater_1',
          startTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
          availableSeats: 45,
          totalSeats: 48,
          price: 200,
          screen: {
            rows: ['A', 'B', 'C', 'D', 'E', 'F'],
            columns: 8,
            seatConfiguration: generateMockSeats(6, 8)
          }
        }
      };

      const show = mockShows[showId];
      if (show) {
        setShowDetails(show);
        setSeatLayout(show.screen);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching show details:', error);
      setLoading(false);
    }
  };

  const generateMockSeats = (rows, cols, bookedSeats = []) => {
    const config = {};
    const rowLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const seatId = `${rowLabels[i]}${j + 1}`;
        config[seatId] = {
          row: rowLabels[i],
          column: j + 1,
          type: i < 2 ? 'premium' : 'standard',
          price: i < 2 ? 300 : 200,
          available: !bookedSeats.includes(seatId)
        };
      }
    }
    return config;
  };

  const toggleSeatSelection = (seatId, seat) => {
    if (!seat.available) return;
    
    if (selectedSeatsLocal.includes(seatId)) {
      setSelectedSeatsLocal(selectedSeatsLocal.filter(s => s !== seatId));
    } else {
      setSelectedSeatsLocal([...selectedSeatsLocal, seatId]);
    }
  };

  const handleBooking = () => {
    if (selectedSeatsLocal.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    const totalAmount = selectedSeatsLocal.reduce((sum, seatId) => {
      return sum + seatLayout.seatConfiguration[seatId].price;
    }, 0);

    dispatch(selectSeats(selectedSeatsLocal));
    
    // Navigate to confirmation with booking details
    navigate('/booking-confirmation', {
      state: {
        showId: showDetails._id,
        movieId: showDetails.movieId,
        theaterId: showDetails.theaterId,
        seats: selectedSeatsLocal,
        totalAmount,
        showTime: showDetails.startTime
      }
    });
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const totalPrice = selectedSeatsLocal.reduce((sum, seatId) => {
    return sum + seatLayout.seatConfiguration[seatId].price;
  }, 0);

  return (
    <Container className="mt-5">
      <h2>Select Your Seats</h2>
      <p>Show Time: {showDetails.startTime.toLocaleString()}</p>
      
      <Row className="mb-4">
        <Col md={8}>
          <div className="screen">SCREEN</div>
          
          <div className="seats-container mt-4">
            {seatLayout.rows.map((row, rowIndex) => (
              <div key={row} className="seat-row">
                <span className="row-label">{row}</span>
                <div className="seats">
                  {Array.from({ length: seatLayout.columns }).map((_, colIndex) => {
                    const seatId = `${row}${colIndex + 1}`;
                    const seat = seatLayout.seatConfiguration[seatId];
                    const isSelected = selectedSeatsLocal.includes(seatId);
                    const isBooked = !seat.available;

                    return (
                      <button
                        key={seatId}
                        className={`seat ${seat.type} ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                        onClick={() => toggleSeatSelection(seatId, seat)}
                        disabled={isBooked}
                        title={`${seatId} - ₹${seat.price}`}
                      >
                        {seatId}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="legend mt-4">
            <div><span className="seat standard"></span> Standard (₹200)</div>
            <div><span className="seat premium"></span> Premium (₹300)</div>
            <div><span className="seat booked"></span> Booked</div>
            <div><span className="seat selected"></span> Selected</div>
          </div>
        </Col>

        <Col md={4}>
          <div className="booking-summary p-3 border rounded">
            <h5>Booking Summary</h5>
            <hr />
            <p><strong>Selected Seats:</strong></p>
            <p className="text-primary">
              {selectedSeatsLocal.length > 0 ? selectedSeatsLocal.join(', ') : 'No seats selected'}
            </p>
            <hr />
            <p><strong>Price per Seat:</strong> ₹200 - ₹300</p>
            <p><strong>Number of Seats:</strong> {selectedSeatsLocal.length}</p>
            <h5 className="mt-3">Total Amount: ₹{totalPrice}</h5>
            <Button
              variant="success"
              className="w-100 mt-3"
              onClick={handleBooking}
              disabled={selectedSeatsLocal.length === 0}
            >
              Proceed to Payment
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SeatSelectionPage;
