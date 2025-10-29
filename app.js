// Portfolio Management Application
class PortfolioApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.sortColumn = 'market_value';
        this.sortDirection = 'desc';
        this.theme = 'auto';
        this.charts = {};
        
        // Sample data - stored in memory (no localStorage access in sandbox)
        this.portfolioData = {
            total_value: 125750.50,
            today_change: 2150.75,
            today_change_percent: 1.74,
            total_return: 18250.30,
            total_return_percent: 16.98
        };
        
        this.holdings = [
            {
                symbol: "AAPL",
                name: "Apple Inc.",
                shares: 50,
                current_price: 175.25,
                market_value: 8762.50,
                day_change: 2.15,
                day_change_percent: 1.24,
                total_return: 1250.30,
                total_return_percent: 16.65,
                asset_type: "Stock",
                sector: "Technology"
            },
            {
                symbol: "GOOGL",
                name: "Alphabet Inc.",
                shares: 25,
                current_price: 142.50,
                market_value: 3562.50,
                day_change: -1.25,
                day_change_percent: -0.87,
                total_return: 450.25,
                total_return_percent: 14.46,
                asset_type: "Stock",
                sector: "Technology"
            },
            {
                symbol: "MSFT",
                name: "Microsoft Corporation",
                shares: 30,
                current_price: 385.75,
                market_value: 11572.50,
                day_change: 4.25,
                day_change_percent: 1.11,
                total_return: 1850.75,
                total_return_percent: 19.05,
                asset_type: "Stock",
                sector: "Technology"
            },
            {
                symbol: "TSLA",
                name: "Tesla Inc.",
                shares: 15,
                current_price: 245.80,
                market_value: 3687.00,
                day_change: -3.20,
                day_change_percent: -1.29,
                total_return: -250.50,
                total_return_percent: -6.36,
                asset_type: "Stock",
                sector: "Consumer Discretionary"
            },
            {
                symbol: "AMZN",
                name: "Amazon.com Inc.",
                shares: 40,
                current_price: 145.25,
                market_value: 5810.00,
                day_change: 1.85,
                day_change_percent: 1.29,
                total_return: 750.80,
                total_return_percent: 14.84,
                asset_type: "Stock",
                sector: "Consumer Discretionary"
            },
            {
                symbol: "SPY",
                name: "SPDR S&P 500 ETF",
                shares: 100,
                current_price: 425.75,
                market_value: 42575.00,
                day_change: 2.50,
                day_change_percent: 0.59,
                total_return: 3250.75,
                total_return_percent: 8.26,
                asset_type: "ETF",
                sector: "Diversified"
            },
            {
                symbol: "BND",
                name: "Vanguard Total Bond Market ETF",
                shares: 200,
                current_price: 78.25,
                market_value: 15650.00,
                day_change: -0.15,
                day_change_percent: -0.19,
                total_return: -450.25,
                total_return_percent: -2.80,
                asset_type: "Bond ETF",
                sector: "Fixed Income"
            },
            {
                symbol: "BTC",
                name: "Bitcoin",
                shares: 0.5,
                current_price: 65200.00,
                market_value: 32600.00,
                day_change: 850.00,
                day_change_percent: 1.32,
                total_return: 8250.00,
                total_return_percent: 33.87,
                asset_type: "Cryptocurrency",
                sector: "Digital Assets"
            }
        ];
        
        this.watchlist = [
            {
                symbol: "NVDA",
                name: "NVIDIA Corporation",
                price: 875.25,
                change: 12.50,
                change_percent: 1.45
            },
            {
                symbol: "META",
                name: "Meta Platforms Inc.",
                price: 325.80,
                change: -5.25,
                change_percent: -1.59
            },
            {
                symbol: "NFLX",
                name: "Netflix Inc.",
                price: 485.60,
                change: 8.75,
                change_percent: 1.84
            }
        ];
        
        this.performanceData = [
            { date: "2024-01-01", value: 107500.00 },
            { date: "2024-02-01", value: 110250.00 },
            { date: "2024-03-01", value: 108750.00 },
            { date: "2024-04-01", value: 115500.00 },
            { date: "2024-05-01", value: 118250.00 },
            { date: "2024-06-01", value: 122000.00 },
            { date: "2024-07-01", value: 120500.00 },
            { date: "2024-08-01", value: 123750.00 },
            { date: "2024-09-01", value: 125750.50 }
        ];
        
        this.recentTransactions = [
            {
                date: "2024-09-15",
                type: "Buy",
                symbol: "AAPL",
                shares: 10,
                price: 175.00,
                total: 1750.00
            },
            {
                date: "2024-09-10",
                type: "Dividend",
                symbol: "MSFT",
                amount: 125.50
            },
            {
                date: "2024-09-05",
                type: "Sell",
                symbol: "TSLA",
                shares: 5,
                price: 250.00,
                total: 1250.00
            }
        ];
        
        this.newsItems = [
            {
                title: "Tech Stocks Rally on AI Optimism",
                source: "Financial Times",
                time: "2 hours ago",
                symbol: "NVDA"
            },
            {
                title: "Federal Reserve Signals Rate Cuts Ahead",
                source: "Reuters",
                time: "4 hours ago",
                symbol: "SPY"
            },
            {
                title: "Apple Announces New Product Launch",
                source: "CNBC",
                time: "6 hours ago",
                symbol: "AAPL"
            }
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadDashboard();
        this.setupCharts();
        this.startRealTimeUpdates();
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.dataset.section;
                this.switchSection(section);
            });
        });
        
        // Theme toggle
        document.querySelector('.theme-toggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Mobile menu
        document.querySelector('.menu-toggle')?.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('show');
        });
        
        // Modal controls
        this.setupModalControls();
        
        // Holdings controls
        this.setupHoldingsControls();
        
        // Chart controls
        this.setupChartControls();
        
        // Form submissions
        this.setupFormSubmissions();
    }
    
    setupModalControls() {
        // Close modal buttons
        document.querySelectorAll('.modal-close, [data-modal-close]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal();
            });
        });
        
        // Modal background click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        });
        
        // Add holding button
        document.getElementById('addHoldingBtn')?.addEventListener('click', () => {
            this.showModal('addHoldingModal');
        });
        
        // Add watchlist button
        document.getElementById('addWatchlistBtn')?.addEventListener('click', () => {
            this.showModal('addWatchlistModal');
        });
        
        // Export button
        document.getElementById('exportBtn')?.addEventListener('click', () => {
            this.exportToCSV();
        });
    }
    
    setupHoldingsControls() {
        // Search
        document.getElementById('holdingsSearch')?.addEventListener('input', (e) => {
            this.filterHoldings();
        });
        
        // Filter by asset type
        document.getElementById('assetTypeFilter')?.addEventListener('change', () => {
            this.filterHoldings();
        });
        
        // Sortable columns
        document.querySelectorAll('.sortable').forEach(header => {
            header.addEventListener('click', () => {
                const column = header.dataset.sort;
                this.sortHoldings(column);
            });
        });
    }
    
    setupChartControls() {
        document.querySelectorAll('.chart-period').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.chart-period').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.updatePerformanceChart(e.target.dataset.period);
            });
        });
    }
    
    setupFormSubmissions() {
        // Add holding form
        document.getElementById('addHoldingForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addHolding(new FormData(e.target));
        });
        
        // Add watchlist form
        document.getElementById('addWatchlistForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addToWatchlist(new FormData(e.target));
        });
    }
    
    switchSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
        
        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');
        
        // Update page title
        const titles = {
            'dashboard': 'Dashboard',
            'holdings': 'Holdings',
            'analytics': 'Analytics',
            'watchlist': 'Watchlist',
            'settings': 'Settings'
        };
        document.querySelector('.page-title').textContent = titles[sectionName];
        
        this.currentSection = sectionName;
        
        // Load section-specific content
        switch(sectionName) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'holdings':
                this.loadHoldings();
                break;
            case 'analytics':
                this.loadAnalytics();
                break;
            case 'watchlist':
                this.loadWatchlist();
                break;
            case 'settings':
                this.loadSettings();
                break;
        }
    }
    
    loadDashboard() {
        this.updatePortfolioSummary();
        this.renderTopHoldings();
        this.renderRecentTransactions();
        
        // Initialize charts if not already done
        setTimeout(() => {
            this.createAllocationChart();
            this.createPerformanceChart();
        }, 100);
    }
    
    updatePortfolioSummary() {
        // Update summary cards with current data
        const summaryCards = document.querySelectorAll('.summary-card');
        const data = [
            {
                value: this.formatCurrency(this.portfolioData.total_value),
                change: `+${this.formatCurrency(this.portfolioData.today_change)} (${this.portfolioData.today_change_percent}%)`,
                changeClass: this.portfolioData.today_change >= 0 ? 'positive' : 'negative'
            },
            {
                value: this.formatCurrency(this.portfolioData.total_return),
                change: `+${this.portfolioData.total_return_percent}%`,
                changeClass: this.portfolioData.total_return >= 0 ? 'positive' : 'negative'
            },
            {
                value: `+${this.formatCurrency(this.portfolioData.today_change)}`,
                change: `+${this.portfolioData.today_change_percent}%`,
                changeClass: this.portfolioData.today_change >= 0 ? 'positive' : 'negative'
            },
            {
                value: '$1,531.00',
                change: 'Available for investment',
                changeClass: 'neutral'
            }
        ];
        
        summaryCards.forEach((card, index) => {
            if (data[index]) {
                const valueEl = card.querySelector('.metric-value');
                const changeEl = card.querySelector('.metric-change');
                
                if (valueEl) valueEl.textContent = data[index].value;
                if (changeEl) {
                    changeEl.textContent = data[index].change;
                    changeEl.className = `metric-change ${data[index].changeClass}`;
                }
            }
        });
    }
    
    renderTopHoldings() {
        const container = document.getElementById('topHoldings');
        if (!container) return;
        
        const topHoldings = [...this.holdings]
            .sort((a, b) => b.market_value - a.market_value)
            .slice(0, 5);
        
        container.innerHTML = topHoldings.map(holding => `
            <div class="holding-item">
                <div class="holding-info">
                    <div class="holding-symbol">${holding.symbol}</div>
                    <div class="holding-name">${holding.name}</div>
                </div>
                <div class="holding-value">
                    <div class="holding-amount">${this.formatCurrency(holding.market_value)}</div>
                    <div class="holding-change ${holding.day_change >= 0 ? 'positive' : 'negative'}">
                        ${holding.day_change >= 0 ? '+' : ''}${holding.day_change_percent.toFixed(2)}%
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    renderRecentTransactions() {
        const container = document.getElementById('recentTransactions');
        if (!container) return;
        
        container.innerHTML = this.recentTransactions.map(transaction => `
            <div class="transaction-item">
                <div class="transaction-info">
                    <div class="transaction-type ${transaction.type.toLowerCase()}">
                        ${transaction.type} ${transaction.symbol || ''}
                    </div>
                    <div class="transaction-details">
                        ${transaction.date}
                        ${transaction.shares ? ` • ${transaction.shares} shares` : ''}
                        ${transaction.price ? ` • $${transaction.price}` : ''}
                    </div>
                </div>
                <div class="transaction-amount">
                    ${transaction.total ? this.formatCurrency(transaction.total) : this.formatCurrency(transaction.amount)}
                </div>
            </div>
        `).join('');
    }
    
    loadHoldings() {
        this.renderHoldingsTable();
    }
    
    renderHoldingsTable() {
        const tbody = document.getElementById('holdingsTableBody');
        if (!tbody) return;
        
        const filteredHoldings = this.getFilteredHoldings();
        const sortedHoldings = this.getSortedHoldings(filteredHoldings);
        
        tbody.innerHTML = sortedHoldings.map(holding => {
            const percentage = (holding.market_value / this.portfolioData.total_value * 100).toFixed(2);
            
            return `
                <tr>
                    <td><span class="symbol">${holding.symbol}</span></td>
                    <td>${holding.name}</td>
                    <td>${holding.shares}</td>
                    <td>${this.formatCurrency(holding.current_price)}</td>
                    <td>${this.formatCurrency(holding.market_value)}</td>
                    <td class="${holding.day_change >= 0 ? 'positive' : 'negative'}">
                        ${holding.day_change >= 0 ? '+' : ''}${this.formatCurrency(holding.day_change)}<br>
                        <small>(${holding.day_change_percent >= 0 ? '+' : ''}${holding.day_change_percent.toFixed(2)}%)</small>
                    </td>
                    <td class="${holding.total_return >= 0 ? 'positive' : 'negative'}">
                        ${holding.total_return >= 0 ? '+' : ''}${this.formatCurrency(holding.total_return)}<br>
                        <small>(${holding.total_return_percent >= 0 ? '+' : ''}${holding.total_return_percent.toFixed(2)}%)</small>
                    </td>
                    <td>${percentage}%</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon" onclick="app.editHolding('${holding.symbol}')" title="Edit">✏️</button>
                            <button class="btn-icon" onclick="app.deleteHolding('${holding.symbol}')" title="Delete">🗑️</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }
    
    getFilteredHoldings() {
        const searchTerm = document.getElementById('holdingsSearch')?.value.toLowerCase() || '';
        const assetTypeFilter = document.getElementById('assetTypeFilter')?.value || 'all';
        
        return this.holdings.filter(holding => {
            const matchesSearch = !searchTerm || 
                holding.symbol.toLowerCase().includes(searchTerm) ||
                holding.name.toLowerCase().includes(searchTerm);
            
            const matchesType = assetTypeFilter === 'all' || holding.asset_type === assetTypeFilter;
            
            return matchesSearch && matchesType;
        });
    }
    
    getSortedHoldings(holdings) {
        return [...holdings].sort((a, b) => {
            const aVal = a[this.sortColumn];
            const bVal = b[this.sortColumn];
            
            if (typeof aVal === 'string') {
                return this.sortDirection === 'asc' 
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }
            
            return this.sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        });
    }
    
    sortHoldings(column) {
        if (this.sortColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = column;
            this.sortDirection = 'desc';
        }
        
        // Update sort indicators
        document.querySelectorAll('.sortable').forEach(header => {
            header.classList.remove('sort-asc', 'sort-desc');
        });
        document.querySelector(`[data-sort="${column}"]`).classList.add(`sort-${this.sortDirection}`);
        
        this.renderHoldingsTable();
    }
    
    filterHoldings() {
        this.renderHoldingsTable();
    }
    
    loadAnalytics() {
        setTimeout(() => {
            this.createSectorChart();
        }, 100);
    }
    
    loadWatchlist() {
        this.renderWatchlist();
        this.renderNews();
    }
    
    renderWatchlist() {
        const container = document.getElementById('watchlistGrid');
        if (!container) return;
        
        container.innerHTML = this.watchlist.map(item => `
            <div class="watchlist-item">
                <div class="watchlist-item-header">
                    <div class="watchlist-symbol">${item.symbol}</div>
                    <button class="btn-icon" onclick="app.removeFromWatchlist('${item.symbol}')" title="Remove">✕</button>
                </div>
                <div class="watchlist-name">${item.name}</div>
                <div class="watchlist-price">${this.formatCurrency(item.price)}</div>
                <div class="metric-change ${item.change >= 0 ? 'positive' : 'negative'}">
                    ${item.change >= 0 ? '+' : ''}${this.formatCurrency(item.change)} 
                    (${item.change_percent >= 0 ? '+' : ''}${item.change_percent.toFixed(2)}%)
                </div>
            </div>
        `).join('');
    }
    
    renderNews() {
        const container = document.getElementById('newsList');
        if (!container) return;
        
        container.innerHTML = this.newsItems.map(news => `
            <div class="news-item">
                <div class="news-title">${news.title}</div>
                <div class="news-meta">
                    <span>${news.source}</span>
                    <span>${news.time}</span>
                    <span>${news.symbol}</span>
                </div>
            </div>
        `).join('');
    }
    
    loadSettings() {
        // Settings are mostly static forms - could add dynamic loading here
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.value = this.theme;
            themeSelect.addEventListener('change', (e) => {
                this.setTheme(e.target.value);
            });
        }
    }
    
    setupCharts() {
        // Charts will be created when their respective sections are loaded
    }
    
    createAllocationChart() {
        const ctx = document.getElementById('allocationChart');
        if (!ctx || this.charts.allocation) return;
        
        const assetAllocation = this.calculateAssetAllocation();
        
        this.charts.allocation = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: assetAllocation.map(item => item.category),
                datasets: [{
                    data: assetAllocation.map(item => item.percentage),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
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
                    }
                },
                cutout: '60%'
            }
        });
    }
    
    createPerformanceChart() {
        const ctx = document.getElementById('performanceChart');
        if (!ctx || this.charts.performance) return;
        
        this.charts.performance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.performanceData.map(item => {
                    const date = new Date(item.date);
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }),
                datasets: [{
                    label: 'Portfolio Value',
                    data: this.performanceData.map(item => item.value),
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return '$' + (value / 1000).toFixed(0) + 'k';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                elements: {
                    point: {
                        backgroundColor: '#1FB8CD'
                    }
                }
            }
        });
    }
    
    createSectorChart() {
        const ctx = document.getElementById('sectorChart');
        if (!ctx || this.charts.sector) return;
        
        const sectorAllocation = this.calculateSectorAllocation();
        
        this.charts.sector = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sectorAllocation.map(item => item.sector),
                datasets: [{
                    label: 'Allocation (%)',
                    data: sectorAllocation.map(item => item.percentage),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C'],
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45
                        }
                    }
                }
            }
        });
    }
    
    updatePerformanceChart(period) {
        // In a real app, this would fetch different data based on the period
        // For demo purposes, we'll just update the existing chart
        if (this.charts.performance) {
            this.charts.performance.update();
        }
    }
    
    calculateAssetAllocation() {
        const allocation = {};
        const total = this.portfolioData.total_value;
        
        this.holdings.forEach(holding => {
            const category = this.getAssetCategory(holding.asset_type);
            if (!allocation[category]) {
                allocation[category] = 0;
            }
            allocation[category] += holding.market_value;
        });
        
        return Object.entries(allocation).map(([category, value]) => ({
            category,
            value,
            percentage: (value / total * 100).toFixed(2)
        }));
    }
    
    calculateSectorAllocation() {
        const allocation = {};
        const total = this.portfolioData.total_value;
        
        this.holdings.forEach(holding => {
            const sector = holding.sector;
            if (!allocation[sector]) {
                allocation[sector] = 0;
            }
            allocation[sector] += holding.market_value;
        });
        
        return Object.entries(allocation)
            .map(([sector, value]) => ({
                sector,
                value,
                percentage: (value / total * 100).toFixed(2)
            }))
            .sort((a, b) => b.percentage - a.percentage);
    }
    
    getAssetCategory(assetType) {
        const categoryMap = {
            'Stock': 'Stocks',
            'ETF': 'ETFs',
            'Bond ETF': 'ETFs',
            'Cryptocurrency': 'Cryptocurrency'
        };
        return categoryMap[assetType] || 'Other';
    }
    
    addHolding(formData) {
        const symbol = formData.get('symbol').toUpperCase();
        const name = formData.get('name');
        const shares = parseFloat(formData.get('shares'));
        const purchasePrice = parseFloat(formData.get('purchase_price'));
        const assetType = formData.get('asset_type');
        const sector = formData.get('sector');
        
        // Simulate current price (in real app, would fetch from API)
        const currentPrice = purchasePrice * (0.9 + Math.random() * 0.4); // -10% to +30%
        const marketValue = shares * currentPrice;
        const totalReturn = marketValue - (shares * purchasePrice);
        const totalReturnPercent = (totalReturn / (shares * purchasePrice)) * 100;
        
        const newHolding = {
            symbol,
            name,
            shares,
            current_price: currentPrice,
            market_value: marketValue,
            day_change: currentPrice * (Math.random() * 0.04 - 0.02), // -2% to +2%
            day_change_percent: (Math.random() * 4 - 2),
            total_return: totalReturn,
            total_return_percent: totalReturnPercent,
            asset_type: assetType,
            sector
        };
        
        this.holdings.push(newHolding);
        this.updatePortfolioTotals();
        this.renderHoldingsTable();
        this.closeModal();
        
        // Show success message
        this.showNotification(`${symbol} added successfully!`, 'success');
    }
    
    addToWatchlist(formData) {
        const symbol = formData.get('symbol').toUpperCase();
        const name = formData.get('name');
        
        // Check if already in watchlist
        if (this.watchlist.find(item => item.symbol === symbol)) {
            this.showNotification('Symbol already in watchlist!', 'warning');
            return;
        }
        
        // Simulate price data
        const price = Math.random() * 500 + 50;
        const change = (Math.random() * 20 - 10);
        const changePercent = (Math.random() * 4 - 2);
        
        const newWatchlistItem = {
            symbol,
            name,
            price,
            change,
            change_percent: changePercent
        };
        
        this.watchlist.push(newWatchlistItem);
        this.renderWatchlist();
        this.closeModal();
        
        this.showNotification(`${symbol} added to watchlist!`, 'success');
    }
    
    editHolding(symbol) {
        // In a real app, would populate modal with existing data
        this.showNotification('Edit functionality coming soon!', 'info');
    }
    
    deleteHolding(symbol) {
        if (confirm(`Are you sure you want to delete ${symbol}?`)) {
            this.holdings = this.holdings.filter(h => h.symbol !== symbol);
            this.updatePortfolioTotals();
            this.renderHoldingsTable();
            this.showNotification(`${symbol} removed successfully!`, 'success');
        }
    }
    
    removeFromWatchlist(symbol) {
        this.watchlist = this.watchlist.filter(item => item.symbol !== symbol);
        this.renderWatchlist();
        this.showNotification(`${symbol} removed from watchlist!`, 'success');
    }
    
    updatePortfolioTotals() {
        const newTotal = this.holdings.reduce((sum, holding) => sum + holding.market_value, 0);
        const oldTotal = this.portfolioData.total_value;
        const change = newTotal - oldTotal;
        
        this.portfolioData.total_value = newTotal;
        this.portfolioData.today_change += change;
        this.portfolioData.today_change_percent = (this.portfolioData.today_change / (newTotal - this.portfolioData.today_change)) * 100;
        
        // Recalculate total return
        this.portfolioData.total_return = this.holdings.reduce((sum, holding) => sum + holding.total_return, 0);
        this.portfolioData.total_return_percent = (this.portfolioData.total_return / (newTotal - this.portfolioData.total_return)) * 100;
        
        this.updatePortfolioSummary();
    }
    
    exportToCSV() {
        const headers = ['Symbol', 'Name', 'Shares', 'Current Price', 'Market Value', 'Day Change', 'Total Return', '% of Portfolio'];
        const rows = this.holdings.map(holding => [
            holding.symbol,
            holding.name,
            holding.shares,
            holding.current_price.toFixed(2),
            holding.market_value.toFixed(2),
            `${holding.day_change.toFixed(2)} (${holding.day_change_percent.toFixed(2)}%)`,
            `${holding.total_return.toFixed(2)} (${holding.total_return_percent.toFixed(2)}%)`,
            ((holding.market_value / this.portfolioData.total_value) * 100).toFixed(2) + '%'
        ]);
        
        const csvContent = [headers, ...rows]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'portfolio_holdings.csv';
        link.click();
        
        this.showNotification('Portfolio exported successfully!', 'success');
    }
    
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            // Focus first input
            const firstInput = modal.querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }
    
    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
        
        // Reset forms
        document.querySelectorAll('.modal form').forEach(form => {
            form.reset();
        });
    }
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
    
    setTheme(theme) {
        this.theme = theme;
        
        if (theme === 'auto') {
            document.documentElement.removeAttribute('data-color-scheme');
        } else {
            document.documentElement.setAttribute('data-color-scheme', theme);
        }
        
        // Update theme toggle icon
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
    
    startRealTimeUpdates() {
        // Simulate real-time price updates every 30 seconds
        setInterval(() => {
            this.updatePrices();
        }, 30000);
        
        // Update charts every 5 minutes
        setInterval(() => {
            this.updateCharts();
        }, 300000);
    }
    
    updatePrices() {
        // Simulate price changes
        this.holdings.forEach(holding => {
            const changePercent = (Math.random() * 0.04 - 0.02); // -2% to +2%
            const oldPrice = holding.current_price;
            
            holding.current_price = oldPrice * (1 + changePercent);
            holding.market_value = holding.shares * holding.current_price;
            holding.day_change = holding.current_price - oldPrice;
            holding.day_change_percent = changePercent * 100;
            
            // Update total return
            const purchaseValue = holding.market_value - holding.total_return;
            holding.total_return = holding.market_value - purchaseValue;
            holding.total_return_percent = (holding.total_return / purchaseValue) * 100;
        });
        
        // Update watchlist
        this.watchlist.forEach(item => {
            const changePercent = (Math.random() * 0.04 - 0.02);
            item.price *= (1 + changePercent);
            item.change = item.price * changePercent;
            item.change_percent = changePercent * 100;
        });
        
        // Update UI if on relevant sections
        if (this.currentSection === 'dashboard') {
            this.updatePortfolioTotals();
            this.renderTopHoldings();
        } else if (this.currentSection === 'holdings') {
            this.renderHoldingsTable();
        } else if (this.currentSection === 'watchlist') {
            this.renderWatchlist();
        }
    }
    
    updateCharts() {
        if (this.charts.allocation) {
            const assetAllocation = this.calculateAssetAllocation();
            this.charts.allocation.data.datasets[0].data = assetAllocation.map(item => item.percentage);
            this.charts.allocation.update();
        }
        
        if (this.charts.sector) {
            const sectorAllocation = this.calculateSectorAllocation();
            this.charts.sector.data.datasets[0].data = sectorAllocation.map(item => item.percentage);
            this.charts.sector.update();
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 16px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '10000',
            transition: 'all 0.3s ease',
            opacity: '0',
            transform: 'translateX(100%)'
        });
        
        // Set background color based on type
        const colors = {
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }
    
    formatNumber(number, decimals = 2) {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(number);
    }
}

// Initialize the application
const app = new PortfolioApp();

// Make app available globally for inline event handlers
window.app = app;