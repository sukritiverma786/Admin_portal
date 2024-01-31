import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { Task } from "./Types";
import axios, { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
const Todo = () => {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
  });
  // const params = useParams();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask((prevFromData) => ({
      ...prevFromData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(task);
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:4000/api/task",
        task
      );
      console.log("you have add a new task:", response);
    } catch (err) {
      console.log(err);
    }
  };
  //   console.log(params, "this the param");
  return (
    <>
      <Container className="pt-5 containers justify-content-center vh-100">
        <Row className="justify-content-center containers mt-5">
          <Col xs={6}>
            <h2>TodoTask</h2>
            <Form className="mt-3" onSubmit={handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label className="validation">
                  <Form.Control
                    placeholder="Enter title"
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleInputChange}
                  />
                </Form.Label>
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label className="validation">
                  <Form.Control
                    placeholder="Enter description"
                    type="text"
                    name="description"
                    value={task.description}
                    onChange={handleInputChange}
                    style={{ width: "300px", height: "100px" }}
                  />
                </Form.Label>
              </Form.Group>
              <Link to="/login">
                <Button className="mt-5" variant="primary" type="submit">
                  save
                </Button>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Todo;
