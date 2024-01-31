import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { SignUpData } from "./Types";
import axios, { AxiosResponse } from "axios";
import { useParams, useNavigate } from "react-router-dom";

// import AdminUser from "./AdminUser";

// interface UpdateUserFormProps {
//   userId: string;
//   // onClose: () => void;
// }

const UpdateUser: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();

  // const [showUpdateFrom, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState<SignUpData>({
    name: "",
    username: "",
    mobileNo: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFromData) => ({
      ...prevFromData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData, "details of the user");
    const updatedFields: any = {};
    if (formData.name) updatedFields.name = formData.name;
    if (formData.username) updatedFields.username = formData.username;
    if (formData.mobileNo) updatedFields.mobileNo = formData.mobileNo;
    if (formData.email) updatedFields.email = formData.email;
    if (formData.password) updatedFields.password = formData.password;

    alert("User details updated successfully!");
    navigate("/login");

    try {
      const response: AxiosResponse = await axios.put(
        `http://localhost:4000/api/user/${params}`,
        updatedFields
      );
      console.log(updatedFields, "this details is updated");
      console.log(response, "my response coming from updateUser Put method");
    } catch (error) {
      console.error("Error updating user details:", error);
      alert("An error occurred while updating user details");
    }
  };
  // const SubmitUpdatedDetails()=>{
  //   navigate("./admin");
  // }

  return (
    <>
      <Container className="pt-5 justify-content-center vh-100">
        <Row className="justify-content-center mt-5">
          <Col xs={6}>
            <h2>Update</h2>
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
              <Button className="mt-5" variant="primary" type="submit">
                SAVE UPDATE
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdateUser;
