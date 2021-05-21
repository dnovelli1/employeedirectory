import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import API from './utils/API';
import 'bootstrap/dist/css/bootstrap.min.css';


// const initialState = {count: 0};

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return {count: state.count + 1};
//     case 'decrement':
//       return {count: state.count - 1};
//     default:
//       throw new Error();
//   }
// }

// function Counter() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <>
//       Count: {state.count}
//       <button onClick={() => dispatch({type: 'decrement'})}>-</button>
//       <button onClick={() => dispatch({type: 'increment'})}>+</button>
//     </>
//   );
// }








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
    <div>
      <input type='text' value={filter} onChange={e => setFilter(e.target.value)}></input>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {employees?.filter(emp => (emp.name.first + ' ' + emp.name.last).toLowerCase().includes(filter.toLowerCase())).map(employee => (
            <tr>
              <th scope="row"><img src={employee.picture.medium} alt={employee.name.first} style={{borderRadius: 5}}></img></th>
              <td>{employee.name.first} {employee.name.last}</td>
              <td>{employee.dob.age}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

