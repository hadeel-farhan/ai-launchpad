// Database Service
const DatabaseService = {
    // Test users
    users: [
        {
            id: '1',
            email: 'admin@alifsense.com',
            password: 'admin123',
            firstName: 'Admin',
            lastName: 'User',
            role: 'ADMINISTRATOR'
        },
        {
            id: '2',
            email: 'instructor@alifsense.com',
            password: 'instructor123',
            firstName: 'Instructor',
            lastName: 'User',
            role: 'INSTRUCTOR'
        },
        {
            id: '3',
            email: 'student@alifsense.com',
            password: 'student123',
            firstName: 'Student',
            lastName: 'User',
            role: 'STUDENT'
        }
    ],

    // Get user by email
    getUserByEmail(email) {
        return this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
    },

    // Authenticate user
    authenticate(email, password) {
        const user = this.getUserByEmail(email);

        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }

        if (user.password !== password) {
            return { success: false, message: 'Invalid email or password' };
        }

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        return { success: true, user: userWithoutPassword };
    }
};

// Auth Service
const AuthService = {
    // Current user
    currentUser: null,

    // Initialize
    init() {
        // Check if user is already logged in
        const userJson = localStorage.getItem('alif_current_user');
        if (userJson) {
            try {
                this.currentUser = JSON.parse(userJson);
                return true;
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('alif_current_user');
            }
        }
        return false;
    },

    // Login
    login(email, password) {
        const result = DatabaseService.authenticate(email, password);

        if (result.success) {
            this.currentUser = result.user;
            localStorage.setItem('alif_current_user', JSON.stringify(result.user));
        }

        return result;
    },

    // Logout
    logout() {
        this.currentUser = null;
        localStorage.removeItem('alif_current_user');
    },

    // Check if user is logged in
    isLoggedIn() {
        return !!this.currentUser;
    },

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }
};

// Navigation Service
const NavigationService = {
    // Current page
    currentPage: null,

    // Pages
    pages: {
        login: document.getElementById('login-page'),
        home: document.getElementById('home-page'),
        cases: document.getElementById('cases-page'),
        dashboard: document.getElementById('dashboard-page')
    },

    // Navigation links
    navLinks: document.querySelectorAll('.main-nav a'),

    // Initialize
    init() {
        // Add event listeners to navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateTo(page);
            });
        });
    },

    // Navigate to page
    navigateTo(page) {
        // Check if user is logged in
        if (!AuthService.isLoggedIn() && page !== 'login') {
            page = 'login';
        }

        // Hide all pages
        Object.values(this.pages).forEach(pageEl => {
            pageEl.classList.add('hidden');
        });

        // Show selected page
        this.pages[page].classList.remove('hidden');

        // Update active link
        this.navLinks.forEach(link => {
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Update current page
        this.currentPage = page;
    }
};

// UI Service
const UIService = {
    // DOM Elements
    elements: {
        loginForm: document.getElementById('login-form'),
        loginError: document.getElementById('login-error'),
        emailInput: document.getElementById('email'),
        passwordInput: document.getElementById('password'),
        userInfo: document.querySelector('.user-info'),
        userName: document.querySelector('.user-name'),
        logoutBtn: document.getElementById('logout-btn'),
        startCaseButtons: document.querySelectorAll('.case-card .btn-primary')
    },

    // Initialize
    init() {
        // Add event listeners
        this.elements.loginForm.addEventListener('submit', this.handleLogin.bind(this));
        this.elements.logoutBtn.addEventListener('click', this.handleLogout.bind(this));

        // Add event listeners to start case buttons
        this.elements.startCaseButtons.forEach(button => {
            button.addEventListener('click', this.handleStartCase.bind(this));
        });

        // Update UI based on auth state
        this.updateUIForAuthState();
    },

    // Handle start case
    handleStartCase(e) {
        e.preventDefault();

        // In a real application, we would get the case ID from the button
        // For now, we'll just redirect to the case simulation page
        window.location.href = '/case-simulation.html';
    },

    // Handle login
    handleLogin(e) {
        e.preventDefault();

        const email = this.elements.emailInput.value.trim();
        const password = this.elements.passwordInput.value;

        if (!email || !password) {
            this.showLoginError('Please enter both email and password');
            return;
        }

        const result = AuthService.login(email, password);

        if (result.success) {
            this.updateUIForAuthState();
            NavigationService.navigateTo('home');
        } else {
            this.showLoginError(result.message);
        }
    },

    // Handle logout
    handleLogout() {
        AuthService.logout();
        this.updateUIForAuthState();
        NavigationService.navigateTo('login');
    },

    // Show login error
    showLoginError(message) {
        this.elements.loginError.textContent = message;
        this.elements.loginError.classList.remove('hidden');
    },

    // Update UI for auth state
    updateUIForAuthState() {
        if (AuthService.isLoggedIn()) {
            const user = AuthService.getCurrentUser();
            this.elements.userInfo.classList.remove('hidden');
            this.elements.userName.textContent = `${user.firstName} ${user.lastName}`;
        } else {
            this.elements.userInfo.classList.add('hidden');
            this.elements.loginForm.reset();
            this.elements.loginError.classList.add('hidden');
        }
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize services
    const isLoggedIn = AuthService.init();
    UIService.init();
    NavigationService.init();

    // Navigate to initial page
    if (isLoggedIn) {
        NavigationService.navigateTo('home');
    } else {
        NavigationService.navigateTo('login');
    }
});
