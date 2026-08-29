import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import { useDispatch } from 'react-redux'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'
import { Toaster } from "react-hot-toast";

const App = () => {

  const dispatch = useDispatch();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const getUserData = async () => {
    const token = localStorage.getItem('token');

    try {
      if (token) {
        const { data } = await api.get('/api/users/data', {
          headers: {
            Authorization: token
          }
        });

        if (data.user) {
          dispatch(login({
            token,
            user: data.user
          }));
        }

        dispatch(setLoading(false));

      } else {
        dispatch(setLoading(false));
      }

    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message);
    }
  };


  // DARK MODE
  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add('dark');

      localStorage.setItem('theme', 'dark');

    } else {

      document.documentElement.classList.remove('dark');

      localStorage.setItem('theme', 'light');

    }

  }, [darkMode]);


  // USER DATA
  useEffect(() => {
    getUserData();
  }, []);


  return (
    <>

      <Toaster />

      <Routes>

        <Route
          path="/"
          element={
            <Home
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />

        <Route
          path="app"
          element={
            <Layout
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        >

          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="builder/:resumeId"
            element={<ResumeBuilder />}
          />

        </Route>

        <Route
          path="view/:resumeId"
          element={<Preview />}
        />

      </Routes>

    </>
  )
}

export default App