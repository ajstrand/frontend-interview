/**
 * example of a data fetching service you might find in
 * a real application
 * @param {*} urlToFetch
 */
const fetchData = async (urlToFetch) => {
  const response = await fetch(urlToFetch);
    const data = await response.json();
    return data;
};

export default fetchData;
