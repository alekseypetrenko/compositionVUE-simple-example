<template>
    <div>
        <input type="text" v-model="query" />
        <button @click="callApi">Search</button>
        <p class="error" v-if="error">Oooops...</p>
        <p v-if="loading">Loading...</p>
        <div v-if="result">
            <p>{{ result.id }}</p>
            <span>{{ result.title }}</span>
            <span>{{ result.body }}</span>
            <img v-if="result.image" :src="result.image" alt="" />
        </div>
    </div>
</template>

<script>
import { useApi } from "./useApi";
import axios from "./middleware";

export default {
    name: "App",
    setup() {
        // const { query, callApi, result, error, loading } = useApi(
        //     async (query) => {
        //         const res = await axios.get(
        //             `https://jsonplaceholder.typicode.com/posts/${query}`,
        //         );

        //         console.log(res);
        //         return res.data;
        //     },
        // );

        // const { query, callApi, result, error, loading } = useApi(
        //     async (query) => {
        //         const res = await axios.get(
        //             `https://api.thecatapi.com/v1/images/search?breed_ids=${query}`,
        //         );
        //         console.log(res);
        //         return res.data[0];
        //     },
        // );
        const graphQL = `
        query Characters($name: String!){
            characters(filter: {name: $name}) {
              results {
                name
                image
              }
            }
          }`;

        const { query, callApi, result, error, loading } = useApi(
            async (query) => {
                const res = await axios.post(
                    `https://rickandmortyapi.com/graphql`,
                    {
                        query: graphQL,
                        variables: {
                            name: query,
                        },
                    },
                );
                return res.data.data.characters.results[0];
            },
        );

        return { query, callApi, result, error, loading };
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.error {
    background: lightcoral;
}
</style>
