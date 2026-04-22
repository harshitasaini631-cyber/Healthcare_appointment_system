import { useAppointmentContext } from "../context/AppointmentContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


function Analytics() {
  const { appointments } = useAppointmentContext();

  const specialtyCounts = appointments.reduce((acc, appointment) => {
    const specialty = appointment.specialty;
    const existing = acc.find((item) => item.specialty === specialty);

    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ specialty, count: 1 });
    }

    return acc;
  }, []);

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>Appointments Analytics</h1>
        <p>Overview of your booked appointments by specialty.</p>
      </div>


      <div className="stats-grid">
        <div className="stat-card">
          <h3>{appointments.length}</h3>
          <p>Total Bookings</p>
        </div>

        <div className="stat-card">
          <h3>{specialtyCounts.length}</h3>
          <p>Specialties</p>
        </div>

        <div className="stat-card">
          <h3>
            {appointments.filter((item) => item.status === "Upcoming").length}
          </h3>
          <p>Upcoming</p>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="empty-analytics">
          <h2>No analytics available yet</h2>
          <p>Book appointments to see chart insights here.</p>
        </div>
      ) : (
        <div className="chart-card">
          <h2>Appointments by Specialty</h2>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={specialtyCounts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="specialty" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#6c3fc9" radius={[10, 10, 0, 0]} />              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;