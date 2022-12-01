import styled from "styled-components";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import {
  saveState,
  savePartState,
  testState,
  actionState,
  userState,
  currentProblemInfoState,
} from "../../atoms";
import { act } from "react-dom/test-utils";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useQuery } from "react-query";
import { getPastSubmitResult } from "../../fetch";

const CenterHeaderContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;
const CenterHeaderText = styled.h2`
  color: black;
  font-size: 1.5em;
`;
const CenterHeaderBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: 16px;
  margin-right: 16px;
  height: 100%;
  /* gap: 20px; */
`;

const SaveBtnContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: flex-end;
`;
const CenterHeaderBtn = styled.button`
  width: 70px;
  height: 30px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px 8px 0px 0px;
  cursor: pointer;
`;

function CenterHeader(props) {
  const [savePart, setSavePart] = useRecoilState(savePartState);
  const [test, setTest] = useRecoilState(testState);
  const [action, setAction] = useRecoilState(actionState);

  const userInfo = useRecoilValue(userState);
  const problemInfo = useRecoilValue(currentProblemInfoState);
  const [open, setOpen] = useState(false);
  const [submitId, setSubmitId] = useState(0);
  if (savePart[1] === 1) {
    const tmp = savePart[0];
    localStorage.setItem(tmp, test);
    console.log(savePart);
  } else if (savePart[1] === 2) {
    const tmp = savePart[0];
    localStorage.setItem(tmp, test);
    console.log(savePart);
  } else if (savePart[1] === 3) {
    const tmp = savePart[0];
    localStorage.setItem(tmp, test);
    console.log(savePart);
  }
  const { data: pastSubmitData } = useQuery(
    "getPastSubmitResult",
    () => getPastSubmitResult(userInfo.user_id, problemInfo.prob_id),
    {
      onSuccess: (data) => {},
      onError: (error) => console.log(error),
    }
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handelSelectChange = (event) => {
    setSubmitId(event.target.value);
  };

  const handleRecallBtnClcik = () => {};

  return (
    <CenterHeaderContainer>
      <CenterHeaderBtnContainer>
        <SaveBtnContainer>
          <CenterHeaderBtn
            disabled={action === "submit"}
            style={{
              backgroundColor: savePart === 1 ? "rgba(0,0,0,0.3)" : "grey",
            }}
            onClick={() => {
              const tmp = savePart;
              localStorage.setItem(tmp, test);
              setSavePart(1);
              props.editor.current.setValue(localStorage.getItem(1));
              // setAction("false");
            }}
          >
            1
          </CenterHeaderBtn>
          <CenterHeaderBtn
            disabled={action === "submit"}
            style={{
              backgroundColor: savePart === 2 ? "rgba(0,0,0,0.3)" : "grey",
            }}
            onClick={() => {
              const tmp = savePart;
              localStorage.setItem(tmp, test);
              setSavePart(2);
              props.editor.current.setValue(localStorage.getItem(2));
              // setAction("false");
            }}
          >
            2
          </CenterHeaderBtn>
          <CenterHeaderBtn
            disabled={action === "submit"}
            style={{
              backgroundColor: savePart === 3 ? "rgba(0,0,0,0.3)" : "grey",
            }}
            onClick={() => {
              const tmp = savePart;
              localStorage.setItem(tmp, test);
              setSavePart(3);
              props.editor.current.setValue(localStorage.getItem(3));
              // setAction("false");
            }}
          >
            3
          </CenterHeaderBtn>
        </SaveBtnContainer>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          sx={{ height: "30px" }}
        >
          과거 제출 결과 불러오기
        </Button>
      </CenterHeaderBtnContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ width: "500px", marginBottom: "20px" }}
          id="alert-dialog-title"
        >
          {"불러올 제출 결과를 선택해주세요"}
        </DialogTitle>
        <DialogContent sx={{ paddingTop: "24px !important" }}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{}} fullWidth>
              <InputLabel id="demo-simple-select-label">
                과거 제출 결과
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={submitId}
                label="pastResult"
                onChange={handelSelectChange}
              >
                <MenuItem value={0}>{`기록을 선택해주세요`}</MenuItem>
                {pastSubmitData && pastSubmitData.length > 0 ? (
                  pastSubmitData.map((item) => (
                    <MenuItem
                      key={item.submit_id}
                      value={item.submit_id}
                    >{`${item.counter}번째 제출 기록`}</MenuItem>
                  ))
                ) : (
                  <MenuItem value={0} disabled>
                    제출 이력이 없습니다
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleClose} autoFocus>
            불러오기
          </Button>
        </DialogActions>
      </Dialog>
    </CenterHeaderContainer>
  );
}

export default CenterHeader;
