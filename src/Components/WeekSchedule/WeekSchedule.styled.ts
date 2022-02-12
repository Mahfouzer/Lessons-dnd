import styled from "styled-components";

export const DayContainer = styled.div<{ isDraggingOver: boolean }>`
  background: ${({ isDraggingOver }) =>
    isDraggingOver ? "#f1f1f1" : "#f5f5f5"};
  width: 400px;
  min-width: 150px;
  border-right:1px solid #dbdada;
  border-bottom:1px solid #dbdada;
  height: 60vh;
  overflow-y:auto;
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


export const DayInfo = styled.div`
text-align:center;
width:100%;
margin-bottom:20px;
font-weight:bold;
min-width:150px;
`  
;

export const Banner = styled.div`
min-width:${(150*7)+7}px;
background: #f4f4f4;
text-align: center;
height: 18px;
border-bottom: 1px solid #dbdada;
border-top: 1px solid #dbdada;
font-size: 18px;
color: grey;
font-weight:bold;
padding:9px 0;
`

export const CloseButton = styled(AddLessonButton)`
  color:red;
  border:none;
  position:absolute;
  right:5px;
  top:15px;
  font-size:0.8em;
  text-decoration: underline;
`