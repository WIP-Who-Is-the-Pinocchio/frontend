/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosInstance, AxiosError } from "axios";
import logout from "@components/admin/logout";

// // 임시용 (후에 .env나 파일로 뺴야 함)
// const instance = axios.create({
//   baseURL: "http://localhost:2309",
// });

// instance.interceptors.response.use(
//   async function (config) {
//     return config;
//   },
//   function (error) {
//     return error.response;
//   },
// );

// export default instance;

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:2309/admin/api/v1",
});

/**
 * 모든 request가 처리되기 직전에 실행되는 곳
 */

instance.interceptors.request.use(
  (config) => {
    const { url } = config;
    console.log(config);

    // refresh token으로 access token 을 갱신하려고하는 시도인지 확인
    // @ts-ignore
    if (url.includes("/refresh")) {
      console.log("refresh token 으로 access token 갱신");
      return config;
    }

    const token = localStorage.getItem("accessToken");

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    } as typeof config;
  },
  () => {},
);

/**
 * 모든 response가 처리되기 직전에 실행되는 곳
 * access토큰 만료되었으면, 다시 refresh토큰 요청
 */
instance.interceptors.response.use(
  (response) => {
    if (response.data.admin) {
      const { id: adminId } = response.data.admin;
      localStorage.setItem("adminId", adminId);
      console.log(adminId);
    }

    // 데이터 pre-serializing => 나중에 get요청이나 이런거 할때 데이터 어떻게 넘어오는지 depth 벗겨서주기
    // return camalize(response);
    // @ts-ignore
    return response;
  },

  async (error: AxiosError<any>) => {
    const { config, response: { status = null } = {} } = error;
    console.log(config);

    if (status === 401) {
      //액세스토큰 만료시
      if (!config) {
        return Promise.reject(error);
      }

      const originalRequest = config;
      const adminId = localStorage.getItem("adminId");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        //리프레쉬 토큰도 만료되면 로그아웃
        console.log("LOGOUT");
        logout();
        return Promise.reject(error);
      }

      try {
        //리프레쉬 토큰 이용해서 액세스토큰 갱신처리
        const response = await instance.post(`/auth/refresh/${adminId}`, {
          refresh_token: refreshToken,
        });
        //갱신된 토큰 저장
        console.log(response);
        localStorage.setItem("accessToken", response.data.accessToken);
        originalRequest.headers["Authorization"] = `Bearer ${response.data.accessToken}`;

        return instance(originalRequest);
      } catch (error) {
        logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

const get = async (url: string) => {
  return await instance.get(url);
};
const post = async (url: string, data: any) => {
  return await instance.post(url, data);
};
const put = async (url: string, data: any) => {
  return await instance.put(url, data);
};
const del = async (url: string) => {
  return await instance.delete(url);
};
export { get, post, put, del };
