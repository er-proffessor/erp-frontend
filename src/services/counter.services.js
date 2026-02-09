import axios from "axios";

const API = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if(token) req.headers.Authorization = `Bearer ${token}`;
    return req;

});

// Get Counters By Branch Id / School Id

export const getCounters = (schoolId) => {
    API.get(`/counter?schoolId=${schoolId}`);
};

// create Counter

export const createCounter = (data) => {
    API.post("/counter", data);

};

// update Counter

export const updateCounter = (id, data) => {
    API.put(`/counter/${id}`, data);
};

// delete Counter

export const deleteCounter = (id) => {
    API.delete(`counter/${id}`);
}