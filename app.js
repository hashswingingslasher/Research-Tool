// Research Dashboard JavaScript functionality

// Research data from provided JSON
const researchData = {
  "blockchain security trends": {
    "executiveSummary": "Blockchain security market is rapidly evolving with new threats and solutions emerging. Market valued at $3.7B in 2024, projected to reach $67.3B by 2030 at 58.7% CAGR.",
    "keyFindings": [
      "Smart contract vulnerabilities remain top security concern",
      "Zero-knowledge proof adoption accelerating for privacy",
      "Cross-chain bridge attacks increased 200% in 2024",
      "Enterprise blockchain security spending up 45%"
    ],
    "marketData": {
      "currentValue": "$3.7B",
      "projectedValue2030": "$67.3B", 
      "cagr": "58.7%",
      "regions": {"northAmerica": "42%", "asiaPacific": "28%", "europe": "22%", "others": "8%"}
    },
    "keyPlayers": ["CertiK", "ConsenSys", "ChainSecurity", "Trail of Bits", "Quantstamp"],
    "sources": ["Blockchain Security Alliance Report", "CyberSecurity Ventures", "MarketsandMarkets Research"]
  },
  "quantum cryptography": {
    "executiveSummary": "Quantum cryptography market experiencing significant growth driven by increasing cybersecurity threats and government investments. Market size reached $1.9B in 2024 with 32.1% CAGR projected through 2031.",
    "keyFindings": [
      "Government sector leads adoption with 40% market share",
      "NIST post-quantum standards driving enterprise preparation",
      "Quantum key distribution deployments growing 150% annually",
      "Banking sector investing heavily in quantum-safe solutions"
    ],
    "marketData": {
      "currentValue": "$1.9B",
      "projectedValue2031": "$12.6B",
      "cagr": "32.1%", 
      "regions": {"northAmerica": "45%", "europe": "30%", "asiaPacific": "20%", "others": "5%"}
    },
    "keyPlayers": ["IBM", "ID Quantique", "MagiQ Technologies", "Toshiba", "QuintessenceLabs"],
    "sources": ["Quantum Industry Report 2024", "NIST Post-Quantum Standards", "McKinsey Quantum Computing"]
  },
  "digital signatures market": {
    "executiveSummary": "Digital signatures market shows robust growth driven by remote work adoption and regulatory compliance requirements. Market valued at $5.2B in 2024, expected to reach $28.1B by 2030.",
    "keyFindings": [
      "Cloud-based solutions account for 65% of market share",
      "Healthcare sector adoption accelerated by 180%",
      "eIDAS regulation driving European market growth",
      "Mobile digital signatures growing at 45% CAGR"
    ],
    "marketData": {
      "currentValue": "$5.2B",
      "projectedValue2030": "$28.1B",
      "cagr": "32.8%",
      "regions": {"northAmerica": "38%", "europe": "32%", "asiaPacific": "25%", "others": "5%"}
    },
    "keyPlayers": ["DocuSign", "Adobe", "HelloSign", "Esignlive", "SignNow"],
    "sources": ["Digital Signature Market Research", "Grand View Research", "Fortune Business Insights"]
  },
  "mpc applications": {
    "executiveSummary": "Multi-Party Computation applications expanding beyond traditional use cases into healthcare, finance, and AI. Market growing from $61.4M in 2024 to $120M by 2031 at 8.1% CAGR.",
    "keyFindings": [
      "Healthcare data sharing driving 40% of growth",
      "Financial services adopt MPC for regulatory compliance",
      "AI model training with privacy preservation emerging use case",
      "Threshold signature implementations gaining enterprise traction"
    ],
    "marketData": {
      "currentValue": "$61.4M",
      "projectedValue2031": "$120M",
      "cagr": "8.1%",
      "regions": {"northAmerica": "40%", "asiaPacific": "30%", "europe": "25%", "others": "5%"}
    },
    "keyPlayers": ["Silence Laboratories", "Partisia Blockchain", "Sharemind", "Unbound Tech", "Fireblocks"],
    "sources": ["MPC Market Analysis", "Privacy Tech Research", "Intel Market Research"]
  },
  "threshold signatures adoption": {
    "executiveSummary": "Threshold signatures seeing increased adoption in cryptocurrency custody and enterprise key management. Market growing rapidly with 85% year-over-year growth in implementations.",
    "keyFindings": [
      "Crypto custody solutions drive 60% of implementations",
      "Enterprise key management adoption up 150%",
      "DeFi protocols integrating threshold signatures for security",
      "Regulatory pressure accelerating financial sector adoption"
    ],
    "marketData": {
      "currentValue": "$45M",
      "projectedValue2031": "$340M",
      "cagr": "85%",
      "regions": {"northAmerica": "50%", "asiaPacific": "25%", "europe": "20%", "others": "5%"}
    },
    "keyPlayers": ["Silence Laboratories", "Zengo", "Fireblocks", "Coinbase Custody", "BitGo"],
    "sources": ["Threshold Cryptography Report", "Crypto Custody Research", "Digital Asset Security Study"]
  },
  "cybersecurity trends": {
    "executiveSummary": "Cybersecurity landscape evolving rapidly with AI-driven threats and solutions. Global spending reached $188B in 2024, projected to hit $366B by 2030 at 11.8% CAGR.",
    "keyFindings": [
      "AI-powered attacks increasing by 300% annually",
      "Zero-trust architecture adoption up 200%",
      "Cloud security spending growing at 25% CAGR",
      "Supply chain attacks targeting critical infrastructure"
    ],
    "marketData": {
      "currentValue": "$188B",
      "projectedValue2030": "$366B",
      "cagr": "11.8%",
      "regions": {"northAmerica": "41%", "europe": "29%", "asiaPacific": "24%", "others": "6%"}
    },
    "keyPlayers": ["CrowdStrike", "Palo Alto Networks", "Fortinet", "Check Point", "Zscaler"],
    "sources": ["Cybersecurity Market Report", "Gartner Security Spending", "Cybersecurity Ventures"]
  }
};

