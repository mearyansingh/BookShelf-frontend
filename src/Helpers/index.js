function getImgUrl(name) {
  return new URL(`../assets/books/${name}`, import.meta.url)
}

const getBaseUrl = () => {
  // return "http://localhost:5000"
  return import.meta.env.VITE_APP_API_URL || "http://localhost:5000";
}
export { getImgUrl, getBaseUrl }


export const formattedDateWithDelivery = (rawDate) => {
  const date = new Date(rawDate);
  const orderDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const randomDays = Math.floor(Math.random() * 5) + 3;
  date.setDate(date.getDate() + randomDays);
  const expectedDeliveryDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return { orderDate, expectedDeliveryDate };
}

export const bookCategories = [
  { value: '', label: 'Choose A Category' },
  { value: 'business', label: 'Business' },
  { value: 'technology', label: 'Technology' },
  { value: 'fiction', label: 'Fiction' },
  { value: 'horror', label: 'Horror' },
  { value: 'adventure', label: 'Adventure' },
]