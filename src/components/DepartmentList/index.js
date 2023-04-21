import styled from "styled-components";
import DepartmentNode from "./DepartmentNode";

const StyledWrapper = styled.div`
  flex: 1;
  background-color: grey;
  margin: 0 10px;
`;

function DepartmentList(props) {
  const { departmentList, setSelectedDepartment } = props;
  const handleClick = (department) => {
    setSelectedDepartment(department);
  };

  const rootDepartments = departmentList.filter((d) => d.parentCode === "0");
  return (
    <StyledWrapper>
      <ul>
        {rootDepartments.map((rootDepartment) => (
          <DepartmentNode
            key={rootDepartment.code}
            department={rootDepartment}
            departmentList={departmentList}
            onClick={handleClick}
          />
        ))}
      </ul>
    </StyledWrapper>
  );
}

export default DepartmentList;
