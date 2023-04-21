import React, { useState } from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Layout from "./components/Layout";
import styled from "styled-components";

import DepartmentList from "./components/DepartmentList";
import EmployeeList from "./components/EmployeeList";
import data from "./api/choonsik_company_org.json";

const StyledWrapper = styled.div`
  display: flex;
`;

function App() {
  const initialData = { code: "11003", name: "대표", parentCode: "10000" };
  const [selectedDepartment, setSelectedDepartment] = useState(initialData);

  return (
    <>
      <GlobalStyle />
      <Layout>
        <StyledWrapper>
          <DepartmentList
            departmentList={data.departmentList}
            setSelectedDepartment={setSelectedDepartment}
          />
          {selectedDepartment && (
            <EmployeeList
              employeesList={data.userList}
              selectedDepartment={selectedDepartment}
            />
          )}
        </StyledWrapper>
      </Layout>
    </>
  );
}

export default App;
