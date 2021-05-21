import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import API from './utils/API';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [filter, setFilter] = useState('');

  const [employees, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'init':
        return action.payload;
      case 'ageAsc':
        return [...state].sort((a, b) => a.dob.age - b.dob.age);
      case 'ageDesc':
        return [...state].sort((a, b) => b.dob.age - a.dob.age);
      default:
        return state;
    }
  }, []);

  useEffect(() => {
    API.getEmployees().then(emp => {
      console.log(emp);
      // setEmployees(emp.data.results);
      dispatch({ type: 'init', payload: emp.data.results });
    })
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <nav className="navbar" style={{ background: 'grey'}}>
        <div className="container-fluid" style={{margin: 10}}>
          <span className="navbar-brand mb-0" style={{fontSize: 25, fontWeight: 'bolder', backgroundColor: 'white', padding: 10, borderRadius: 8}}>Welcome to your Employee Directory</span>
        </div>
        <div className="container">
          <img src="./hero.jpg" className="img-fluid" alt="hero"></img>
        </div>
      </nav>
      <div className="container-fluid" style={{ background: 'grey'}}>
        {/* <label style={{ fontWeight: 'bolder' }}>Search Employee by Name:</label> */}
        <input placeholder='Search Employee by Name' style={{ width: '60%', margin: 10, borderRadius: 5, borderColor: 'transparent'}} type='text' value={filter} onChange={e => setFilter(e.target.value)}></input>
      </div>
        <table className="table">
          <thead style={{margin: 10}}>
            <tr>
              <th scope="col">Photo</th>
              <th scope="col">Name</th>
              <th scope="col" onClick={() => dispatch({ type: 'ageAsc' })}>Age</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {employees?.filter(emp => (emp.name.first + ' ' + emp.name.last).toLowerCase().includes(filter.toLowerCase())).map(employee => (
              <tr style={{ borderColor: 'grey', borderWidth: 10, margin: 5}}>
                <th scope="row"><img src={employee.picture.medium} alt={employee.name.first} style={{ borderRadius: 5 }}></img></th>
                <td>{employee.name.first} {employee.name.last}</td>
                <td>{employee.dob.age}</td>
                <td>{employee.email}</td>
                <td>{employee.cell}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}

export default App;

