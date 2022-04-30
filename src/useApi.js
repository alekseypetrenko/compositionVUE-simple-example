import { ref } from "vue";

export function useApi(getResults) {
    const query = ref("");
    const result = ref("");
    const error = ref(false);
    const loading = ref(false);

    const callApi = async () => {
        error.value = false;
        loading.value = true;
        try {
            result.value = await getResults(query.value);
            query.value = "";
        } catch {
            error.value = true;
            result.value = "";
        } finally {
            loading.value = false;
        }
    };

    return { query, callApi, result, error, loading };
}
