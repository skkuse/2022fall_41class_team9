import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupContainer = styled.div`
  width: 560px;
  height: 600px;
  border: 5px solid black;
  margin: 10% auto;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SignupText = styled.h1`
  width: 100%;
  height: 10%;
  text-align: center;
  color: green;
`;
const SignupForm = styled.form`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SignupFormInput = styled.input`
  display: block;
  width: 60%;
  height: 50px;
  margin: 8px;
  border-radius: 8px;
`;
const SignupFormBtn = styled.button`
  width: 50%;
  height: 50px;
  margin-top: 16px;
  background-color: green;
  color: white;
  font-size: 24px;
  cursor: pointer;
  border-radius: 8px;
`;
function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    id: "",
    password: "",
    passwordConfig: "",
    phoneNumber: "",
  });
  const Login = (e) => {
    e.preventDefault();
    console.log(form);
    navigate("/login");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <SignupContainer>
      <SignupText>Signup</SignupText>
      <SignupForm onSubmit={Login}>
        <SignupFormInput
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="이름"
        />
        <SignupFormInput
          type="text"
          id="id"
          name="id"
          value={form.id}
          onChange={handleChange}
          placeholder="학번"
        />
        <SignupFormInput
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호"
        />
        <SignupFormInput
          type="password"
          id="passwordConfig"
          name="passwordConfig"
          value={form.passwordConfig}
          onChange={handleChange}
          placeholder="비밀번호확인"
        />
        <SignupFormInput
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          placeholder="휴대폰 번호"
        />
        <SignupFormBtn>회원가입</SignupFormBtn>
      </SignupForm>
    </SignupContainer>
  );
}

export default Signup;
