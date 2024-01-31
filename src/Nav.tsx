import { Link } from "react-router-dom";
// import Avatar from "react-avatar";
import logo from "./logo.png";
const Nav = () => {
  return (
    <>
      <div className="nav">
        {/* <Avatar className="logo" name="A d m i n" size="50" round={true} /> */}
        <img className="logo" src={logo} alt="logo" />
        <ul className="nav-ul">
          <li>
            <Link to="/sign">SignUp</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          {/* <li>
            <Link to="/update/:id">Update Product</Link>
          </li> */}
        </ul>
        {/* <ul className="nav-right">
          <input type="text" placeholder="search" />
        </ul> */}
      </div>
    </>
  );
};

export default Nav;
