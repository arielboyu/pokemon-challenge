<template>
  <el-container>
    <el-main>
      <el-row class="pokemon-detail">
        <el-col :span="24">
          <el-card class="pokemon-card">
            <el-button class="back-button" @click="goBack" type="primary" icon="el-icon-arrow-left">
              Volver
            </el-button>
            <div v-if="isLoading" class="loading">Cargando...</div>
            <div v-else-if="error" class="error">{{ error }}</div>
            <div v-else>
              <div class="pokemon-header">
                <h2>{{ pokemon.name }}</h2>
                <img :src="pokemon.image" class="pokemon-image" alt="Pokemon Image" />
              </div>
              <div class="pokemon-info">
                <p><strong>Tipo:</strong> {{ pokemon.type }}</p>
                <p><strong>Peso:</strong> {{ pokemon.weight }}</p>
                <p><strong>Descripción:</strong> {{ description }}</p>
                <h3>Movimientos:</h3>
                <ul class="pokemon-moves">
                  <li v-for="move in pokemon.moves" :key="move.name">{{ move.name }}</li>
                </ul>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  props: ['id'],
  data() {
    return {
      pokemon: {},
      description: '',
      isLoading: true,
      error: ''
    }
  },
  async created() {
    this.fetchDetail()
  },
  methods: {
    async fetchDetail() {
      this.isLoading = true
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
        this.pokemon = {
          name: response.data.name,
          type: response.data.types.map(typeInfo => typeInfo.type.name).join(', '),
          weight: response.data.weight,
          image: response.data.sprites.front_default,
          moves: response.data.moves.slice(0, 10).map(move => ({ name: move.move.name }))
        }
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${this.id}`)
        const flavorTextEntry = speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === 'es')
        this.description = flavorTextEntry ? flavorTextEntry.flavor_text : 'Descripción no disponible'
      } catch (error) {
        this.error = 'Error al cargar los datos del Pokémon'
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.pokemon-detail {
  padding: 20px;
  margin-bottom: 100px;
}

.pokemon-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.pokemon-header {
  text-align: center;
  margin-bottom: 20px;
}

.pokemon-image {
  width: 200px;
  height: auto;
  border-radius: 8px;
  object-fit: contain;
}

.pokemon-info {
  padding: 20px;
  text-align: center;
}

.pokemon-info p {
  margin: 10px 0;
  font-size: 18px;
}

.pokemon-info h3 {
  margin-top: 20px;
  font-size: 20px;
}

.pokemon-moves {
  list-style: none;
  padding: 0;
}

.pokemon-moves li {
  padding: 10px 0;
  font-size: 16px;
}

.back-button {
  margin-bottom: 20px;
  position: absolute;
  right: 55px;
  width: 60px;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #333;
}

.error {
  text-align: center;
  font-size: 18px;
  color: red;
}
</style>