// Application state
let currentView = 'dashboard';
let currentSearchData = null;
let marketChartInstance = null;
let loadingInterval = null;
let searchTimeout = null;
let currentLoadingStep = 0;

const loadingSteps = [
  "Searching industry databases...",
  "Analyzing market reports...",
  "Gathering competitive intelligence...",
  "Generating visualizations..."
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Research Dashboard initializing...');
  initializeEventListeners();
  showDashboardView();
});

// Initialize all event listeners
function initializeEventListeners() {
  // Search functionality
  const searchInput = document.getElementById('mainSearchInput');
  const searchBtn = document.querySelector('.search-btn');
  
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
      }
    });
  }
  
  if (searchBtn) {
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      performSearch();
    });
  }
  
  // Navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const linkText = this.textContent.trim().toLowerCase();
      navigateToSection(linkText);
    });
  });
  
  // Logo click to return to dashboard
  const logo = document.querySelector('.header__logo');
  if (logo) {
    logo.addEventListener('click', function(e) {
      e.preventDefault();
      navigateToSection('dashboard');
    });
    logo.style.cursor = 'pointer';
  }
}

// Navigation function
function navigateToSection(section) {
  console.log('Navigating to section:', section);
  currentView = section;
  
  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.textContent.trim().toLowerCase() === section) {
      link.classList.add('active');
    }
  });
  
  switch(section) {
    case 'dashboard':
      showDashboardView();
      break;
    case 'reports':
      showReportsView();
      break;
    case 'analytics':
      showAnalyticsView();
      break;
    case 'settings':
      showSettingsView();
      break;
    default:
      showDashboardView();
  }
}

