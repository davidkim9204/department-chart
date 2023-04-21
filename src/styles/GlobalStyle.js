import { withTheme, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 16px;
    font-family: 'Noto Sans CJK KR', sans-serif;
  }

  body {
    margin: 0;
    line-height: 1.6;
    background-color: white;

    a {
      text-decoration: none;
    }
  }
`;

export default withTheme(GlobalStyle);
