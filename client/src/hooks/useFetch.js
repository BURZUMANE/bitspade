import {useState, useEffect, useCallback, useRef} from 'react';

// In order to enable the useFetch hook fetch data by pages
// it is required to return a function that will be able to changes the page parameter of the request


const demoData = [
  {name: 'Borys Petrov', id: 1},
  {name: 'Borys Petrov', id: 2},
  {name: 'Borys Petrov', id: 3},
  {name: 'Borys Petrov', id: 4},
  {name: 'Borys Petrov', id: 5},
  {name: 'Borys Petrov', id: 6},
];

const useFetch = (iUrl, callBack) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(3);
  const [isInitialUrl, setIsInitialUrl] = useState(false);
  const [url, setUrl] = useState(
      'https://api.instantwebtools.net/v1/passenger?size=10&page=');

  const fetchingRef = useRef(false)


  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const updateData = useCallback(() => {
    console.log(fetchingRef.current);
    if(!fetchingRef.current){
      setData(demoData)
    };
  }, []);

  const skip = () => {
    setData([]);
    setIsInitialUrl(!isInitialUrl);
    setUrl(isInitialUrl
        ? 'https://api.instantwebtools.net/v1/passenger?size=10&page='
        : 'https://api.instantwebtools.net/v1/airlines?size=10&page=');
  };

  useEffect(() => {
    let isMounted = true;
    fetchingRef.current = true;
    fetch(url + page).then(res => {
      if (res.status === 200) {
        fetchingRef.current = false;
        return res.json();
      } else {
        console.error('Error: ' + res.status);
      }
    }).then(response => {
      if (isMounted) {
        const incomingData = response.data ? response.data : response;
        setData([...data, ...incomingData]);
        callBack(response);
      }
    }).catch(err => {
      setError(err);
    });

    return () => {
      isMounted = false;
    };
  }, [url, page]);

  return {data, error, skip, updateData, fetchNextPage};
};

export default useFetch;
