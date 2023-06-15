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
export default function Signup() {
  const [Response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const onSendRequest = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/signup", values);
      setLoading(false);
      setResponse(JSON.stringify(res.data, null, 4));
    } catch (error) {
      const err = error as AxiosError;
      setLoading(false);
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
        <Card sx={{ height: "210px" }}>
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
              "name":
              <input
                name="name"
                value={values.name}
                onChange={handleChange}
                type="text"
              />
              <br />
              "email":
              <input
                name="email"
                value={values.email}
                onChange={handleChange}
                type="email"
              />
              <br />
              "password":
              <input
                name="password"
                value={values.password}
                onChange={handleChange}
                type="text"
              />
              <br />
              {`}`}
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
        <Card sx={{ height: "210px", overflowY: "scroll" }}>
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
