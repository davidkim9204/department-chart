function DepartmentNode(props) {
  const { department, departmentList, onClick } = props;
  const subDepartments = departmentList.filter(
    (d) => d.parentCode === department.code
  );

  return (
    <>
      <li onClick={() => onClick(department)}>{department.name}</li>
      {subDepartments.length > 0 && (
        <ul>
          {subDepartments.map((subDepartment) => (
            <DepartmentNode
              key={subDepartment.code}
              department={subDepartment}
              departmentList={departmentList}
              onClick={onClick}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default DepartmentNode;
