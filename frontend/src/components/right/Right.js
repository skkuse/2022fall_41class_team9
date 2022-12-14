import { useEffect, useState } from "react";
import styled from "styled-components";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  actionState,
  submitResultState,
  dialogOpenState,
  doneSubmitState,
} from "../../atoms";
import ReactApexChart from "react-apexcharts";
import {
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
} from "@mui/material";
import {
  MdExpandLess,
  MdExpandMore,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const RightContainer = styled.div`
  position: relative;
  border-left: 1px solid ${({ theme }) => theme.borderColor};
  height: 100%;
  display: ${(props) => (props.action === "submit" ? "block" : "none")};
  flex-direction: column;
  /* overflow-y: scroll; */
`;

const ResultContainer = styled.div`
  height: 100%;
  width: 500px;
  display: ${(props) =>
    props.isOpen && !props.isExplanationOpen ? "flex" : "none"};
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgColor};
  align-items: center;
  box-sizing: border-box;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 5px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: flex-end;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.color};
  font-size: 40px;
  margin-top: 20px;
  font-weight: 700;
`;

const NavigatorBtnLeft = styled.button`
  font-size: 60px;
  position: absolute;
  left: 0;
  color: ${({ theme }) => theme.color};
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border: none;
  padding: 0;
  opacity: ${(props) => (props.noUse ? 0.2 : 1)};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const NavigatorBtnRight = styled.button`
  font-size: 60px;
  position: absolute;
  right: 0;
  color: ${({ theme }) => theme.color};
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border: none;
  padding: 0;
  opacity: ${(props) => (props.noUse ? 0.2 : 1)};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const BtnLabel = styled.div`
  position: absolute;
  font-size: 10px;
  color: ${({ theme }) => theme.color};
  bottom: -10px;
`;

const ResizeBtn = styled.button`
  position: absolute;
  z-index: 10;
  height: 40px;
  /* width: 10px; */
  font-size: 20px;
  background-color: beige;
  top: 20%;
  left: -21px;
  padding: 0;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 5px;
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
  height: 64px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  box-sizing: border-box; /* ?????????(Opera) */
  -moz-box-sizing: border-box; /* ???????????????(Firefox)*/
  -webkit-box-sizing: border-box; /* ??????(Webkit) & ??????(Chrome) */
  padding-left: 16px;
`;

const ExplanationContainer = styled.div`
  height: 100%;
  width: 500px;
  display: ${(props) =>
    props.isOpen && props.isExplanationOpen ? "flex" : "none"};
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgColor};
  align-items: center;
  overflow-y: scroll;

  box-sizing: border-box;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 5px;
  }
`;

const ExplanationWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 16px;
`;
const ExplainRow = styled.div`
  font-size: 15px;
`;

function Right({ event }) {
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [action, setActon] = useRecoilState(actionState);
  const submitResult = useRecoilValue(submitResultState);
  const setDialogOpen = useSetRecoilState(dialogOpenState);
  const [isFunctionalityOpen, setIsFuctionalityOpen] = useState(false);
  const [isExplanation, setIsExplanation] = useState(false);
  const setDoneSubmit = useSetRecoilState(doneSubmitState);

  useEffect(() => {
    setDoneSubmit(false);
    setActon("false");
  }, []);

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
                return val.slice(0, 5) + "???";
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
                return total.toFixed(2) + "???";
              },
            },
          },
        },
      },
      labels: ["?????????", "?????????", "?????????"],
    },
  };

  const handleResizeBtnClick = () => {
    setIsRightOpen(!isRightOpen);
    dispatchEvent(event);
  };

  const handleMoveBtnClick = () => {
    setDialogOpen(true);
  };

  const getSubmitResult = () => {
    if (submitResult.codeExplanation) {
      const lst = submitResult.codeExplanation.split("\n");
      return (
        <ExplanationWrapper>
          {lst.map((element, index) => (
            <ExplainRow key={index}>{element}</ExplainRow>
          ))}
        </ExplanationWrapper>
      );
    }
  };

  return (
    <RightContainer action={action}>
      <ResultContainer isOpen={isRightOpen} isExplanationOpen={isExplanation}>
        <HeaderContainer>
          <NavigatorBtnLeft
            disabled
            onClick={() => setIsExplanation(true)}
            noUse={true}
          >
            <MdOutlineKeyboardArrowLeft />
          </NavigatorBtnLeft>
          <Label>?????? ??????</Label>
          <NavigatorBtnRight onClick={() => setIsExplanation(true)}>
            <MdOutlineKeyboardArrowRight />
            <BtnLabel>?????? ??????</BtnLabel>
          </NavigatorBtnRight>
        </HeaderContainer>
        <ReactApexChart
          options={overallScoreChart.options}
          series={overallScoreChart.series}
          type="radialBar"
          width={450}
        />

        {submitResult.functionality &&
        submitResult.efficiency &&
        submitResult.readabilityType ? (
          <InfoContainer>
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                borderRadius: "10px",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton
                onClick={() => setIsFuctionalityOpen(!isFunctionalityOpen)}
              >
                <ListItemText
                  primary={`????????? : ${
                    submitResult.functionality.reduce((sum, curr) => {
                      if (curr.status === "pass") {
                        return sum + 1;
                      } else {
                        return sum;
                      }
                    }, 0) * 20
                  }???`}
                />
                {isFunctionalityOpen ? <MdExpandLess /> : <MdExpandMore />}
              </ListItemButton>
              <Collapse in={isFunctionalityOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {(submitResult.functionality
                    ? submitResult.functionality
                    : [...Array(7).keys()]
                  ).map((item, idx) => (
                    <ListItemButton key={idx}>
                      <ListItemText primary={`${idx + 1}??? ?????????`} />
                      <Button
                        variant="contained"
                        color={item.status === "pass" ? "primary" : "error"}
                        sx={{ marginRight: "20px" }}
                      >
                        {item.status === "pass" ? "Pass" : "Fail"}
                      </Button>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </List>
            <InfoLabel>
              {`????????? : ${
                submitResult.efficiency.reduce((sum, curr) => {
                  return sum + curr.score;
                }, 0) / 4
              }???`}
            </InfoLabel>
            <InfoLabel>
              {`????????? : ${
                submitResult.readabilityType.reduce((sum, curr) => {
                  return sum + curr.score;
                }, 0) / 8
              }???`}
            </InfoLabel>
          </InfoContainer>
        ) : null}
        <Button
          color="primary"
          variant="contained"
          onClick={handleMoveBtnClick}
          sx={{ width: "80%" }}
        >
          ?????? ???????????? ??????
        </Button>
      </ResultContainer>
      <ExplanationContainer
        isOpen={isRightOpen}
        isExplanationOpen={isExplanation}
      >
        <HeaderContainer>
          <NavigatorBtnLeft onClick={() => setIsExplanation(false)}>
            <MdOutlineKeyboardArrowLeft />
            <BtnLabel>?????? ??????</BtnLabel>
          </NavigatorBtnLeft>
          <Label>?????? ??????</Label>
          <NavigatorBtnRight
            disabled
            noUse={true}
            onClick={() => setIsExplanation(false)}
          >
            <MdOutlineKeyboardArrowRight />
          </NavigatorBtnRight>
        </HeaderContainer>
        <Paper
          elevation={3}
          sx={{
            width: "90%",
            paddingTop: "16px",
            paddingBottom: "16px",
            marginTop: "40px",
          }}
        >
          {getSubmitResult()}
        </Paper>
      </ExplanationContainer>
      <ResizeBtn onClick={handleResizeBtnClick}>
        {isRightOpen ? <MdNavigateNext /> : <MdNavigateBefore />}
      </ResizeBtn>
    </RightContainer>
  );
}

export default Right;
