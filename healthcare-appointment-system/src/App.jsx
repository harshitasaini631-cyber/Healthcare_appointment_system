import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/DoctorDetails";
import BookAppointment from "./pages/BookAppointment";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

import { AppointmentProvider } from "./context/AppointmentContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <AppointmentProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctor/:id" element={<DoctorDetails />} />
            <Route path="/book/:id" element={<BookAppointment />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </AppointmentProvider>
    </ThemeProvider>
  );
}

export default App;