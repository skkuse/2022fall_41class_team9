import { FiUpload } from "react-icons/fi";
import { MdRefresh, MdContentCopy } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentProblemInfoState,
  savePartState,
  testState,
} from "../../../atoms";

const ButtonsContainer = styled.div`
  display: flex;
  height: 100%;
  gap: 30px;
  align-items: center;
`;

const Item = styled.div`
  width: 40px;
  height: 90%;
  background-color: transparent;
  color: ${({ theme }) => theme.color};
  cursor: pointer;
  font-size: 34px;
  text-align: center;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

function UtilButtons({ editorCode, setSnackBarOpen }) {
  const currentProblemInfo = useRecoilValue(currentProblemInfoState);
  const savePart = useRecoilValue(savePartState);
  const [userCode, setUserCode] = useRecoilState(testState);

  const handleFileUploadBtnClick = (e) => {
    const reader = new FileReader();
    const userFile = e.target.files[0];
    reader.onload = () => {
      setUserCode(reader.result);
      editorCode.current.setValue(reader.result);
      console.log(reader.result);
    };
    reader.readAsText(userFile);
  };

  const handleRefreshBtnClick = () => {
    editorCode.current.setValue(
      JSON.parse(
        JSON.stringify(currentProblemInfo.skeleton).replaceAll("\\\\", "\\")
      )
    );
    localStorage.setItem(
      savePart,
      JSON.parse(
        JSON.stringify(currentProblemInfo.skeleton).replaceAll("\\\\", "\\")
      )
    );
  };

  const handleCopyBtnClick = () => {
    setSnackBarOpen(true);
    navigator.clipboard.writeText(userCode);
    localStorage.setItem(savePart, userCode);
  };

  const handleDownloadBtnClick = () => {
    localStorage.setItem(savePart, userCode);
    const downloadTag = document.createElement("a");
    const fileName = "code.py";
    const code = new Blob([userCode], {
      type: "text/plain",
    });
    downloadTag.href = URL.createObjectURL(code);
    downloadTag.download = fileName;
    document.body.appendChild(downloadTag);
    downloadTag.click();
  };

  return (
    <ButtonsContainer>
      <Item title="코드 불러오기">
        <input
          type="file"
          onChange={handleFileUploadBtnClick}
          accept=".py"
          style={{ display: "none" }}
          className="fileUpload"
        />
        <FiUpload
          onClick={() => {
            localStorage.setItem(savePart, userCode);
            document.querySelector(".fileUpload").click();
          }}
          style={{ cursor: "pointer" }}
        ></FiUpload>
      </Item>
      <Item title="코드 초기화">
        <MdRefresh
          onClick={handleRefreshBtnClick}
          style={{ cursor: "pointer" }}
        ></MdRefresh>
      </Item>
      <Item title="코드 복사">
        <MdContentCopy
          onClick={handleCopyBtnClick}
          style={{ cursor: "pointer" }}
        ></MdContentCopy>
      </Item>
      <Item title="코드 다운로드">
        <BsDownload
          onClick={handleDownloadBtnClick}
          style={{ cursor: "pointer" }}
        ></BsDownload>
      </Item>
    </ButtonsContainer>
  );
}

export default UtilButtons;
