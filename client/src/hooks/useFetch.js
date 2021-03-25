import {useState, useEffect, useCallback, useRef} from 'react';

// In order to enable the useFetch hook fetch data by pages
// it is required to return a function that will be able to changes the page parameter of the request

const useFetch = (InitialUrl, callBack) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(3);
  const [isInitialUrl, setIsInitialUrl] = useState(false);
  const [iUrl, setIUrl] = useState(InitialUrl);
  const [url, setUrl] = useState('');

  const fetchingRef = useRef(false);

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const updateData = useCallback(() => {
    if (!fetchingRef.current) {
      setData(data);
    }
    ;
  }, [data]);

  const changeUrl = (url) => {
    setData([]);
    setIsInitialUrl(!isInitialUrl);
    console.log('dog');
    if(url !== iUrl){
      setUrl(url);
    }else{
      setUrl(iUrl)
    }
  };

  useEffect(() => {
    console.log('woof');
  }, [url]);

  useEffect(() => {
    let isMounted = true;
    fetchingRef.current = true;
    fetch(iUrl + page).then(res => {
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

  return {data, error, changeUrl, updateData, fetchNextPage};
};

export default useFetch;
