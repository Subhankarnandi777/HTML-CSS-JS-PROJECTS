// Authentication JavaScript for ChildGuard

document.addEventListener('DOMContentLoaded', function() {
    setupAuthForms();
});

// Setup Authentication Forms
function setupAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Register Form Submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegistration();
        });
    }
}

// Handle Login
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // In a real application, you would make an API call to your backend
    console.log('Login attempt:', { email, password });
    
    // Simulate API call
    simulateAPICall('/api/auth/login', { email, password })
        .then(response => {
            if (response.success) {
                // Store user data (in a real app, you might use localStorage or cookies)
                localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.setItem('token', response.token);
                
                // Close modal and show success
                document.getElementById('loginModal').style.display = 'none';
                alert('Login successful!');
                
                // Update UI for logged in user
                updateUIForAuth(response.user);
            } else {
                alert('Login failed: ' + response.message);
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again.');
        });
}

// Handle Registration
function handleRegistration() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const userType = document.getElementById('userType').value;
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // In a real application, you would make an API call to your backend
    console.log('Registration attempt:', { name, email, password, userType });
    
    // Simulate API call
    simulateAPICall('/api/auth/register', { name, email, password, userType })
        .then(response => {
            if (response.success) {
                // Store user data (in a real app, you might use localStorage or cookies)
                localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.setItem('token', response.token);
                
                // Close modal and show success
                document.getElementById('registerModal').style.display = 'none';
                alert('Registration successful! Welcome to ChildGuard.');
                
                // Update UI for logged in user
                updateUIForAuth(response.user);
            } else {
                alert('Registration failed: ' + response.message);
            }
        })
        .catch(error => {
            console.error('Registration error:', error);
            alert('An error occurred during registration. Please try again.');
        });
}

// Simulate API Call (for demo purposes)
function simulateAPICall(endpoint, data) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            // For demo purposes, we'll simulate successful responses
            // In a real application, this would be an actual API call
            
            if (endpoint === '/api/auth/login') {
                if (data.email === 'demo@childguard.org' && data.password === 'password') {
                    resolve({
                        success: true,
                        user: {
                            id: 1,
                            name: 'Demo User',
                            email: data.email,
                            userType: 'family'
                        },
                        token: 'demo-jwt-token'
                    });
                } else {
                    resolve({
                        success: false,
                        message: 'Invalid email or password'
                    });
                }
            } else if (endpoint === '/api/auth/register') {
                resolve({
                    success: true,
                    user: {
                        id: Math.floor(Math.random() * 1000),
                        name: data.name,
                        email: data.email,
                        userType: data.userType
                    },
                    token: 'demo-jwt-token'
                });
            } else {
                reject(new Error('Unknown endpoint'));
            }
        }, 1000);
    });
}

// Update UI for authenticated user
function updateUIForAuth(user) {
    const navMenu = document.querySelector('.nav-menu');
    
    // Remove login/register buttons
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    
    if (loginBtn && registerBtn) {
        loginBtn.remove();
        registerBtn.remove();
    }
    
    // Add user menu
    const userMenuItem = document.createElement('li');
    userMenuItem.className = 'nav-item';
    userMenuItem.innerHTML = `
        <div class="user-menu">
            <span>Welcome, ${user.name}</span>
            <div class="user-dropdown">
                <a href="#" class="nav-link"><i class="fas fa-user"></i> Profile</a>
                <a href="#" class="nav-link"><i class="fas fa-cog"></i> Settings</a>
                <a href="#" class="nav-link" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a>
            </div>
        </div>
    `;
    
    navMenu.appendChild(userMenuItem);
    
    // Add logout functionality
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Add some basic CSS for the user menu
    const style = document.createElement('style');
    style.textContent = `
        .user-menu {
            position: relative;
            display: inline-block;
        }
        
        .user-menu span {
            cursor: pointer;
            padding: 8px 16px;
            display: block;
        }
        
        .user-dropdown {
            display: none;
            position: absolute;
            background-color: white;
            min-width: 160px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            z-index: 1;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .user-dropdown a {
            padding: 12px 16px;
            text-decoration: none;
            display: block;
            border-bottom: 1px solid #f1f1f1;
        }
        
        .user-dropdown a:last-child {
            border-bottom: none;
        }
        
        .user-dropdown a:hover {
            background-color: #f1f1f1;
        }
        
        .user-menu:hover .user-dropdown {
            display: block;
        }
    `;
    document.head.appendChild(style);
}

// Handle Logout
function handleLogout(e) {
    e.preventDefault();
    
    // Clear stored data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Reload page to reset UI
    window.location.reload();
}

// Check if user is already logged in on page load
function checkAuthStatus() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (user && token) {
        updateUIForAuth(JSON.parse(user));
    }
}

// Initialize auth status check
checkAuthStatus();