/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosInstance, AxiosError } from "axios";
import logout from "@components/admin/logout";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:2309/admin/api/v1",
});

/**
 * 모든 request가 처리되기 직전에 실행되는 곳
 */

instance.interceptors.request.use(
  (config) => {
    const { url } = config;
    console.log(url + " 요청을 인터셉터하기");
    console.log(1);
    // @ts-ignore
    if (url.includes("/refresh")) {
      //요청확인
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
  (error: AxiosError<any>) => {
    //요청 오류가 있는 작업 수행
    console.log("오류가 잇는 작업 : " + error.config);
    return Promise.reject(error);
  },
);

/**
 * 모든 response가 처리되기 직전에 실행되는 곳
 * access토큰 만료되었으면, 다시 refresh토큰 요청
 */

let failedRequest: any = null;

instance.interceptors.response.use(
  // 응답 데이터가 있는 작업 수행

  (response) => {
    if (response.data.admin) {
      const { id: adminId } = response.data.admin;
      localStorage.setItem("adminId", adminId);
    }
    return response;
  },

  //응답 오류가 있는 작업 수행

  async (error: AxiosError<any>) => {
    const { config, response: { status = null } = {} } = error;
    const originalRequest = config;
    console.log(2);
    if (!originalRequest) {
      console.log("refresh token이 없거나 요청 설정이 없습니다.");
      console.log(error);
      return Promise.reject(error);
    }
    if (status === 401) {
      console.log(3);
      const adminId = localStorage.getItem("adminId");
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        //리프레쉬랑 액세스 둘다 만료면 로그아웃
        if (originalRequest.url?.includes("/refresh") && status === 401) {
          console.log("리프레쉬 토큰 액세스 둘다 만료");
          logout();
          return;
        }
        //액세스 만료면 리프레쉬 사용해서 갱신 요청
        const response = await instance.post(`/auth/refresh/${adminId}`, {
          refresh_token: refreshToken,
        });
        //로컬스토리지에 저장된 토큰 갱신
        localStorage.setItem("accessToken", response.data.access_token);
        localStorage.setItem("refreshToken", response.data.refresh_token);
        originalRequest.headers["Authorization"] = `Bearer ${response.data.access_token}`;
        console.log(4);
        // 실패한 요청이 있을 경우 다시 보내기
        if (failedRequest) {
          console.log(failedRequest);
          console.log(5);
          console.log("실패한 요청이 있음 들어옴");
          return instance(failedRequest);
        }

        return Promise.reject(error);
      } catch (error) {
        console.log(error);
        console.log(6);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

const get = async (url: string) => {
  try {
    const response = await instance.get(url);
    console.log(7);
    return response;
  } catch (error: any) {
    // GET 요청이 실패한 경우 실패한 요청을 저장
    failedRequest = error.config;
    console.log(failedRequest);
    console.log(8);
    console.log("실패한 요청 보내기");
    return await instance.get(failedRequest.url);
    // throw error;
  }
};
const post = async (url: string, data?: any) => {
  try {
    const response = await instance.post(url, data);
    return response;
  } catch (error: any) {
    failedRequest = error.config;
    return await instance.post(url, data);
  }
};
const put = async (url: string, data: any) => {
  try {
    const response = await instance.put(url, data);
    return response;
  } catch (error: any) {
    failedRequest = error.config;
    return await instance.put(url, data);
  }
};

const del = async (url: string) => {
  return await instance.delete(url);
};
export { get, post, put, del };
