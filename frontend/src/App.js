import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListUser from './components/listUser'
import CreateUser from './components/createUser'
import UpdateUser from './components/updateUser'
import Abcd from './components/abcd'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListUser />}/>
        <Route path='/create-user' element={<CreateUser />}/>
        <Route path='/update-user/:id' element={<UpdateUser />}/>
        <Route path='/abcd' element={<Abcd />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
