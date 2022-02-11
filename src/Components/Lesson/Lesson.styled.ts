import styled from "styled-components";

export const LessonCard = styled.div<{ isDragged: boolean }>`
  background-color: ${(props) => (props.isDragged ? "#dbf9fb" : "white")};
  userselect: "none";
  margin: 10px;
  padding: 5px;
  min-height: 70px;
  border-radius: 3px;
  box-shadow: 0px 0px 20px -9px rgba(0, 0, 0, 0.33);
  -webkit-box-shadow: 0px 0px 20px -9px rgba(0, 0, 0, 0.33);
  -moz-box-shadow: 0px 0px 20px -9px rgba(0, 0, 0, 0.33);
  position: relative;
`;

export const LessonContentWrapper = styled.div`
  padding: 10px 15px;
  height: 70px;
  &:before {
    content: "";
    height: calc(100% - 10px);
    display: inline-block;
    width: 3px;
    background-color: lightBlue;
    position: absolute;
    left: 5px;
    top: 5px;
    border-radius: 3px;
  }
`;

export const RemoveButton = styled.button`
  background: transparent;
  color: red;
  text-style: underline;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  float: right;
`;
