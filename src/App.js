//import logo from "./logo.svg";
import logo from "./photo Britos.png";
import "./App.css";
import { useState, useEffect } from "react";
import OrderForm from "./Components/OrderForm";
import audioFile from "./batman.mp3";
import videoFile from "./batman1.mp4";
import { useRef } from "react";

const App = () => {
  const [name, setName] = useState("Ronald");
  const [boxes, setBoxes] = useState([0]);
  const videoRef = useRef(null);
  const [isVideoVisible, setVideoVisible] = useState(true);

  useEffect(() => {
    const getBoxes = async () => {
      // we have to use async keyword to use await
      const boxResult = await fetch("http://localhost:3000/orders");
      let apiBoxes = await boxResult.json();
      setBoxes(apiBoxes); //updated the state of variable boxes
    };
    getBoxes();
  }, [name]);
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setTimeout(() => {
        video.pause();
        setVideoVisible(false);
      }, 15000);
    }
  }, []);

  return (
    // return JSX - JavaScript syntax extension
    <div className="App">
      <header className="App-header">
        {isVideoVisible && (
          <video ref={videoRef} src={videoFile} autoPlay loop controls />
        )}
        <input
          type="text"
          placheholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)} //event listener which is a function that takes an event object as an argument
        />
        <p>
          Hello {name}! has {boxes.length} boxes
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <OrderForm />

        <audio src={audioFile} autoPlay controls />
      </header>
    </div>
  );
};

export default App;
