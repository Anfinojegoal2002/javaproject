const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const employeeId = urlParams.get('id');
console.log("Employee ID:", employeeId);

function calculateAge(dob) {
  if (!dob) return "N/A"; 

 
  const [day, month, year] = dob.split("-");
  const birthDate = new Date(`${year}-${month}-${day}`); 

  if (isNaN(birthDate.getTime())) return "Invalid Date"; 

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

 
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }

  return age;
}

async function fetchEmployees() {
    try {
        const response = await fetch(`http://localhost:3000/employees/${employeeId}`);
        const employees = await response.json();
        console.log('emp', employees);

       
        const age = calculateAge(employees.dob);

        
        const viewName = `${employees.salutation} ${employees.firstName} ${employees.lastName}`;
        console.log("viewname", viewName);

        
        document.getElementById("viewName").innerHTML = viewName;
        document.getElementById("viewEmail").innerHTML = employees.email;
        document.getElementById("viewgender").innerHTML = employees.gender;
        document.getElementById("viewage").innerHTML = age;  // Age displayed instead of raw DOB
        document.getElementById("viewdob").innerHTML = employees.dob;
        document.getElementById("viewphone").innerHTML = employees.phone;
        document.getElementById("viewqualifications").innerHTML = employees.qualifications;
        document.getElementById("viewaddress").innerHTML = employees.address;
        document.getElementById("viewusername").innerHTML = employees.username;
        
    } catch (error) {
        console.log("Error fetching employee:", error);
    }
}


fetchEmployees();


