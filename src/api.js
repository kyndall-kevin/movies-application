module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
        .then(response => response.json());
  },
  addMovie: (data) => {
    return fetch('/api/movies', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (r) {
      console.log(r);
    })
  },
  editMovie: (id, data) => {
    return fetch(`/api/movies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  },
  getMovie: (id)=>{
    return fetch(`/api/movies/${id}`)
        .then(response => response.json());
  }
};

