import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('user');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  // Logs pour la présentation - comptes de test
  console.log('login : tony@stark.com password : password123');
  console.log('login : steve@rogers.com password : password456');



  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;