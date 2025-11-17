

document.getElementById('addbtn').addEventListener('click', function () {
  document.getElementById('formcontainer').style.display = 'block';
  document.getElementById("formcontainer").reset();
});

document.getElementById('closeForm').addEventListener('click', function () {
  document.getElementById('formcontainer').style.display = 'none';
});


async function fetchEmployees() {
  try {
    const response = await fetch('https://javaproject1111.onrender.com/employees');
    const employees = await response.json();
    console.log('emp', employees);

    const tableBody = document.getElementById("employeeTableBODY");
    tableBody.innerHTML = "";

    employees.forEach((emp, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td><img src="images/download.png" style="width=50px; height:50px; object-fit:cover; border-radius:50% ">${emp.salutation} ${emp.firstName} ${emp.lastName}</td>
        <td>${emp.email}</td>
        <td>${emp.phone}</td>
        <td>${emp.dob}</td>
        <td>${emp.gender}</td>
       
        <td>${emp.country}</td>
        <td>
          <div class="dropdown">
            <div class="tr1">...</div>
            <div class="dropdown-content">
              <a  href="viewdetails.html?id=${emp.id}"><i class="fa-solid fa-eye"></i> View details</a>
              <a href="javascript:void(0);" onclick="editEmployee('${emp.id}')"><i class="fa-sharp fa-solid fa-pen"></i> Edit</a>
              <a href="#" class="delete-btn" onclick="deletes('${emp.id}')"><i class="fa-sharp fa-solid fa-trash"></i> Delete</a>
            </div>
          </div>
        </td>
      `;
      tableBody.appendChild(row);
    });


  } catch (error) {
    console.error(error);
  }
}

//validation
const formcontainer = document.getElementById("formcontainer");
const salutation = document.getElementById("salutation");
const firstname = document.getElementById("firstName");
const lastname = document.getElementById("lastName");
const EmailAddress = document.getElementById("EmailAddress");
const phone = document.getElementById("phone");
const dob = document.getElementById("dob");
const gender = document.getElementById("gender")
const qualifications = document.getElementById("qualifications");
const address = document.getElementById("address");
const city = document.getElementById("city");
const state = document.getElementById("state");
const country = document.getElementById("country");
const Username = document.getElementById("Username");
const password = document.getElementById("password");

const salutation_error = document.getElementById("salutation_error");
const firstname_error = document.getElementById("firstname_error");
const lastname_error = document.getElementById("lastname_error");
const Emailaddress_error = document.getElementById("Emailaddress_error");
const phone_error = document.getElementById("phone_error");
const dob_error = document.getElementById("dob_error");
const gender_error = document.getElementById("gender_error")
const qualifications_error = document.getElementById("qualifications_error");
const address_error = document.getElementById("address_error");
const city_error = document.getElementById("city_error")
const state_error = document.getElementById("state_error")
const country_error = document.getElementById("country_error");
const Username_error = document.getElementById("Username_error");
const password_error = document.getElementById("password_error");

// Form validation
formcontainer.addEventListener('submit', (e) => {
  salutation_error.innerHTML = "";
  firstname_error.innerHTML = "";
  lastname_error.innerHTML = "";
  Emailaddress_error.innerHTML = "";
  phone_error.innerHTML = "";
  dob_error.innerHTML = "";
  qualifications_error.innerHTML = "";
  address_error.innerHTML = "";
  city_error.innerHTML = ""
  state_error.innerHTML = ""
  country_error.innerHTML = "";
  Username_error.innerHTML = "";
  password_error.innerHTML = "";

  let isValid = true;

  if (salutation.value === '') {
    salutation_error.innerHTML = "Salutation is required";
    isValid = false;
  }
  if (firstname.value === '') {
    firstname_error.innerHTML = "Firstname is required";
    isValid = false;
  }
  if (lastname.value === '') {
    lastname_error.innerHTML = "Lastname is required";
    isValid = false;
  }
  if (!isValidEmail(EmailAddress.value)) {
    Emailaddress_error.innerHTML = "Invalid email format";
    isValid = false;
  }
  if (!validatePhone(phone.value)) {
    phone_error.innerHTML = "Mobile number must be exactly 10 digits";
    isValid = false;
  }
  if (!ConvertDDMMYYYY(dob.value)) {
    dob_error.innerHTML = "Invalid date of birth format (YYYY-MM-DD)";
    isValid = false;
  }
  if (!document.querySelector('input[name="inlineRadioOptions"]:checked')) {
    gender_error.innerHTML = "Please select a gender";
    isValid = false;
  }
  if (qualifications.value === '') {
    // console.log("err",qualifications.value );

    qualifications_error.innerHTML = "Qualification is required";
    isValid = false;
  }
  if (address.value === '') {
    address_error.innerHTML = "Address is required";
    isValid = false;

  }
  if (city.value === "") {
    city_error.innerHTML = "city is required"
    isValid = false;
  }

  if (state.value === "") {
    state_error.innerHTML = "state is required"
    isValid = false;
  }

  if (country.value === '') {
    country_error.innerHTML = "Country is required";
    isValid = false;
  }
  if (Username.value === '') {
    Username_error.innerHTML = "Username is required";
    isValid = false;
  }
  if (!validatePassword(password.value)) {
    password_error.innerHTML = "Password must be at least 8 characters long, contain uppercase, lowercase, number, and special character.";
    isValid = false;
  }

  if (!isValid) {
    e.preventDefault();
  }
});

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function ConvertDDMMYYYY(date) {
  if (!date) return null;
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
}
document.querySelectorAll("input, select, textarea").forEach((input) => {
  input.addEventListener("input", function () {
    let errorElement = document.getElementById(`${input.id}_error`);
    if (errorElement) {
      errorElement.innerHTML = "";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll("input, select, textarea").forEach((input) => {
    input.addEventListener("input", function () {
      let errorElement = document.getElementById(`${input.id}_error`);
      if (errorElement) {
        errorElement.innerHTML = "";
      }
    });
  });


  const fields = [
    { inputId: "firstName", errorId: "firstname_error" },
    { inputId: "lastName", errorId: "lastname_error" },
    { inputId: "EmailAddress", errorId: "Emailaddress_error" },
  
  ];

  fields.forEach(({ inputId, errorId }) => {
    const inputField = document.getElementById(inputId);
    const errorElement = document.getElementById(errorId);

    if (inputField && errorElement) {
      inputField.addEventListener("input", function () {
        errorElement.innerHTML = "";
      });
    } else {
      console.error(`Error: ID mismatch for ${inputId} or ${errorId}`);
    }
  });



  const genderRadios = document.querySelectorAll('input[name="inlineRadioOptions"]');
  const genderError = document.getElementById("gender_error");

  if (genderRadios.length > 0 && genderError) {
    genderRadios.forEach((radio) => {
      radio.addEventListener("change", function () {
        genderError.innerHTML = "";
      });
    });
  }
});



function getFormData() {
  return {
    salutation: salutation.value,
    firstName: firstname.value,
    lastName: lastname.value,
    email: EmailAddress.value,
    phone: phone.value,
    dob: ConvertDDMMYYYY(dob.value),
    gender: document.querySelector('input[name="inlineRadioOptions"]:checked')?.value,
    qualifications: qualifications.value,
    address: address.value,
    city: city.value,
    state: state.value,
    country: country.value,
    username: Username.value,
    password: password.value,
  };
}


const submitEmployeeData = async (employeeData, employeeId = null) => {
  const method = employeeId ? "PUT" : "POST";
  const url = employeeId ? `https://javaproject1111.onrender.com/${employeeId}` : "https://javaproject1111.onrender.com/employees";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) {
      throw new Error("Failed to add/update employee");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while adding/updating the employee.");
    return null;
  }
};

//  form submission
const handleFormSubmit = async (event) => {
  event.preventDefault();

  const employeeData = getFormData();
  const employeeId = formcontainer.getAttribute('data-edit-id');

  const newEmployee = await submitEmployeeData(employeeData, employeeId);

  if (newEmployee) {
    alert(employeeId ? "Employee updated successfully!" : "Employee added successfully!");
    formcontainer.reset();
    formcontainer.style.display = 'none';
    formcontainer.removeAttribute('data-edit-id');

    fetchEmployees();
  }
};


function editEmployee(employeeId) {

  fetch(`https://javaproject1111.onrender.com/employees/${employeeId}`)
    .then(response => response.json())
    .then(employee => {
      document.getElementById("formcontainer").reset();
      salutation.value = employee.salutation;
      firstname.value = employee.firstName;
      lastname.value = employee.lastName;
      EmailAddress.value = employee.email;
      phone.value = employee.phone;

      dob.value = ConvertDDMMYYYY(employee.dob)
      const genderRadio = document.querySelector(`input[name="inlineRadioOptions"][value="${employee.gender}"]`);
      if (genderRadio) {
        genderRadio.checked = true;
      }

      qualifications.value = employee.qualifications;
      address.value = employee.address;
      city.value = employee.city;
      state.value = employee.state;
      country.value = employee.country;
      Username.value = employee.username;
      password.value = employee.password;

      formcontainer.style.display = 'block';
      formcontainer.setAttribute('data-edit-id', employee.id);
    })
    .catch(error => console.error("Error fetching employee:", error));
}









// Delete employee
let deleteEmployee = null;
function openmodal() {
  document.getElementById("deleteModal").style.display = "block";
}

function closemodal() {
  document.getElementById("deleteModal").style.display = "none";
  deleteEmployee = null;
}


async function deletes(employeeId) {
  console.log("Fetching employee to delete:", employeeId);
  try {
    const response = await fetch(`https://javaproject1111.onrender.com/employees/${employeeId}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    deleteEmployee = employeeId;
    openmodal();
  } catch (error) {
    console.error("Error fetching employee:", error);
  }
}

document.getElementById("confirmDelete").onclick = async () => {
  if (deleteEmployee) {
    try {
      const response = await fetch(`https://javaproject1111.onrender.com/employees/${deleteEmployee}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log("Employee deleted successfully");
        fetchEmployees();
      } else {
        console.error("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      closemodal();
    }
  } else {
    console.error("No employee selected for deletion.");
  }
};


document.addEventListener('DOMContentLoaded', function () {
  fetchEmployees();
  formcontainer.addEventListener("submit", handleFormSubmit);
});

//search//

function searchTable() {
  let filter = document.getElementById('searchs').value.toUpperCase();
  let rows = document.querySelectorAll("#employeeTableBODY tr"); // Select rows inside tbody

  rows.forEach(row => {
    let text = row.innerText.toUpperCase();
    row.style.display = text.includes(filter) ? '' : 'none'; // Show or hide rows
  });

  function clearSearch() {
    document.getElementById('searchs').value = '';
    let rows = document.querySelectorAll("#employeeTableBODY tr");
    rows.forEach(row => row.style.display = '');
  }

  document.getElementById('clearSearch').addEventListener('click', clearSearch);

}








//pagination
let employeesData = [];
let rowsPerPage = 5;
let currentPage = 1;


async function fetchEmployees() {
  try {
    const response = await fetch("https://javaproject1111.onrender.com//employees");
    employeesData = await response.json();
    renderTable(currentPage);
    renderPagination();
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
}


function renderTable(pageNumber) {
  const tableBody = document.querySelector("#employeeTableBODY");
  tableBody.innerHTML = ""; // Clear the table body

  const start = (pageNumber - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageData = employeesData.slice(start, end);

  pageData.forEach((employee, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${start + index + 1}</th>
      <td>
        <img src="${employee.image || 'images/download.png'}" alt="avatar" class="imgmain" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%; margin-right: 8px;">
        ${employee.salutation} ${employee.firstName} ${employee.lastName}
      </td>
      <td>${employee.email}</td>
      <td>${employee.phone}</td>
      <td>${employee.dob}</td>
      <td>${employee.gender}</td>
      <td>${employee.country}</td>
      <td>
        <div class="dropdown">
          <div class="tr1">...</div>
          <div class="dropdown-content">
            <a href="viewdetails.html?id=${employee.id}"><i class="fa-solid fa-eye"></i> View details</a>
            <a href="javascript:void(0);" onclick="editEmployee('${employee.id}')"><i class="fa-sharp fa-solid fa-pen"></i> Edit</a>
            <a href="#" class="delete-btn" onclick="deletes('${employee.id}')"><i class="fa-sharp fa-solid fa-trash"></i> Delete</a>
          </div>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}


function renderPagination() {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(employeesData.length / rowsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = "page-item";
    li.innerHTML = `<a href="#" class="page-link ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</a>`;
    paginationContainer.appendChild(li);
  }

  paginationContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("page-link")) {
      e.preventDefault();
      currentPage = parseInt(e.target.getAttribute("data-page"), 10);
      renderTable(currentPage);
      renderPagination();
    }
  });
}


function updateTableRows() {
  rowsPerPage = document.querySelector('#dropdown').value;
  currentPage = 1;
  renderTable(currentPage);
  renderPagination();
}


window.onload = fetchEmployees;


let upload = document.getElementById("upload");
let inputfile = document.getElementById("uploadImage");

inputfile.onchange = () => {
  upload.src = URL.createObjectURL(inputfile.files[0]);
}


// window.onload=function (){
//   const urlParams =new URLSearchParams(window.location.search)
//   const employeeId=urlParams.get(`employeeId`);
//   if(employeeId){
//     editEmployee();
//   }
// } 



// Function to handle image upload
async function imagefetch(employeeId) {
  if (!employeeId) {
      console.error("Error: Employee ID is undefined or empty.");
      alert("Error: Please select an Employee ID before uploading an image.");
      return;
  }

  console.log("Uploading image for Employee ID:", employeeId); // Debugging check

  const inputfile = document.getElementById('uploadImage');

  if (!inputfile.files.length) {
      alert("Please select an image before uploading.");
      return;
  }

  try {
      const formData = new FormData();
      formData.append("avatar", inputfile.files[0]);

      const response = await fetch(`https://javaproject1111.onrender.com/employees/${employeeId}/avatar`, {
          method: "POST",
          body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image.");

      const image = await response.json();
      alert(`Image uploaded successfully for Employee ID: ${employeeId}`);
  } catch (error) {
      console.error("Error:", error);
      alert("Image upload failed.");
  }
}

// Event listener for file selection and calling imagefetch
document.getElementById("uploadImage").addEventListener("change", function () {
  let employeeId = document.getElementById("employeeIdInput")?.value?.trim(); // Ensure it exists and is not empty
  console.log("Employee ID before calling imagefetch:", employeeId); // Debugging check

  if (!employeeId) {
      alert("Please enter/select an Employee ID before uploading.");
      return;
  }

  imagefetch(employeeId); // Now calling function with the correct employeeId
});



