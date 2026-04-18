import { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import fallbackDoctors from "../data/fallbackDoctors";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;

  useEffect(() => {
    async function fetchDoctors() {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/users");

        if (!response.ok) {
          throw new Error("Failed to fetch");
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

        const mappedDoctors = data.users.slice(0, 12).map((user, index) => ({
          id: user.id,
          name: `Dr. ${user.firstName} ${user.lastName}`,
          specialty: specialties[index % specialties.length],
          experience: `${5 + index} years`,
          location: "Delhi",
          rating: Number((4 + (index % 10) / 10).toFixed(1)),
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

  let filteredDoctors = doctors.filter((doctor) => {
    const matchSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchSpecialty =
      selectedSpecialty === "All" ||
      doctor.specialty === selectedSpecialty;

    return matchSearch && matchSpecialty;
  });

  if (sortOption === "rating-high") {
    filteredDoctors.sort((a, b) => b.rating - a.rating);
  }

  if (sortOption === "name-az") {
    filteredDoctors.sort((a, b) => a.name.localeCompare(b.name));
  }

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const startIndex = (currentPage - 1) * doctorsPerPage;
  const endIndex = startIndex + doctorsPerPage;

  const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);

  const specialtiesList = [
    "All",
    ...new Set(doctors.map((doctor) => doctor.specialty)),
  ];

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
          placeholder="Search doctor or specialty"
          className="search-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="filter-row">
        <select
          value={selectedSpecialty}
          onChange={(e) => {
            setSelectedSpecialty(e.target.value);
            setCurrentPage(1);
          }}
        >
          {specialtiesList.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="rating-high">Highest Rating</option>
          <option value="name-az">Name A-Z</option>
        </select>
      </div>

      {loading && <p className="status-message">Loading doctors...</p>}

      {!loading && error && <p className="error-message">{error}</p>}

      {!loading && (
        <>
          <div className="doctors-grid">
            {paginatedDoctors.length > 0 ? (
              paginatedDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))
            ) : (
              <p>No doctors found.</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
              >
                Prev
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Doctors;