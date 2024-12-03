<template>
    <v-container>  
        <v-row class="my-4">
            <v-col cols="12">
                <v-text-field
                    v-model="searchTerm"
                    label="Buscar película"
                    append-icon="mdi-magnify"
                    @click:append="searchMovies"
                    @keyup.enter="searchMovies"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row v-if="movies.length == 0">
            <v-col cols="12" class="text-center">
                <p>No se encontraron películas</p>
            </v-col>
        </v-row>

        <v-row v-else>
            <v-col v-for="movie in movies" :key="movie.imdbID" cols="12" md="4">
                <v-card>
                    <v-card-title class="red lighten-2 white--text">{{ movie.Title }}</v-card-title>
                    <v-img :src="movie.Poster" aspect-ratio="1.5"></v-img>

                    <v-card-actions>
                        <v-btn color="red" text @click="showMovieDetails(movie)">Ver detalles</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-card-title>{{ selectedMovie.Title }}</v-card-title>
                <v-card-text>
                    <v-img :src="selectedMovie.Poster" aspect-ratio="1.5"></v-img>
                    <p><strong>Tipo:</strong> {{ selectedMovie.Type }}</p>
                    <p><strong>Año:</strong> {{ selectedMovie.Year }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red" text @click="dialog = false">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getMovies } from '../services/communicationManager';

export default {
    setup() {
        const movies = ref([]);
        const searchTerm = ref('');
        const dialog = ref(false);
        const selectedMovie = ref({});

        onMounted(async () => {
            await fetchMovies('Marvel');
        });

        const fetchMovies = async (query) => {
            try {
                const response = await getMovies(query);
                console.log('API response:', response);

                if (response && Array.isArray(response)) {
                    movies.value = response.map((movie) => ({
                        imdbID: movie.imdbID,
                        Title: movie.Title,
                        Poster: movie.Poster,
                        Type: movie.Type,
                        Year: movie.Year
                    }));
                } else {
                    movies.value = [];
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        const searchMovies = async () => {
            if (searchTerm.value.trim() == '') return;
            await fetchMovies(searchTerm.value);
        };


        const showMovieDetails = (movie) => {
            selectedMovie.value = movie;
            dialog.value = true;
        };

        return {
            movies,
            searchTerm,
            searchMovies,
            dialog,
            selectedMovie,
            showMovieDetails
        };
    }
};
</script>

<style scoped>
.red {
    background-color: #b62e2e;
}

.movie-card {
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>



