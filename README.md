# Cafe Pronto - Modern Cafe Shop Demo

A modern, responsive cafe shop website built with React and FastAPI. This project demonstrates a complete cafe management system with a beautiful frontend and robust backend API.

## 🚀 Features

### Frontend (React)
- **Modern UI/UX** with Tailwind CSS and Shadcn/ui components
- **Responsive Design** that works on all devices
- **Complete Cafe Experience** including:
  - Home page with hero section and featured items
  - Full menu with categories (Coffee, Smoothies, Cheesecakes)
  - About page with company information
  - Contact page with business details
  - Catering services page
- **Self-contained** - works completely without backend using mock data

### Backend (FastAPI)
- **RESTful API** with comprehensive endpoints
- **MongoDB Integration** for data persistence
- **Menu Management** - CRUD operations for menu items
- **Testimonials System** - customer reviews with approval workflow
- **Contact & Catering** - form submission handling
- **Content Management** - dynamic site content updates

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible UI components
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **CRACO** - Create React App Configuration Override

### Backend
- **FastAPI** - Modern, fast web framework
- **MongoDB** - NoSQL database with Motor async driver
- **Pydantic** - Data validation and settings management
- **Uvicorn** - ASGI server
- **Python-dotenv** - Environment variable management

## 📁 Project Structure

```
cafeshopdemo-main/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── mock.js         # Mock data for frontend
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind configuration
├── backend/                 # FastAPI backend application
│   ├── server.py           # Main FastAPI application
│   ├── models.py           # Pydantic models
│   ├── database.py         # Database operations
│   ├── seed_data.py        # Database seeding
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
└── README.md              # This file
```

## 🚀 Quick Start

### Frontend Only (Recommended for Demo)

The frontend works completely independently using mock data:

```bash
cd frontend
npm install --legacy-peer-deps
npm start
```

Visit `http://localhost:3000` to see the cafe shop demo.

### Full Stack (Frontend + Backend)

1. **Backend Setup:**
   ```bash
   cd backend
   pip install -r requirements.txt
   # Set up MongoDB (local or cloud)
   # Update .env file with your MongoDB connection
   python server.py
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   npm start
   ```

3. **Access the Application:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8001/api/`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017
DB_NAME=cafe_pronto_db

# Optional: Set to true to disable hot reload in development
DISABLE_HOT_RELOAD=false
```

### Frontend Configuration

The frontend uses mock data by default. To connect to the backend API, you would need to:
1. Update API endpoints in components
2. Replace mock data calls with actual API calls
3. Configure CORS settings in the backend

## 📱 Pages & Features

### Home Page
- Hero section with call-to-action
- Featured menu items
- Customer testimonials
- Quick navigation to other sections

### Menu Page
- Categorized menu items (Coffee, Smoothies, Cheesecakes)
- Beautiful food photography
- Pricing information
- Filtering by category

### About Page
- Company story and mission
- Key features and benefits
- Team information
- Quality commitments

### Contact Page
- Business hours and location
- Contact information
- Contact form (backend integration ready)
- Map integration ready

### Catering Page
- Catering services overview
- Service packages
- Contact form for catering requests
- Event planning information

## 🎨 Design Features

- **Modern Glass Morphism** effects
- **Responsive Grid Layouts**
- **Smooth Animations** and transitions
- **Professional Typography** with Google Fonts
- **Consistent Color Scheme** throughout
- **Accessible Design** following WCAG guidelines

## 🔌 API Endpoints

The backend provides these endpoints:

- `GET /api/` - Health check
- `GET /api/menu-items` - Get all menu items
- `GET /api/menu-items/featured` - Get featured items
- `POST /api/menu-items` - Create menu item
- `GET /api/testimonials` - Get customer testimonials
- `POST /api/contact` - Submit contact form
- `POST /api/catering-request` - Submit catering request
- `GET /api/content/{section}` - Get site content
- `POST /api/seed` - Seed database with initial data

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

### Backend Deployment
The backend can be deployed to:
- Heroku
- Railway
- DigitalOcean
- AWS/GCP/Azure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Unsplash** for beautiful food photography
- **Shadcn/ui** for excellent UI components
- **Tailwind CSS** for the utility-first CSS framework
- **FastAPI** for the modern Python web framework

---

**Cafe Pronto** - Quality Coffee Served Quickly ☕
