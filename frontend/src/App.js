import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [esgData, setEsgData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchESGData();
  }, []);

  const fetchESGData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/esg/dashboard');
      const result = await response.json();
      setEsgData(result.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ESG data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading ESG Platform...</div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="title">🌱 ESG Sustainability Platform</h1>
          <p className="subtitle">Enterprise Environmental, Social & Governance Compliance</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="navigation">
        <button 
          className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={`nav-button ${activeTab === 'environmental' ? 'active' : ''}`}
          onClick={() => setActiveTab('environmental')}
        >
          🌍 Environmental
        </button>
        <button 
          className={`nav-button ${activeTab === 'social' ? 'active' : ''}`}
          onClick={() => setActiveTab('social')}
        >
          👥 Social
        </button>
        <button 
          className={`nav-button ${activeTab === 'governance' ? 'active' : ''}`}
          onClick={() => setActiveTab('governance')}
        >
          🏛️ Governance
        </button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'dashboard' && esgData && (
          <div className="dashboard">
            <h2>ESG Score Overview</h2>
            <div className="score-grid">
              <div className="score-card overall">
                <h3>Overall ESG Score</h3>
                <div className="score">{esgData.overall_esg_score}</div>
                <div className="score-label">out of 100</div>
              </div>
              <div className="score-card environmental">
                <h3>Environmental</h3>
                <div className="score">{esgData.environmental_score}</div>
                <div className="metric">{esgData.carbon_intensity}</div>
              </div>
              <div className="score-card social">
                <h3>Social</h3>
                <div className="score">{esgData.social_score}</div>
                <div className="metric">{esgData.diversity_ratio}</div>
              </div>
              <div className="score-card governance">
                <h3>Governance</h3>
                <div className="score">{esgData.governance_score}</div>
                <div className="metric">{esgData.board_independence}</div>
              </div>
            </div>
            <div className="compliance-status">
              <h3>Compliance Status</h3>
              <div className="compliance-badge">
                ✅ {esgData.compliance_status}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'environmental' && (
          <div className="environmental">
            <h2>Environmental Metrics</h2>
            <div className="metrics-grid">
              <div className="metric-card">
                <h3>Carbon Footprint</h3>
                <p>Scope 1: 1,250 tons CO2e</p>
                <p>Scope 2: 3,890 tons CO2e</p>
                <p>Scope 3: 12,340 tons CO2e</p>
              </div>
              <div className="metric-card">
                <h3>Renewable Energy</h3>
                <p>45% of total energy consumption</p>
              </div>
              <div className="metric-card">
                <h3>Waste Management</h3>
                <p>78% diverted from landfill</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="social">
            <h2>Social Impact Metrics</h2>
            <div className="metrics-grid">
              <div className="metric-card">
                <h3>Diversity & Inclusion</h3>
                <p>Gender Diversity: 42% women</p>
                <p>Pay Equity Ratio: 0.98</p>
              </div>
              <div className="metric-card">
                <h3>Employee Satisfaction</h3>
                <p>Average Rating: 4.2/5.0</p>
              </div>
              <div className="metric-card">
                <h3>Community Investment</h3>
                <p>Annual Investment: $2.1M</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'governance' && (
          <div className="governance">
            <h2>Governance Metrics</h2>
            <div className="metrics-grid">
              <div className="metric-card">
                <h3>Board Composition</h3>
                <p>85% Independent Directors</p>
              </div>
              <div className="metric-card">
                <h3>Ethics & Compliance</h3>
                <p>98% Training Completion</p>
              </div>
              <div className="metric-card">
                <h3>Executive Compensation</h3>
                <p>CEO Pay Ratio: 15:1</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Enterprise ESG Compliance Platform | Automates $8M+ in compliance costs</p>
      </footer>
    </div>
  );
}

export default App;