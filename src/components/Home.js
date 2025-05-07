import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Home.css'

function Home() {
  return (
    <div className="home-container">
      <h1>📱 Phone Directory</h1>
      <p>Welcome to the Phone Directory App. You can search, view, and manage contacts.</p>

      <div className="home-actions">
        <Link to="/contacts">
          <button>📋 View Contacts</button>
        </Link>
        
        <Link to="/search">
          <button>🔍 Search by Phone</button>
        </Link>
        <Link to="/filter">
          <button>📍 Filter by County</button>
        </Link>
      </div>
    </div>
  );
  
}

export default Home