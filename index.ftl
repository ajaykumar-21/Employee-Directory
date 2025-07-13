<#assign employees = [...]>
<!-- Same HTML structure as above -->
<#list employees as emp>
  <div class="employee-card" data-id="${emp.id}">
    <p><strong>${emp.firstName} ${emp.lastName}</strong></p>
    <p>Email: ${emp.email}</p>
    <p>Department: ${emp.department}</p>
    <p>Role: ${emp.role}</p>
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
  </div>
</#list>