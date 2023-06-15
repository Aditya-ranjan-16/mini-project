"use client";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

import axios from "axios";
export default function Welcome() {
  const [Response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const onSendRequest = async () => {
    setLoading(true);
    const res = await axios.get("/api/welcome");
    setLoading(false);
    setResponse(JSON.stringify(res.data, null, 4));
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
              No Body
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
