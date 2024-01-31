import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "./logo.png";
import whatsappLogo from "./whatapp.jpg";
import facebook from "./facebook.jpg";
import { Link } from "react-router-dom";
import avatarF from "./avatarF.jpg";
// import Avatar from "./Avatar.jpg";
import axios from "axios";
// import { Button } from "react-bootstrap";
// import { RiEdit2Line, RiDeleteBin2Line } from "react-icons/ri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAlt,
  faEdit,
  faTrash,
  faCheckCircle,
  faPlus,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Users } from "./Types";

// type Token = string | null;

const AdminUser = () => {
  const [users, setUsers] = useState<Users[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const UserDetails = location.state.user;
  const { email, mobileNo, name, role, username, _id } = UserDetails;

  const handleDeleteClick = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/remove/${id}`
      );
      console.log(response, "record deleted");
      getUsers(currentPage);
    } catch (error) {
      console.log(error);
    }
  };

  // const getAuthTokenFromCookies = (): Token => {
  //   const name = "token=";
  //   const decodedCookies = decodeURIComponent(document.cookie);
  //   const cookieArray = decodedCookies.split(";");

  //   for (const cookie of cookieArray) {
  //     let trimmedCookie = cookie.trim();
  //     if (trimmedCookie.indexOf(name) === 0) {
  //       return trimmedCookie.substring(name.length, trimmedCookie.length);
  //     }
  //   }

  //   return null;
  // };

  const getUsers = async (page: number) => {
    try {
      // const token = getAuthTokenFromCookies();

      // const header = headers.Authorization.split(" ")[1];
      // console.log(
      //   header,
      //   "what is the headers____________________________________"
      // );
      // const response = await axios.get(
      //   `http://localhost:4000/api/users?page=${page}`,{
      //     const headers = {
      //       Authorization: `Bearer ${token}`,
      //     };
      //   }
      // );
      const response = await axios.get(
        "http://localhost:4000/api/users?page=1",
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        }
      );
      //  const auth= response.headers.Authorization.split(" ")[1];
      // console.log(auth, "what is the headers");
      const UserData = response.data.users;
      setUsers(UserData);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // {showLoginForm && (
  //   <div className="overlay">
  //     {callLoginFormFunction()} {/* Call the function here */}
  //   </div>
  // )}

  return (
    <>
      <div className="lining_progress"></div>
      {/* {showUpdateFrom && (
        <div className="overlay">
          {users &&
            users.map((user) => <UpdateUser userId={user._id as string} />
            )}
        </div>
      )} */}

      <Container style={{ height: "80vh" }} className="mt-5 box_conatiner ">
        <Row>
          <Col
            lg={4}
            xl={4}
            md={4}
            className="d-flex justify-content-center left_container containers"
          >
            <div>
              {/* Content for col-4 container */}
              <div className="d-flex justify-content-center left_container">
                <img src={logo} alt="logo" className="Admin_logo m-3" />
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h3>{username}</h3>
                <h3>{name}</h3>
                <h3>{_id}</h3>
                <div>
                  <img
                    className="icon mt-3"
                    src={whatsappLogo}
                    alt="whatsappLogo"
                  />
                  <img
                    className="icon mt-3"
                    src={facebook}
                    alt="whatsappLogo"
                  />
                </div>
                <div className="hover-container">
                  <Link to="/signup" className="textClour">
                    <FontAwesomeIcon icon={faPlus} className="fontIcon" />
                  </Link>
                  <div className="hover-content">Add a new User</div>

                  <Link to={"/update/" + _id}>
                    <FontAwesomeIcon icon={faEdit} className="fontIcon" />
                  </Link>
                </div>
                <span className="mt-5">{role}</span>
                <span className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faMobileAlt} className="fontIcon" />
                  {mobileNo}
                </span>
                <Link to="#" className="textClour">
                  {email}
                </Link>

                <div className="shadowLine"></div>
              </div>
            </div>
          </Col>

          <Col
            lg={8}
            xl={8}
            md={8}
            style={{ height: "80vh" }}
            className="right_container"
          >
            <div style={{ backgroundColor: "lightblue", height: "80vh" }}>
              <Row>
                {users &&
                  users.map((user) => (
                    <Col
                      key={user._id}
                      md-6
                      className="m-5 d-flex justify-content-center"
                    >
                      <div className="card_user d-flex ">
                        <img
                          src={avatarF}
                          alt="avatarF"
                          className="avatar_logo m-3"
                        />
                        <div className="d-flex flex-column">
                          <h4>{user.name}</h4>
                          <Link to="#" className="user_email">
                            {user.email}
                          </Link>
                          <div className="shadowLine"></div>
                          <span className="d-flex align-items-center">
                            <FontAwesomeIcon
                              icon={faMobileAlt}
                              className="fontIcon"
                            />
                            +91 {user.mobileNo}
                          </span>
                          <div
                            className="updatePageStyle"
                            style={{ height: "1.2rem" }}
                          >
                            <Link to={"/Todo/" + user._id}>
                              <FontAwesomeIcon
                                icon={faTasks}
                                className="fontIcon"
                              />
                            </Link>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="fontIcon"
                              onClick={() => handleDeleteClick(user._id)}
                            />
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="fontIcon"
                            />
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                <Col>
                  <Row>
                    <div>
                      <button
                        className="styledBtn m-3"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      <button
                        className="styledBtn"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </Row>
                </Col>
                {/* <button
                  className="styledBtn"
                  onClick={(e) => {
                    setShow(true);
                  }}
                  disabled={currentPage === totalPages}
                >
                  Show Users
                </button> */}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminUser;
