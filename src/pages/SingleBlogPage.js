import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getBlog } from "../redux/features/blogSlice";

function SingleBlogPage() {
  const dispatch = useDispatch()
  const {id} = useParams()
  const {blog} = useSelector((state) => ({...state.blog}))

  useEffect(() => {
    if(id){
      dispatch(getBlog(id))
    }
  },[id])

  return (
    <>
      <MDBContainer>
        <MDBCard className="mb-5" style={{marginTop:"90px"}}>
          <MDBCardImage
            position="top"
            style={{ width: "100%", maxHeight: "600px" }}
            src={blog.imageFile}
            alt={blog.title}
          />
          <MDBCardBody>
            <h3>{blog.title}</h3>
            <span>
              <p className="text-start blogName">Created By: {blog.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className="text-start">
                {blog && blog.tags && blog.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className="text-start mt-2">
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon="calendar-alt"
                size="lg"
              />
              <small className="text-muted">
                {moment(blog.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className="lead mb-0 text-start">
              {blog.description}
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  )
}

export default SingleBlogPage
