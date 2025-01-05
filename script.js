






let prevScrollpos = window.pageYOffset;
let scrollTimeout;

// Debounce function to improve scroll performance
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Remove event listeners to prevent memory leaks
const removeEventListeners = (element, events) => {
  events.forEach(event => {
    element.replaceWith(element.cloneNode(true));
  });
};

const handleScroll = debounce(() => {
  const currentScrollPos = window.pageYOffset;
  const navbar = document.querySelector("nav");
  const navLinks = document.querySelectorAll('.nav-links a');
  const logS = document.querySelector(".logSign");

  // Handle navbar visibility
  if (prevScrollpos > currentScrollPos || currentScrollPos < 50) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = `-${navbar.offsetHeight}px`;
  }
  prevScrollpos = currentScrollPos;

  // Handle navbar appearance
  if (currentScrollPos === 0) {
    navbar.style.backgroundColor = "transparent";
    navbar.style.boxShadow = "none";
    updateNavStyles(true, navLinks, logS);
  } else {
    navbar.style.backgroundColor = "white";
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    updateNavStyles(false, navLinks, logS);
  }
}, 10);

const updateNavStyles = (isTop, navLinks, logS) => {
  if (isTop) {
    logS.style.backgroundColor = "white";
    logS.style.color = "black";
    
    // Remove old event listeners
    const newLogS = logS.cloneNode(true);
    logS.parentNode.replaceChild(newLogS, logS);
    
    newLogS.addEventListener('mouseenter', () => {
      newLogS.style.backgroundColor = "#d90429";
      newLogS.style.color = "white";
    });
    
    newLogS.addEventListener('mouseleave', () => {
      newLogS.style.backgroundColor = "white";
      newLogS.style.color = "black";
    });

    navLinks.forEach(link => {
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      newLink.style.color = 'black';
      newLink.style.textDecorationColor = "#d90429";
      
      newLink.addEventListener('mouseenter', () => newLink.style.color = '#d90429');
      newLink.addEventListener('mouseleave', () => newLink.style.color = 'black');
    });
  } else {
    logS.style.backgroundColor = "#d90429";
    logS.style.color = "white";

    // Remove old event listeners
    const newLogS = logS.cloneNode(true);
    logS.parentNode.replaceChild(newLogS, logS);
    
    newLogS.addEventListener('mouseenter', () => newLogS.style.backgroundColor = "#d80444");
    newLogS.addEventListener('mouseleave', () => newLogS.style.backgroundColor = "#d90429");

    navLinks.forEach(link => {
      link.style.color = "black";
    });
  }
};

// Add scroll event listener with debouncing
window.addEventListener('scroll', handleScroll, { passive: true });

// Handle resize events
window.addEventListener('resize', debounce(() => {
  const navbar = document.querySelector("nav");
  navbar.style.top = "0";
  handleScroll();
}, 250));

// Clean up on page unload
window.addEventListener('unload', () => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleScroll);
});


function getCarDetails() {
    const event = window.event; 
    const clickedImage = event.target;
    const carDiv = clickedImage.parentElement;
    const name = carDiv.querySelector('.name').textContent;
    const price = carDiv.querySelector('.price').textContent;
    const brand = carDiv.querySelector('#brand').textContent;
    const location = carDiv.querySelector('#location').textContent;
    const date = carDiv.querySelector('#date').textContent;
    const displayImgSrc = carDiv.querySelector('#displayImg').src;
    const carDetails = {
        name,
        price,
        brand,
        location,
        date,
        displayImg: displayImgSrc
    };
    localStorage.setItem('carData', JSON.stringify(carDetails));
    window.location.href = 'buyDetails.html';
}

function displayCarData() {
    
    const carData = JSON.parse(localStorage.getItem('carData'));

    if (carData) {
        
        document.getElementById('setImage').src = carData.displayImg;
        document.querySelector('.setName').textContent = carData.name;
        document.querySelector('.setPrice').textContent = carData.price;
        document.getElementById('setLocation').innerHTML = `<img src="asset/icons/location.png"> ${carData.location}`;
        document.getElementById('setDate').innerHTML = `<img src="asset/icons/calendar.png"> ${carData.date}`;
        document.getElementById('setBrand').textContent = carData.brand;

    } else {
        
        document.querySelector('.wrapper').innerHTML = '<p>No car data found.</p>';
    }
}
window.onload = displayCarData;


document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader(); 

        reader.onload = function(e) {
            const imgElement = document.getElementById('sellImage');
            imgElement.src = e.target.result;
            imgElement.style.display = 'block'; 
            document.getElementById("fileInput").style.display = "none";
            document.querySelector(".image1-space").style.border = "none";
        };

        reader.readAsDataURL(file); 
    }
});

