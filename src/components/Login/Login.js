import React from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/Usercontext";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { userlogin } = useContext(AuthContext);
  const handlelogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const emails = form.email.value;
    const password = event.target.password.value;
    console.log(emails, password);
    userlogin(emails, password)
      .then((req) => {
        const user = req.user;
        console.log(user);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="from-container">
      <Form onSubmit={handlelogin} className="froms">
        <h4>Login</h4>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Button className="btn" variant="success" type="submit" name="submit">
          Submit
        </Button>

        <p className="or">--------OR-------</p>

        <Button className="btn" variant="outline-primary">
          Continue to Google
        </Button>
        <small>
          <p>
            New to Ema-John ? <Link to="/signup">create new acount</Link>{" "}
          </p>
        </small>
      </Form>
    </div>
  );
};

export default Login;
