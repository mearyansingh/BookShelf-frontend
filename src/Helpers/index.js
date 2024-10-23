function getImgUrl(name) {
   return new URL(`../assets/books/${name}`, import.meta.url)
}

const getBaseUrl = () => {
   // return "http://localhost:5000"
   return import.meta.env.VITE_APP_API_URL || "http://localhost:5000";
}
export { getImgUrl, getBaseUrl }