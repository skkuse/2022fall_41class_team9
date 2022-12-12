import { useState } from "react";
import styled from "styled-components";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { actionState, submitResultState, dialogOpenState } from "../../atoms";
import ReactApexChart from "react-apexcharts";
import { Button } from "@mui/material";

const RightContainer = styled.div`
  position: relative;
  border-left: 1px solid ${({ theme }) => theme.borderColor};
  height: 100%;
  display: ${(props) => (props.action === "submit" ? "block" : "none")};
  flex-direction: column;
`;

const ResultContainer = styled.div`
  height: 100%;
  width: 500px;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgColor};
  align-items: center;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.color};
  font-size: 40px;
  margin-top: 20px;
  font-weight: 700;
`;

const ResizeBtn = styled.button`
  position: absolute;
  z-index: 10;
  height: 40px;
  /* width: 10px; */
  font-size: 20px;
  background-color: beige;
  top: 50%;
  left: -21px;
  padding: 0;
  background-color: transparent;
  border: 1px solid black;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const InfoContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 100px;
`;

const InfoLabel = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  box-sizing: border-box; /* 오페라(Opera) */
  -moz-box-sizing: border-box; /* 파이어폭스(Firefox)*/
  -webkit-box-sizing: border-box; /* 웹킷(Webkit) & 크롬(Chrome) */
  padding-left: 35px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: white;
  }
`;

function Right({ event }) {
  const [isRightOpen, setIsRightOpen] = useState(true);
  const action = useRecoilValue(actionState);
  const submitResult = useRecoilValue(submitResultState);
  const setDialogOpen = useSetRecoilState(dialogOpenState);

  const overallScoreChart = {
    series:
      submitResult.functionality &&
      submitResult.efficiency &&
      submitResult.readabilityType
        ? [
            submitResult.functionality.reduce((sum, curr) => {
              if (curr.status === "pass") {
                return sum + 1;
              } else {
                return sum;
              }
            }, 0) * 20,
            submitResult.efficiency.reduce((sum, curr) => {
              return sum + curr.score;
            }, 0) / 4,
            submitResult.readabilityType.reduce((sum, curr) => {
              return sum + curr.score;
            }, 0) / 8,
          ]
        : [0, 0, 0],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
              color: "grey",
              formatter: function (val) {
                return val.slice(0, 5) + "점";
              },
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                const total =
                  w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0) / w.globals.series.length;
                return total.toFixed(2) + "점";
              },
            },
          },
        },
      },
      labels: ["기능성", "효율성", "가독성"],
    },
  };

  const handleResizeBtnClick = () => {
    setIsRightOpen(!isRightOpen);
    dispatchEvent(event);
  };

  const handleMoveBtnClick = () => {
    setDialogOpen(true);
  };

  return (
    <RightContainer action={action}>
      <ResultContainer isOpen={isRightOpen}>
        <Label>제출 결과</Label>
        <ReactApexChart
          options={overallScoreChart.options}
          series={overallScoreChart.series}
          type="radialBar"
          width={600}
        />

        {submitResult.functionality &&
        submitResult.efficiency &&
        submitResult.readabilityType ? (
          <InfoContainer>
            <InfoLabel>
              {`기능성 : ${
                submitResult.functionality.reduce((sum, curr) => {
                  if (curr.status === "pass") {
                    return sum + 1;
                  } else {
                    return sum;
                  }
                }, 0) * 20
              }점`}
            </InfoLabel>
            <InfoLabel>
              {`효율성 : ${
                submitResult.efficiency.reduce((sum, curr) => {
                  return sum + curr.score;
                }, 0) / 4
              }점`}
            </InfoLabel>
            <InfoLabel>
              {`가독성 : ${
                submitResult.readabilityType.reduce((sum, curr) => {
                  return sum + curr.score;
                }, 0) / 8
              }점`}
            </InfoLabel>
          </InfoContainer>
        ) : null}
        <Button
          color="primary"
          variant="contained"
          onClick={handleMoveBtnClick}
          sx={{ width: "80%" }}
        >
          세부 제출결과 보기
        </Button>
      </ResultContainer>
      <ResizeBtn onClick={handleResizeBtnClick}>
        {isRightOpen ? <MdNavigateNext /> : <MdNavigateBefore />}
      </ResizeBtn>
    </RightContainer>
  );
}

export default Right;
