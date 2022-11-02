import styled from "styled-components";
import React, { useState } from "react";
const LoginContainer = styled.div`
  width: 560px;
  height: 400px;
  border: 5px solid black;
  margin: 10% auto;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const LoginText = styled.h1`
  width: 100%;
  height: 10%;
  text-align: center;
  color: green;
`;
const LoginForm = styled.form`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LoginFormlabel = styled.label``;
const LoginFormInput = styled.input`
  display: block;
  width: 50%;
  height: 50px;
  margin: 8px;
`;
const LoginFormBtn = styled.button`
  width: 40%;
  height: 50px;
  margin-top: 16px;
  background-color: green;
  color: white;
  font-size: 24px;
  cursor: pointer;
`;
function Login() {
  const [form, setForm] = useState({ id: "", password: "" });
  const Login = (e) => {
    e.preventDefault();
    console.log(form);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <LoginContainer>
      <LoginText>Login</LoginText>
      <LoginForm onSubmit={Login}>
        {/* <LoginFormlabel htmlFor="studentId">학번:</LoginFormlabel> */}
        <LoginFormInput
          type="text"
          id="id"
          name="id"
          value={form.id}
          onChange={handleChange}
          placeholder="학번"
        />
        {/* <LoginFormlabel htmlFor="studentPassword">비밀번호:</LoginFormlabel> */}
        <LoginFormInput
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호"
        />
        <LoginFormBtn>로그인</LoginFormBtn>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
