import { createRouter, createWebHistory } from "vue-router";
import PokemonDetail from "@/components/pokemon/PokemonDetail.vue";
import PokemonList from "@/components/pokemon/PokemonList.vue";

const routes = [
    { path: '/', component: PokemonList },
    { path: '/pokemon/:id', component: PokemonDetail, props: true }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;