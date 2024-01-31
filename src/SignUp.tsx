import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios, { AxiosResponse } from "axios";
import { SignUpData } from "./Types";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUpData>({
    name: "",
    username: "",
    mobileNo: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:4000/api/user",
        formData
      );
      console.log("Signup successful:", response.data);
    } catch (error) {
      console.error("Error signing up: inside catch block", error);
    }
    navigate("/login");
  };

  // const SubmitSingup = async (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   navigate("/login");
  // };
  return (
    <>
      <div className="lining_progress"></div>
      <Container className="pt-5  containers justify-content-center vh-100">
        <Row className="justify-content-center containers mt-5">
          <Col xs={6}>
            <h2>Signup</h2>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label className="validation">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="username">
                <Form.Label className="validation">UserName</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter User name"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="MobileNo">
                <Form.Label className="validation">Mobile</Form.Label>
                <Form.Control
                  type="mobile"
                  name="mobileNo"
                  placeholder="Enter Mobile Number"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label className="validation">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="validation">Password</Form.Label>
                <Form.Control
                  type="Password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button
                className="mt-5"
                variant="primary"
                type="submit"
                // onClick={SubmitSingup}
              >
                Signup
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
