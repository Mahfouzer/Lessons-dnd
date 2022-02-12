import styled, { css } from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Input = styled.input`
  padding: 7px 5px;
`;

export const SubmitButton = styled.input`
  align-self: center;
  width: fit-content;
  background: transparent;
  text-style: underline;
  border: 1px solid #dbdada;
  cursor: pointer;
  padding: 7px 18px;
  margin: 20px;
  font-weight: bold;
  transition: all 0.5s ease-out;
  &:hover {
    border-color: black;
    transition: all 0.5s ease-out;
  }
`;

export const Label = styled.label`
  margin-bottom: 5px;
`;

export const Select = styled.select`
  padding: 7px 5px;
`;

export const Option = styled.option`
`;

export const FieldContainer = styled.div<{ hasError: boolean }>`
  display: flex;
  flex-direction: column;
  margin: 25px;

  ${({ hasError }) =>
    hasError &&
    css`
      &:after {
        content: "this Field is required";
        color: red;
        font-size: 0.8em;
        font-style: italic;
      }
      & input {
        border-color: red;
      }
    `}
`;


export const FormHeading = styled.h2`
      text-align:center;
`