import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-left">
          <span className="hero-badge">Smart Healthcare Booking</span>

          <h1>
            Book Trusted Doctors <br /> In Minutes
          </h1>

          <p>
            Find specialists, schedule appointments, manage bookings,
            and track healthcare visits through one modern platform.
          </p>

          <div className="hero-buttons">
            <Link to="/doctors" className="primary-btn">
              Find Doctors
            </Link>

            <Link to="/dashboard" className="secondary-btn">
              My Appointments
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-card">
            <h3>24/7 Booking</h3>
            <p>Book appointments anytime, anywhere.</p>
          </div>

          <div className="hero-card">
            <h3>Verified Doctors</h3>
            <p>Trusted specialists across your city.</p>
          </div>

          <div className="hero-card">
            <h3>Easy Dashboard</h3>
            <p>Reschedule and manage bookings quickly.</p>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div>
          <h2>100+</h2>
          <p>Doctors</p>
        </div>

        <div>
          <h2>10+</h2>
          <p>Specialties</p>
        </div>

        <div>
          <h2>24/7</h2>
          <p>Booking</p>
        </div>

        <div>
          <h2>Easy</h2>
          <p>Management</p>
        </div>
      </section>
    </div>
  );
}

export default Home;