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
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { useState } from "react";

const ExplainTitle = styled.h1``;
const ExplainCode = styled.div`
  font-size: ${(props) => props.fontSize}px;
  margin-left: 32px;
`;

function ExplanationDashboard() {
  const [submitResult, setSubmitResult] = useRecoilState(submitResultState);
  const [size, setSize] = useState(30);
  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );
  const getSubmitResult = () => {
    if (submitResult.codeExplanation) {
      const lst = submitResult.codeExplanation.split("\n");
      return (
        <>
          {lst.map((element, index) => (
            <ExplainCode
              fontSize={size}
              key={index}
              style={{ color: "black " }}
            >
              {element}
            </ExplainCode>
          ))}
        </>
      );
    }
  };
  const card = (
    <React.Fragment>
      <h2 style={{ margin: "16px" }}>The code doing is following:</h2>
      <CardContent>{submitResult && getSubmitResult()}</CardContent>
      <CardActions>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </React.Fragment>
  );

  return (
    <div>
      <Box sx={{ minWidth: 275 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ExplainTitle>Explain code using AI</ExplainTitle>
          <div>
            <h3>크기를 조절하세요!</h3>
            <Slider
              defaultValue={30}
              aria-label="Default"
              valueLabelDisplay="auto"
              sx={{ width: "200px", height: "15px", marginRight: "48px" }}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
          </div>
        </div>
        <Card
          variant="outlined"
          sx={{
            maxWidth: 768,
            border: "1px solid black",
            borderRadius: "16px",
            backgroundColor: "beige",
            margin: "0 auto",
          }}
        >
          {card}
          <Stack
            spacing={1}
            sx={{
              margin: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>Is the response helpful?</h3>
            <Rating
              name="half-rating"
              defaultValue={1}
              precision={0.5}
              size="large"
            />
          </Stack>
        </Card>
      </Box>
    </div>
  );
}
export default ExplanationDashboard;
