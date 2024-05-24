   function handleDeezerResponse(data) {
            try {
                if (data.data.length === 0) {
                    throw new Error('Pas de résultat trouvé');
                }
                const results = data.data.map(item => {
                    let imageUrl = '';
                    if (item.type === 'artist') {
                        imageUrl = item.picture_medium;
                        return `
                            <div>
                                <img src="${imageUrl}" alt="${item.name}">
                                <div>${item.name}</div>
                            </div>`;
                    } else if (item.type === 'album') {
                        imageUrl = item.cover_medium;
                        return `
                            <div>
                                <img src="${imageUrl}" alt="${item.title}">
                                <div>${item.title} de ${item.artist.name}</div>
                            </div>`;
                    } else if (item.type === 'track') {
                        imageUrl = item.album.cover_medium;
                        return `
                            <div>
                                <img src="${imageUrl}" alt="${item.title}">
                                <div>${item.title} de ${item.artist.name}</div>
                            </div>`;
                    }
                }).join('');
                document.getElementById('resultat').innerHTML = results;
            } catch (error) {
                console.error('Error handling Deezer response:', error.message);
                document.getElementById('resultat').innerHTML = `<p>Error: ${error.message}</p>`;
            }
        }

        document.getElementById('rechercheBtn').addEventListener('click', () => {
            const searchType = document.getElementById('typeRecherche').value;
            const searchTerm = document.getElementById('recherche').value.trim();
            if (!searchTerm) {
                alert('Entrez une vrai recherche !');
                return;
            }

            const apiUrl = `https://api.deezer.com/search/${searchType}/?q=${encodeURIComponent(searchTerm)}&limit=10&output=jsonp&callback=handleDeezerResponse`;
            const script = document.createElement('script');
            script.src = apiUrl;
            document.body.appendChild(script);
        });