import { useEffect } from "react";
import styled from "styled-components";
import Header from "../Header";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

function Layout({ children }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Header />
      <Content>{children}</Content>
    </main>
  );
}

export default Layout;
