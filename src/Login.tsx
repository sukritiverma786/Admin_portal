import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { LoginData } from "./Types";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  const [loginFrom, setLoginFrom] = useState<LoginData>({
    email: "",
    password: "",
    _id: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginFrom((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const LoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      "Signup with email:",
      loginFrom.email,
      "and password:",
      loginFrom.password
    );
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:4000/api/login",
        loginFrom
      );

      const Cookie = Cookies.set("token", response.data.authToken);
      console.log(Cookie, "cookies from login side");

      console.log("Signup successful:", response.data.userExist);
      const user = response.data.userExist;
      console.log(user, "form login side user");
      if (response) {
        navigate("/admin", {
          state: {
            user,
          },
        });
      }
    } catch (error) {
      console.error("Error loging:", error);
    }
  };

  return (
    <>
      <div className="lining_progress"></div>
      <Container className="pt-5 containers justify-content-center vh-100">
        <Row className="justify-content-center containers mt-5">
          <Col xs={6}>
            <h2>Login</h2>
            <Form className="mt-3 " onSubmit={LoginSubmit}>
              <Form.Group controlId="email">
                <Form.Label className="validation">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={loginFrom.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="validation">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginFrom.password}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button className="mt-5" variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
