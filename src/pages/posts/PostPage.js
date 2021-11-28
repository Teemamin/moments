import React, { useEffect, useState } from "react";
import Post from "./Post";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";


function PostPage() {
  // using react router useParams hook and destructure  
  // in place with the name of the parameter  that we set in the route, which was ‘id’
    const {id} = useParams()
    const [post, setPost] = useState({results:[]})

    useEffect(() => {
      const handleMount = async () => {
        try {
          // see notes below
          const [{ data: post }] = await Promise.all([
            axiosReq.get(`/posts/${id}`),
          ]);
          setPost({ results: [post] });
          console.log(post);
        } catch (err) {
          console.log(err);
        }
      };
  
      handleMount();
    }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Post {...post.results[0]} setPost={setPost} postPage/>
        <Container className={appStyles.Content}>
          Comments
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;

// Here we are destructing the data property returned  from the API and renaming it to post, later
// we’ll need to destructure a second property for our  comments data, which we’ll rename to comments.
// This renaming of an object key will be new to  you and it is another nice destructuring feature,  
// allowing us to give our  variable a more meaningful name.
// What Promise.all does is it accepts an array of  promises and gets resolved when all the promises  
// get resolved, returning an array of data. If any of the promises in the array fail,  
// Promise.all gets rejected with an error.
// In our case the data returned  is the post we requested.
// The reason we’re using Promise.all here  is that in a later video we’ll add a  
// second API request inside it, to fetch  data about the post comments.