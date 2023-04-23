import styled from "styled-components";
import Employee from "./Employee";
import Divider from "../Divider";
import { useRecoilState } from "recoil";
import { searchInputState, selectDepartmentState } from "../../states/atoms";

const StyledWrapper = styled.div`
  flex: 2;
  background-color: white;
  padding: 0 20px;
`;

const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
`;

const StyledDepartmentName = styled.span`
  font-weight: 700;
`;

const StyledInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #989898;
`;

function EmployeeList(props) {
  const { employeesList } = props;
  const [inputText, setInputText] = useRecoilState(searchInputState);
  const [selectedDepartment] = useRecoilState(selectDepartmentState);

  const onInputChange = (e) => {
    setInputText(e.target.value);
  };

  const filteredEmployees = selectedDepartment
    ? employeesList.filter(
        (employee) => employee.departmentCode === selectedDepartment.code
      )
    : [];

  const filterInputText = inputText
    ? employeesList.filter(
        (employee) =>
          employee.name === inputText ||
          employee.departmentName === inputText ||
          employee.id === inputText
      )
    : null;

  return (
    <StyledWrapper>
      <StyledHeaderWrapper>
        <div>
          {selectedDepartment && !filterInputText && (
            <div>
              <StyledDepartmentName>
                {selectedDepartment.name}{" "}
              </StyledDepartmentName>
              {filteredEmployees.length > 0 && (
                <span>{filteredEmployees.length}명</span>
              )}
            </div>
          )}
        </div>
        <div>
          <StyledInput
            placeholder="팀, 구성원 검색"
            onChange={onInputChange}
            value={inputText}
          ></StyledInput>
        </div>
      </StyledHeaderWrapper>
      <Divider />
      <Employee
        employees={filterInputText ? filterInputText : filteredEmployees}
      />
    </StyledWrapper>
  );
}

export default EmployeeList;
