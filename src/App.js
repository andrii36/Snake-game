import React from 'react';
import './App.css';
import LevelPage from './LevelPage';

export default function App() {
  const [target, setTarget] = React.useState({});
  const [dir, setDir] = React.useState("right");
  const id = React.useRef();
  const [isOver, setIsOver] = React.useState(false);
  const [start, setStart] = React.useState(false);
  const [body, setBody] = React.useState([]);
  const [score, setScore] = React.useState(0);

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

  const setBodyArr = (leftDiff = 0, topDiff = 0) => {
    setBody((prev) => {
      const { left, top } = prev[prev.length - 1].props.style;
      const arr = [
        ...prev,
        <div className="head" style={{ top: top + topDiff, left: left + leftDiff }}></div>
      ];
      return arr.slice(1);
    });
  };

  const handleHead = (e) => {
    // handle left key
    if (e.keyCode === 37) {
      setDir((prev) => prev === "right" ? "right" : "left");
    }
    // handle top key
    if (e.keyCode === 38) {
      setDir((prev) => prev === "down" ? "down" : "top");
    }
    // handle right key
    if (e.keyCode === 39) {
      setDir((prev) => prev === "left" ? "left" : "right");
    }
    // handle down key
    if (e.keyCode === 40) {
      setDir((prev) => prev === "top" ? "top" : "down");
    }
    // handle space key
    if (e.keyCode === 32) {
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
          setBodyArr(-20);
        }
        if (dir === "top") {
          setBodyArr(0, -20);
        }
        if (dir === "right") {
          setBodyArr(20);
        }
        if (dir === "down") {
          setBodyArr(0, 20);
        }
      }, 200);

      if (body.length) {
        const lastElLeftPos = body[body.length - 1].props.style.left;
        const lastElTopPos = body[body.length - 1].props.style.top;

        if (
          lastElLeftPos === target.x &&
          lastElTopPos === target.y
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

          setScore(score + 10);
        }

        if (
          lastElLeftPos === -20 ||
          lastElLeftPos === 300 ||
          lastElTopPos === -20 ||
          lastElTopPos === 300
        ) {
          setIsOver(true);
          clearTimeout(id.current);
          id.current = null;
        }
      }
    }
  }, [dir, body, start]);

  return (
    <div className="App">
      <div className="game-area">
        {isOver && <h3>Looser</h3>}
        {body}
        <div className="target" style={{ left: target.x, top: target.y }}></div>
        <div className="score">Score {score}</div>
      </div>
      <div>Press "space" to start/pause</div>
    </div>
  );
}