// Show dashboard view
function showDashboardView() {
  hideAllSections();
  const heroSection = document.querySelector('.hero');
  const dashboardSection = document.querySelector('.dashboard-content');
  
  if (heroSection) heroSection.style.display = 'block';
  if (dashboardSection) dashboardSection.style.display = 'block';
  
  // Re-setup dashboard event listeners
  setupDashboardEventListeners();
}

// Setup dashboard-specific event listeners
function setupDashboardEventListeners() {
  // Suggestion tags
  document.querySelectorAll('.suggestion-tag').forEach(tag => {
    tag.onclick = null; // Remove existing handlers
    tag.addEventListener('click', function(e) {
      e.preventDefault();
      const query = this.textContent.trim();
      quickSearch(query);
    });
  });
  
  // Category cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.onclick = null;
    card.addEventListener('click', function(e) {
      e.preventDefault();
      const categoryTitle = this.querySelector('h4').textContent.trim();
      searchCategory(categoryTitle);
    });
  });
  
  // Quick access buttons
  document.querySelectorAll('.quick-access-btn').forEach(btn => {
    btn.onclick = null;
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const buttonText = this.textContent.trim();
      handleQuickAccess(buttonText);
    });
  });
  
  // Recent items
  document.querySelectorAll('.recent-item').forEach(item => {
    item.onclick = null;
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const query = this.textContent.trim();
      quickSearch(query);
    });
  });
}

// Hide all main sections
function hideAllSections() {
  const sections = [
    '.hero',
    '.dashboard-content', 
    '#loadingSection',
    '#resultsSection',
    '#reportsSection',
    '#analyticsSection',
    '#settingsSection'
  ];
  
  sections.forEach(selector => {
    const section = document.querySelector(selector);
    if (section) {
      section.style.display = 'none';
      section.classList.add('hidden');
    }
  });
}

// Main search function
function performSearch(query = null) {
  const searchInput = document.getElementById('mainSearchInput');
  const searchQuery = query || (searchInput ? searchInput.value.trim() : '');
  
  if (!searchQuery) {
    showNotification('Please enter a search query', 'error');
    return;
  }
  
  console.log('Performing search for:', searchQuery);
  
  // Find matching research data
  const matchedData = findMatchingResearchData(searchQuery);
  currentSearchData = matchedData;
  
  // Show loading
  hideAllSections();
  const loadingSection = document.getElementById('loadingSection');
  if (loadingSection) {
    loadingSection.style.display = 'block';
    loadingSection.classList.remove('hidden');
  }
  
  // Update query title
  const queryTitle = document.getElementById('queryTitle');
  if (queryTitle) {
    queryTitle.textContent = searchQuery;
  }
  
  // Start loading animation
  startLoadingAnimation();
  
  // Show results after delay
  searchTimeout = setTimeout(() => {
    stopLoadingAnimation();
    showSearchResults();
  }, 3000);
}

// Find matching research data based on query
function findMatchingResearchData(query) {
  const queryLower = query.toLowerCase();
  
  // Direct topic matching
  if (queryLower.includes('blockchain') || queryLower.includes('web3')) {
    return researchData["blockchain security trends"];
  } else if (queryLower.includes('quantum')) {
    return researchData["quantum cryptography"];
  } else if (queryLower.includes('digital signature') || queryLower.includes('signature')) {
    return researchData["digital signatures market"];
  } else if (queryLower.includes('mpc') || queryLower.includes('multi-party') || queryLower.includes('cryptography')) {
    return researchData["mpc applications"];
  } else if (queryLower.includes('threshold')) {
    return researchData["threshold signatures adoption"];
  } else if (queryLower.includes('cybersecurity') || queryLower.includes('security')) {
    return researchData["cybersecurity trends"];
  }
  
  // Default to MPC data
  return researchData["mpc applications"];
}

// Quick search function
function quickSearch(query) {
  const searchInput = document.getElementById('mainSearchInput');
  if (searchInput) {
    searchInput.value = query;
  }
  performSearch(query);
}

