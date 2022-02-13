import styled from "styled-components";

export const LogoImg = styled.img`
  display: Block;
  width: 400px;
  margin: 10px auto;

  @media screen and (max-width: 900px){ 
    margin:15px;
    position: sticky;
    left: 0;
  }
`;

export const MainSection = styled.section`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  @media screen and (max-width: 900px){ 
    min-width: 1336px;
    position: relative;
  }
`;
