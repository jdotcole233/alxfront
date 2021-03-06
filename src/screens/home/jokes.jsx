import React from 'react'

function Jokes({data}) {
    const types = data.map(joke => joke.type);
    const random_pill = ['primary', 'warning']

    return (
      <div>
        <h1>Jokes API</h1>
        <div className="row">
          <div className="p-2 col-lg-12">
            {[...new Set(types)].map((joke, index) => (
              <span
                key={index}
                className="badge mr-2 p-2 rounded-pill bg-success text-white"
              >
                {joke}
              </span>
            ))}
          </div>
          {data.map((joke) => (
            <div className="m-2 card" style={{ width: "18rem" }}>
              <div className="card-header">
                {joke.setup}
                <span className="badge bg-warning text-white ml-2">
                  {joke.type}
                </span>
              </div>
              <div className="card-body">
                <p className="card-text">{joke.punchline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Jokes
