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
export default function Phone() {
  const [Response, setResponse] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    phone_number: "",
  });
  const handleChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const onSendRequest = async () => {
    setLoading(true);
    try {
      const res = await axios.put("/api/edit/phonenumber", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
              "phone_number":
              <input
                name="phone_number"
                value={values.phone_number}
                onChange={handleChange}
                type="number"
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
        <Card sx={{ height: "210px", overflow: "scroll" }}>
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
