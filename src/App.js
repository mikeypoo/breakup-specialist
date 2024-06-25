import { useState, useEffect } from 'react'
import './App.css';

const App = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    window.toggleDayAndNight?.()
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  return (
    <div>
      <div>Hello</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}

export default App;
