document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            menuToggle.innerHTML = isActive 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-expanded', isActive);
        });
    }
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Smooth Scrolling with active nav highlighting
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Active navigation based on scroll position
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initialize on load
    
    // Skills Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide skill categories based on filter
            skillCategories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                
                if (filterValue === 'all' || categoryType === filterValue) {
                    category.style.display = 'block';
                    setTimeout(() => {
                        category.style.opacity = '1';
                        category.style.transform = 'translateY(0)';
                    }, 10);
                    category.setAttribute('aria-hidden', 'false');
                } else {
                    category.style.opacity = '0';
                    category.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        category.style.display = 'none';
                    }, 300);
                    category.setAttribute('aria-hidden', 'true');
                }
            });
            
            // Announce filter change for screen readers
            const announcement = document.getElementById('filterAnnouncement') || 
                (() => {
                    const div = document.createElement('div');
                    div.id = 'filterAnnouncement';
                    div.className = 'sr-only';
                    div.setAttribute('aria-live', 'polite');
                    div.setAttribute('aria-atomic', 'true');
                    document.body.appendChild(div);
                    return div;
                })();
            
            announcement.textContent = `Showing ${filterValue === 'all' ? 'all skills' : filterValue + ' skills'}`;
        });
    });
    
    // Experience Details Toggle
    const detailsToggle = document.querySelector('.details-toggle');
    if (detailsToggle) {
        detailsToggle.addEventListener('click', function() {
            const details = this.nextElementSibling;
            const isExpanded = details.classList.contains('show');
            
            details.classList.toggle('show');
            this.textContent = isExpanded ? 'Show Achievements' : 'Hide Achievements';
            this.setAttribute('aria-expanded', !isExpanded);
            details.setAttribute('aria-hidden', isExpanded);
        });
    }
    
    // Animate Stats
    function animateCounter(element, targetValue, duration = 2000) {
        let startValue = 0;
        const increment = targetValue / (duration / 16);
        const timer = setInterval(() => {
            startValue += increment;
            if (startValue >= targetValue) {
                element.textContent = targetValue + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(startValue) + '+';
            }
        }, 16);
    }
    
    // Trigger stats animation when in viewport
    const statsSection = document.getElementById('about');
    const yearsExp = document.getElementById('yearsExp');
    const projectsCount = document.getElementById('projectsCount');
    const testCases = document.getElementById('testCases');
    const defectsFixed = document.getElementById('defectsFixed');
    
    let statsAnimated = false;
    
    function checkStatsInView() {
        const rect = statsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (!statsAnimated && rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
            animateCounter(yearsExp, 2);
            animateCounter(projectsCount, 15);
            animateCounter(testCases, 500);
            animateCounter(defectsFixed, 300);
            statsAnimated = true;
        }
    }
    
    window.addEventListener('scroll', checkStatsInView);
    checkStatsInView();
    
    // Test Strategy Modal
    const modal = document.getElementById('testStrategyModal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    // Test strategy data
    const testStrategies = {
        marinabay: {
            title: 'MarinaBaySands - Test Strategy & Cases',
            content: `
                <div class="test-strategy">
                    <div class="strategy-header">
                        <h3>Project Overview</h3>
                        <p>Comprehensive testing for corporate website and museum platform with AEM integration</p>
                    </div>
                    
                    <div class="strategy-section">
                        <h4><i class="fas fa-check-circle"></i> Testing Approach</h4>
                        <ul>
                            <li><strong>Functional Testing:</strong> Validated 20+ AEM templates and components</li>
                            <li><strong>Multi-language Support:</strong> Tested content in English, Chinese, Japanese</li>
                            <li><strong>Workflow Testing:</strong> Verified content approval and publishing workflows</li>
                            <li><strong>Form Validation:</strong> Tested booking and inquiry forms with client-side validation</li>
                        </ul>
                    </div>
                    
                    <div class="strategy-section">
                        <h4><i class="fas fa-code"></i> API Testing (Postman)</h4>
                        <ul>
                            <li><strong>Endpoints Tested:</strong> 15+ REST API endpoints for content management</li>
                            <li><strong>Response Validation:</strong> Status codes, data accuracy, error handling</li>
                            <li><strong>Performance Checks:</strong> Response time monitoring under normal load</li>
                            <li><strong>Security Testing:</strong> Authentication and authorization verification</li>
                        </ul>
                    </div>
                    
                    <div class="strategy-section">
                        <h4><i class="fas fa-paint-brush"></i> UI/UX Validation</h4>
                        <ul>
                            <li><strong>Design Compliance:</strong> Pixel-perfect validation against Figma designs</li>
                            <li><strong>Responsive Testing:</strong> Tested across 5+ device breakpoints</li>
                            <li><strong>Cross-browser:</strong> Chrome, Firefox, Safari, Edge compatibility</li>
                            <li><strong>Accessibility:</strong> WCAG 2.1 AA compliance checks</li>
                        </ul>
                    </div>
                    
                    <div class="strategy-section">
                        <h4><i class="fas fa-robot"></i> Automation (Selenium)</h4>
                        <ul>
                            <li><strong>Scope:</strong> Critical user journeys automated for regression</li>
                            <li><strong>Coverage:</strong> 30% of regression test cases automated</li>
                            <li><strong>Framework:</strong> Page Object Model with TestNG implementation</li>
                            <li><strong>Tools Stack:</strong> Selenium WebDriver, Java, Maven, Jenkins</li>
                        </ul>
                    </div>
                    
                    <div class="metrics">
                        <h4>Testing Metrics & Results</h4>
                        <div class="metrics-grid">
                            <div class="metric">
                                <span class="metric-value">98%</span>
                                <span class="metric-label">Test Pass Rate</span>
                            </div>
                            <div class="metric">
                                <span class="metric-value">95%</span>
                                <span class="metric-label">Requirements Coverage</span>
                            </div>
                            <div class="metric">
                                <span class="metric-value">48</span>
                                <span class="metric-label">Defects Identified</span>
                            </div>
                            <div class="metric">
                                <span class="metric-value">100%</span>
                                <span class="metric-label">Defects Verified</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        singhealth: {
            title: 'SingHealth - Test Cases & Strategy',
            content: `
                <div class="test-cases">
                    <div class="strategy-header">
                        <h3>Healthcare Platform Testing</h3>
                        <p>Comprehensive testing for healthcare service website with focus on accessibility and compliance</p>
                    </div>
                    
                    <div class="test-case-group">
                        <h4><i class="fas fa-stethoscope"></i> Component Testing</h4>
                        <table class="test-case-table">
                            <thead>
                                <tr>
                                    <th>Test Case ID</th>
                                    <th>Description</th>
                                    <th>Expected Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>TC_SH_001</td>
                                    <td>Doctor search functionality with filters</td>
                                    <td>Should display matching doctors with correct specialization and availability</td>
                                </tr>
                                <tr>
                                    <td>TC_SH_002</td>
                                    <td>Appointment booking form validation</td>
                                    <td>Should validate all required fields and show appropriate error messages</td>
                                </tr>
                                <tr>
                                    <td>TC_SH_003</td>
                                    <td>Medical records access permission</td>
                                    <td>Should restrict unauthorized access to patient medical records</td>
                                </tr>
                                <tr>
                                    <td>TC_SH_004</td>
                                    <td>Prescription upload and viewing</td>
                                    <td>Should allow PDF upload and secure viewing with download option</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="test-case-group">
                        <h4><i class="fas fa-mobile-alt"></i> Responsive Testing Matrix</h4>
                        <ul>
                            <li><strong>Mobile (320px-480px):</strong> Hamburger menu, touch-friendly buttons, readable text</li>
                            <li><strong>Tablet (768px-1024px):</strong> Optimized layout, readable text, tablet-specific gestures</li>
                            <li><strong>Desktop (1024px+):</strong> Full navigation, multi-column layouts, hover states</li>
                            <li><strong>Breakpoints Tested:</strong> 320px, 480px, 768px, 1024px, 1200px, 1440px</li>
                        </ul>
                    </div>
                    
                    <div class="test-case-group">
                        <h4><i class="fas fa-universal-access"></i> Accessibility Testing</h4>
                        <ul>
                            <li><strong>Screen Readers:</strong> NVDA, JAWS compatibility testing</li>
                            <li><strong>Keyboard Navigation:</strong> Tab, Enter, Space, Arrow keys functionality</li>
                            <li><strong>Color Contrast:</strong> Minimum 4.5:1 ratio for normal text</li>
                            <li><strong>Alt Text:</strong> Descriptive alt text for all images</li>
                            <li><strong>ARIA Labels:</strong> Proper labeling for interactive elements</li>
                        </ul>
                    </div>
                    
                    <div class="metrics">
                        <h4>Healthcare Compliance Metrics</h4>
                        <div class="metrics-grid">
                            <div class="metric">
                                <span class="metric-value">100%</span>
                                <span class="metric-label">HIPAA Compliance</span>
                            </div>
                            <div class="metric">
                                <span class="metric-value">99.5%</span>
                                <span class="metric-label">Uptime During Testing</span>
                            </div>
                            <div class="metric">
                                <span class="metric-value">32</span>
                                <span class="metric-label">Critical Issues Fixed</span>
                            </div>
                            <div class="metric">
                                <span class="metric-value">4.8/5</span>
                                <span class="metric-label">User Satisfaction</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        ecommerce: {
            title: 'E-commerce - Test Scenarios & Strategy',
            content: `
                <div class="test-scenarios">
                    <div class="strategy-header">
                        <h3>E-commerce Platform Testing</h3>
                        <p>End-to-end testing for retail e-commerce website with payment gateway integration</p>
                    </div>
                    
                    <div class="scenario-group">
                        <h4><i class="fas fa-user-plus"></i> User Registration & Authentication</h4>
                        <ul>
                            <li>New user registration with valid/invalid data combinations</li>
                            <li>Login functionality with correct/incorrect credentials</li>
                            <li>Password reset and recovery workflows</li>
                            <li>Account lockout after multiple failed attempts</li>
                            <li>Session timeout and re-authentication scenarios</li>
                            <li>Social media login integration (Google, Facebook)</li>
                        </ul>
                    </div>
                    
                    <div class="scenario-group">
                        <h4><i class="fas fa-search"></i> Product Catalog & Search</h4>
                        <ul>
                            <li>Product search with category, price, rating filters</li>
                            <li>Sorting by price (low-high, high-low), rating, popularity</li>
                            <li>Product details page accuracy (images, description, specs)</li>
                            <li>Product image zoom and gallery functionality</li>
                            <li>Inventory status display and backorder scenarios</li>
                            <li>Product reviews and rating system</li>
                        </ul>
                    </div>
                    
                    <div class="scenario-group">
                        <h4><i class="fas fa-shopping-cart"></i> Shopping Cart & Checkout</h4>
                        <ul>
                            <li>Add/remove items from cart with quantity updates</li>
                            <li>Cart total calculations including taxes and shipping</li>
                            <li>Shipping address validation and auto-complete</li>
                            <li>Multiple payment methods (Credit Card, PayPal, COD)</li>
                            <li>Order confirmation and email notifications</li>
                            <li>Guest checkout vs registered user checkout</li>
                            <li>Promo code application and validation</li>
                        </ul>
                    </div>
                    
                    <div class="scenario-group">
                        <h4><i class="fas fa-shield-alt"></i> Security & Performance Testing</h4>
                        <ul>
                            <li><strong>Security:</strong> SQL injection prevention, XSS protection, secure password storage</li>
                            <li><strong>SSL:</strong> Certificate validation and secure connections</li>
                            <li><strong>Payment Security:</strong> PCI-DSS compliance for payment gateway</li>
                            <li><strong>Performance:</strong> Page load time under normal/peak load</li>
                            <li><strong>Load Testing:</strong> Simultaneous user sessions (500+ users)</li>
                            <li><strong>Stress Testing:</strong> Checkout process during flash sales</li>
                        </ul>
                    </div>
                    
                    <div class="metrics">
                        <h4>E-commerce Performance Metrics</h4>
                        <div class="metrics-grid">
                            <div class="metric">
                                <span class="metric-value">2.1s</span>
                                <span class="metric-label">Avg Page Load</span>
                            </div>
                            <div class="metric">
                                <span class="metric-value">99.2%</span>
                                <span class="metric-label">Checkout Success Rate</span>
                            </div>
                            <div class="metric">
                                <span class="metric-value">0</span>
                                <span class="metric-label">Security Breaches</span>
                            </div>
                            <div class="metric">
                                <span class="metric-value">85%</span>
                                <span class="metric-label">Cart Recovery Rate</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        'ai-testing': {
            title: 'Software Testing in Generative AI - Certificate',
            content: `
                <div class="certificate-details">
                    <div class="certificate-header">
                        <div class="certificate-badge">
                            <i class="fas fa-award"></i>
                            <h4>Certificate of Excellence</h4>
                        </div>
                        <div class="certificate-info">
                            <p><strong>Issued by:</strong> AI Testing Institute</p>
                            <p><strong>Date of Completion:</strong> March 2024</p>
                            <p><strong>Certificate ID:</strong> ATI-2024-789456</p>
                            <p><strong>Duration:</strong> 60 Hours</p>
                        </div>
                    </div>
                    
                    <div class="certificate-content">
                        <h4><i class="fas fa-graduation-cap"></i> Skills Acquired</h4>
                        <div class="skills-list">
                            <span class="skill-tag">AI-Powered Test Generation</span>
                            <span class="skill-tag">Intelligent Test Oracles</span>
                            <span class="skill-tag">ML-based Defect Prediction</span>
                            <span class="skill-tag">Automated Test Maintenance</span>
                            <span class="skill-tag">Smart Test Data Generation</span>
                            <span class="skill-tag">AI-driven Test Optimization</span>
                            <span class="skill-tag">Natural Language Test Cases</span>
                            <span class="skill-tag">Predictive Analytics for QA</span>
                        </div>
                        
                        <h4><i class="fas fa-book-open"></i> Key Learnings</h4>
                        <ul>
                            <li>Leveraging AI algorithms for automated test case generation and optimization</li>
                            <li>Implementing intelligent test oracles using machine learning models</li>
                            <li>Using predictive analytics to identify defect-prone areas in applications</li>
                            <li>Automating test maintenance with AI-powered change detection</li>
                            <li>Generating realistic test data using generative adversarial networks (GANs)</li>
                            <li>Integrating AI tools into existing CI/CD pipelines and testing workflows</li>
                            <li>Natural language processing for converting requirements into test cases</li>
                        </ul>
                        
                        <h4><i class="fas fa-chart-line"></i> Practical Applications & Impact</h4>
                        <ul>
                            <li>Reduced test case creation time by 40% using AI-assisted generation</li>
                            <li>Improved test coverage by identifying hidden test scenarios through ML analysis</li>
                            <li>Enhanced defect prediction accuracy by 35% using historical data patterns</li>
                            <li>Automated 60% of test data generation tasks with AI models</li>
                            <li>Reduced false positives in test results by 25% with intelligent oracles</li>
                            <li>Accelerated regression testing by 30% through AI-powered test prioritization</li>
                        </ul>
                        
                        <div class="certificate-verification">
                            <h4><i class="fas fa-qrcode"></i> Certificate Verification</h4>
                            <p>This certificate can be verified online at: <strong>verify.aitestinginstitute.com/789456</strong></p>
                            <p class="verification-note">Verification includes digital signature and blockchain timestamp</p>
                        </div>
                    </div>
                </div>
            `
        },
        copilot: {
            title: 'Prompt Engineering with GitHub Copilot - Certificate',
            content: `
                <div class="certificate-details">
                    <div class="certificate-header">
                        <div class="certificate-badge">
                            <i class="fab fa-github"></i>
                            <h4>GitHub Copilot Expert</h4>
                        </div>
                        <div class="certificate-info">
                            <p><strong>Issued by:</strong> GitHub Learning Lab</p>
                            <p><strong>Date of Completion:</strong> November 2023</p>
                            <p><strong>Certificate ID:</strong> GH-CPLT-2023-123456</p>
                            <p><strong>Level:</strong> Advanced</p>
                        </div>
                    </div>
                    
                    <div class="certificate-content">
                        <h4><i class="fas fa-code"></i> Core Competencies</h4>
                        <div class="skills-list">
                            <span class="skill-tag">Advanced Prompt Engineering</span>
                            <span class="skill-tag">AI-assisted Code Generation</span>
                            <span class="skill-tag">Test Automation Scripting</span>
                            <span class="skill-tag">AI Pair Programming</span>
                            <span class="skill-tag">Quality Assurance Automation</span>
                            <span class="skill-tag">Productivity Enhancement</span>
                            <span class="skill-tag">Code Review Automation</span>
                            <span class="skill-tag">Documentation Generation</span>
                        </div>
                        
                        <h4><i class="fas fa-lightbulb"></i> Key Learnings & Techniques</h4>
                        <ul>
                            <li>Mastering prompt engineering techniques for optimal code generation results</li>
                            <li>Generating comprehensive test cases and automation scripts using Copilot</li>
                            <li>Improving code quality and test coverage through AI-assisted development</li>
                            <li>Streamlining QA workflows with automated test generation and maintenance</li>
                            <li>Creating technical documentation and test reports efficiently with AI assistance</li>
                            <li>Debugging and refactoring code with AI-powered insights and suggestions</li>
                            <li>Implementing best practices for AI pair programming in team environments</li>
                            <li>Optimizing prompts for specific testing frameworks and methodologies</li>
                        </ul>
                        
                        <h4><i class="fas fa-rocket"></i> Practical Applications & Results</h4>
                        <ul>
                            <li>Increased test script generation speed by 50% using optimized prompts</li>
                            <li>Improved test case quality and coverage through AI suggestions</li>
                            <li>Reduced manual test documentation time by 60% with AI assistance</li>
                            <li>Enhanced code review efficiency with AI-powered defect detection</li>
                            <li>Generated 200+ test cases across 3 major projects using Copilot</li>
                            <li>Automated 40% of repetitive testing tasks through AI-generated scripts</li>
                            <li>Improved test maintenance efficiency by 35% with AI-assisted updates</li>
                            <li>Reduced onboarding time for new testing tools by 45% with AI guidance</li>
                        </ul>
                        
                        <div class="certificate-projects">
                            <h4><i class="fas fa-tasks"></i> Certificate Projects</h4>
                            <ul>
                                <li><strong>Automated Test Framework:</strong> Built a comprehensive testing framework using AI-generated code</li>
                                <li><strong>API Test Suite:</strong> Created 50+ API test cases with AI assistance</li>
                                <li><strong>UI Automation:</strong> Developed Selenium scripts for complex user flows</li>
                                <li><strong>Performance Testing:</strong> Generated load testing scenarios and scripts</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `
        }
    };
    // Add to the testStrategies object in js/script.js
testStrategies['api-docs'] = {
    title: 'API Testing Project - Documentation',
    content: `
        <div class="api-documentation">
            <div class="strategy-header">
                <h3>Custom REST API Testing - Complete Documentation</h3>
                <p>Detailed API endpoints, testing scenarios, and implementation guidelines</p>
            </div>
            
            <div class="testing-instructions">
                <h5>Project Setup & Testing</h5>
                <ol>
                    <li>Clone the repository: <code>git clone https://github.com/CraftbyCoder/APITesting.git</code></li>
                    <li>Install dependencies: <code>npm install</code></li>
                    <li>Start the server: <code>npm start</code></li>
                    <li>Server runs on: <code>http://localhost:3000</code></li>
                    <li>Use Postman or any API client to test endpoints</li>
                </ol>
            </div>
            
            <div class="api-endpoint">
                <div class="endpoint-header">
                    <span class="endpoint-method get">GET</span>
                    <span class="endpoint-path">/api/users</span>
                </div>
                <p class="endpoint-description">Retrieve all users from the mock database</p>
                
                <div class="example-title">Example Request:</div>
                <div class="endpoint-example">
                    GET http://localhost:3000/api/users
                </div>
                
                <div class="example-title">Example Response (200 OK):</div>
                <div class="endpoint-example">
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "user"
    }
  ]
}
                </div>
            </div>
            
            <div class="api-endpoint">
                <div class="endpoint-header">
                    <span class="endpoint-method get">GET</span>
                    <span class="endpoint-path">/api/users/:id</span>
                </div>
                <p class="endpoint-description">Retrieve a specific user by ID</p>
                
                <div class="example-title">Testing Scenarios:</div>
                <ul>
                    <li><strong>Valid ID:</strong> Returns user data (200 OK)</li>
                    <li><strong>Invalid ID:</strong> Returns error (404 Not Found)</li>
                    <li><strong>Non-numeric ID:</strong> Returns error (400 Bad Request)</li>
                </ul>
            </div>
            
            <div class="api-endpoint">
                <div class="endpoint-header">
                    <span class="endpoint-method post">POST</span>
                    <span class="endpoint-path">/api/users</span>
                </div>
                <p class="endpoint-description">Create a new user in the database</p>
                
                <div class="example-title">Request Body (JSON):</div>
                <div class="endpoint-example">
{
  "name": "New User",
  "email": "newuser@example.com",
  "role": "user"
}
                </div>
                
                <div class="example-title">Testing Scenarios:</div>
                <ul>
                    <li><strong>Valid data:</strong> Creates user (201 Created)</li>
                    <li><strong>Missing required fields:</strong> Error (400 Bad Request)</li>
                    <li><strong>Invalid email format:</strong> Error (400 Bad Request)</li>
                    <li><strong>Duplicate email:</strong> Error (409 Conflict)</li>
                </ul>
            </div>
            
            <div class="api-endpoint">
                <div class="endpoint-header">
                    <span class="endpoint-method put">PUT</span>
                    <span class="endpoint-path">/api/users/:id</span>
                </div>
                <p class="endpoint-description">Update an existing user (complete update)</p>
                
                <div class="example-title">Testing Scenarios:</div>
                <ul>
                    <li><strong>Valid ID with complete data:</strong> Updates user (200 OK)</li>
                    <li><strong>Non-existent ID:</strong> Error (404 Not Found)</li>
                    <li><strong>Missing required fields:</strong> Error (400 Bad Request)</li>
                </ul>
            </div>
            
            <div class="api-endpoint">
                <div class="endpoint-header">
                    <span class="endpoint-method delete">DELETE</span>
                    <span class="endpoint-path">/api/users/:id</span>
                </div>
                <p class="endpoint-description">Delete a user from the database</p>
                
                <div class="example-title">Testing Scenarios:</div>
                <ul>
                    <li><strong>Valid ID:</strong> Deletes user (200 OK)</li>
                    <li><strong>Non-existent ID:</strong> Error (404 Not Found)</li>
                    <li><strong>Already deleted user:</strong> Error (410 Gone)</li>
                </ul>
            </div>
            
            <div class="postman-guide">
                <h5>Postman Testing Guide</h5>
                <ol>
                    <li>Import the Postman collection from the repository</li>
                    <li>Set up environment variables for base URL</li>
                    <li>Run test collection to validate all endpoints</li>
                    <li>Check response status codes and body structure</li>
                    <li>Validate error handling with invalid requests</li>
                </ol>
            </div>
            
            <div class="testing-instructions">
                <h5>Testing Checklist</h5>
                <ul>
                    <li>✓ All HTTP methods work correctly</li>
                    <li>✓ Proper status codes for success and error scenarios</li>
                    <li>✓ Request validation for required fields</li>
                    <li>✓ Error messages are clear and informative</li>
                    <li>✓ Data integrity maintained after CRUD operations</li>
                    <li>✓ Edge cases handled properly</li>
                </ul>
            </div>
        </div>
    `
};
    
    // Add CSS for modal content
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .test-strategy, .test-cases, .test-scenarios, .certificate-details {
            padding: 0.5rem;
        }
        
        .strategy-header {
            margin-bottom: 2.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 2px solid var(--card-border);
        }
        
        .strategy-header h3 {
            color: var(--text-dark);
            font-size: 1.8rem;
            margin-bottom: 0.75rem;
            background: linear-gradient(135deg, var(--text-dark) 0%, var(--light-bronze) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .strategy-header p {
            color: var(--text-light);
            font-size: 1.1rem;
            line-height: 1.7;
            margin-bottom: 0;
        }
        
        .strategy-section, .test-case-group, .scenario-group {
            margin: 2.5rem 0;
            padding: 2rem;
            background: var(--card-bg);
            border-radius: var(--radius);
            border-left: 5px solid var(--light-bronze);
            border: 1px solid var(--card-border);
            position: relative;
            overflow: hidden;
        }
        
        .strategy-section::before, .test-case-group::before, .scenario-group::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: var(--gradient);
        }
        
        .strategy-section h4, .test-case-group h4, .scenario-group h4 {
            color: var(--text-dark);
            margin-bottom: 1.25rem;
            font-size: 1.4rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .strategy-section h4 i, .test-case-group h4 i, .scenario-group h4 i {
            color: var(--light-bronze);
        }
        
        .strategy-section ul, .test-case-group ul, .scenario-group ul {
            list-style: none;
            padding-left: 0;
        }
        
        .strategy-section li, .test-case-group li, .scenario-group li {
            padding: 0.75rem 0;
            position: relative;
            color: var(--text-dark);
            font-size: 1.05rem;
            line-height: 1.7;
            padding-left: 2rem;
        }
        
        .strategy-section li::before, .test-case-group li::before, .scenario-group li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--light-bronze);
            font-weight: bold;
            font-size: 1.2rem;
        }
        
        .strategy-section li strong {
            color: var(--light-bronze);
            font-weight: 600;
        }
        
        .test-case-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1.5rem;
            border-radius: var(--radius);
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        .test-case-table th, .test-case-table td {
            padding: 1rem;
            border: 1px solid var(--card-border);
            text-align: left;
            vertical-align: top;
        }
        
        .test-case-table th {
            background: var(--gradient);
            color: white;
            font-weight: 600;
            font-size: 1rem;
        }
        
        .test-case-table tr:nth-child(even) {
            background: rgba(212, 163, 115, 0.05);
        }
        
        .test-case-table tr:hover {
            background: rgba(212, 163, 115, 0.1);
        }
        
        .metrics {
            margin: 3rem 0;
            padding: 2.5rem;
            background: var(--gradient);
            border-radius: var(--radius);
            position: relative;
            overflow: hidden;
        }
        
        .metrics::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
            animation: shimmer 3s infinite;
        }
        
        .metrics h4 {
            color: white;
            margin-bottom: 2rem;
            font-size: 1.6rem;
            text-align: center;
            position: relative;
            z-index: 1;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 2rem;
            position: relative;
            z-index: 1;
        }
        
        .metric {
            text-align: center;
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: var(--radius);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: var(--transition);
        }
        
        .metric:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-5px);
        }
        
        .metric-value {
            display: block;
            font-size: 2.5rem;
            font-weight: 800;
            color: white;
            margin-bottom: 0.5rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .metric-label {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 500;
        }
        
        .certificate-header {
            padding: 2.5rem;
            background: var(--card-bg);
            border-radius: var(--radius);
            margin-bottom: 2.5rem;
            border: 1px solid var(--card-border);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
            flex-wrap: wrap;
        }
        
        .certificate-badge {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .certificate-badge i {
            font-size: 3rem;
            color: var(--light-bronze);
            background: rgba(212, 163, 115, 0.15);
            padding: 1.5rem;
            border-radius: 50%;
        }
        
        .certificate-badge h4 {
            color: var(--text-dark);
            font-size: 1.8rem;
            margin: 0;
        }
        
        .certificate-info {
            flex: 1;
            min-width: 300px;
        }
        
        .certificate-info p {
            margin: 0.5rem 0;
            color: var(--text-dark);
            font-size: 1.05rem;
        }
        
        .certificate-info strong {
            color: var(--light-bronze);
            font-weight: 600;
        }
        
        .certificate-content h4 {
            color: var(--text-dark);
            margin: 2rem 0 1.5rem;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .certificate-content h4 i {
            color: var(--light-bronze);
        }
        
        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin: 1.5rem 0 2.5rem;
        }
        
        .skills-list .skill-tag {
            background: rgba(212, 163, 115, 0.15);
            color: var(--light-bronze);
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 500;
            border: 1px solid rgba(212, 163, 115, 0.3);
            transition: var(--transition);
        }
        
        .skills-list .skill-tag:hover {
            background: rgba(212, 163, 115, 0.25);
            transform: translateY(-2px);
        }
        
        .certificate-content ul {
            list-style: none;
            padding-left: 0;
            margin: 1.5rem 0 2.5rem;
        }
        
        .certificate-content li {
            padding: 0.75rem 0;
            position: relative;
            color: var(--text-dark);
            font-size: 1.05rem;
            line-height: 1.7;
            padding-left: 2rem;
        }
        
        .certificate-content li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--light-bronze);
            font-weight: bold;
            font-size: 1.5rem;
            line-height: 1;
        }
        
        .certificate-verification, .certificate-projects {
            margin: 2.5rem 0;
            padding: 2rem;
            background: var(--card-bg);
            border-radius: var(--radius);
            border: 1px solid var(--card-border);
        }
        
        .certificate-verification h4, .certificate-projects h4 {
            margin-top: 0;
        }
        
        .verification-note {
            font-size: 0.95rem;
            color: var(--text-light);
            font-style: italic;
            margin-top: 0.5rem;
        }
        
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
        
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        @media (max-width: 768px) {
            .certificate-header {
                flex-direction: column;
                text-align: center;
                gap: 1.5rem;
            }
            
            .certificate-badge {
                flex-direction: column;
                text-align: center;
            }
            
            .certificate-info {
                min-width: auto;
            }
            
            .metrics-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
            }
            
            .metric {
                padding: 1rem;
            }
            
            .metric-value {
                font-size: 2rem;
            }
        }
        
        @media (max-width: 480px) {
            .metrics-grid {
                grid-template-columns: 1fr;
            }
            
            .test-case-table {
                display: block;
                overflow-x: auto;
            }
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Open modal when clicking test strategy buttons
    document.querySelectorAll('.test-case-btn, .view-cert-btn').forEach(button => {
        button.addEventListener('click', function() {
            const project = this.getAttribute('data-project') || this.getAttribute('data-cert');
            if (testStrategies[project]) {
                modalTitle.textContent = testStrategies[project].title;
                modalContent.innerHTML = testStrategies[project].content;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                modal.setAttribute('aria-hidden', 'false');
                
                // Focus on modal for accessibility
                setTimeout(() => {
                    modal.focus();
                }, 100);
            }
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modal.setAttribute('aria-hidden', 'true');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modal.setAttribute('aria-hidden', 'true');
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modal.setAttribute('aria-hidden', 'true');
        }
    });
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const inquiryType = document.getElementById('inquiry-type').value;
            const message = document.getElementById('message').value.trim();
            
            // Form validation
            if (!name || !email || !subject || !inquiryType || !message) {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const originalWidth = submitBtn.offsetWidth;
            
            submitBtn.style.width = originalWidth + 'px';
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call (replace with actual API call)
            setTimeout(() => {
                // In a real application, you would send this data to your server
                // For demonstration purposes, we'll just show a success message
                
                showFormMessage(`Thank you ${name}! Your ${inquiryType} inquiry has been sent successfully. I'll get back to you within 24 hours.`, 'success');
                
                // Reset form
                contactForm.reset();
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.width = '';
                
                // Log form data (in production, this would be sent to your backend)
                console.log('Contact Form Submission:', {
                    name,
                    email,
                    subject,
                    inquiryType,
                    message,
                    timestamp: new Date().toISOString()
                });
                
            }, 1500);
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();
        
        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles for message
        const style = document.createElement('style');
        style.textContent = `
            .form-message {
                padding: 1.25rem;
                margin: 1.5rem 0;
                border-radius: var(--radius);
                display: flex;
                align-items: center;
                gap: 1rem;
                font-weight: 500;
                animation: slideIn 0.3s ease;
            }
            
            .form-message.success {
                background: rgba(106, 153, 78, 0.1);
                color: var(--success);
                border: 1px solid rgba(106, 153, 78, 0.3);
            }
            
            .form-message.error {
                background: rgba(231, 111, 81, 0.1);
                color: var(--danger);
                border: 1px solid rgba(231, 111, 81, 0.3);
            }
            
            .form-message i {
                font-size: 1.25rem;
            }
            
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        
        // Insert message after form
        contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
        document.head.appendChild(style);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 5000);
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            const submitBtn = this.querySelector('button');
            
            // Simple email validation
            if (!isValidEmail(email)) {
                showNewsletterMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNewsletterMessage('Thank you for subscribing! You\'ll receive QA insights and updates.', 'success');
                this.reset();
                submitBtn.innerHTML = 'Subscribe';
                submitBtn.disabled = false;
            }, 1000);
        });
    }
    
    function showNewsletterMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `newsletter-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 0.75rem;
            margin-top: 0.5rem;
            border-radius: 6px;
            font-size: 0.9rem;
            text-align: center;
            animation: slideIn 0.3s ease;
        `;
        
        if (type === 'success') {
            messageDiv.style.background = 'rgba(106, 153, 78, 0.1)';
            messageDiv.style.color = 'var(--success)';
            messageDiv.style.border = '1px solid rgba(106, 153, 78, 0.3)';
        } else {
            messageDiv.style.background = 'rgba(231, 111, 81, 0.1)';
            messageDiv.style.color = 'var(--danger)';
            messageDiv.style.border = '1px solid rgba(231, 111, 81, 0.3)';
        }
        
        const existingMessage = newsletterForm.querySelector('.newsletter-message');
        if (existingMessage) existingMessage.remove();
        
        newsletterForm.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 3000);
    }
    
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
            backToTop.setAttribute('aria-hidden', 'false');
        } else {
            backToTop.classList.remove('visible');
            backToTop.setAttribute('aria-hidden', 'true');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        backToTop.blur(); // Remove focus after click for better UX
    });
    
    // Skill bars animation
    const skillLevels = document.querySelectorAll('.level-fill');
    
    function animateSkillBars() {
        skillLevels.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }
    
    // Animate skill bars when skills section is in view
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;
    
    function checkSkillsInView() {
        const rect = skillsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (!skillsAnimated && rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
            animateSkillBars();
            skillsAnimated = true;
        }
    }
    
    window.addEventListener('scroll', checkSkillsInView);
    checkSkillsInView();
    
    // Form input animations
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Add hover effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });
    
    // Initialize tooltips for social icons
    document.querySelectorAll('.social-icon').forEach(icon => {
        const platform = icon.classList.contains('linkedin') ? 'LinkedIn' :
                       icon.classList.contains('github') ? 'GitHub' :
                       icon.classList.contains('medium') ? 'Medium' : 'Social';
        
        icon.setAttribute('aria-label', `Visit my ${platform} profile`);
        icon.setAttribute('title', `Visit my ${platform} profile`);
    });
    
    // Add current year to footer if needed
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Print page functionality (optional)
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
    
    // Initialize all animations and interactions
    console.log('Portfolio website initialized successfully!');
    console.log('Theme Features:');
    console.log('- Dark Navigation & Footer (#5a4a32)');
    console.log('- Alternating Section Backgrounds (#fefae0ff & #faedcdff)');
    console.log('- Bronze Gradient Buttons');
    console.log('- Light Bronze Cards with subtle transparency');
    console.log('- Complete responsive design');
    console.log('- Interactive modals with detailed content');
    console.log('- Animated statistics and skill bars');
    console.log('- Form validation and submission handling');
    console.log('- Accessibility features implemented');
});