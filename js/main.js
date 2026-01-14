// Main JavaScript for the Project Management Learning Hub

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links with hash
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#main-content') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Highlight active navigation item
    highlightActiveNav();
    
    // Add focus styles for accessibility
    addFocusStyles();
});

// Highlight the current page in navigation
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            link.style.fontWeight = 'bold';
        }
    });
}

// Add visible focus styles for keyboard navigation
function addFocusStyles() {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--accent-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Utility function to show messages
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-box' : 
                          type === 'error' ? 'highlight' : 'info-box';
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.maxWidth = '400px';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.padding = '1rem';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            messageDiv.remove();
        }, 500);
    }, 3000);
}

// Track progress through the site (optional feature)
function trackProgress() {
    const pages = {
        'concepts': ['what-is-pm.html', 'why-planning.html', 'project-roles.html', 'planning-tools.html'],
        'activities': ['project-brief.html', 'assign-roles.html', 'gantt-chart.html'],
        'assessment': ['quiz.html', 'reflection.html']
    };
    
    const currentPage = window.location.pathname.split('/').pop();
    let visited = JSON.parse(localStorage.getItem('visitedPages') || '[]');
    
    if (!visited.includes(currentPage) && currentPage !== 'index.html') {
        visited.push(currentPage);
        localStorage.setItem('visitedPages', JSON.stringify(visited));
    }
    
    // Calculate total progress
    const allPages = [...pages.concepts, ...pages.activities, ...pages.assessment];
    const progress = (visited.length / allPages.length) * 100;
    
    return Math.round(progress);
}

// Print functionality
function printPage() {
    window.print();
}

// Accessibility: Skip to main content
window.addEventListener('load', function() {
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const mainContent = document.getElementById('main-content');
            if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    // Escape key to close modals or reset focus
    if (e.key === 'Escape') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.tagName !== 'BODY') {
            activeElement.blur();
        }
    }
});

// Add loading animation for interactive elements
function addLoadingAnimation(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.pointerEvents = 'auto';
    }, 500);
}

// Confirm before leaving page if user has unsaved work
window.addEventListener('beforeunload', function(e) {
    const forms = document.querySelectorAll('form');
    let hasUnsavedData = false;
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[type="text"], textarea');
        inputs.forEach(input => {
            if (input.value.trim() !== '') {
                hasUnsavedData = true;
            }
        });
    });
    
    // Only show confirmation on pages with forms if there's data
    if (hasUnsavedData && !localStorage.getItem('formSaved')) {
        e.preventDefault();
        e.returnValue = '';
    }
});

console.log('Project Management Learning Hub - Ready!');
console.log('Progress:', trackProgress() + '% complete');
