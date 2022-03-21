import React, { useState, useEffect } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBInput,
} from "mdb-react-ui-kit";

import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, updateBlog } from "../redux/features/blogSlice";

const initialSate = {
    title: "",
    description: "",
    tags: []
}

function AddEditBlog() {
    const [blogData, setBlogData] = useState(initialSate)
    const [tagErrMsg, setTagErrMsg] = useState(null)
    const { error, loading, userBlogs } = useSelector((state) => ({ ...state.blog }))
    const { user } = useSelector((state) => ({ ...state.auth }))
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();

    const { title, description, tags } = blogData;

    useEffect(() => {
        if (id) {
            const singleBlog = userBlogs.find((blog) => blog._id === id);
            setBlogData({ ...singleBlog })
        }
    }, [])

    useEffect(() => {
        error && toast.error(error);
    }, [error])

    const handleInput = (e) => {
        const { name, value } = e.target;
        setBlogData({ ...blogData, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!tags.length){
            setTagErrMsg("Please Provide Some Tags")
        }
        if (title && description && tags) {
            const updatedBlogData = { ...blogData, name: user?.result?.name };
            if (!id) {
                dispatch(createBlog({ updatedBlogData, navigate, toast }))
            } else {
                dispatch(updateBlog({ id, updatedBlogData, navigate, toast }))
            }
            handleClear();
        }

    }
    const handleAddTag = (tag) => {
        setTagErrMsg(null);
        setBlogData({ ...blogData, tags: [...blogData.tags, tag] })
    }
    const handleDeleteTag = (deleteTag) => {
        setBlogData({ ...blogData, tags: blogData.tags.filter((tag) => tag !== deleteTag) })
    }
    const handleClear = () => {
        setBlogData({ title: "", description: "", tags: [] });
    }

    return (
        <div style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "450px",
            alignContent: "center",
            marginTop: "120px",
        }} className="container">
            <MDBCard alignment="center">
                <h4>{id ? "Update Blog" : "Add Blog"}</h4>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate  >
                        <div className="col-md-12">
                            <label className="font-weight-bold">Blog Title</label>
                            <MDBInput placeholder="Enter title" type="text"
                                value={title || ""} name="title" onChange={handleInput}
                                className="form-control" required invalid validation="Enter Title"
                            />
                        </div>

                        <div className="col-md-12">
                        <label className="font-weight-bold">Description</label>
                            <MDBInput placeholder="Enter Description" type="text" value={description}
                                name="description" onChange={handleInput} className="form-control" 
                                required invalid textarea rows={4} validation="Enter Description"
                            />
                        </div>
                        <div className="col-md-12">
                        <label className="font-weight-bold">Tags</label>
                            <ChipInput
                                name="tags"
                                variant="outlined"
                                placeholder="Enter Tag"
                                fullWidth
                                value={tags}
                                onAdd={(tag) => handleAddTag(tag)}
                                onDelete={(tag) => handleDeleteTag(tag)}
                            />
                            {tagErrMsg && <div className="tagErrMsg">{tagErrMsg}</div>}
                        </div>
                        <div className="d-flex justify-content-start">
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) =>
                                    setBlogData({ ...blogData, imageFile: base64 })
                                }
                            />
                        </div>
                        <div className="col-12">
                            <MDBBtn style={{ width: "100%" }}>
                                {id ? "Update" : "Submit"}
                            </MDBBtn>
                            <MDBBtn
                                style={{ width: "100%" }}
                                className="mt-2"
                                color="danger"
                                onClick={handleClear}
                            >
                                Clear Data
                            </MDBBtn>
                        </div>

                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}

export default AddEditBlog