// Search by category
function searchCategory(category) {
  let searchQuery = '';
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('cryptography') || categoryLower.includes('mpc')) {
    searchQuery = 'mpc applications';
  } else if (categoryLower.includes('digital signatures') || categoryLower.includes('tss')) {
    searchQuery = 'digital signatures market';
  } else if (categoryLower.includes('blockchain') || categoryLower.includes('web3')) {
    searchQuery = 'blockchain security trends';
  } else if (categoryLower.includes('quantum')) {
    searchQuery = 'quantum cryptography';
  } else {
    searchQuery = category;
  }
  
  quickSearch(searchQuery);
}

// Handle quick access
function handleQuickAccess(buttonText) {
  if (buttonText.includes('Reports')) {
    navigateToSection('reports');
  } else if (buttonText.includes('Competitive')) {
    quickSearch('competitive analysis');
  } else if (buttonText.includes('Technology Trends')) {
    navigateToSection('analytics');
  } else if (buttonText.includes('Market Sizing')) {
    quickSearch('market sizing');
  } else if (buttonText.includes('Regulatory')) {
    quickSearch('regulatory updates');
  }
}

// Loading animation
function startLoadingAnimation() {
  currentLoadingStep = 0;
  updateLoadingStep();
  
  loadingInterval = setInterval(() => {
    currentLoadingStep = (currentLoadingStep + 1) % loadingSteps.length;
    updateLoadingStep();
  }, 750);
}

function updateLoadingStep() {
  const steps = document.querySelectorAll('.loading-step');
  steps.forEach((step, index) => {
    step.classList.remove('active');
    if (index <= currentLoadingStep) {
      step.classList.add('active');
    }
    step.textContent = loadingSteps[index] || '';
  });
}

function stopLoadingAnimation() {
  if (loadingInterval) {
    clearInterval(loadingInterval);
    loadingInterval = null;
  }
}

// Show search results
function showSearchResults() {
  hideAllSections();
  
  const resultsSection = document.getElementById('resultsSection');
  if (resultsSection) {
    resultsSection.style.display = 'block';
    resultsSection.classList.remove('hidden');
  }
  
  if (currentSearchData) {
    populateSearchResults(currentSearchData);
    
    // Create chart after DOM update
    setTimeout(() => {
      createMarketChart(currentSearchData.marketData);
    }, 100);
  }
  
  setupResultsEventListeners();
}

// Populate search results
function populateSearchResults(data) {
  // Executive summary
  const executiveSummary = document.getElementById('executiveSummary');
  if (executiveSummary) {
    executiveSummary.textContent = data.executiveSummary;
  }
  
  // Key findings
  const keyFindingsList = document.getElementById('keyFindings');
  if (keyFindingsList && data.keyFindings) {
    keyFindingsList.innerHTML = '';
    data.keyFindings.forEach(finding => {
      const li = document.createElement('li');
      li.textContent = finding;
      keyFindingsList.appendChild(li);
    });
  }
  
  // Key players
  const playersGrid = document.getElementById('keyPlayers');
  if (playersGrid && data.keyPlayers) {
    playersGrid.innerHTML = '';
    data.keyPlayers.forEach(player => {
      const span = document.createElement('span');
      span.className = 'player-tag';
      span.textContent = player;
      playersGrid.appendChild(span);
    });
  }
  
  // Sources
  const sourcesList = document.getElementById('sources');
  if (sourcesList && data.sources) {
    sourcesList.innerHTML = '';
    data.sources.forEach(source => {
      const div = document.createElement('div');
      div.className = 'source-item';
      div.textContent = `📄 ${source}`;
      sourcesList.appendChild(div);
    });
  }
  
  // Update metrics
  if (data.marketData) {
    const metrics = document.querySelectorAll('.metric-value');
    if (metrics.length >= 3) {
      metrics[0].textContent = data.marketData.currentValue || 'N/A';
      metrics[1].textContent = data.marketData.projectedValue2030 || data.marketData.projectedValue2031 || 'N/A';
      metrics[2].textContent = data.marketData.cagr || 'N/A';
    }
  }
}

