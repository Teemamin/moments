import React,{useState} from "react";
import { Link,useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import axios from "axios";
import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
    useRedirect("loggedIn");
    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
      });
    const [errors, setErrors] = useState('')

    const { username, password1, password2 } = signUpData;
    const history = useHistory()
    const handleChange = (event) => {
        // console.log(event)
        setSignUpData({
          ...signUpData,
          [event.target.name]: event.target.value,
        });
      };
    const handleSubmit = async (event)=>{
        event.preventDefault();
        try{
            await axios.post("/dj-rest-auth/registration/", signUpData)
            //after the post to api,redirect to sigin
            history.push("/signin")
        }catch(err){
            //code with the question mark is called  optional chaining. What it does is check if  
            //response is defined before looking for the data
            setErrors(err.response?.data)
        }
    }
  return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username"
                 name="username" className={styles.Input} value={username}
                 onChange={handleChange}/>
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="password1">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                 name="password1" className={styles.Input} value={password1}
                 onChange={handleChange}/>
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}


            <Form.Group controlId="password2">
                <Form.Label className="d-none">Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password"
                 name="password2" className={styles.Input} value={password2}
                 onChange={handleChange}/>
            </Form.Group>

            {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Button type="submit" 
               className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}>
                Sign Up
            </Button>

            {/* non-field-errors */}
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
         </Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;