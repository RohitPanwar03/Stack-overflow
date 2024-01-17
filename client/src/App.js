import { useEffect } from 'react';
import { fetchAllQuestions } from './actions/questionaction';
import { useDispatch } from 'react-redux';
import AllRoutes from './AllRoutes';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { fetchAllUsers } from './actions/Users';



function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])

  return (
    <div>
      <Navbar />
      <AllRoutes />
    </div >
  );
}

export default App;
