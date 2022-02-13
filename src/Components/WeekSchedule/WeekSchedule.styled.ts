import styled from "styled-components";

const LESSON_WIDTH = 190;

export const DayContainer = styled.div<{ isDraggingOver: boolean }>`
  background: ${({ isDraggingOver }) =>
    isDraggingOver ? "#f1f1f1" : "#f5f5f5"};
  width: 400px;
  min-width: ${LESSON_WIDTH}px;
  height: 60vh;
  overflow-y: auto;

  border-right: 1px solid #dbdada;
  border-bottom: 1px solid #dbdada;
  &:first-child {
    border-left: 1px solid #dbdada;
  }
`;

export const WeekContainer = styled.div`
  display: flex;
`;

export const WeekActionButtonsContainer = styled.div`
  display: flex;

  @media screen and (max-width: 900px){ 
    width: 100vw;
    position: sticky;
    left: 0;
    button{
      min-width:50px;
      font-size: 15px;
      padding: 17px 18px;
    }
  }

`;

export const ActionButton = styled.button`
  background: transparent;
  text-style: underline;
  border: 1px solid #dbdada;
  cursor: pointer;
  padding: 27px 38px;
  font-weight: bold;
  transition: all 0.5s ease-out;
  font-size: 20px;
  min-width:300px;

  display: block;
  margin: 0 auto 80px auto;

  &:hover {
    border-color: black;
    transition: all 0.5s ease-out;
  }
`;

export const DayInfo = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
  font-weight: bold;
  min-width: ${LESSON_WIDTH}px;
`;

export const Banner = styled.div`
  min-width: ${LESSON_WIDTH * 7 + 6}px;
  background: #f4f4f4;
  text-align: center;
  height: 18px;
  border: 1px solid #dbdada;
  font-size: 18px;
  color: grey;
  font-weight: bold;
  padding: 9px 0;
`;

export const CloseButton = styled.button`
  background: transparent;
  text-style: underline;
  border: 1px solid #dbdada;
  cursor: pointer;
  padding: 7px 18px;
  margin: 20px;
  font-weight: bold;
  transition: all 0.5s ease-out;

  color: red;
  border: none;
  position: absolute;
  right: 5px;
  top: 15px;
  font-size: 0.8em;
  text-decoration: underline;

  &:hover {
    border-color: black;
    transition: all 0.5s ease-out;
  }
`;

export const ScheduleContainer = styled.article`
  width: 100%;

  @media screen and (max-width: 900px){ 
    min-width: ${LESSON_WIDTH * 7 + 6}px;
    position:relative;
  }
`;


export const LoadingText = styled.p`
@keyframes color-change {
  0% { color: #DDFFF7; }
  25% { color: #93E1D8; }
  50% { color: #FFA69E; }
  75% { color: #AA4465; }
  100% { color: #861657; }
}

font-size:2.5em;
  display:block;
  width:max-content;
  margin:50px auto;
  animation: color-change 2s infinite;

`;