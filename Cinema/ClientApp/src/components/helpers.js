export const fetchData = async (path, setData, options = {}) => {
    const res = await fetch(path, options);
    const data = await res.json();
    setData(data);
}