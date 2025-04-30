import React, { useEffect, useState } from 'react';
import './index.css';
import './App.css'

function App() {
  const [page, setPage] = useState(1);
  const [repos, setRepos] = useState([]);
  async function fetchData(){
    try{
      const date = new Date();
      date.setDate(date.getDate() - 10);
      const formattedDate = date.toISOString().split('T')[0];
      const res = await fetch(`https://api.github.com/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc&page=${page}&per_page=5`);
      const data = res.json();
      return data;
    }catch(err) {
      console.log(err);
    }

  }

  useEffect(() => {
    fetchData().then(result => {
      setRepos(result.items);
      console.log(result.items);
    }
  );

  }, [page])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Trending GitHub Repos (Last 10 Days)</h1>
      <div>
        {repos.length === 0 ? (
          <p>Loading...</p>
        ) : (
          repos.map((repo) => (
            <div
              key={repo.id}
              style={{
                border: '1px solid #ccc',
                marginBottom: '1rem',
                padding: '1rem',
                borderRadius: '8px',
              }}
            >
              <h2>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.full_name}
                </a>
              </h2>
              <p>{repo.description}</p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginTop: '0.5rem',
                }}
              >
                <img
                  src={repo.owner.avatar_url}
                  alt={repo.owner.login}
                  style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                />
                <span style={{ fontWeight: 'bold' }}>{repo.owner.login}</span>
                <span style={{ marginLeft: 'auto' }}>⭐ {repo.stargazers_count}</span>
              </div>
            </div>
          ))
        )
        }
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span style={{ margin: '0 1rem' }}>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default App;
