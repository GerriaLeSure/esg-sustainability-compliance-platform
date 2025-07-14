const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Sample ESG Data
const esgData = {
  dashboard: {
    overall_esg_score: 82.5,
    environmental_score: 78.2,
    social_score: 84.1,
    governance_score: 85.3,
    carbon_intensity: "2.3 tons CO2e per $M revenue",
    diversity_ratio: "42% women in leadership",
    board_independence: "85% independent directors",
    compliance_status: "100% across 12 frameworks"
  },
  environmental: {
    scope_1_emissions: "1,250 tons CO2e",
    scope_2_emissions: "3,890 tons CO2e", 
    scope_3_emissions: "12,340 tons CO2e",
    renewable_energy: "45% of total energy",
    waste_diversion: "78% diverted from landfill"
  },
  social: {
    gender_diversity: "42% women employees",
    pay_equity_ratio: 0.98,
    employee_satisfaction: "4.2/5.0",
    community_investment: "$2.1M annually"
  },
  governance: {
    board_independence: "85% independent directors",
    ethics_training: "98% completion rate",
    executive_compensation_ratio: "15:1"
  }
};

// ESG API Routes
app.get('/api/esg/dashboard', (req, res) => {
  res.json({
    success: true,
    data: esgData.dashboard,
    message: "ESG dashboard data retrieved successfully"
  });
});

app.get('/api/esg/environmental', (req, res) => {
  res.json({
    success: true,
    data: esgData.environmental,
    message: "Environmental metrics retrieved successfully"
  });
});

app.get('/api/esg/social', (req, res) => {
  res.json({
    success: true,
    data: esgData.social,
    message: "Social impact metrics retrieved successfully"
  });
});

app.get('/api/esg/governance', (req, res) => {
  res.json({
    success: true,
    data: esgData.governance,
    message: "Governance metrics retrieved successfully"
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'ESG Sustainability API is operational',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'ESG Sustainability Compliance Platform API',
    version: '1.0.0',
    endpoints: [
      'GET /api/esg/dashboard',
      'GET /api/esg/environmental',
      'GET /api/esg/social',
      'GET /api/esg/governance',
      'GET /health'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌱 ESG Sustainability API Server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/api/esg/dashboard`);
  console.log(`🌍 Environmental: http://localhost:${PORT}/api/esg/environmental`);
  console.log(`👥 Social: http://localhost:${PORT}/api/esg/social`);
  console.log(`🏛️ Governance: http://localhost:${PORT}/api/esg/governance`);
});