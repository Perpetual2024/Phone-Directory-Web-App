import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import ContactList from './components/ContactList';
import ContactsByCounty from './components/ContactsByCounty';
import PhoneSearch from './components/PhoneSearch';
import CreateContactForm from './components/CreateContactForm';
import ContactEdit from './components/ContactEdit';
import ContactView from './components/ContactView';
import ContactDelete from './components/ContactDelete';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/contacts' element={<ContactList />}/>
        <Route path='/filter' element={<ContactsByCounty />}/>
        <Route path='/add' element={<CreateContactForm />}/>
        <Route path='/search' element={<PhoneSearch />}/>
        <Route path='/contacts/:id/edit' element={<ContactEdit />}/>
        <Route path="/contacts/:id" element={<ContactView />} />
        <Route path="/contacts/:id/delete" element={<ContactDelete />} />
        
      </Routes>
    </Router>
  )
   
}

export default App;
