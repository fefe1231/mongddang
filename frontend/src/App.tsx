import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Dropdown } from './shared/ui/Dropdown';

function App() {
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('김싸피');
  return (
    <>
      <Dropdown
        options={['김싸피', '박싸피', '이싸피']}
        onSelect={(value) => {
          setSelected(value);
        }}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedValue={selected}
        buttonLabel={selected} // 버튼 라벨을 선택된 값으로 설정
        onOpen={() => setIsOpen(true)} // 드롭다운 열기 기능 추가
      />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
