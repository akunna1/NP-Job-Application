// Tab Switching
function showTab(tabId) {
    // Hiding all tab content
    var tabs = document.querySelectorAll('.tab-content > div');
    tabs.forEach(function(tab) {
        tab.style.display = 'none';
    });

    // Showing the selected tab content
    var selectedTabContent = document.getElementById(tabId);
    selectedTabContent.style.display = 'block';

    // Removing 'active' class from all nav links
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(function(link) {
        link.classList.remove('active');
    });

    // Adding 'active' class to the clicked nav link
    var clickedLink = document.querySelector('.navbar-nav [onclick="showTab(\'' + tabId + '\')"]');
    clickedLink.classList.add('active');

    // Storing the active tab ID in localStorage
    localStorage.setItem('activeTab', tabId);
}

// Setting initial active tab and change its background color
window.onload = function() {
    // Getting the ID of the active tab from localStorage
    var activeTab = localStorage.getItem('activeTab');

    // If there's an active tab stored, show it
    if (activeTab) {
        showTab(activeTab);
    } else { // If not, default to About Us
        showTab('about-us');
    }
};

// Current Enrollment Dropdown Menu
function show_current_enrollment_Details() {
    var current_enrollment_Dropdown = document.getElementById("current_enrollment_Dropdown");
    var current_enrollment_Details = document.getElementById("current_enrollment_Details");

    if (current_enrollment_Dropdown.value === "Yes") {
        current_enrollment_Details.style.display = "block";
    } else {
        current_enrollment_Details.style.display = "none";
    }
}

// Validating Link
function validateLink(inputId) {
    var linkInput = document.getElementById(inputId); // Getting the input element
    var inputValue = linkInput.value.trim(); // Getting the entered value

    var urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/; // Regular expression to match a URL pattern

    if (urlPattern.test(inputValue)) {   // Testing if the entered value matches the URL pattern
        alert("Valid link format!");
    } else {
        alert("Invalid link format. Please enter a valid URL.");
    }
}

// Today's Date
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}/${month}/${day}`;
document.getElementById('date').value = formattedDate;

// Enabling the Submit Button
function checkFormValidity() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const homeNumber = document.getElementById('homeNumber').value;
    const streetName = document.getElementById('streetName').value;
    const city = document.getElementById('city').value;
    const usState = document.getElementById('usState').value;
    const zipCode = document.getElementById('zipCode').value;
    const degreeType = document.getElementById('degreeType').value;
    const major = document.getElementById('major').value;
    const uni_name = document.getElementById('uni_name').value;
    const gradDate = document.getElementById('gradDate').value;
    const current_employer = document.getElementById('current_employer').value;
    const current_job_title = document.getElementById('current_job_title').value;
    const current_job_duration = document.getElementById('current_job_duration').value;
    const skills = document.getElementById('skills').value;
    const certs = document.getElementById('certs').value;
    const resume = document.getElementById('resume').value;
    const cover_letter = document.getElementById('cover_letter').value;
    const affirmation1 = document.getElementById('affirmation1').value;
    const fullname = document.getElementById('fullname').value;
    const submitBtn = document.getElementById('submitBtn');
    if (firstName && lastName && dob && gender && phoneNumber && email && homeNumber && streetName && city
        && usState && zipCode && degreeType && major && uni_name && gradDate && current_employer && current_job_title 
        && current_job_duration && skills && certs && resume && cover_letter && affirmation1 && fullname) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Event listeners for form inputs
document.getElementById('firstName').addEventListener('input', checkFormValidity);
document.getElementById('lastName').addEventListener('input', checkFormValidity);
document.getElementById('dob').addEventListener('input', checkFormValidity);
document.getElementById('gender').addEventListener('input', checkFormValidity);
document.getElementById('phoneNumber').addEventListener('input', checkFormValidity);
document.getElementById('email').addEventListener('input', checkFormValidity);
document.getElementById('homeNumber').addEventListener('input', checkFormValidity);
document.getElementById('streetName').addEventListener('input', checkFormValidity);
document.getElementById('city').addEventListener('input', checkFormValidity);
document.getElementById('usState').addEventListener('input', checkFormValidity);
document.getElementById('zipCode').addEventListener('input', checkFormValidity);
document.getElementById('degreeType').addEventListener('input', checkFormValidity);
document.getElementById('major').addEventListener('input', checkFormValidity);
document.getElementById('uni_name').addEventListener('input', checkFormValidity);
document.getElementById('gradDate').addEventListener('input', checkFormValidity);
document.getElementById('current_employer').addEventListener('input', checkFormValidity);
document.getElementById('current_job_title').addEventListener('input', checkFormValidity);
document.getElementById('current_job_duration').addEventListener('input', checkFormValidity);
document.getElementById('skills').addEventListener('input', checkFormValidity);
document.getElementById('certs').addEventListener('input', checkFormValidity);
document.getElementById('resume').addEventListener('input', checkFormValidity);
document.getElementById('cover_letter').addEventListener('input', checkFormValidity);
document.getElementById('affirmation1').addEventListener('input', checkFormValidity);
document.getElementById('fullname').addEventListener('input', checkFormValidity);

// Initial form validation check
checkFormValidity();


