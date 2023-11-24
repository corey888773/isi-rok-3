function createUserSection(user) {
    const section = document.createElement('div');
    section.classList.add('user-section');
  
    const name = document.createElement('h2');
    name.textContent = `${user.firstName} ${user.lastName}`;
    section.appendChild(name);
  
    const contactInfo = document.createElement('div');
    contactInfo.classList.add('contact-info');
  
    const email = document.createElement('p');
    email.textContent = `Email: ${user.email}`;
    contactInfo.appendChild(email);
  
    const phone = document.createElement('p');
    phone.textContent = `Phone: ${user.phone}`;
    contactInfo.appendChild(phone);
  
    section.appendChild(contactInfo);
  
    return section;
  }

  function handleCheckboxChange(event) {
    const contactInfo = event.target.parentNode.querySelector('.contact-info');
    contactInfo.style.display = event.target.checked ? 'block' : 'none';
  }
  
  // Fetch the user data from user.json
  fetch('user.json')
    .then(response => response.json())
    .then(data => {
      const usersContainer = document.getElementById('users-container');
  
      // Create user sections
      data.forEach(user => {
        const userSection = createUserSection(user);
        usersContainer.appendChild(userSection);
      });
  
      // Add event listeners to checkboxes
      const checkboxes = document.querySelectorAll('.user-section input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });