const title = document.querySelector("h1");

title.innerHTML = `Le joueur ${localStorage.getItem('winner')} a gagné !`;