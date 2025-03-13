import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_EDUCATIONAL_CONTENT_API;

const EducationalContentList = () => {
  const [contents, setContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducationalContent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setContents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEducationalContent();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {contents.map(content => (
          <li key={content.id}>
            <h3>{content.title}</h3>
            <p>{content.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationalContentList;