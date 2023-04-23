import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Layout from "./components/Layout";
import styled from "styled-components";

import DepartmentList from "./components/DepartmentList";
import EmployeeList from "./components/EmployeeList";
import data from "./api/choonsik_company_org.json";

import { useRecoilState, useSetRecoilState } from "recoil";
import { selectDepartmentState, selectCardState } from "./states/atoms";

const StyledWrapper = styled.div`
  display: flex;
  padding-top: 8px;
`;

function App() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const isUserId = data.userList.find((employee) => employee.id === userId);

  const [selectDepartment, setSelectDepartment] = useRecoilState(
    selectDepartmentState
  );
  const setSelectCardState = useSetRecoilState(selectCardState);

  useEffect(() => {
    if (isUserId) {
      setSelectDepartment({
        code: isUserId.departmentCode,
        name: isUserId.departmentName,
      });
      setSelectCardState({ [isUserId.id]: isUserId.id });
    }
  }, [isUserId]);

  return (
    <>
      <GlobalStyle />
      <Layout>
        <StyledWrapper>
          <DepartmentList
            departmentList={data.departmentList}
            employeesList={data.userList}
          />
          {selectDepartment && <EmployeeList employeesList={data.userList} />}
        </StyledWrapper>
      </Layout>
    </>
  );
}

export default App;
