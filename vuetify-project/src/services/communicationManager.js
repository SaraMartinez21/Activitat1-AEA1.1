const apiKey = '1895651';

export async function getMovies(searchTerm) {
    const url = `http://www.omdbapi.com/?s=${searchTerm}&&apikey=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.Search;
}

