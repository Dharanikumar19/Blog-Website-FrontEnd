import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../redux/features/blogSlice";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";

function Home() {
  const { blogs, loading } = useSelector((state) => ({ ...state.blog }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  if (loading) {
    return <Spinner/>;
  }


  return (
    <div
    style={{
      margin: "auto",
      padding: "15px",
      maxWidth: "1200px",
      alignContent: "center",
    }}
  >
    <MDBRow className="mt-5">
      {blogs.length === 0 && (
        <MDBTypography className="text-center mb-0" tag="h2">
          No blogs Found
        </MDBTypography>
      )}

      <MDBCol>
        <MDBContainer>
          <MDBRow className="row-cols-1 row-cols-md-3 g-2 mt-3 mb-4">
            {blogs &&
              blogs.map((item, index) => <BlogCard key={index} {...item} />)}
          </MDBRow>
        </MDBContainer>
      </MDBCol>
    </MDBRow>
  </div>
  )
}

export default Home
