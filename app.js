
let students = [];

function renderStudents() {
    const tbody = document.getElementById('studentTableBody');
    tbody.innerHTML = ''; // Clear existing data
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td>${student.gender}</td>
            <td>${student.active ? 'Yes' : 'No'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function handleFormSubmit(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || 'Not specified';
    const active = document.getElementById('active').checked;
    const index = document.getElementById('studentIndex')?.value || '-1';

    if (index === '-1') {
        students.push({ name, age, grade, gender, active });
    } else {
        students[index] = { name, age, grade, gender, active };
        document.getElementById('studentIndex').value = '-1'; // Reset index
    }

    document.getElementById('studentForm').reset();
    renderStudents();
}

function editStudent(index) {
    const student = students[index];
    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
    document.getElementById('grade').value = student.grade;
    document.querySelector(`input[name="gender"][value="${student.gender}"]`).checked = true;
    document.getElementById('active').checked = student.active;

    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.id = 'studentIndex';
    hiddenInput.value = index;
    document.getElementById('studentForm').appendChild(hiddenInput);
}

function deleteStudent(index) {
    students.splice(index, 1); 
    renderStudents();
}

document.getElementById('studentForm').addEventListener('submit', handleFormSubmit);

renderStudents();