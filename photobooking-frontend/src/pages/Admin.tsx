import React, { useState } from "react";
import { 
  MdPeople, 
  MdAttachMoney, 
  MdCalendarToday,
  MdCheckCircle,
  MdPending,
  MdCancel
} from "react-icons/md";
import { FaCamera, FaChartLine } from "react-icons/fa";
import "../styles/admin.css";

interface Booking {
  id: number;
  clientName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  amount: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  message?: string;
  paymentProofUrl?: string; // URL to uploaded proof image
}

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "bookings" | "calendar">("dashboard");

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      clientName: "Maria Santos",
      email: "maria@example.com",
      phone: "+63 912 345 6789",
      service: "Wedding Photography",
      date: "2025-12-15",
      amount: 25000,
      status: "confirmed",
      message: "Full-day coverage, include preparation and reception.",
      paymentProofUrl: "https://via.placeholder.com/400x250?text=GCash+Proof+1",
    },
    {
      id: 2,
      clientName: "Juan Dela Cruz",
      email: "juan@example.com",
      phone: "+63 923 456 7890",
      service: "Portrait Photography",
      date: "2025-12-01",
      amount: 5000,
      status: "pending",
      message: "Outdoor golden hour photoshoot.",
      paymentProofUrl: "https://via.placeholder.com/400x250?text=GCash+Proof+2",
    },
    {
      id: 3,
      clientName: "Ana Lopez",
      email: "ana@example.com",
      phone: "+63 934 567 8901",
      service: "Event Photography",
      date: "2025-11-28",
      amount: 15000,
      status: "completed",
      message: "Corporate event at BGC, 3-hour coverage.",
      paymentProofUrl: "https://via.placeholder.com/400x250?text=GCash+Proof+3",
    },
  ]);

  // Filter state
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "completed">("all");

  // Modal state
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /** ACTIONS **/
  const updateStatus = (id: number, newStatus: Booking["status"]) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const confirmBooking = (id: number) => updateStatus(id, "confirmed");
  const rejectBooking = (id: number) => updateStatus(id, "cancelled");
  const completeBooking = (id: number) => updateStatus(id, "completed");

  /** FILTERED LIST **/
  const filteredBookings = bookings.filter(b =>
    filter === "all" ? true : b.status === filter
  );

  /** STATS **/
  const totalClients = bookings.length;
  const totalEarnings = bookings
    .filter(b => b.status === "completed")
    .reduce((sum, b) => sum + b.amount, 0);

  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const confirmedBookings = bookings.filter(b => b.status === "confirmed").length;

  /** HELPERS **/
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <MdCheckCircle />;
      case "pending":
        return <MdPending />;
      case "cancelled":
        return <MdCancel />;
      case "completed":
        return <MdCheckCircle />;
      default:
        return <MdCheckCircle />;
    }
  };

  const getStatusClass = (status: string) => `status-badge status-${status}`;

  /** MODAL HELPERS **/
  const openBookingModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // close when clicking outside the modal content
    if (e.target === e.currentTarget) {
      closeBookingModal();
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage your photography business</p>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            <FaChartLine />
            Dashboard
          </button>
          <button
            className={`tab-btn ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <FaCamera />
            Bookings
          </button>
          <button
            className={`tab-btn ${activeTab === "calendar" ? "active" : ""}`}
            onClick={() => setActiveTab("calendar")}
          >
            <MdCalendarToday />
            Calendar
          </button>
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="dashboard-content">
            {/* Statistics */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon earnings">
                  <MdAttachMoney />
                </div>
                <div className="stat-info">
                  <h3>Total Earnings</h3>
                  <p className="stat-value">₱{totalEarnings.toLocaleString()}</p>
                  <span className="stat-label">Completed bookings</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon clients">
                  <MdPeople />
                </div>
                <div className="stat-info">
                  <h3>Total Clients</h3>
                  <p className="stat-value">{totalClients}</p>
                  <span className="stat-label">All time</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon pending">
                  <MdPending />
                </div>
                <div className="stat-info">
                  <h3>Pending</h3>
                  <p className="stat-value">{pendingBookings}</p>
                  <span className="stat-label">Awaiting confirmation</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon confirmed">
                  <MdCheckCircle />
                </div>
                <div className="stat-info">
                  <h3>Confirmed</h3>
                  <p className="stat-value">{confirmedBookings}</p>
                  <span className="stat-label">Upcoming shoots</span>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="recent-section">
              <h2>Recent Bookings</h2>
              <div className="bookings-table">
                <table>
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((booking) => (
                      <tr key={booking.id}>
                        <td>
                          <div className="client-info">
                            <strong>{booking.clientName}</strong>
                            <span>{booking.email}</span>
                          </div>
                        </td>
                        <td>{booking.service}</td>
                        <td>{new Date(booking.date).toLocaleDateString()}</td>
                        <td>₱{booking.amount.toLocaleString()}</td>
                        <td>
                          <span className={getStatusClass(booking.status)}>
                            {getStatusIcon(booking.status)}
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="table-view-btn"
                            onClick={() => openBookingModal(booking)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* BOOKINGS TAB */}
        {activeTab === "bookings" && (
          <div className="bookings-content">
            <div className="bookings-header">
              <h2>All Bookings</h2>

              <div className="filter-buttons">
                {["all", "pending", "confirmed", "completed"].map((f) => (
                  <button
                    key={f}
                    className={`filter-btn ${filter === f ? "active" : ""}`}
                    onClick={() => setFilter(f as any)}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="bookings-list">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <div className="booking-client">
                      <h3>{booking.clientName}</h3>
                      <p>{booking.email}</p>
                      <p>{booking.phone}</p>
                    </div>
                    <span className={getStatusClass(booking.status)}>
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </span>
                  </div>

                  <div className="booking-details">
                    <div className="detail-item">
                      <strong>Service:</strong>
                      <span>{booking.service}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Date:</strong>
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Amount:</strong>
                      <span>₱{booking.amount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="booking-actions">
                    {booking.status === "pending" && (
                      <>
                        <button
                          className="action-btn confirm"
                          onClick={() => confirmBooking(booking.id)}
                        >
                          Confirm
                        </button>
                        <button
                          className="action-btn reject"
                          onClick={() => rejectBooking(booking.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {booking.status === "confirmed" && (
                      <button
                        className="action-btn complete"
                        onClick={() => completeBooking(booking.id)}
                      >
                        Mark as Completed
                      </button>
                    )}

                    <button
                      className="action-btn view"
                      onClick={() => openBookingModal(booking)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CALENDAR TAB */}
        {activeTab === "calendar" && (
          <div className="calendar-content">
            <h2>Booking Calendar</h2>
            <div className="calendar-wrapper">
              <div className="calendar-header">
                <button className="calendar-nav">‹</button>
                <h3>December 2025</h3>
                <button className="calendar-nav">›</button>
              </div>

              <div className="calendar-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="calendar-day-header">
                    {d}
                  </div>
                ))}

                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2; // simple offset
                  const hasBooking = bookings.some(
                    (b) => new Date(b.date).getDate() === day
                  );

                  return (
                    <div
                      key={i}
                      className={`calendar-day ${
                        day < 1 || day > 31 ? "inactive" : ""
                      } ${hasBooking ? "has-booking" : ""}`}
                    >
                      {day > 0 && day <= 31 ? day : ""}
                      {hasBooking && <span className="booking-dot"></span>}
                    </div>
                  );
                })}
              </div>

              <div className="calendar-legend">
                <div className="legend-item">
                  <span className="legend-dot has-booking"></span>
                  <span>Has Booking</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot"></span>
                  <span>Available</span>
                </div>
              </div>
            </div>

            <div className="upcoming-schedule">
              <h3>Upcoming Shoots</h3>
              {bookings
                .filter((b) => b.status === "confirmed")
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                .map((booking) => (
                  <div key={booking.id} className="schedule-item">
                    <div className="schedule-date">
                      <span className="date-day">
                        {new Date(booking.date).getDate()}
                      </span>
                      <span className="date-month">
                        {new Date(booking.date).toLocaleDateString("en-US", {
                          month: "short",
                        })}
                      </span>
                    </div>
                    <div className="schedule-details">
                      <h4>{booking.service}</h4>
                      <p>{booking.clientName}</p>
                      <p className="schedule-phone">{booking.phone}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 🔍 BOOKING DETAILS MODAL */}
        {isModalOpen && selectedBooking && (
          <div className="booking-modal-overlay" onClick={handleOverlayClick}>
            <div className="booking-modal">
              <button className="modal-close-btn" onClick={closeBookingModal}>
                ×
              </button>

              <div className="modal-header">
                <h2>Booking Details</h2>
                <span className={getStatusClass(selectedBooking.status)}>
                  {getStatusIcon(selectedBooking.status)}
                  {selectedBooking.status}
                </span>
              </div>

              <div className="modal-section">
                <h3>Client Information</h3>
                <p><strong>Name:</strong> {selectedBooking.clientName}</p>
                <p><strong>Email:</strong> {selectedBooking.email}</p>
                <p><strong>Phone:</strong> {selectedBooking.phone}</p>
              </div>

              <div className="modal-section">
                <h3>Booking Details</h3>
                <p><strong>Service:</strong> {selectedBooking.service}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedBooking.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Amount:</strong> ₱
                  {selectedBooking.amount.toLocaleString()}
                </p>
              </div>

              <div className="modal-section">
                <h3>Notes / Message</h3>
                <p>
                  {selectedBooking.message
                    ? selectedBooking.message
                    : "No additional notes provided."}
                </p>
              </div>

              <div className="modal-section">
                <h3>Payment Proof</h3>
                {selectedBooking.paymentProofUrl ? (
                  <div className="payment-proof-wrapper">
                    <img
                      src={selectedBooking.paymentProofUrl}
                      alt="Payment proof"
                      className="payment-proof-image"
                    />
                  </div>
                ) : (
                  <p>No payment proof uploaded.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
