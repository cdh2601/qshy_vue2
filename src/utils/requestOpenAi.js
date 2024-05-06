import axios from 'axios';
// 创建一个自定义的Axios对象
const AxiosOpenAi = axios.create({
    baseURL: '/api',
});

//暴露Axios实例化对象，允许所有文件调用Axios
export default AxiosOpenAi;
