import axios from "axios";

const API = axios.create({baseURL : "https://blog-website-backend.herokuapp.com"});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    }
    return req;
  });

export const signin = (formData) => API.post("/users/signin", formData);
export const signup = (formData) => API.post("/users/signup", formData);
export const googleSignin = (result) => API.post("/users/googleSignin", result);

export const addBlog = (blogData) => API.post("/blogs", blogData);
export const getAllBlogs = () => API.get("/blogs");
export const getSingleBlog = (id) => API.get(`/blogs/${id}`);
export const getBlogsBySingleUser = (userId) => API.get(`/blogs/userBlogs/${userId}`);

export const deletedBlog = (id) => API.delete(`/blogs/${id}`);
export const updatedBlog = (updatedBlogData, id) => API.patch(`/blogs/${id}`, updatedBlogData);