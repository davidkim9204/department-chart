import { useState } from "react";
import styled from "styled-components";

function Employee(props) {
  const { employees } = props;

  const ListWrapper = styled.div`
    margin-bottom: 8px;
  `;

  const ProfileSection = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
  `;

  const CircleProfile = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #989898;
    margin-right: 8px;
  `;

  const ProfileItem = styled.div`
    margin-right: 4px;
  `;

  const CardSection = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    border-radius: 10px;
    margin: 10px 0 10px 40px;
    padding: 10px;
  `;

  const Arrow = styled.div`
    margin-left: auto;
    margin-right: 4px;
    border-style: solid;
    border-color: ${({ isOpen }) => (isOpen ? "black" : "#bbbbbb")};
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: ${({ isOpen }) =>
      isOpen ? "rotate(-135deg)" : "rotate(45deg)"};
    transition: transform 0.3s ease-out;
    transition: transform 0.3s ease-out;
    cursor: pointer;
  `;

  const [cardStates, setCardStates] = useState(
    employees.reduce((acc, employee) => {
      acc[employee.id] = false;
      return acc;
    }, {})
  );

  const toggleCard = (employeeId) => {
    setCardStates((prevState) => ({
      ...prevState,
      [employeeId]: !prevState[employeeId],
    }));
  };

  return (
    <div>
      {employees.map((employee) => (
        <ListWrapper key={employee.id}>
          <ProfileSection onClick={() => toggleCard(employee.id)}>
            <CircleProfile />
            <ProfileItem>{employee.id}</ProfileItem>
            <ProfileItem>({employee.name})</ProfileItem>
            {employee.dutyCode === "710" && <ProfileItem>팀장</ProfileItem>}
            <Arrow isOpen={cardStates[employee.id]} />
          </ProfileSection>
          {cardStates[employee.id] && (
            <CardSection>
              <span>부서 : {employee.departmentName}</span>
              <span>이메일주소 : {employee.email}</span>
              <span>휴대폰번호 : {employee.telephoneNumber}</span>
            </CardSection>
          )}
        </ListWrapper>
      ))}
    </div>
  );
}

export default Employee;
