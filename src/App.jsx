import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Copy");

  // Use ref hook
  const passwordref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (char) str += "!@#$%^&*(){}:|><?|_-+=";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, number, char]);

  const copytext = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password).then(() => {
      setButtonText("Copied!"); // Change button text to "Copied!"
      setTimeout(() => setButtonText("Copy"), 2000); // Revert back after 2 seconds
    });
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={password}
            className='outline-auto w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordref}
          />
          <button
            onClick={copytext}
            className='outline-none bg-black text-wrap px-3 py-0.5 shrink-0'
          >
            {buttonText}
          </button>
        </div>
        
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {setLength(Number(e.target.value))}}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              checked={number}
              id="numberInput"
              onChange={() => setNumber((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              checked={char}
              id="charInput"
              onChange={() => setChar((prev) => !prev)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default App;
