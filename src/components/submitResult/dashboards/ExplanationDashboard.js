import styled from "styled-components";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styledEngine from "@mui/styled-engine";
import { submitResultState } from "../../../atoms";
import { useRecoilState } from "recoil";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { Paper } from "@mui/material";

const ExplainTitle = styled.h1``;
const ExplainCode = styled.div`
  font-size: ${(props) => props.fontSize}px;
  margin-left: 32px;
`;

function ExplanationDashboard() {
  const [submitResult, setSubmitResult] = useRecoilState(submitResultState);
  const [size, setSize] = useState(30);

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
      <h2 style={{ margin: "16px" }}>AI 코드 분석</h2>

      <CardContent>{submitResult && getSubmitResult()}</CardContent>
    </React.Fragment>
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
          marginBottom: "40px",
        }}
      >
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
      <Paper
        elevation={3}
        sx={{
          width: "90%",
          maxWidth: "1024px",
          margin: "0 auto",
          padding: "10px",
        }}
      >
        {card}
        <Stack
          spacing={1}
          sx={{
            margin: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginRight: "40px",
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
      </Paper>
    </div>
  );
}
export default ExplanationDashboard;
