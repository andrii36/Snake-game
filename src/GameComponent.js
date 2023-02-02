import React from "react";

const GameComponent = ({level}) => {
    const [target, setTarget] = React.useState({});
    const [dir, setDir] = React.useState("right");
    const id = React.useRef();
    const [isOver, setIsOver] = React.useState(false);
    const [start, setStart] = React.useState(false);
    const [body, setBody] = React.useState([]);
    const [score, setScore] = React.useState(0);

    const validateLevelTime = () => {
        console.log('andrii change');
        switch(level){
            case 'Easy': return 500;
            case 'Medium': return 350;
            case 'Hard': return 200;
        }
    }

    const snakeAteItself = React.useMemo(() => {
        let ateItself = false;
        const head = {
            left: body[body.length - 1]?.props.style.left,
            top: body[body.length - 1]?.props.style.top
        };
        if (body.length > 1) {
            body.slice(0, body.length - 2).forEach((el) => {
                if (el.props.style.left === head.left && el.props.style.top === head.top) {
                    ateItself = true;
                };
            });
        }
        return ateItself;
    }, [body]);

    const genDot = () => {
        console.log('genDot')
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

    const setBodyArr = (leftDiff = 0, topDiff = 0, removeFirst = true) => {
        setBody((prev) => {
            const { left, top } = prev[prev.length - 1].props.style;
            const arr = [
                ...prev,
                <div className="head" style={{ top: top + topDiff, left: left + leftDiff }}></div>
            ];
            return removeFirst ? arr.slice(1) : arr;
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
        const [x, y] = genDot();
        document.querySelector("body").addEventListener("keydown", handleHead);
        setBody([<div className="head" style={{ left: 0, top: 0 }}></div>]);
        setTarget({ x: x * 20, y: y * 20 });
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
            }, validateLevelTime());

            if (body.length) {
                const lastElLeftPos = body[body.length - 1].props.style.left;
                const lastElTopPos = body[body.length - 1].props.style.top;
                const gameOver = lastElLeftPos === -20 ||
                    lastElLeftPos === 300 ||
                    lastElTopPos === -20 ||
                    lastElTopPos === 300 ||
                    snakeAteItself

                if (
                    lastElLeftPos === target.x &&
                    lastElTopPos === target.y
                ) {
                    setBodyArr(0, 0, false);

                    setTarget((prev) => {
                        const [x, y] = genDot();
                        return { ...prev, x: x * 20, y: y * 20 };
                    });

                    setScore(score + 10);
                }

                if (gameOver) {
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

export default GameComponent;