import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { setCookie, getCookie, deleteCookie } from './cookies';

export const getIsServer = (): boolean => typeof window === 'undefined';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    timeout: 20000,
    withCredentials: true,
    // headers: { 'X-Custom-Header': 'foobar' }
});
const decoreConfig = (config : any): any => {
    const token = typeof window !== 'undefined' && getCookie('ACCESS_TOKEN');
    const orderGuestToken = typeof window !== 'undefined' && getCookie('ORDER_GUEST_TOKEN');
    return ({
        ...config,
        headers:
        {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(orderGuestToken ? { 'X-Spree-Order-Token': orderGuestToken } : {}),
        },
    });
};
export interface ClientTypes{
    setOrderToken(guest_token: string): void;
    getOrderToken(): string | null | undefined;
    isTokenPersited(): boolean;
    clearToken(): Promise<void>;
    setToken(accessToken: string, RefreshToken: string): void;
    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    del<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
}
function parseJwt(token:string): {
    id: number
    email: string
    phone_number: string
    name: string
    sub: number
    exp: number
    iat: number
    iss: string
} {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

    return JSON.parse(jsonPayload);
}

const waitingQueue: Array<()=>Promise<any>> = [];
let refeshingToken = false;

function refreshTokenFactor<T, R = AxiosResponse<T>>(
    callApiFunction: (url: string, config?: AxiosRequestConfig) => Promise<R>,
): (url: string, config?: AxiosRequestConfig) => Promise<R> {
    return (...args) => {
        if (!getIsServer()) {
            const token = getCookie('ACCESS_TOKEN');
            if (token) {
                const { exp } = parseJwt(token);
                if (new Date().getTime() > exp * 1000) {
                    return new Promise((res) => {
                        waitingQueue.push(() => callApiFunction(...args).then((rs) => res(rs)));
                        if (refeshingToken === false) {
                            refeshingToken = true;
                            axiosInstance.post('/api/v1/sign_in', {
                                grant_type: 'refresh_token',
                                refresh_token: getCookie('REFRESH_TOKEN'),
                            }, decoreConfig({})).then((rs:AxiosResponse<any>) => {
                                setCookie('ACCESS_TOKEN', rs.data.data.attributes.token.access_token);
                                setCookie('REFRESH_TOKEN', rs.data.data.attributes.token.refresh_token);
                                while (waitingQueue.length > 0) {
                                    const wait = waitingQueue.pop();
                                    if (wait) {
                                        wait();
                                    }
                                }
                                refeshingToken = false;
                            }).catch((error) => {
                                if (error.response && error.response.status === 401) {
                                    deleteCookie('ACCESS_TOKEN');
                                    deleteCookie('REFRESH_TOKEN');
                                }
                                while (waitingQueue.length > 0) {
                                    const wait = waitingQueue.pop();
                                    if (wait) {
                                        wait();
                                    }
                                }
                                refeshingToken = false;
                            });
                        }
                    });
                }
            }
        }

        return callApiFunction(...args);
    };
}

const client : ClientTypes = {
    isTokenPersited: () => !!getCookie('ACCESS_TOKEN'),
    setToken: (accessToken, RefreshToken) => {
        setCookie('ACCESS_TOKEN', accessToken);
        setCookie('REFRESH_TOKEN', RefreshToken);
    },
    clearToken: () => {
        deleteCookie('ACCESS_TOKEN');
        deleteCookie('REFRESH_TOKEN');
        deleteCookie('ORDER_GUEST_TOKEN');
        return Promise.resolve();
    },
    get: refreshTokenFactor((url, config) => axiosInstance.get(url, decoreConfig(config))),
    // @ts-ignore
    post: refreshTokenFactor((url, data, config) => axiosInstance.post(url, data, decoreConfig(config))),
    // @ts-ignore
    put: refreshTokenFactor((url, data, config) => axiosInstance.put(url, data, decoreConfig(config))),
    // @ts-ignore
    patch: refreshTokenFactor((url, data, config) => axiosInstance.patch(url, data, decoreConfig(config))),
    // @ts-ignore
    del: refreshTokenFactor((url, data, config) => axiosInstance.delete(url, decoreConfig(config))),
    setOrderToken: (guest_token: string) => {
        setCookie('ORDER_GUEST_TOKEN', guest_token);
    },
    getOrderToken: () => getCookie('ORDER_GUEST_TOKEN'),
};

// const refreshToken = () => {
//     const token = getCookie('ACCESS_TOKEN');
//     if (token) {
//         const { exp } = parseJwt(token);
//         if (moment().add(5, 'minutes').unix() > exp) {
//             client.post('/api/v1/sign_in', {
//                 grant_type: 'refresh_token',
//                 refresh_token: getCookie('REFRESH_TOKEN'),
//             });
//         }
//     }
// };
// const registerRefreshToken = () => {
//     const token = getCookie('ACCESS_TOKEN');
//     if (token) {
//         window.setInterval(() => {
//             refreshToken();
//         }, 5 * 60 * 1000);
//     }
// };
export default client;