// Create market chart
function createMarketChart(marketData) {
  const ctx = document.getElementById('marketChart');
  if (!ctx || !marketData || !marketData.regions) return;
  
  // Destroy existing chart
  if (marketChartInstance) {
    marketChartInstance.destroy();
  }
  
  const regions = marketData.regions;
  const labels = [];
  const data = [];
  
  Object.entries(regions).forEach(([region, percentage]) => {
    const label = region.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    labels.push(label);
    data.push(parseInt(percentage.replace('%', '')));
  });
  
  marketChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + '%';
            }
          }
        }
      }
    }
  });
}

// Setup results event listeners
function setupResultsEventListeners() {
  setTimeout(() => {
    const buttons = document.querySelectorAll('.results-actions .btn');
    buttons.forEach(btn => {
      btn.onclick = null;
      const text = btn.textContent.trim();
      
      if (text.includes('PDF')) {
        btn.addEventListener('click', () => exportResults('pdf'));
      } else if (text.includes('CSV')) {
        btn.addEventListener('click', () => exportResults('csv'));
      } else if (text.includes('Save')) {
        btn.addEventListener('click', saveSearch);
      }
    });
  }, 50);
}

// Show different sections
function showReportsView() {
  hideAllSections();
  createReportsSection();
}

function showAnalyticsView() {
  hideAllSections();
  createAnalyticsSection();
}

function showSettingsView() {
  hideAllSections();
  createSettingsSection();
}

// Create sections dynamically
function createReportsSection() {
  let section = document.getElementById('reportsSection');
  if (!section) {
    section = document.createElement('section');
    section.id = 'reportsSection';
    section.className = 'reports-section';
    section.innerHTML = `
      <div class="container">
        <div class="section-header">
          <h2>Industry Reports</h2>
          <p>Download comprehensive research reports and market analyses</p>
        </div>
        <div class="reports-grid">
          <div class="report-card card">
            <div class="card__body">
              <h3>Multi-Party Computation Market Report 2024</h3>
              <p>Comprehensive analysis of MPC market trends and applications</p>
              <button class="btn btn--primary" onclick="downloadReport('mpc-2024')">Download PDF</button>
            </div>
          </div>
          <div class="report-card card">
            <div class="card__body">
              <h3>Blockchain Security Landscape</h3>
              <p>In-depth review of blockchain security threats and solutions</p>
              <button class="btn btn--primary" onclick="downloadReport('blockchain-security')">Download PDF</button>
            </div>
          </div>
          <div class="report-card card">
            <div class="card__body">
              <h3>Digital Signatures Industry Analysis</h3>
              <p>Market sizing and competitive analysis of digital signature solutions</p>
              <button class="btn btn--primary" onclick="downloadReport('digital-signatures')">Download PDF</button>
            </div>
          </div>
          <div class="report-card card">
            <div class="card__body">
              <h3>Quantum Cryptography Outlook</h3>
              <p>Future trends and investment opportunities in quantum cryptography</p>
              <button class="btn btn--primary" onclick="downloadReport('quantum-crypto')">Download PDF</button>
            </div>
          </div>
        </div>
      </div>`;
    document.querySelector('.main').appendChild(section);
  }
  
  section.style.display = 'block';
  section.classList.remove('hidden');
}

