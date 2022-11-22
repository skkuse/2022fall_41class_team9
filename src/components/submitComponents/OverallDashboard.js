import { Grid } from "@mui/material";
import styled from "styled-components";
import { Item } from "./Item";

const OverallContainer = styled.div``;
const OverallScore = styled.div``;
const FuctionalityComparison = styled.div``;
const EfficiencyComparison = styled.div``;
const ReadabilityComparison = styled.div``;
const FuctionalitySummary = styled.div``;
const EfficiencySummary = styled.div``;
const ReadabilitySummary = styled.div``;
const OverallComparison = styled.div``;

function OverallDashboard() {
  return (
    <OverallContainer>
      <Grid container spacing={4}>
        <Grid item xs={7}>
          <Item sx={{ height: "700px !important" }}>
            <OverallScore>Overall Score</OverallScore>
          </Item>
        </Grid>
        <Grid item xs={5}>
          <Item>
            <FuctionalityComparison>기능 점수 비교</FuctionalityComparison>
          </Item>
          <Item>
            <EfficiencyComparison>효율 점수 비교</EfficiencyComparison>
          </Item>
          <Item>
            <ReadabilityComparison>가독성 점수 비교</ReadabilityComparison>
          </Item>

          <Item>
            <OverallComparison>총점 비교</OverallComparison>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{ height: "500px !important" }}>
            <FuctionalitySummary>기능 점수 요약(p/f)</FuctionalitySummary>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{ height: "500px !important" }}>
            <EfficiencySummary>효율 점수 요약</EfficiencySummary>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item sx={{ height: "500px !important" }}>
            <ReadabilitySummary>가독성 점수 요약</ReadabilitySummary>
          </Item>
        </Grid>
      </Grid>
    </OverallContainer>
  );
}

export default OverallDashboard;
