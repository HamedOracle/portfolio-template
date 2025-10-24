// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all tab items
    const tabItems = document.querySelectorAll('.tab-item');
    
    // Add click event listeners to tabs
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabText = this.querySelector('span').textContent.toLowerCase();
            console.log('Tab clicked:', tabText); // Debug log
            
            // Remove active class from all tabs
            tabItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Handle navigation based on tab
            switch(tabText) {
                case 'home':
                    console.log('Navigating to home.html'); // Debug log
                    navigateToPage('home.html');
                    break;
                case 'profile':
                    console.log('Navigating to profile.html'); // Debug log
                    navigateToPage('profile.html');
                    break;
                case 'search':
                    console.log('Navigating to search.html'); // Debug log
                    navigateToPage('search.html');
                    break;
                case 'blog':
                    console.log('Navigating to blog.html'); // Debug log
                    navigateToPage('blog.html');
                    break;
                case 'ai':
                    console.log('Navigating to ai.html'); // Debug log
                    navigateToPage('ai.html');
                    break;
            }
        });
    });
    
    // Function to navigate between pages with transition
    function navigateToPage(pageUrl) {
        const transition = document.querySelector('.page-transition');
        
        // Show transition overlay
        transition.classList.add('active');
        
        // Navigate after transition starts
        setTimeout(() => {
            window.location.href = pageUrl;
        }, 250);
    }
    
    // Handle page load - hide transition if coming from another page
    const transition = document.querySelector('.page-transition');
    if (transition) {
        setTimeout(() => {
            transition.classList.remove('active');
        }, 100);
    }
    
    // Portfolio card interactions
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const cardTitle = this.closest('.portfolio-card').querySelector('.card-title').textContent;
            console.log(`Viewing: ${cardTitle}`);
            // Add your portfolio viewing logic here
        });
    });
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Search page functionality
    initializeSearchPage();
    
    // Blog page functionality
    initializeBlogPage();
    
    // Contact modal functionality
    initializeContactModal();
});

// Search page functionality
function initializeSearchPage() {
    // Check if we're on the search page
    if (document.body.classList.contains('search-page')) {
        // Initialize scroll animations for design cards
        initializeScrollAnimations();
        
        // Initialize search functionality
        initializeSearchFunctionality();
        
        // Initialize scroll arrow functionality
        initializeScrollArrow();
    }
}

// Initialize scroll animations for design cards
function initializeScrollAnimations() {
    const designCards = document.querySelectorAll('.design-card');
    
    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all design cards
    designCards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize search functionality
function initializeSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const designCards = document.querySelectorAll('.design-card');
    
    if (searchInput && searchBtn) {
        // Search on button click
        searchBtn.addEventListener('click', () => {
            performSearch(searchInput.value, designCards);
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value, designCards);
            }
        });
        
        // Real-time search as user types
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value, designCards);
        });
    }
}

// Perform search functionality
function performSearch(query, cards) {
    const searchTerm = query.toLowerCase().trim();
    
    cards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-description').textContent.toLowerCase();
        
        if (searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
}

// Initialize scroll arrow functionality
function initializeScrollArrow() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    const designExamplesSection = document.querySelector('.design-examples-section');
    
    if (scrollArrow && designExamplesSection) {
        scrollArrow.addEventListener('click', () => {
            designExamplesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

// Blog page functionality
function initializeBlogPage() {
    // Check if we're on the blog page
    if (document.body.classList.contains('blog-page')) {
        // Initialize scroll animations for blog cards
        initializeBlogScrollAnimations();
        
        // Initialize blog card interactions
        initializeBlogCardInteractions();
    }
}

// Initialize scroll animations for blog cards
function initializeBlogScrollAnimations() {
    const blogCards = document.querySelectorAll('.blog-card');
    
    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all blog cards
    blogCards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize blog card interactions
function initializeBlogCardInteractions() {
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const blogTitle = this.closest('.blog-card').querySelector('.blog-title').textContent;
            console.log(`Reading blog: ${blogTitle}`);
            // Add your blog reading logic here
            // For now, we'll just show an alert
            alert(`Opening blog: ${blogTitle}`);
        });
    });
}

// Contact Modal functionality
function initializeContactModal() {
    const contactBtn = document.querySelector('.contact-btn');
    const contactModal = document.getElementById('contactModal');
    const closeBtn = document.getElementById('closeModal');
    const copyBtns = document.querySelectorAll('.copy-btn');
    
    // Open modal when contact button is clicked
    if (contactBtn && contactModal) {
        contactBtn.addEventListener('click', function() {
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }
    
    // Close modal when close button is clicked
    if (closeBtn && contactModal) {
        closeBtn.addEventListener('click', function() {
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }
    
    // Close modal when clicking outside the card
    if (contactModal) {
        contactModal.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                contactModal.classList.remove('active');
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.classList.contains('active')) {
            contactModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
    
    // Copy functionality for copy buttons
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            const originalText = this.querySelector('span').textContent;
            const originalIcon = this.querySelector('i').className;
            
            // Copy to clipboard
            navigator.clipboard.writeText(textToCopy).then(function() {
                // Show success feedback
                btn.querySelector('span').textContent = 'Copied!';
                btn.querySelector('i').className = 'fas fa-check';
                btn.style.background = 'rgba(34, 197, 94, 0.8)';
                
                // Reset after 2 seconds
                setTimeout(function() {
                    btn.querySelector('span').textContent = originalText;
                    btn.querySelector('i').className = originalIcon;
                    btn.style.background = 'rgba(59, 130, 246, 0.6)';
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy: ', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    // Show success feedback
                    btn.querySelector('span').textContent = 'Copied!';
                    btn.querySelector('i').className = 'fas fa-check';
                    btn.style.background = 'rgba(34, 197, 94, 0.8)';
                    
                    // Reset after 2 seconds
                    setTimeout(function() {
                        btn.querySelector('span').textContent = originalText;
                        btn.querySelector('i').className = originalIcon;
                        btn.style.background = 'rgba(59, 130, 246, 0.6)';
                    }, 2000);
                } catch (err) {
                    console.error('Fallback copy failed: ', err);
                }
                document.body.removeChild(textArea);
            });
        });
    });
}
