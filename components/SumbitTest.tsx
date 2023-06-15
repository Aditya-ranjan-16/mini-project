"use client";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { AxiosError } from "axios";
import { useState } from "react";

import axios from "axios";
export default function SubmitTest() {
  const [Response, setResponse] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    UserID: 0,
    TestID: 0,
    QuestionID: [1, 2, 3],
    Question: "[1,2,3]",
    Answers: [
      [
        "Provides a means of dividing up tasks",
        "Provides a means of reuse of program code",
        "Provides a means of testing individual parts of the program",
      ],
      ["cwd()"],
      ["Path Module"],
    ],
    Ans: '[ ["Provides a means of dividing up tasks","Provides a means of reuse of program code","Provides a means of testing individual parts of the program"    ],["cwd()"],["Path Module"]]',
  });
  const handleChange = (event: any) => {
    var val = event.target.value;
    if (event.target.name === "QuestionID") {
      try {
        var realval = JSON.parse(val);
        setValues({ ...values, Question: val, QuestionID: realval });
      } catch (e) {
        console.log(e);
      }
    } else if (event.target.name === "Answers") {
      try {
        var realval = JSON.parse(val);
        setValues({ ...values, Ans: val, Answers: realval });
      } catch (e) {
        console.log(e);
      }
    } else {
      setValues({ ...values, [event.target.name]: val });
    }
  };
  const onSendRequest = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/submit-test",
        {
          UserID: Number(values.UserID),
          TestID: Number(values.TestID),
          QuestionID: values.QuestionID,
          Answers: values.Answers,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      console.log(res.data);
      setResponse(JSON.stringify(res.data, null, 4));
    } catch (error) {
      const err = error as AxiosError;
      setLoading(false);
      console.log(err.response?.data);
      setResponse(JSON.stringify(err.response?.data, null, 4));
    }
  };
  return (
    <Grid container spacing={3} alignItems="center" justifyContent="center">
      <Grid
        alignContent={"center"}
        item
        textAlign={"center"}
        xs={12}
        sm={12}
        lg={6}
        md={6}
        xl={6}
      >
        <Card sx={{ height: "260px" }}>
          <CardContent
            sx={{
              height: "120px",
            }}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
              align="left"
            >
              Request
            </Typography>
            <Typography color="text.secondary" gutterBottom align="center">
              {`{`}
              <br />
              "UserID":
              <input
                name="UserID"
                value={values.UserID}
                onChange={handleChange}
                type="number"
              />
              <br />
              "TestID":
              <input
                name="TestID"
                value={values.TestID}
                onChange={handleChange}
                type="number"
              />
              <br />
              "QuestionID":
              <input
                name="QuestionID"
                value={values.Question}
                onChange={handleChange}
                type="text"
              />
              <br />
              "Answers":
              <input
                name="Answers"
                value={values.Ans}
                onChange={handleChange}
                type="text"
              />
              <br />
              {`}`}
            </Typography>
            <Typography color="text.secondary" gutterBottom align="left">
              <br />
              Auth Token:
              <input
                value={token}
                style={{ width: "60%" }}
                onChange={(e) => setToken(e.target.value)}
                type="text"
              />
              <br />
            </Typography>
          </CardContent>

          <CardActions sx={{ alignItems: "center", justifyContent: "end" }}>
            <Button onClick={onSendRequest} size="small">
              Send Request
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid
        alignContent={"center"}
        item
        textAlign={"center"}
        xs={12}
        sm={12}
        lg={6}
        md={6}
        xl={6}
      >
        <Card sx={{ height: "260px", overflow: "scroll" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
              align="left"
            >
              Response
            </Typography>

            <pre>{loading === true ? <CircularProgress /> : Response}</pre>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
