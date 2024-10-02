let userForm=document.getElementById("user-form");

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    
    if(entries) entries= JSON.parse(entries);
    else entries = [];
    
    return entries;
}

const validateDob = (dob) => {
    const dobDate = new Date(dob);
    const age = (Date.now() - dobDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  
    if (age < 18 || age > 55) {
        alert("Please enter a date of birth for users between 18 and 55 years old.");
        return false;
    }
    return true;
};
  
    
let userEntries = retrieveEntries();
const displayEntries = () => {
    const entries= retrieveEntries();
    
    const tableEntries= entries.map((entry)=>{
    
        const nameCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
        const emailCell= `<td class='border px-4 py-2'>${entry.email}</td>`;
        const passwordCell= `<td class='border px-4 py-2'>${entry.password}</td>`;
        const dobCell= `<td class='border px-4 py-2'>${entry.dob}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndConditions}</td>`;
    
    const row= `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
    
    return row;
    }).join("\n");
    
    const table = `<table class="table-auto w-full"><tr>
        <th class="px-4 py-2">Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Password</th>
        <th class="px-4 py-2">dob</th>
        <th class="px-4 py-2">accepted terms?</th>
        </tr>${tableEntries} </table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}

const saveUserForm = (event) => {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;

    if (!validateDob(dob)) return;
    
    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndConditions,
    };
     
    userEntries.push(entry);
    localStorage.setItem("user-entries",JSON.stringify(userEntries));
    userForm.reset(); 
    displayEntries();
}
  
userForm.addEventListener("submit", saveUserForm);
displayEntries();
