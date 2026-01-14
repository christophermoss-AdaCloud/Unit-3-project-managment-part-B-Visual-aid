// JavaScript for Interactive Activities

// ===== PROJECT BRIEF ACTIVITY =====
function reviewBrief() {
    const form = document.getElementById('project-brief-form');
    const output = document.getElementById('brief-output');
    const content = document.getElementById('brief-content');
    
    const data = {
        name: document.getElementById('project-name')?.value || '',
        goal: document.getElementById('project-goal')?.value || '',
        timeline: document.getElementById('project-timeline')?.value || '',
        budget: document.getElementById('project-budget')?.value || '',
        team: document.getElementById('team-members')?.value || '',
        tasks: document.getElementById('key-tasks')?.value || '',
        success: document.getElementById('success-criteria')?.value || '',
        risks: document.getElementById('risks')?.value || ''
    };
    
    // Check if form is filled
    if (!data.name || !data.goal) {
        alert('Please fill in at least the Project Name and Goal before reviewing!');
        return;
    }
    
    // Build the output
    let html = `
        <div style="background: white; padding: 1.5rem; border-radius: 8px; margin-top: 1rem;">
            <h3 style="color: var(--primary-color); font-size: 1.5rem;">${data.name}</h3>
            
            <div style="margin: 1rem 0;">
                <strong>Project Goal:</strong><br>
                <p>${data.goal}</p>
            </div>
            
            <div style="margin: 1rem 0;">
                <strong>Timeline:</strong><br>
                <p>${data.timeline || 'Not specified'}</p>
            </div>
            
            <div style="margin: 1rem 0;">
                <strong>Budget:</strong><br>
                <p>${data.budget || 'Not specified'}</p>
            </div>
            
            <div style="margin: 1rem 0;">
                <strong>Team Members:</strong><br>
                <p>${data.team || 'Not specified'}</p>
            </div>
            
            <div style="margin: 1rem 0;">
                <strong>Key Tasks:</strong><br>
                <p>${data.tasks || 'Not specified'}</p>
            </div>
            
            <div style="margin: 1rem 0;">
                <strong>Success Criteria:</strong><br>
                <p>${data.success || 'Not specified'}</p>
            </div>
            
            <div style="margin: 1rem 0;">
                <strong>Potential Risks:</strong><br>
                <p>${data.risks || 'Not specified'}</p>
            </div>
        </div>
    `;
    
    content.innerHTML = html;
    output.style.display = 'block';
    form.style.display = 'none';
    output.scrollIntoView({ behavior: 'smooth' });
}

function editBrief() {
    const form = document.getElementById('project-brief-form');
    const output = document.getElementById('brief-output');
    form.style.display = 'block';
    output.style.display = 'none';
    form.scrollIntoView({ behavior: 'smooth' });
}

function clearForm() {
    if (confirm('Are you sure you want to clear the form and start over?')) {
        document.getElementById('project-brief-form').reset();
    }
}

// ===== ASSIGN ROLES ACTIVITY =====
let draggedElement = null;
const correctRoles = {
    'david': 'manager',
    'sarah': 'developer',
    'james': 'designer',
    'maria': 'tester',
    'emma': 'writer'
};

function initializeDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const dropzones = document.querySelectorAll('.dropzone');
    
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', handleDragStart);
        draggable.addEventListener('dragend', handleDragEnd);
    });
    
    dropzones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragleave', handleDragLeave);
    });
}

function handleDragStart(e) {
    draggedElement = this;
    this.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    this.style.opacity = '1';
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('active');
    return false;
}

function handleDragLeave(e) {
    this.classList.remove('active');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    this.classList.remove('active');
    
    if (draggedElement) {
        // Clear any existing content in dropzone
        if (this.children.length > 0) {
            const existingElement = this.children[0];
            document.getElementById('team-members')?.appendChild(existingElement);
        }
        
        // Add the dragged element
        this.appendChild(draggedElement);
        this.classList.add('filled');
    }
    
    return false;
}

