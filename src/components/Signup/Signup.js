import React from "react";
import "./Signup.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/Usercontext";
import { useState } from "react";

const Signup = () => {
  const [error, seterror] = useState("");
  const [sucess, setsucess] = useState(false);
  const { createuser, googlesignup } = useContext(AuthContext);
  const handlesubmit = (event) => {
    setsucess(false);
    event.preventDefault();
    const form = event.target;
    const emails = form.email.value;
    const password = event.target.password.value;
    const confarm = event.target.confrim.value;
    console.log(emails, password, confarm);
    if (!/(?=.*[A-Z])/.test(password)) {
      seterror("At least one capital letter");
      return;
    }
    if (password.length < 6) {
      seterror("password should be at least 6 digit");
      return;
    }
    if (!/(?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]/.test(password)) {
      seterror("At least one special character");
      return;
    }
    if (password !== confarm) {
      seterror("Password not match");
      return;
    }
    seterror("");
    createuser(emails, password)
      .then((req) => {
        const user = req.user;
        console.log(user);

        setsucess("Signup Sucessfull");
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        seterror(error.message);
      });
  };
  const googlehandler = () => {
    googlesignup()
      .then((req) => {
        const user = req.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="from-container">
      <Form onSubmit={handlesubmit} className="froms">
        <h4>Sign Up </h4>
        <Form.Group className="mb-3" controlId="formBasicname">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            required
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confrim Password</Form.Label>
          <Form.Control
            type="password"
            name="confrim"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Button className="btn" variant="success" type="submit" name="submit">
          Submit
        </Button>
        <p className="or">--------OR---------</p>

        <Button
          onClick={googlehandler}
          className="btn"
          variant="outline-primary"
        >
          Continue to Google
        </Button>
        <small>
          <p className="create">
            Alredy have an Acount? please <Link to="/login">Login</Link>{" "}
          </p>
        </small>
        <small className="error-message">{error}</small>
        <small className="sucess-message">{sucess}</small>
      </Form>
    </div>
  );
};

export default Signup;