function createAnalyticsSection() {
  let section = document.getElementById('analyticsSection');
  if (!section) {
    section = document.createElement('section');
    section.id = 'analyticsSection';
    section.className = 'analytics-section';
    section.innerHTML = `
      <div class="container">
        <div class="section-header">
          <h2>Market Analytics</h2>
          <p>Interactive dashboards and data visualizations</p>
        </div>
        <div class="analytics-grid">
          <div class="analytics-card card">
            <div class="card__header">
              <h3>Market Growth Trends</h3>
            </div>
            <div class="card__body">
              <div class="chart-container" style="position: relative; height: 300px;">
                <canvas id="growthChart"></canvas>
              </div>
            </div>
          </div>
          <div class="analytics-card card">
            <div class="card__header">
              <h3>Technology Adoption Rates</h3>
            </div>
            <div class="card__body">
              <div class="chart-container" style="position: relative; height: 300px;">
                <canvas id="adoptionChart"></canvas>
              </div>
            </div>
          </div>
          <div class="analytics-card card">
            <div class="card__header">
              <h3>Investment Tracker</h3>
            </div>
            <div class="card__body">
              <div class="metrics-overview">
                <div class="metric">
                  <div class="metric-value">$2.4B</div>
                  <div class="metric-label">Total Investment (2024)</div>
                </div>
                <div class="metric">
                  <div class="metric-value">127</div>
                  <div class="metric-label">Active Startups</div>
                </div>
                <div class="metric">
                  <div class="metric-value">23%</div>
                  <div class="metric-label">YoY Growth</div>
                </div>
              </div>
            </div>
          </div>
          <div class="analytics-card card">
            <div class="card__header">
              <h3>Regional Analysis</h3>
            </div>
            <div class="card__body">
              <div class="regional-stats">
                <div class="region-item">
                  <span class="region-name">North America</span>
                  <div class="region-bar">
                    <div class="region-progress" style="width: 42%"></div>
                  </div>
                  <span class="region-value">42%</span>
                </div>
                <div class="region-item">
                  <span class="region-name">Asia Pacific</span>
                  <div class="region-bar">
                    <div class="region-progress" style="width: 28%"></div>
                  </div>
                  <span class="region-value">28%</span>
                </div>
                <div class="region-item">
                  <span class="region-name">Europe</span>
                  <div class="region-bar">
                    <div class="region-progress" style="width: 22%"></div>
                  </div>
                  <span class="region-value">22%</span>
                </div>
                <div class="region-item">
                  <span class="region-name">Others</span>
                  <div class="region-bar">
                    <div class="region-progress" style="width: 8%"></div>
                  </div>
                  <span class="region-value">8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    document.querySelector('.main').appendChild(section);
  }
  
  section.style.display = 'block';
  section.classList.remove('hidden');
  
  // Create analytics charts
  setTimeout(() => {
    createAnalyticsCharts();
  }, 100);
}

function createSettingsSection() {
  let section = document.getElementById('settingsSection');
  if (!section) {
    section = document.createElement('section');
    section.id = 'settingsSection';
    section.className = 'settings-section';
    section.innerHTML = `
      <div class="container">
        <div class="section-header">
          <h2>Dashboard Settings</h2>
          <p>Customize your research dashboard preferences</p>
        </div>
        <div class="settings-grid">
          <div class="settings-card card">
            <div class="card__header">
              <h3>Data Sources</h3>
            </div>
            <div class="card__body">
              <div class="form-group">
                <label class="form-label">Primary Sources</label>
                <div class="checkbox-group">
                  <label><input type="checkbox" checked> Industry Reports</label>
                  <label><input type="checkbox" checked> Academic Papers</label>
                  <label><input type="checkbox"> Government Data</label>
                  <label><input type="checkbox" checked> Company Filings</label>
                </div>
              </div>
            </div>
          </div>
          <div class="settings-card card">
            <div class="card__header">
              <h3>Notifications</h3>
            </div>
            <div class="card__body">
              <div class="form-group">
                <label class="form-label">Alert Types</label>
                <div class="checkbox-group">
                  <label><input type="checkbox" checked> Market Updates</label>
                  <label><input type="checkbox" checked> Research Alerts</label>
                  <label><input type="checkbox"> Competitive Intelligence</label>
                  <label><input type="checkbox" checked> New Reports</label>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Frequency</label>
                <select class="form-control">
                  <option>Daily</option>
                  <option selected>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
            </div>
          </div>
          <div class="settings-card card">
            <div class="card__header">
              <h3>Export Preferences</h3>
            </div>
            <div class="card__body">
              <div class="form-group">
                <label class="form-label">Default Format</label>
                <select class="form-control">
                  <option selected>PDF</option>
                  <option>CSV</option>
                  <option>JSON</option>
                  <option>PowerPoint</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Include Charts</label>
                <div class="checkbox-group">
                  <label><input type="checkbox" checked> Include all visualizations</label>
                </div>
              </div>
            </div>
          </div>
          <div class="settings-card card">
            <div class="card__header">
              <h3>User Profile</h3>
            </div>
            <div class="card__body">
              <div class="form-group">
                <label class="form-label">Display Name</label>
                <input type="text" class="form-control" value="John Doe">
              </div>
              <div class="form-group">
                <label class="form-label">Department</label>
                <input type="text" class="form-control" value="Research & Development">
              </div>
              <button class="btn btn--primary">Save Changes</button>
            </div>
          </div>
        </div>
      </div>`;
    document.querySelector('.main').appendChild(section);
  }
  
  section.style.display = 'block';
  section.classList.remove('hidden');
  
  // Setup settings event listeners
  setupSettingsEventListeners();
}

// Create analytics charts
function createAnalyticsCharts() {
  const growthCtx = document.getElementById('growthChart');
  const adoptionCtx = document.getElementById('adoptionChart');
  
  if (growthCtx) {
    new Chart(growthCtx, {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
        datasets: [{
          label: 'Market Size ($B)',
          data: [0.8, 1.2, 1.8, 2.5, 3.7, 5.2, 7.1],
          backgroundColor: '#1FB8CD',
          borderColor: '#1FB8CD',
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  if (adoptionCtx) {
    new Chart(adoptionCtx, {
      type: 'bar',
      data: {
        labels: ['Financial Services', 'Healthcare', 'Government', 'Technology', 'Retail'],
        datasets: [{
          label: 'Adoption Rate (%)',
          data: [78, 45, 62, 85, 34],
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
}

// Setup settings event listeners
function setupSettingsEventListeners() {
  const saveBtn = document.querySelector('.settings-section .btn--primary');
  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      showNotification('Settings saved successfully', 'success');
    });
  }
}

// Utility functions
function exportResults(format) {
  const query = document.getElementById('queryTitle')?.textContent || 'Research';
  showNotification(`Exporting "${query}" as ${format.toUpperCase()}...`, 'success');
}

function saveSearch() {
  const query = document.getElementById('queryTitle')?.textContent || 'Current search';
  showNotification(`"${query}" saved to research library`, 'success');
}

function downloadReport(reportId) {
  const reportNames = {
    'mpc-2024': 'Multi-Party Computation Market Report 2024',
    'blockchain-security': 'Blockchain Security Landscape',
    'digital-signatures': 'Digital Signatures Industry Analysis',
    'quantum-crypto': 'Quantum Cryptography Outlook'
  };
  
  const reportName = reportNames[reportId] || 'Report';
  showNotification(`Downloading "${reportName}"...`, 'success');
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  
  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#2563eb'
  };
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${colors[type] || colors.info};
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-width: 300px;
    font-size: 14px;
    animation: slideIn 0.3s ease-out;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Cleanup
window.addEventListener('beforeunload', function() {
  if (loadingInterval) clearInterval(loadingInterval);
  if (searchTimeout) clearTimeout(searchTimeout);
});

// Global function exposure
window.performSearch = performSearch;
window.quickSearch = quickSearch;
window.searchCategory = searchCategory;
window.exportResults = exportResults;
window.saveSearch = saveSearch;
window.downloadReport = downloadReport;

console.log('Research Dashboard loaded successfully');