import { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import fallbackDoctors from "../data/fallbackDoctors";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDoctors() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://dummyjson.com/users");

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await response.json();

        const specialties = [
          "Cardiologist",
          "Dermatologist",
          "Neurologist",
          "Orthopedic",
          "Pediatrician",
          "Dentist",
          "General Physician",
          "ENT Specialist",
        ];

        const mappedDoctors = data.users.slice(0, 8).map((user, index) => ({
          id: user.id,
          name: `Dr. ${user.firstName} ${user.lastName}`,
          specialty: specialties[index % specialties.length],
          experience: `${5 + index} years`,
          location: "Delhi",
          rating: (4 + (index % 10) / 10).toFixed(1),
          image: user.image,
        }));

        setDoctors(mappedDoctors);
      } catch (err) {
        setError("Could not load doctors. Showing backup data.");
        setDoctors(fallbackDoctors);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="doctors-page">
      <div className="doctors-page-header">
        <h1>Find Your Specialist</h1>
        <p>Choose from trusted doctors in your city.</p>
      </div>

      <div className="search-bar-wrapper">
        <span className="search-icon">⌕</span>
        <input
          type="text"
          placeholder="Search by doctor name or specialty"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p className="status-message">Loading doctors...</p>}

      {!loading && error && <p className="error-message">{error}</p>}

      {!loading && (
        <div className="doctors-grid">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <p className="status-message">No doctors found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Doctors;