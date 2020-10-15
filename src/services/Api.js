
export const load = (url) => {
    return fetch(url, {
        method: "GET"
    }).then(async response => {
        if (!response.ok) {
            throw new Error(`Invalid network reponse code ${response.status}`);
        }

        return response.json()
    })
}