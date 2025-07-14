import { useEffect, useState } from "react";
import axios from "../services/axios";

function useInterceptor() {
  const [token, setToken] = useState();
  console.log("token is...", token);
  useEffect(() => {
    console.log("req inter token useEffect....", token);
    const requestInterceptor = axios.interceptors.request.use((config: any) => {
      console.log("token value req ins...", token);
      if (!config._tried && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers.Authorization = config.headers.Authorization;
      return config;
    });

    return () => axios.interceptors.request.eject(requestInterceptor);
  }, [token]);

  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevReq = error?.config;
        console.log("response pre inter useEffect......", prevReq);

        if (error?.response?.status == 403) {
          const response = await axios.get("/refresh");
          console.log("refresh received response inter......", response.data);
          setToken(response.data.access_token);
          prevReq.headers.Authorization = `Bearer ${response.data.access_token}`;
          prevReq._tried = true;
          return axios(prevReq);
        }
      }
    );

    return () => axios.interceptors.response.eject(responseInterceptor);
  }, []);
  return setToken;
}

export default useInterceptor;
