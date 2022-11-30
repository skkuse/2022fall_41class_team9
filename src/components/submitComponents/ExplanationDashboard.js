import styled from "styled-components";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styledEngine from "@mui/styled-engine";
import { submitResultState } from "../../atoms";
import { useRecoilState } from "recoil";

const ExplainTitle = styled.h1``;

function ExplanationDashboard() {
  const [submitResult, setSubmitResult] = useRecoilState(submitResultState);

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );
  const getSubmitResult = () => {
    const lst = submitResult.codeExplanation.split("\n");
    return lst;
  };
  const card = (
    <React.Fragment>
      <CardContent>{getSubmitResult()}</CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <div>
      <ExplainTitle>Explain code using AI</ExplainTitle>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    </div>
  );
}
export default ExplanationDashboard;