const button = document.getElementById('sellCarButton');
button.addEventListener('click', function() {
    const holder = document.getElementById("holder");
    
    // Safely retrieve selling details
    const sname = holder.querySelector('.sellName')?.textContent || '';
    const sprice = holder.querySelector('.sellPrice')?.textContent || '';
    const sbrand = holder.querySelector('#sellBrand')?.textContent || '';
    const slocation = holder.querySelector('#sellLocation')?.textContent || '';
    const sdate= holder.querySelector('#sellDate')?.textContent || '';

    
        if(isOnline){
            alert("online");
        }else{
            alert("offline");
        }


        // const message =
        //     `Car Name: ${sname}\nPrice: ${sprice}\nBrand: ${sbrand}\nLocation: ${slocation}\nDate: ${sdate}\nDo you want to proceed?`;
        
        // if (confirm(message)) {
        //     alert("You have confirmed the sale!");
        //     window.location.href="index.html";
        // } else {
        //     alert("Sale cancelled.");
        // }
    
});



function openSignup() {
   document.querySelector('.bodySignup').style.display= "flex";
   document.querySelector('.bodyLogin').style.display= "none";
}

function openLogin() {
   document.querySelector('.bodyLogin').style.display= "flex";
   document.querySelector('.bodySignup').style.display= "none";
}

function closeBTN() {
   document.querySelector('.bodySignup').style.display= "none";
   document.querySelector('.bodyLogin').style.display= "none";
}

function handleSignup() {
   const form= document.getElementById('userForm');

   form.addEventListener('submit', function(event) {
       event.preventDefault(); 

       // Retrieve user information
       const fullName= document.getElementById('fullName').value;
       const email= document.getElementById('email').value;
       const contactNo= document.getElementById('contactNo').value;
       const password= document.getElementById('password').value;

       // Store user information
       localStorage.setItem('userInfo', JSON.stringify({ fullName, email, contactNo, password }));
       alert("Your account has been successfully created. Login now!");
       
       openLogin();
   });
}

function handleLogin(event) {
    event.preventDefault();
 
    // Retrieve input values
    const inputEmail = document.getElementById('email').value;
    const inputPassword = document.getElementById('password').value;
 
    // Retrieve stored user information
    const storedUserInfo = localStorage.getItem('userInfo');
 
    if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);
 
        // Validate login credentials
        if (userInfo.email === inputEmail && userInfo.password === inputPassword) {
            alert("Login successful!");
            closeBTN();
            logSuc();
            localStorage.setItem('isOnline', JSON.stringify(true));

 
            
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('username', userInfo.fullName);
 
            document.querySelector("#username").innerHTML = userInfo.fullName + "&nbsp;&nbsp;";
        } else {
            alert("Invalid email or password.");
        }
    } else {
        alert("No user information found.");
    }
 }


function logSuc() {
   document.querySelector(".user-profile").style.visibility= "visible";
   document.querySelector("#username").style.display= "flex";   
   document.querySelector("#loginButton").style.visibility= "hidden";
}

function onSet() {
   const userSettings= document.querySelector('#userSettings');

   
   userSettings.style.display= userSettings.style.display === 'flex' ? 'none' : 'flex'; 
}


window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
 
    if (isLoggedIn && username) {
       // If user is logged in, show profile and username
       document.querySelector(".user-profile").style.visibility = "visible";
       document.querySelector("#username").style.display = "flex";   
       document.querySelector("#loginButton").style.visibility = "hidden";
       document.querySelector("#username").innerHTML = username + "&nbsp;&nbsp;";
    } else {
       // If user is not logged in, hide profile and show login button
       document.querySelector(".user-profile").style.visibility = "hidden";
       document.querySelector("#username").style.display = "none";
       document.querySelector("#loginButton").style.visibility = "visible";
    }
 };


 function logout() {

    if (confirm("Are you sure you want to logout?")) {
        // Clear login state from localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
     
        // Update UI
        document.querySelector(".user-profile").style.visibility = "hidden";
        document.querySelector("#username").style.display = "none";
        document.querySelector("#loginButton").style.visibility = "visible";
        document.querySelector("#userSettings").style.display = "none";
     
        alert("You have successfully logged out.");
    } else {
        // User canceled the logout action, do nothing
        alert("Logout canceled.");
    }
 }
 

function show(){
    const sideB =  document.querySelector('.sidebar');
    sideB.style.display = 'flex';
}
function hide(){
    const sideB =  document.querySelector('.sidebar');
    sideB.style.display = 'none';
}


function handleResize() {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 768) { 
        sidebar.style.display = 'none'; 
    } else {
        sidebar.style.display = 'block'; 
    }
}


window.addEventListener('resize', handleResize);


