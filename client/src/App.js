import './App.css';
import React, {useState} from 'react';

import ButtonComponent from './components/Button/ButtonComponent';
import DummyComponent from './components/Dummy/Dummy.component';

function App() {
  const [showDummy, setShowDummy] = useState(true);

  const toggleMount = () => {
    setShowDummy(showDummy => !showDummy);
  };
  return (
      <div className='App'>
        <main>
          <ButtonComponent
              cb={toggleMount}
              text={showDummy
                  ? 'un-mount'
                  : 'mount'}
          />
          {showDummy && (<DummyComponent />)}
        </main>
      </div>
  );
}

export default App;
