import React from 'react';
import './App.css';

export default function App() {
  const [target, setTarget] = React.useState({});
  const [dir, setDir] = React.useState("");
  const id = React.useRef();
  const [isOver, setIsOver] = React.useState(false);
  const [start, setStart] = React.useState(false);

  const [body, setBody] = React.useState([]);

  const genDot = () => {
    const arr = [];
    const genRandom = (limit) => {
      let rand = Math.random();
      rand = Math.floor(rand * limit);
      return rand;
    };
    arr.push(genRandom(15));
    arr.push(genRandom(15));
    return arr;
  };

  const handleHead = (e) => {
    if (e.keyCode === 37) {
      setDir("left");
    }
    if (e.keyCode === 38) {
      setDir("top");
    }
    if (e.keyCode === 39) {
      setDir("right");
    }
    if (e.keyCode === 40) {
      setDir("down");
    }
    if (e.keyCode === 32) {
      if (!dir) {
        setDir("right");
      }
      setStart((prev) => !prev);
    }
  }; 

  React.useEffect(() => {
    document.querySelector("body").addEventListener("keydown", handleHead);
    setBody([
      ...body,
      <div className="head" style={{ left: 0, top: 0 }}></div>
    ]);
    setTarget((prev) => {
      const [x, y] = genDot();
      return { ...prev, x: x * 20, y: y * 20 };
    });
  }, []);

  React.useEffect(() => {
    if (id.current) {
      clearTimeout(id.current);
      id.current = null;
    }

    if (start) {
      id.current = setTimeout(() => {
        if (dir === "left") {
          setBody((prev) => {
            const { left, top } = prev[prev.length - 1].props.style;
            const arr = [
              ...prev,
              <div className="head" style={{ left: left - 20, top: top }}></div>
            ];
            return arr.slice(1);
          });
        }
        if (dir === "top") {
          setBody((prev) => {
            const { left, top } = prev[prev.length - 1].props.style;
            const arr = [
              ...prev,
              <div className="head" style={{ top: top - 20, left: left }}></div>
            ];
            return arr.slice(1);
          });
        }
        if (dir === "right") {
          setBody((prev) => {
            const { left, top } = prev[prev.length - 1].props.style;
            const arr = [
              ...prev,
              <div className="head" style={{ left: left + 20, top: top }}></div>
            ];
            return arr.slice(1);
          });
        }
        if (dir === "down") {
          setBody((prev) => {
            const { left, top } = prev[prev.length - 1].props.style;
            const arr = [
              ...prev,
              <div className="head" style={{ top: top + 20, left: left }}></div>
            ];
            return arr.slice(1);
          });
        }
      }, 200);

      if (body.length) {
        if (
          body[body.length - 1].props.style.left === target.x &&
          body[body.length - 1].props.style.top === target.y
        ) {
          setBody((prev) => {
            const { left, top } = prev[prev.length - 1].props.style;
            const arr = [
              ...prev,
              <div className="head" style={{ left: left, top: top }}></div>
            ];
            return arr;
          });

          setTarget((prev) => {
            const [x, y] = genDot();
            return { ...prev, x: x * 20, y: y * 20 };
          });
        }

        if (
          body[body.length - 1].props.style.left === -20 ||
          body[body.length - 1].props.style.left === 300 ||
          body[body.length - 1].props.style.top === -20 ||
          body[body.length - 1].props.style.top === 300
        ) {
          setIsOver(true);
        }
      }
    }
  }, [dir, body, start]);

  return (
    <div className="App">
      <div className="game-area">
        {isOver ? <h3>Looser</h3> : body}
        <div className="target" style={{ left: target.x, top: target.y }}></div>
      </div>
      <div>Press "space" to start/pause</div>
    </div>
  );
}

