import React from 'react';
import './App.css';
import GameComponent from './GameComponent';
import LevelPage from './LevelPage';

const reducer = (state, action) => {
  switch (action.type) {
    case 'open': {
      return [...state, action.payload]
    }
    case 'close': {
      return state.slice(0, -1);
    }
    default:
      return state;
  }
}

export default function App() {
  const [drawerStack, dispatch] = React.useReducer(reducer, []);
  const activeDrawer = drawerStack[drawerStack.length - 1] || null;

  const setNextDrawer = (payload) => {
    dispatch({ type: 'open', payload });
  }

  React.useEffect(() => {
    setNextDrawer({type: 'levelPage'});
  }, []);

  const showGameComponent = (level) => {
    setNextDrawer({type: 'gameComponent', level});
  };

  const renderActiveDrawer = (type = '') => {
    switch(type){
      case 'levelPage': {
        return <LevelPage showGameComponent={showGameComponent}/>
      }
      case 'gameComponent': {
        return <GameComponent level={activeDrawer.level}/>
      }
    }
  }
  return (
    <div data-testid='app-wrapper' className="App">
      {renderActiveDrawer(activeDrawer?.type)}
    </div>
  );
}
