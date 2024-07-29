<template>
    <el-row :gutter="20">
        <el-col v-for="pokemon in pokemons" :key="pokemon.id" :span="8">
            <el-card class="pokemon-card" @click="getDetailView(pokemon.id)">
                <img :src="pokemon.image" class="pokemon-image" />
                <div class="pokemon-info">
                    <h3>{{ pokemon.name }}</h3>
                    <p>Tipo: {{ pokemon.type }}</p>
                    <p>Peso: {{ pokemon.weight }}Kg</p>
                </div>
            </el-card>
        </el-col>
    </el-row>
    <el-col v-if="loading" :span="24">
        <el-card>
            <div class="loading">Cargando...</div>
        </el-card>
    </el-col>
    <el-col v-if="error" :span="24">
        <el-card>
            <div class="error">{{ error }}</div>
        </el-card>
    </el-col>
    <div v-if="!error" class="pagination-controls">
        <el-button type="warning" @click="goToPreviousPage">Anterior</el-button>
        <span style="margin-top: 10px;font-weight: bolder;"> {{ currentPage }} de {{ totalPages }}</span>
        <el-button type="primary" @click="goToNextPage" :disabled="!nextPageUrl">Siguiente</el-button>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            pokemons: [],
            loading: true,
            nextPageUrl: null,
            previousPageUrl: null,
            currentPage: 1,
            totalPages: null,
            error: ''
        }
    },
    methods: {
        async fetchData(url = 'https://pokeapi.co/api/v2/pokemon?limit=12') {
            this.loading = true
            try {
                const response = await axios.get(url);
                const results = response.data.results;
                const totalCount = response.data.count;
                const limit = 12;
                this.totalPages = Math.ceil(totalCount / limit);
                const pokemonPromises = results.map(async (pokemon) => {
                    const pokemonData = await axios.get(pokemon.url);
                    return {
                        id: pokemonData.data.id,
                        name: pokemonData.data.name,
                        type: pokemonData.data.types.map(typeInfo => typeInfo.type.name).join(', '),
                        weight: pokemonData.data.weight,
                        image: pokemonData.data.sprites.front_default
                    };
                });
                const offset = new URL(url).searchParams.get('offset') || 0;
                this.currentPage = Math.floor(offset / limit) + 1;
                this.pokemons = await Promise.all(pokemonPromises);
                this.nextPageUrl = response.data.next;
                this.previousPageUrl = response.data.previous;
            } catch (error) {
                this.error = 'Error al cargar los datos del servidor'
                console.error(error)
            } finally {
                this.loading = false;
            }
        },
        goToNextPage() {
            if (this.nextPageUrl) {
                this.fetchData(this.nextPageUrl);
            }
        },
        goToPreviousPage() {
            if (this.previousPageUrl) {
                this.fetchData(this.previousPageUrl);
            }
        },
        getDetailView(id) {
            this.$router.push(`/pokemon/${id}`);
        }
    },
    created() {
        this.fetchData();
    }
}
</script>



<style scoped>
.pokemon-card {
    margin-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
}

.pokemon-image {
    width: 100%;
    height: 200px;
    object-fit: contain;
}

.pokemon-info {
    padding: 10px;
}

.loading {
    text-align: center;
    padding: 20px;
}

.pagination-controls {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 200px
}

.pagination-controls button {
    margin: 0 5px;
}

.error {
    text-align: center;
    font-size: 18px;
    color: red;
}
</style>