function checkRoles() {
    let correct = 0;
    let total = Object.keys(correctRoles).length;
    let feedback = '';
    
    Object.keys(correctRoles).forEach(person => {
        const expectedRole = correctRoles[person];
        const dropzone = document.querySelector(`[data-role="${expectedRole}"]`);
        const personElement = document.getElementById(`person-${person}`);
        
        if (dropzone && dropzone.contains(personElement)) {
            correct++;
            feedback += `<p style="color: var(--success-color);">✓ ${person.charAt(0).toUpperCase() + person.slice(1)} is correctly assigned!</p>`;
        } else {
            feedback += `<p style="color: var(--error-color);">✗ ${person.charAt(0).toUpperCase() + person.slice(1)} is not in the right role yet.</p>`;
        }
    });
    
    const percentage = (correct / total) * 100;
    const resultDiv = document.getElementById('feedback');
    const contentDiv = document.getElementById('feedback-content');
    
    let message = '';
    if (percentage === 100) {
        message = '<h3 style="color: var(--success-color);">🎉 Perfect! You got them all right!</h3>';
    } else if (percentage >= 60) {
        message = '<h3 style="color: var(--accent-color);">👍 Good effort! A few need adjusting.</h3>';
    } else {
        message = '<h3 style="color: var(--error-color);">Keep trying! Review the skills and try again.</h3>';
    }
    
    contentDiv.innerHTML = `
        ${message}
        <p style="font-size: 1.2rem;">You got ${correct} out of ${total} correct (${Math.round(percentage)}%)</p>
        <div style="margin-top: 1rem;">${feedback}</div>
    `;
    
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

function resetRoles() {
    const teamMembersArea = document.getElementById('team-members');
    const allPeople = document.querySelectorAll('.draggable[data-person]');
    
    allPeople.forEach(person => {
        teamMembersArea.appendChild(person);
    });
    
    document.querySelectorAll('.dropzone').forEach(zone => {
        zone.classList.remove('filled');
    });
    
    const feedback = document.getElementById('feedback');
    if (feedback) feedback.style.display = 'none';
}

// ===== GANTT CHART ACTIVITY =====
function checkGantt() {
    let correct = 0;
    let total = 0;
    let feedback = '';
    
    const tasks = document.querySelectorAll('.draggable[data-task]');
    
    tasks.forEach(task => {
        const correctWeek = task.getAttribute('data-correct-week');
        const taskName = task.querySelector('strong')?.textContent || 'Task';
        total++;
        
        // Find which week this task is in
        const parent = task.parentElement;
        if (parent && parent.hasAttribute('data-week')) {
            const currentWeek = parent.getAttribute('data-week');
            
            if (currentWeek === correctWeek) {
                correct++;
                feedback += `<p style="color: var(--success-color);">✓ ${taskName} is in the correct week!</p>`;
            } else {
                feedback += `<p style="color: var(--error-color);">✗ ${taskName} should start in week ${correctWeek}, not week ${currentWeek}.</p>`;
            }
        } else {
            feedback += `<p style="color: var(--warning-color);">⚠ ${taskName} hasn't been placed on the timeline yet.</p>`;
        }
    });
    
    const percentage = (correct / total) * 100;
    const resultDiv = document.getElementById('gantt-feedback');
    const contentDiv = document.getElementById('gantt-feedback-content');
    
    let message = '';
    if (percentage === 100) {
        message = '<h3 style="color: var(--success-color);">🎉 Excellent! Your timeline is perfect!</h3>';
    } else if (percentage >= 60) {
        message = '<h3 style="color: var(--accent-color);">👍 Good work! A few tasks need adjusting.</h3>';
    } else {
        message = '<h3 style="color: var(--error-color);">Keep trying! Think about which tasks depend on others.</h3>';
    }
    
    contentDiv.innerHTML = `
        ${message}
        <p style="font-size: 1.2rem;">You got ${correct} out of ${total} tasks correct (${Math.round(percentage)}%)</p>
        <div style="margin-top: 1rem;">${feedback}</div>
    `;
    
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

function resetGantt() {
    const tasksArea = document.getElementById('tasks-list');
    const allTasks = document.querySelectorAll('.draggable[data-task]');
    
    allTasks.forEach(task => {
        tasksArea.appendChild(task);
    });
    
    document.querySelectorAll('.dropzone').forEach(zone => {
        zone.classList.remove('filled');
    });
    
    const feedback = document.getElementById('gantt-feedback');
    if (feedback) feedback.style.display = 'none';
    
    const hint = document.getElementById('hint');
    if (hint) hint.style.display = 'none';
}

function showHint() {
    const hint = document.getElementById('hint');
    if (hint) {
        hint.style.display = 'block';
        hint.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize drag and drop when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDragAndDrop);
} else {
    initializeDragAndDrop();
}
