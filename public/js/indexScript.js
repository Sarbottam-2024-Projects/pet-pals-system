document.addEventListener('DOMContentLoaded', function () {
    let shelterLink = document.getElementById('shelter-link');
  
    function handleRole(data) {
      try {
        if (data.user.role === 'shelter') {
          shelterLink.style.display = 'block';
        } else {
          shelterLink.style.display = 'none';
        }
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    }
  
    function getUserRole(email) {
      console.log(email);
      fetch(`/user/${email}`)
        .then(response => response.json())
        .then(handleRole)
        .catch(error => {
          console.error('Error:', error);
          throw error;
        });
    }
  
    // Ensure the email is loaded from localStorage
    const email = localStorage.getItem('email');
    if (email) {
      getUserRole(email);
    }
  });
  