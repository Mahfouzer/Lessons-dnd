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
