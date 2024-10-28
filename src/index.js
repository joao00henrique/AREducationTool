import React, { useState, useEffect } from 'react';

function App({ apiUrl }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${apiUrl}/education/content`);
        const data = await response.json();
        setContent(data.message);
      } catch (error) {
        console.error("Failed to fetch content:", error);
      }
    };

    fetchContent();
  }, [apiUrl]);

  return (
    <div>
      <h1>Educational Content</h1>
      <p>{content || "Loading..."}</p>
    </div>
  );
}

export default App;
```
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const API_URL = process.env.REACT_APP_API_URL;

ReactDOM.render(
  <React.StrictMode>
    <App apiUrl={API_URL} />
  </React.StrictMode>,
  document.getElementById('root')
);