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
    const response = await fetch(`http://localhost:3000/employees/${employeeId}`);
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
      const response = await fetch(`http://localhost:3000/employees/${deleteEmployee}`, {
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


document.addEventListener('DOMContentLoaded', function() {
  fetchEmployees();
  formcontainer.addEventListener("submit", handleFormSubmit);
});
