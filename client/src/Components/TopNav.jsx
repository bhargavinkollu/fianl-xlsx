import React from 'react'
import { Link } from 'react-router-dom';
export const TopNav = () => {
  return (
 <>
  <ul class="nav justify-content-center">
    {/* demo */}
    
    
        <li class="nav-item">
          <Link class="nav-link" to="/adminlogin">Admin Login</Link>
          
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/employeelogin">Employee Login</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/bankform">Form</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/sidenavigation">Inside</Link>
        </li>
      </ul>
 </>
  )
}
