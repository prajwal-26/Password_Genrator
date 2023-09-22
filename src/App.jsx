import { useCallback, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let pass = ' ';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()_+[]{}|;:,.<>?';

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = password;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    // Show a toast message
    toast.success('Password copied to clipboard');
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600'>
      <div className='max-w-md p-6 bg-white rounded-lg shadow-lg w-full'>
        <h1 className='text-3xl font-semibold text-center text-gray-800 mb-4'>
          Password Generator
        </h1>
        <div className='flex flex-col md:flex-row items-center'>
          <input
            className='flex-grow px-4 py-2 text-lg text-gray-700 border rounded-lg focus:outline-none focus:border-blue-400 mb-4 md:mb-0 md:mr-2'
            type='text'
            value={password}
            placeholder='Generated Password'
            readOnly
          />
          <button
            className='w-full md:w-auto py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-300 focus:outline-none  md:text-lg sm:text-md xs:text-sm'
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
        <button
          className='w-full py-2 mt-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-300 focus:outline-none'
          onClick={passwordGenerator}
        >
          Generate Password
        </button>
        <div className='mt-6'>
          <label className='block text-sm font-medium text-gray-700'>
            Password Length: {length} characters
          </label>
          <input
            type='range'
            min={6}
            max={20}
            step={1}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className='w-full mt-2 rounded-lg appearance-none bg-gray-200 h-2'
          />
        </div>
        <div className='mt-4 space-y-2 md:space-y-0 md:flex md:flex-row'>
          <div className='flex items-center'>
            <label className='block text-sm font-medium text-gray-700 mr-4'>
              Include Numbers
            </label>
            <input
              type='checkbox'
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
          </div>
          <div className='flex items-center'>
            <label className='block text-sm font-medium text-gray-700 mr-4'>
              Include Special Characters
            </label>
            <input
              type='checkbox'
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
          </div>
        </div>
      </div>
      <ToastContainer position='bottom-right' />
    </div>
  );
}

export default App;


