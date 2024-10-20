import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInForm from './Pages/SignInForm';
import Dashboard from './Pages/Dashboard';
import RegistrationForm from './Pages/RegistrationForm';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<RegistrationForm/>}/>
        <Route path="/signin" element={<SignInForm/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
