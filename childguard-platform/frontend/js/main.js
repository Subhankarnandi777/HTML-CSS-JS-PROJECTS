// Main JavaScript for ChildGuard

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    setupNavigation();
    setupModals();
    setupForms();
    loadSampleCases();
    setupEventListeners();
}

// Navigation Setup
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Modal Setup
function setupModals() {
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const closeButtons = document.querySelectorAll('.close');
    
    // Open Login Modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'block';
        });
    }
    
    // Open Register Modal
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'block';
        });
    }
    
    // Switch to Register from Login
    if (showRegister) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'none';
            registerModal.style.display = 'block';
        });
    }
    
    // Switch to Login from Register
    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'none';
            loginModal.style.display = 'block';
        });
    }
    
    // Close Modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });
}

// Form Setup
function setupForms() {
    const reportForm = document.getElementById('reportForm');
    const photoInput = document.getElementById('photo');
    const filePreview = document.getElementById('filePreview');
    
    // Report Form Submission
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitReportForm();
        });
    }
    
    // File Preview
    if (photoInput && filePreview) {
        photoInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    filePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                };
                reader.readAsDataURL(file);
            } else {
                filePreview.innerHTML = 'No image selected';
            }
        });
    }
}

// Event Listeners
function setupEventListeners() {
    const reportMissingBtn = document.getElementById('reportMissingBtn');
    const searchCasesBtn = document.getElementById('searchCasesBtn');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    
    // Scroll to Report Section
    if (reportMissingBtn) {
        reportMissingBtn.addEventListener('click', function() {
            document.getElementById('report').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Scroll to Search Section
    if (searchCasesBtn) {
        searchCasesBtn.addEventListener('click', function() {
            document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Search Functionality
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Filter Change
    const filters = document.querySelectorAll('.filters select');
    filters.forEach(filter => {
        filter.addEventListener('change', performSearch);
    });
}

// Submit Report Form
function submitReportForm() {
    const formData = new FormData(document.getElementById('reportForm'));
    
    // In a real application, you would send this to your backend
    console.log('Submitting report:', Object.fromEntries(formData));
    
    // Show success message
    alert('Report submitted successfully! Our team will review it and take appropriate action.');
    
    // Reset form
    document.getElementById('reportForm').reset();
    document.getElementById('filePreview').innerHTML = '';
}

// Load Sample Cases
function loadSampleCases() {
    const casesContainer = document.getElementById('casesContainer');
    if (!casesContainer) return;
    
    // Sample data - in a real app, this would come from an API
    const sampleCases = [
        {
            id: 1,
            name: "Emma Johnson",
            age: 7,
            gender: "female",
            location: "Central Park, New York",
            lastSeen: "2023-10-15",
            description: "Last seen wearing a pink dress and white shoes. Has a small birthmark on left cheek."
        },
        {
            id: 2,
            name: "Liam Smith",
            age: 5,
            gender: "male",
            location: "Downtown Mall, Chicago",
            lastSeen: "2023-10-12",
            description: "Brown hair, blue eyes. Was carrying a blue backpack with dinosaur print."
        },
        {
            id: 3,
            name: "Sophia Williams",
            age: 9,
            gender: "female",
            location: "School playground, Boston",
            lastSeen: "2023-10-10",
            description: "Long blonde hair in pigtails. Wearing school uniform with red tie."
        },
        {
            id: 4,
            name: "Noah Brown",
            age: 6,
            gender: "male",
            location: "Beach area, Miami",
            lastSeen: "2023-10-08",
            description: "Short curly hair, freckles on nose. Last seen in swim trunks and yellow t-shirt."
        }
    ];
    
    displayCases(sampleCases);
}

// Display Cases
function displayCases(cases) {
    const casesContainer = document.getElementById('casesContainer');
    if (!casesContainer) return;
    
    if (cases.length === 0) {
        casesContainer.innerHTML = '<div class="loading">No cases found matching your criteria.</div>';
        return;
    }
    
    casesContainer.innerHTML = cases.map(caseItem => `
        <div class="case-card">
            <div class="case-image">
                <i class="fas fa-child"></i>
            </div>
            <div class="case-details">
                <h3>${caseItem.name}</h3>
                <div class="case-meta">
                    <span><i class="fas fa-birthday-cake"></i> ${caseItem.age} years</span>
                    <span><i class="fas fa-${caseItem.gender === 'male' ? 'male' : 'female'}"></i> ${caseItem.gender}</span>
                </div>
                <div class="case-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${caseItem.location}</span>
                </div>
                <p class="case-description">${caseItem.description}</p>
                <div class="case-actions">
                    <button class="btn btn-primary btn-small" onclick="viewCase(${caseItem.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="shareCase(${caseItem.id})">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Perform Search
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const ageFilter = document.getElementById('ageFilter');
    const genderFilter = document.getElementById('genderFilter');
    const locationFilter = document.getElementById('locationFilter');
    
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const ageValue = ageFilter ? ageFilter.value : '';
    const genderValue = genderFilter ? genderFilter.value : '';
    const locationValue = locationFilter ? locationFilter.value : '';
    
    // In a real application, you would make an API call here
    // For now, we'll just filter the sample data
    const sampleCases = [
        {
            id: 1,
            name: "Emma Johnson",
            age: 7,
            gender: "female",
            location: "Central Park, New York",
            lastSeen: "2023-10-15",
            description: "Last seen wearing a pink dress and white shoes. Has a small birthmark on left cheek."
        },
        {
            id: 2,
            name: "Liam Smith",
            age: 5,
            gender: "male",
            location: "Downtown Mall, Chicago",
            lastSeen: "2023-10-12",
            description: "Brown hair, blue eyes. Was carrying a blue backpack with dinosaur print."
        },
        {
            id: 3,
            name: "Sophia Williams",
            age: 9,
            gender: "female",
            location: "School playground, Boston",
            lastSeen: "2023-10-10",
            description: "Long blonde hair in pigtails. Wearing school uniform with red tie."
        },
        {
            id: 4,
            name: "Noah Brown",
            age: 6,
            gender: "male",
            location: "Beach area, Miami",
            lastSeen: "2023-10-08",
            description: "Short curly hair, freckles on nose. Last seen in swim trunks and yellow t-shirt."
        }
    ];
    
    let filteredCases = sampleCases.filter(caseItem => {
        // Search term filter
        const matchesSearch = !searchTerm || 
            caseItem.name.toLowerCase().includes(searchTerm) ||
            caseItem.location.toLowerCase().includes(searchTerm) ||
            caseItem.description.toLowerCase().includes(searchTerm);
        
        // Age filter
        let matchesAge = true;
        if (ageValue) {
            const [minAge, maxAge] = ageValue.split('-').map(Number);
            matchesAge = caseItem.age >= minAge && caseItem.age <= maxAge;
        }
        
        // Gender filter
        const matchesGender = !genderValue || caseItem.gender === genderValue;
        
        // Location filter (simplified for demo)
        const matchesLocation = !locationValue || 
            caseItem.location.toLowerCase().includes(locationValue);
        
        return matchesSearch && matchesAge && matchesGender && matchesLocation;
    });
    
    displayCases(filteredCases);
}

// View Case Details
function viewCase(caseId) {
    alert(`Viewing details for case ID: ${caseId}\n\nIn a real application, this would open a detailed view with more information.`);
}

// Share Case
function shareCase(caseId) {
    // In a real application, this would use the Web Share API or social media sharing
    alert(`Sharing case ID: ${caseId}\n\nIn a real application, this would open sharing options.`);
}