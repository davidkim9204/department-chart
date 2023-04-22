import { useSearchParams } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Layout from "./components/Layout";
import styled from "styled-components";

import DepartmentList from "./components/DepartmentList";
import EmployeeList from "./components/EmployeeList";
import data from "./api/choonsik_company_org.json";

import { useRecoilState } from "recoil";
import { selectDepartmentState } from "./states/atoms";

const StyledWrapper = styled.div`
  display: flex;
  padding-top: 8px;
`;

function App() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const isUserId = data.userList.find((employee) => employee.id === userId);
  const [selectedDepartment] = useRecoilState(selectDepartmentState);

  return (
    <>
      <GlobalStyle />
      <Layout>
        <StyledWrapper>
          <DepartmentList
            departmentList={data.departmentList}
            employeesList={data.userList}
          />
          {selectedDepartment && <EmployeeList employeesList={data.userList} />}
        </StyledWrapper>
      </Layout>
    </>
  );
}

export default App;
