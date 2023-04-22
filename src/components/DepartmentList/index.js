import styled from "styled-components";
import DepartmentNode from "./DepartmentNode";
import { useSetRecoilState } from "recoil";
import { searchInputState, selectDepartmentState } from "../../states/atoms";

const StyledList = styled.ul`
  list-style-type: none;
`;

const StyledWrapper = styled.div`
  flex: 1;
  background-color: #f2f2f2;
  margin: 0 10px;
  border: 1px solid #989898;
`;

function DepartmentList(props) {
  const { departmentList, employeesList } = props;

  const setSearchInput = useSetRecoilState(searchInputState);
  const setSelectDepartment = useSetRecoilState(selectDepartmentState);

  const handleClick = (department) => {
    setSelectDepartment(department);
    setSearchInput("");
  };

  const rootDepartments = departmentList.filter((d) => d.parentCode === "0");
  return (
    <StyledWrapper>
      <StyledList>
        {rootDepartments.map((rootDepartment) => (
          <DepartmentNode
            key={rootDepartment.code}
            department={rootDepartment}
            departmentList={departmentList}
            employeesList={employeesList}
            onClick={handleClick}
          />
        ))}
      </StyledList>
    </StyledWrapper>
  );
}

export default DepartmentList;
