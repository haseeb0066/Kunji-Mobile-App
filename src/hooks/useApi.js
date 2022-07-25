import {useState} from 'react';

export default useApi = apiFunc => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const request = async (...args) => {
    setLoading(true);
    const res = await apiFunc(...args);

    if (res.ok) {
      // if (cancel) return;
      // console.log("response", res.data);
      setData(res.data);
      setLoading(false);
    } else {
      // console.log("problem", res.problem);
      setLoading(false);
    }
    return res;
  };
  return {data, loading, request};
};
