import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import ContactList from './components/ContactList';
import ContactsByCounty from './components/ContactsByCounty';
import PhoneSearch from './components/PhoneSearch';
import CreateContactForm from './components/CreateContactForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/contacts' element={<ContactList />}/>
        <Route path='/filter' element={<ContactsByCounty />}/>
        <Route path='/add' element={<CreateContactForm />}/>
        <Route path='/search' element={<PhoneSearch />}/>
      </Routes>
    </Router>
  )
   
}

export default App;
