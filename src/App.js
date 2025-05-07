import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ContactsByCounty from './components/ContactsByCounty';
import PhoneSearch from './components/PhoneSearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/contacts' element={<ContactList />}/>
        <Route path='/add' element={<ContactForm />}/>
        <Route path='/filter' element={<ContactsByCounty />}/>
        <Route path='/search' element={<PhoneSearch />}/>
      </Routes>
    </Router>
  )
   
}

export default App;
