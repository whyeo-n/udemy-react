import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }
  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // 주문이 성공적으로 끝나면 요청이 초기화되도록 하는 함수
  function clearData() {
    setData(initialData);
  }

  // useEffect 때문에 무한 loop에 빠지지 않도록 callback으로 감싸줌. url, config가 변경될 때에만 새로 동작함.
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    // 이 앱에서는 컴포넌트가 그려질 때, GET 호출이 되어야 하기 때문에, 이렇게 설정
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    // GET 이외의 요청일 때에는 자유롭게 요청 시점을 정할 수 있도록 Return해줌.
    sendRequest,
    clearData,
  };
}
