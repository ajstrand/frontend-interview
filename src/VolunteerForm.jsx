import React, { useState, useEffect } from "react";
import Alert from "@reach/alert";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import fetchData from "./fetchData";
const placeholderSelectData = () => (
  <option disabled selected value="0">
    Please choose a location
  </option>
);
const initialState = {
  name: "",
  email: "",
  phone: "",
  location: "0",
  pronouns: {},
  pronounsNotes:""
}
function VolunteerForm() {
  const [validated, setValidated] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const [pronounInput, setPronounInput] = useState(false);
  const [userData, setUserData] = useState(initialState);

  useEffect(() => {
    const urlToFetch =
      "https://raw.githubusercontent.com/beattyml1/frontend-interview/main/data.json";
    async function grabLocations() {
      const data = await fetchData(urlToFetch);
      setLocationData(data);
    }

    grabLocations();
  }, []);

  const checkSelectValue = (e) => {
    const {value} = e.target;
    if (value === "input") {
      setPronounInput(true);
    } else {
      saveFormData(e);
    }
  };

  const checkCheckboxStateForPronouns = (e) => {
      const {id, checked} = e.target;
      userData.pronouns[id] = checked;
      let tempObj = userData.pronouns
      setUserData(previousState => {
        return {...previousState, pronouns:tempObj}
      });
  };

  const saveCustomPronouns = (e) => {
    const {value} = e.target;
    setUserData(previousState => {
      return {...previousState, pronounsNotes:value}
    });
  }

  const clearData = () => {
    setUserData(initialState);
  };

  const saveFormData = (e) => {
    const {name, value} = e.target;
    setUserData(previousState => {
      return {...previousState, [name]:value}
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    event.preventDefault();
    setValidated(true);
  };

  const DataSentMessage = () => {
    console.log(userData);
    return (
      <Container
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        fluid
      >
        <Card style={{ width: "100%", backgroundColor: "#eedfad" }}>
          <Card.Body>
            <Card.Title>
              <Alert>
              Application received 
              </Alert>
             </Card.Title>
            <Card.Text>
              <Alert>
              Your data was sent for the volunteer form application. You will
              receive a response in a few days.
              </Alert>
            
            </Card.Text>
          </Card.Body>
        </Card>
        
      </Container>
    );
  };

  return validated ? (
    <DataSentMessage />
  ) : (
    <Container style={{ height: "100%" }} fluid>
      <h1 style={{ marginTop: "1em" }}>Volunteer Application Form</h1>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="nameID">
            <Form.Label>Name </Form.Label>
            <Form.Control
              value={userData.name}
              name="name"
              required
              type="text"
              placeholder="Name"
              onChange={e => saveFormData(e)}
            />
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="emailID">
            <Form.Label>Email </Form.Label>
            <Form.Control
              value={userData.email}
              name="email"
              required
              type="email"
              placeholder="hello@example.com"
              onChange={e => saveFormData(e)}
            />
          </Form.Group>

          <Form.Group xs="auto" as={Col} md="4" controlId="phoneID">
            <Form.Label>Phone </Form.Label>
            <Form.Control
              value={userData.phone}
              name="phone"
              type="phone"
              placeholder="111-555-6666"
              onChange={e => saveFormData(e)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label>Location</Form.Label>
            <Form.Control
              value={userData.location}
              name="location"
              onChange={e => saveFormData(e)}
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
            controlId="pronounID"
          >             
              <fieldset>
              <legend>What are your pronouns?</legend>
              <div key={`default-${"checkbox"}`} className="mb-3">
              <Form.Check 
                type={"checkbox"}
                id={`He-Him`}
                label={`He/Him`}
                onChange={e => checkCheckboxStateForPronouns(e)}
              />
              <Form.Check 
                type={"checkbox"}
                id={`She-Her`}
                label={`She/Her`}
                onChange={e => checkCheckboxStateForPronouns(e)}
              />
              <Form.Check 
                type={"checkbox"}
                id={`They-Them`}
                label={`They/Them`}
                onChange={e => checkCheckboxStateForPronouns(e)}
              />
              <Form.Check 
                type={"checkbox"}
                id={`Not-disclosure`}
                label={`Prefer not to disclose`}
                onChange={e => checkSelectValue(e)}
              />
              </div>
              <Form.Control
                value={userData.pronounsNotes}
                name="pronouns"
                type="text"
                labe={"Notes on pronouns:"}
                placeholder="Please list your pronouns"
                onChange={e => saveCustomPronouns(e)}
                />
                 <Form.Text id="whatIsThisUsedFor" muted>
              These are used to help our on the ground staff refer to you by
              your preferred pronouns when introducing you to other volunteers,
              if you don't wish to provide this information you don't have to
            </Form.Text>
              </fieldset>
              {/* // <Form.Control
              //   value={userData.pronouns}
              //   name="pronouns"
              //   as="select"
              //   className="me-sm-2"
              //   onChange={e => checkSelectValue(e)}
              //   >
              //   <option value="0">What are your pronouns?</option>
              //   <option value="he/him">He/Him</option>
              //   <option value="she/her">She/Her</option>
              //   <option value="they/them">They/Them</option>
              //   <option value="input">Other(please provide answer)</option>
              //   <option value="Prefer not to disclose">
              //     Prefer not to disclose
              //   </option>
              // </Form.Control> */}
          </Form.Group>
        </Row>

        <Form.Group as={Col}>
          <Button type="submit">Submit Volunteer Application Form</Button>
        </Form.Group>

        <Form.Group style={{ marginTop: "2em" }}>
          <Button onClick={clearData}>Clear Form</Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default VolunteerForm;
