import styled from "styled-components";
import * as React from "react";
import CardContent from "@mui/material/CardContent";
import { submitResultState } from "../../../atoms";
import { useRecoilValue } from "recoil";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import { Paper } from "@mui/material";

const ExplainCode = styled.div`
  font-size: ${(props) => props.fontSize}px;
  margin-left: 32px;
`;

function ExplanationDashboard() {
  // 제출 결과에 관한 state
  const submitResult = useRecoilValue(submitResultState);
  // 제출 결과의 code 설명의 fontsize에 관한 state
  const [size, setSize] = useState(30);

  // AI code 설명을 받아와서 데이터 처리
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
      {/* submitResult가 존재한다면 getSubmitResult 실행 */}
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
      </Paper>
    </div>
  );
}
export default ExplanationDashboard;
