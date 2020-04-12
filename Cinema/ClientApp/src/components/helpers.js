export const fetchData = async (path, setData, options) => {
    const url = `https://localhost:5001/${path}`;
    const res = await fetch(url, options);
    const data = await res.json();
    setData(data);
}