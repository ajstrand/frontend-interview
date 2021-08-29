import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import fetchData from "./fetchData";
const placeholderSelectData = () => (
  <option disabled value="0">
    Please choose a location
  </option>
);
function VolunteerForm() {
  const [validated, setValidated] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const [pronounInput, setPronounInput] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    pronouns: "",
  })
  useEffect(() => {
    const urlToFetch =
      "https://raw.githubusercontent.com/beattyml1/frontend-interview/main/data.json";
    async function grabLocations() {
      const data = await fetchData(urlToFetch);
      setLocationData(data);
      console.log(data);
    }

    grabLocations();
  }, []);

  const checkSelectValue = (e) => {
    console.log(e.target.value);
    if (e.target.value === "input") {
      setPronounInput(true);
    }
    else {
        saveFormData(e)
    }
  };

  const saveFormData = (e) => {
    let userDataCopy = userData;
    userDataCopy[e.target.name] = e.target.value;
    setUserData(userDataCopy)
    console.log(userData)
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container fluid>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Name </Form.Label>
            <Form.Control
              name="name"
              required
              type="text"
              placeholder="Name"
              defaultValue=""
              onBlur={saveFormData}
            />
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Email </Form.Label>
            <Form.Control
              name="email"
              required
              type="email"
              placeholder="hello@example.com"
              defaultValue=""
              onBlur={saveFormData}
            />
          </Form.Group>

          <Form.Group xs="auto" as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Phone </Form.Label>
            <Form.Control
              name="phone"
              type="phone"
              placeholder="111-555-6666"
              defaultValue=""
              onBlur={saveFormData}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              onBlur={saveFormData}
              required
              as="select"
              className="me-sm-2"
            >
              {placeholderSelectData()}
              {locationData.length > 0
                ? locationData.map((el) => {
                    const { code, description } = el;
                    return (
                      <option key={code.toString()} value={code}>
                        {description}
                      </option>
                    );
                  })
                : null}
            </Form.Control>
          </Form.Group>

          <Form.Group
            aria-describedby="whatIsThisUsedFor"
            as={Col}
            md="6"
            controlId="validationCustom03"
          >
            <Form.Label>Pronouns</Form.Label>
            {pronounInput ? (
              <Form.Control
              name="pronouns"
                type="text"
                placeholder="Please list your pronouns"
                defaultValue=""
                onBlur={saveFormData}
              />
            ) : (
              <Form.Control
                name="pronouns"
                as="select"
                className="me-sm-2"
                onBlur={checkSelectValue}
              >
                <option value="0">What are your pronouns?</option>
                <option value="he/him">He/Him</option>
                <option value="she/her">She/Her</option>
                <option value="they/them">They/Them</option>
                <option value="input">Other(please provide answer)</option>
              </Form.Control>
            )}

            <Form.Text id="whatIsThisUsedFor" muted>
              These are used to help our on the ground staff refer to you by
              your preferred pronouns when introducing you to other volunteers,
              if you don't wish to provide this information you don't have to
            </Form.Text>
          </Form.Group>
        </Row>

        <Form.Group>
          <Button type="submit">Submit Volunteer Application Form</Button>
        </Form.Group>

        <Form.Group>
          <Button>Reset form/clear form</Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default VolunteerForm;
