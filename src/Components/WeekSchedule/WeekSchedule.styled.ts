import styled from "styled-components";

export const DayContainer = styled.div<{ isDraggingOver: boolean }>`
  background: green;
  background: ${({ isDraggingOver }) =>
    isDraggingOver ? "#f1f1f1" : "#f5f5f5"};
  padding: 20px;
  width: 400px;
  min-width: 150px;
  border-right:1px solid #dbdada;
`;

export const WeekContainer = styled.div`
  display: flex;
`;

export const AddLessonButton = styled.button`
background: transparent;
  text-style: underline;
  border: 1px solid #dbdada;
  cursor: pointer;
  padding:7px 18px;
  margin:20px;
  font-weight:bold;
  transition: all 0.5s ease-out;

  &:hover{
    border-color:black;
    transition: all 0.5s ease-out;
  }
`