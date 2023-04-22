import { useState } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Layout from "./components/Layout";
import styled from "styled-components";

import DepartmentList from "./components/DepartmentList";
import EmployeeList from "./components/EmployeeList";
import data from "./api/choonsik_company_org.json";

const StyledWrapper = styled.div`
  display: flex;
  padding-top: 8px;
`;

function App() {
  const initialData = { code: "11003", name: "대표", parentCode: "10000" };
  const [selectedDepartment, setSelectedDepartment] = useState(initialData);
  const [inputText, setInputText] = useState("");

  return (
    <>
      <GlobalStyle />
      <Layout>
        <StyledWrapper>
          <DepartmentList
            departmentList={data.departmentList}
            employeesList={data.userList}
            setSelectedDepartment={setSelectedDepartment}
            setInputText={setInputText}
          />
          {selectedDepartment && (
            <EmployeeList
              employeesList={data.userList}
              selectedDepartment={selectedDepartment}
              inputText={inputText}
              setInputText={setInputText}
            />
          )}
        </StyledWrapper>
      </Layout>
    </>
  );
}

export default App;
