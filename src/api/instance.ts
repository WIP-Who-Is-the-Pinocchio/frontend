import axios from "axios";

// 임시용 (후에 .env나 파일로 뺴야 함)
const instance = axios.create({
  baseURL: "http://localhost:2309",
});

instance.interceptors.response.use(
  async function (config) {
    return config;
  },
  function (error) {
    return error.response;
  },
);

export default instance;
