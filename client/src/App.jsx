import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import UserDashboard from './pages/UserDashboard';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import MemberDashboard from './pages/MemberDashboard';
import DummyPayment from './pages/DummyPayment';
import WorkoutPage from './pages/WorkoutPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dummy-payment" element={<DummyPayment />} />
            <Route path="/workout" element={<WorkoutPage />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/:userId" element={<UserProfile />} />

            {/* Admin Route - List all users */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Protected Member Routes */}
            <Route path="/dashboard" element={
              <PrivateRoute role="member">
                <MemberDashboard />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" theme="dark" />
      </div>
    </Router>
  );
}

export default App;
