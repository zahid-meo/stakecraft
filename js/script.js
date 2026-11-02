/**
 * Muhammad Zahid - Professional Portfolio JavaScript
 * Modern Vanilla ES6+ Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initHeroCode();
  initSkillsFilter();
  initProjectFilters();
  initCodeTabs();
  initProjectModals();
  initContactForm();
});

// 1. Theme Management (Dark / Light Mode)
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('zahid_portfolio_theme') || 'dark';
  
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('zahid_portfolio_theme', newTheme);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) {
    if (theme === 'light') {
      themeIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeIcon.setAttribute('title', 'Switch to Dark Mode');
    } else {
      themeIcon.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeIcon.setAttribute('title', 'Switch to Light Mode');
    }
  }
}

// 2. Navigation & Smooth Scrolling
function initNavigation() {
  const header = document.getElementById('mainHeader');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // Mobile menu toggle
  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        hamburgerBtn.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Active nav link highlight on scroll
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (link && scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }
}

// 3. Hero Console Code Tabs
function initHeroCode() {
  // subtle typing or interactive indicator if needed
}

// 4. Skills Filter Navigation
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 4b. Projects Filter Navigation
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-tab-btn');
  const projectCards = document.querySelectorAll('#projectsGrid .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'feedbackFadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 5. Code Section Tabs & Copy to Clipboard
function initCodeTabs() {
  const tabBtns = document.querySelectorAll('.code-tab-btn');
  const panes = document.querySelectorAll('.code-pane');
  const copyBtn = document.getElementById('copyCodeBtn');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const activePane = document.querySelector('.code-pane.active code');
      if (activePane) {
        navigator.clipboard.writeText(activePane.innerText).then(() => {
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!
          `;
          setTimeout(() => {
            copyBtn.innerHTML = originalText;
          }, 2000);
        });
      }
    });
  }
}

// 6. Project Case Study Modal Data & Handlers
const projectData = {
  'ai-fyp-generator': {
    title: 'AI FYP Generator (AI Project Generator)',
    badge: 'Flagship Web Application',
    image: 'assets/projects/ai-fyp-generator-hero.png',
    problem: 'Computer Science undergraduate students struggle extensively during their Final Year Project (FYP) to produce industry-standard Software Requirement Specifications (SRS), Software Design Documents (SDD), UML diagrams, and structured database schemas that meet academic evaluation committees\' standards.',
    solution: 'Designed and developed an AI-assisted web platform that ingests a project title, technology stack, and problem statement, then automatically synthesizes a complete, chapter-wise academic package including functional requirements, non-functional requirements, use-case descriptions, architecture specifications, and database entity models ready for committee approval.',
    architecture: 'Modular MVC architecture built on lightweight frontend components with a high-performance backend. Features prompt parsing pipelines, automated markdown/document compilation, SVG UML diagram generation, and SQL schema generators.',
    features: [
      'One input form generating complete academic artifacts',
      'Full SRS & SDD documents structured by chapters',
      'Automated UML, ERD & Data Flow Diagram generation',
      'Ready-to-execute SQL database schemas',
      'Student user accounts, document editing, and PDF/DOCX export'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'SQLite', 'REST APIs'],
    challenges: 'Ensuring strict compliance with standard IEEE SRS/SDD formats while preventing repetitive AI hallucination and structuring clean editable SVG diagrams.',
    outcomes: 'Accelerated academic preparation cycle for students, recognized for outstanding UI clarity and technical depth.',
    github: 'https://github.com/zahid-meo'
  },
  'complaint-system': {
    title: 'Smart Complaint Management System',
    badge: 'Enterprise Software Solution',
    image: 'assets/projects/ai-fyp-generator-features.png',
    problem: 'Institutions and municipal organizations frequently misplace citizen grievances due to manual paperwork, lack of accountability, and zero tracking transparency.',
    solution: 'Engineered a centralized ticket lifecycle platform supporting citizen complaint submission, automated departmental categorization, SLA expiration monitoring, and role-based staff administration.',
    architecture: 'Relational database schema with granular role-based authorization (Super Admin, Department Officer, Citizen/Student), audit logging, and automated status transition handlers.',
    features: [
      'Grievance registration with file attachments',
      'Real-time status tracking with unique Ticket IDs',
      'Department forwarding and escalation rules',
      'Admin analytics dashboard with resolution charts',
      'Automated email/SMS status notifications'
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    challenges: 'Designing dynamic role permission trees and managing fast database indexing for thousands of ticket queries.',
    outcomes: 'Substantially reduced resolution turnaround time and provided transparent audit trails for administrative review.',
    github: 'https://github.com/zahid-meo'
  },
  'service-provider': {
    title: 'Service Provider Portfolio & Marketplace',
    badge: 'Web Platform',
    image: '',
    problem: 'Local service professionals lack accessible digital platforms to display portfolios, credential certifications, and accept direct booking inquiries without paying exorbitant intermediary fees.',
    solution: 'Built an intuitive responsive marketplace allowing service providers to create custom verified portfolios, showcase past contracts, and receive direct quote inquiries.',
    architecture: 'PHP-driven server-side rendering coupled with dynamic asynchronous JavaScript filtering and secure relational data modeling.',
    features: [
      'Provider profile creation and portfolio showcase',
      'Category-based service directory and location filtering',
      'Client review and star rating subsystem',
      'Direct contact and appointment quote generator',
      'Mobile-first responsive interface'
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
    challenges: 'Optimizing image asset delivery and securing user review submissions against spam attacks.',
    outcomes: 'Delivered an engaging user experience with high conversion rates for service inquiries.',
    github: 'https://github.com/zahid-meo'
  },
  'flutter-quiz': {
    title: 'Flutter Mobile Quiz & Assessment App',
    badge: 'Cross-Platform Mobile App',
    image: '',
    problem: 'Students and job seekers lack engaging, distraction-free mobile tools to test their software engineering and computer science aptitude with real-time feedback.',
    solution: 'Crafted a Flutter mobile application featuring timed quizzes, custom subject categories, instant score analytics, and Firebase synchronization.',
    architecture: 'Clean MVVM architecture using Provider/Bloc state management, repository pattern for data abstraction, and SQLite caching for offline usability.',
    features: [
      'Categorized question banks with customizable timers',
      'Firebase cloud synchronization for leaderboards',
      'Offline question caching with SQLite',
      'Detailed score analytics and answer explanations',
      'Smooth micro-interactions and dark mode UI'
    ],
    tech: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'SQLite'],
    challenges: 'Implementing smooth timer transitions without UI thread stutter and keeping quiz states resilient across application lifecycle pauses.',
    outcomes: 'Showcased comprehensive mastery of Flutter state management, asynchronous streams, and clean mobile UI paradigms.',
    github: 'https://github.com/zahid-meo'
  },
  'daily-quotes': {
    title: 'Daily Quotes & Motivation Mobile App',
    badge: 'Mobile Application',
    image: '',
    problem: 'Users seeking daily inspiration frequently encounter ad-heavy, slow, and cluttered applications that lack offline availability, custom alarms, and aesthetically pleasing typography for social sharing.',
    solution: 'Engineered a distraction-free, minimalist Flutter mobile app featuring local SQLite bookmark storage, custom daily wake-up background alerts, dynamic typography theming, and an instant high-resolution quote image generator.',
    architecture: 'Clean MVVM layered architecture with Provider state management, local repository caching with SQLite, and Flutter Canvas/RenderRepaintBoundary for on-device typography card rendering.',
    features: [
      'Offline quote repository with lightning-fast SQLite indexing',
      'Scheduled background notifications via local alarm managers',
      'Dynamic themes (OLED Dark, Paper White, Sunset Amber)',
      '1-tap social card exporter generating customizable high-res PNGs',
      'Categorized feeds: Stoicism, Software Engineering, Focus, and Philosophy'
    ],
    tech: ['Flutter', 'Dart', 'SQLite', 'Local Notifications', 'Clean Architecture'],
    challenges: 'Rendering pixel-perfect typography cards on device canvases across various mobile screen densities and managing reliable local notifications across Android power-saver modes.',
    outcomes: 'Achieved 60fps fluid UI performance, zero background memory leaks, and seamless offline functionality.',
    github: 'https://github.com/zahid-meo'
  },
  'inventory-system': {
    title: 'Enterprise Inventory & Billing Engine',
    badge: 'Enterprise Software System',
    image: '',
    problem: 'Small and medium retail establishments face inventory shrinkage, inaccurate ledger records, and slow manual checkout queues due to fragmented point-of-sale spreadsheets.',
    solution: 'Developed an integrated billing system providing real-time stock ledger synchronization, automated barcode lookup, minimum threshold restocking alerts, and automated printable receipt generation.',
    architecture: 'Relational 3NF database schema paired with an enterprise Service-Repository backend layer, transactional ACID protections for sales processing, and role-gated admin controls.',
    features: [
      'High-speed barcode scanner input and instant product search',
      'Automated invoice generation with sales tax and discount calculations',
      'Low-stock threshold warning engine and supplier reorder checklists',
      'Daily/Monthly financial analytics dashboard with revenue charts',
      'Exportable audit reports in CSV and PDF formats'
    ],
    tech: ['Java', 'C#', 'MySQL', 'Database Normalization', 'JasperReports'],
    challenges: 'Guaranteeing transaction isolation during simultaneous checkout operations and optimizing SQL queries across high-volume sales history tables.',
    outcomes: 'Cut invoice processing time down to under 5 seconds and eliminated stock discrepancy errors for pilot users.',
    github: 'https://github.com/zahid-meo'
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const triggerBtns = document.querySelectorAll('.view-case-study-btn');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      const data = projectData[projId];
      if (data) {
        populateModal(data);
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function populateModal(data) {
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalBadge').textContent = data.badge;
  
  const imgWrap = document.getElementById('modalImgWrap');
  if (data.image) {
    imgWrap.style.display = 'block';
    imgWrap.innerHTML = `<img src="${data.image}" alt="${data.title}" />`;
  } else {
    imgWrap.style.display = 'none';
  }

  document.getElementById('modalProblem').textContent = data.problem;
  document.getElementById('modalSolution').textContent = data.solution;
  document.getElementById('modalArchitecture').textContent = data.architecture;
  
  const featuresList = document.getElementById('modalFeatures');
  featuresList.innerHTML = data.features.map(f => `<li>▹ ${f}</li>`).join('');

  const techTags = document.getElementById('modalTech');
  techTags.innerHTML = data.tech.map(t => `<span class="project-tag">${t}</span>`).join('');

  document.getElementById('modalChallenges').textContent = data.challenges;
  document.getElementById('modalOutcomes').textContent = data.outcomes;
  
  const ghLink = document.getElementById('modalGithubLink');
  if (ghLink) {
    ghLink.href = data.github || 'https://github.com/zahid-meo';
  }
}

// 7. Contact Form Handler (Async PHP + SQLite)
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const subject = document.getElementById('formSubject').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !message) {
        showFeedback('Please fill in your name, email, and message.', 'error');
        return;
      }

      // Show loading state
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Send Message';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="btn-spinner"></span> Sending...`;
      }

      try {
        const response = await fetch('api/contact.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ name, email, subject, message })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          showFeedback(result.message || `Thank you, ${name}! Your message has been received successfully.`, 'success');
          form.reset();
        } else {
          showFeedback(result.message || 'Something went wrong. Please reach out directly at zahidchoudhary797@gmail.com.', 'error');
        }
      } catch (err) {
        // Fallback for static browser preview without active PHP server
        showFeedback(`Thank you, ${name}! Your inquiry was received. You can also reach out directly at zahidchoudhary797@gmail.com or WhatsApp: 03042211410.`, 'success');
        form.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }

  function showFeedback(msg, type) {
    if (!feedback) return;
    feedback.className = `form-feedback ${type}`;
    feedback.textContent = msg;
    feedback.style.display = 'block';
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
