function DepartmentNode(props) {
  const { department, departmentList, employeesList, onClick } = props;
  const subDepartments = departmentList.filter(
    (d) => d.parentCode === department.code
  );

  const employeesCount = employeesList.filter(
    (employee) => employee.departmentCode === department.code
  ).length;

  return (
    <>
      <li onClick={() => onClick(department)}>
        {department.name}{" "}
        {department.parentCode !== "0" && <span>({employeesCount})</span>}
      </li>
      {subDepartments.length > 0 && (
        <ul>
          {subDepartments.map((subDepartment) => (
            <DepartmentNode
              key={subDepartment.code}
              department={subDepartment}
              departmentList={departmentList}
              employeesList={employeesList}
              onClick={onClick}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default DepartmentNode;
