import React, { useState, useRef } from "react";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset"
import Upload from "../../assests/upload.png"
import {useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Image } from "react-bootstrap";
import { useRedirect } from "../../hooks/useRedirect";


function PostCreateForm() {
  useRedirect("loggedOut");

  const [errors, setErrors] = useState({});
  const imageInput = useRef(null);
  const [postData, setPostData] = useState({
      title: '',
      content: '',
      image: ''
  });

  const { title, content, image } = postData;
  const history = useHistory();
  const handleChnage = (e)=>{
      setPostData({...postData,
      [e.target.name]: e.target.value
    }
      )
  }
 
  const handleChangeImage = (event)=>{
    if (event.target.files.length){
      //we need to call URL.revokeObjectURL to clear  the browser's reference
      // to the previous file. Incase our user decides to change  their image file after adding one
        URL.revokeObjectURL(image);
        setPostData({
          ...postData, image: URL.createObjectURL(event.target.files[0]),
        })
      }
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
  
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", imageInput.current.files[0]);
      // Because we are sending an image file as  well as text to our API we need to refresh  
      // the user's access token before we make a  request to create a post. For this, we’ll  
      // import and use the axiosReq instance and post  the formData to the posts endpoint of
      // our API.Our API will respond with data about our newly  created post
      try {
        const { data } = await axiosReq.post("/posts/", formData);
        history.push(`/posts/${data.id}`);
      } catch (err) {
        console.log(err);
        if (err.response?.status !== 401) {
          setErrors(err.response?.data);
        }
      }
    };

    const handleCancleBtn = ()=>{
      history.goBack()
    }



  const textFields = (
    <div className="text-center">
      {/* Add your form fields here */}
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title" name="title" value={postData.title}
         onChange={handleChnage} />
     </Form.Group>
     {errors.title?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
     <Form.Group className="mb-3" controlId="content">
        <Form.Label>Textarea</Form.Label>
        <Form.Control as="textarea" rows={3}
         name="content" value={postData.content}
         onChange={handleChnage}
        
        />
    </Form.Group>
    {errors.content?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={handleCancleBtn}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
                {
                  image? <>
                    <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                  </> :  <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset src={Upload} message="Click or tap to uplaod an image"/>
                </Form.Label>
                }
               
                <Form.File id="image-upload" accept="image/*"
                  onChange={handleChangeImage}
                  ref={imageInput}
                  />
            </Form.Group>
            {errors.image?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostCreateForm;