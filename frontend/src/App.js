import './App.css';
import Navbar  from './components/Navbar';
import Home from './pages/Home';
function App() {
  const title = 'page'
  return (
    <div className="App">
      <Navbar/>
       <div className="content">
         <Home/>
        <h1>{title}</h1>
       </div>
    </div>
  );
}

export default App;
