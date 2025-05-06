import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import FilterSection from './components/FilterSection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/contacts' element={<ContactList />}/>
        <Route path='/add' element={<ContactForm />}/>
        <Route path='/filter' element={<FilterSection />}/>
      </Routes>
    </Router>
  )
   
}

export default App;
