import styled from "styled-components";

const StyledWrapper = styled.div`
  flex: 1;
  background-color: white;
  padding: 20px;
`;

function EmployeeList(props) {
  const { employeesList, selectedDepartment } = props;
  const filteredEmployees = selectedDepartment
    ? employeesList.filter(
        (employee) => employee.departmentCode === selectedDepartment.code
      )
    : [];

  return (
    <StyledWrapper>
      <div>
        {selectedDepartment.name} {filteredEmployees.length}명
      </div>
      <ul>
        {filteredEmployees.map((employee) => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>
    </StyledWrapper>
  );
}

export default EmployeeList;
