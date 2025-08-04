# Cafe Pronto - Backend API Contracts

## Overview
This document outlines the API contracts, data models, and integration strategy for replacing mock data with real backend functionality.

## Current Mock Data Structure (to be replaced)

### Mock Data Categories:
1. **Hero Content** - Static content for landing page
2. **Categories** - Coffee, Smoothies, Cheesecakes with images and descriptions
3. **Featured Items** - Popular menu items with pricing
4. **Testimonials** - Customer reviews and ratings
5. **About Content** - Company information and values
6. **Contact Information** - Business details and hours

## Backend Models & Collections

### 1. Menu Items Collection (`menu_items`)
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String, // "Coffee", "Smoothies", "Cheesecakes"
  image: String, // URL to image
  featured: Boolean, // For featured items section
  available: Boolean,
  created_at: Date,
  updated_at: Date
}
```

### 2. Testimonials Collection (`testimonials`)
```javascript
{
  _id: ObjectId,
  name: String,
  rating: Number, // 1-5
  comment: String,
  location: String, // Customer description
  approved: Boolean, // For moderation
  created_at: Date
}
```

### 3. Contact Inquiries Collection (`contact_inquiries`)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  message: String,
  inquiry_type: String, // "general", "catering", "feedback"
  status: String, // "new", "responded", "resolved"
  created_at: Date
}
```

### 4. Catering Requests Collection (`catering_requests`)
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  event_date: Date,
  guest_count: Number,
  event_type: String,
  requirements: String,
  status: String, // "new", "quoted", "confirmed", "completed"
  created_at: Date
}
```

### 5. Site Content Collection (`site_content`)
```javascript
{
  _id: ObjectId,
  section: String, // "hero", "about", "contact_info"
  content: Object, // Flexible content structure
  active: Boolean,
  updated_at: Date
}
```

## API Endpoints

### Menu Items
- `GET /api/menu-items` - Get all menu items (with optional category filter)
- `GET /api/menu-items/featured` - Get featured items for homepage
- `POST /api/menu-items` - Create new menu item (admin)
- `PUT /api/menu-items/:id` - Update menu item (admin)
- `DELETE /api/menu-items/:id` - Delete menu item (admin)

### Testimonials
- `GET /api/testimonials` - Get approved testimonials
- `POST /api/testimonials` - Submit new testimonial
- `PUT /api/testimonials/:id/approve` - Approve testimonial (admin)

### Contact & Forms
- `POST /api/contact` - Submit contact form
- `POST /api/catering-request` - Submit catering inquiry
- `GET /api/contact-info` - Get business contact information

### Site Content
- `GET /api/content/:section` - Get content for specific section
- `PUT /api/content/:section` - Update content (admin)

## Frontend Integration Plan

### Files to Update:
1. **Remove mock.js** - Delete the mock data file
2. **Update Home.jsx** - Replace mock data with API calls
3. **Update Menu.jsx** - Fetch menu items from API
4. **Update Contact.jsx** - Connect contact form to API
5. **Update Catering.jsx** - Connect catering form to API
6. **Create API service** - Centralized API calls utility

### API Service Structure:
```javascript
// src/services/api.js
const API_BASE = process.env.REACT_APP_BACKEND_URL + '/api';

export const menuAPI = {
  getAllItems: () => fetch(`${API_BASE}/menu-items`),
  getFeaturedItems: () => fetch(`${API_BASE}/menu-items/featured`),
  getByCategory: (category) => fetch(`${API_BASE}/menu-items?category=${category}`)
};

export const testimonialAPI = {
  getAll: () => fetch(`${API_BASE}/testimonials`),
  submit: (data) => fetch(`${API_BASE}/testimonials`, { method: 'POST', body: JSON.stringify(data) })
};

export const contactAPI = {
  submitContact: (data) => fetch(`${API_BASE}/contact`, { method: 'POST', body: JSON.stringify(data) }),
  submitCatering: (data) => fetch(`${API_BASE}/catering-request`, { method: 'POST', body: JSON.stringify(data) }),
  getContactInfo: () => fetch(`${API_BASE}/contact-info`)
};
```

## Implementation Priority

### Phase 1: Core Backend Setup
1. Create MongoDB models/schemas
2. Implement menu items CRUD operations
3. Seed initial data from mock
4. Create testimonials endpoints
5. Create contact form endpoints

### Phase 2: Frontend Integration
1. Create API service utilities
2. Replace mock data in Home component
3. Replace mock data in Menu component
4. Connect contact forms
5. Add error handling and loading states

### Phase 3: Admin Features (Future)
1. Admin authentication
2. Menu item management
3. Testimonial moderation
4. Contact inquiry management

## Error Handling Strategy
- Graceful fallbacks to cached data
- User-friendly error messages
- Loading states for all API calls
- Retry mechanisms for failed requests

## Data Seeding Strategy
- Use current mock data as seed data
- Create database initialization script
- Ensure all images and content are properly imported
- Maintain data integrity and relationships