export const post = (url, payload = null) => 
fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload)
})
.then(response => response.json());
export const http_delete = (url) => 
fetch(url, {
    method: 'DELETE'
})
.then(response => response.json());