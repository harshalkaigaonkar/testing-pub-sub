import './App.css';
import axios from 'axios';

function App() {
  const handlePublish = () => {
    axios.post("http://localhost:3001/publish", {});
  }
  const handleSubscribe = () => {
    axios.post("http://localhost:3001/subscribe", {});
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleSubscribe}>Subscribe</button>
        <button onClick={handlePublish}>Publish</button>
      </header>
    </div>
  );
}

export default App;
