import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListUser from './components/listUsers'
import CreateUser from './components/createUser'
import UpdateUser from './components/updateUser'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListUser />}/>
        <Route path='/create-user' element={<CreateUser />}/>
        <Route path='/update-user/:id' element={<UpdateUser />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
