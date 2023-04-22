import { useState } from "react";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style-type: none;
`;

const DepartmentNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled.button`
  background-color: white;
  color: black;
  border: none;
`;

function DepartmentNode(props) {
  const { department, departmentList, employeesList, onClick } = props;
  const [showSubDepartments, setShowSubDepartments] = useState(true);

  const subDepartments = departmentList.filter(
    (d) => d.parentCode === department.code
  );

  const employeesCount = employeesList.filter(
    (employee) => employee.departmentCode === department.code
  ).length;

  const handleToggle = (e) => {
    e.stopPropagation();
    setShowSubDepartments((prevState) => !prevState);
  };

  return (
    <>
      <li onClick={() => onClick(department)}>
        <DepartmentNameWrapper>
          {subDepartments.length > 0 && (
            <StyledButton onClick={handleToggle}>
              {showSubDepartments ? "-" : "+"}
            </StyledButton>
          )}
          {department.name}
          {department.parentCode !== "0" && <span> ({employeesCount})</span>}
        </DepartmentNameWrapper>
      </li>
      {showSubDepartments && subDepartments.length > 0 && (
        <StyledList>
          {subDepartments.map((subDepartment) => (
            <DepartmentNode
              key={subDepartment.code}
              department={subDepartment}
              departmentList={departmentList}
              employeesList={employeesList}
              onClick={onClick}
            />
          ))}
        </StyledList>
      )}
    </>
  );
}

export default DepartmentNode;
