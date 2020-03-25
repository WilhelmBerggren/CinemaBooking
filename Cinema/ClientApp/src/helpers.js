export const fetchData = async (url, setData) => {
    const res = await fetch(url);
    const data = await res.json();
    setData(data);
}