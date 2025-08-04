from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
import uvicorn

# Import models and database
from models import (
    MenuItem, MenuItemCreate, MenuItemUpdate, MenuItemsResponse,
    Testimonial, TestimonialCreate, TestimonialsResponse,
    ContactInquiry, ContactInquiryCreate,
    CateringRequest, CateringRequestCreate,
    SiteContent, SiteContentCreate
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Cafe Pronto API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Import database manager and set the database connection
from database import set_database, DatabaseManager
set_database(db)
db_manager = DatabaseManager(db)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "Cafe Pronto API is running"}

# Menu Items Endpoints
@api_router.get("/menu-items", response_model=MenuItemsResponse)
async def get_menu_items(category: Optional[str] = None, featured: bool = False):
    """Get all menu items with optional filtering by category and featured status"""
    try:
        items = await db_manager.get_menu_items(category=category, featured_only=featured)
        return MenuItemsResponse(items=[MenuItem(**item) for item in items], total=len(items))
    except Exception as e:
        logger.error(f"Error fetching menu items: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/menu-items/featured", response_model=MenuItemsResponse)
async def get_featured_menu_items():
    """Get featured menu items for homepage"""
    try:
        items = await db_manager.get_menu_items(featured_only=True)
        return MenuItemsResponse(items=[MenuItem(**item) for item in items], total=len(items))
    except Exception as e:
        logger.error(f"Error fetching featured menu items: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/menu-items", response_model=MenuItem)
async def create_menu_item(item: MenuItemCreate):
    """Create a new menu item"""
    try:
        menu_item = MenuItem(**item.dict())
        created_item = await db_manager.create_menu_item(menu_item.dict())
        return MenuItem(**created_item)
    except Exception as e:
        logger.error(f"Error creating menu item: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/menu-items/{item_id}", response_model=MenuItem)
async def get_menu_item(item_id: str):
    """Get a specific menu item by ID"""
    try:
        item = await db_manager.get_menu_item_by_id(item_id)
        if not item:
            raise HTTPException(status_code=404, detail="Menu item not found")
        return MenuItem(**item)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching menu item: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/menu-items/{item_id}", response_model=MenuItem)
async def update_menu_item(item_id: str, update_data: MenuItemUpdate):
    """Update a menu item"""
    try:
        # Only include non-None values in update
        update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
        updated_item = await db_manager.update_menu_item(item_id, update_dict)
        if not updated_item:
            raise HTTPException(status_code=404, detail="Menu item not found")
        return MenuItem(**updated_item)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating menu item: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.delete("/menu-items/{item_id}")
async def delete_menu_item(item_id: str):
    """Delete a menu item"""
    try:
        deleted = await db_manager.delete_menu_item(item_id)
        if not deleted:
            raise HTTPException(status_code=404, detail="Menu item not found")
        return {"message": "Menu item deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting menu item: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Testimonials Endpoints
@api_router.get("/testimonials", response_model=TestimonialsResponse)
async def get_testimonials():
    """Get all approved testimonials"""
    try:
        testimonials = await db_manager.get_testimonials(approved_only=True)
        return TestimonialsResponse(
            testimonials=[Testimonial(**testimonial) for testimonial in testimonials], 
            total=len(testimonials)
        )
    except Exception as e:
        logger.error(f"Error fetching testimonials: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial: TestimonialCreate):
    """Submit a new testimonial"""
    try:
        new_testimonial = Testimonial(**testimonial.dict())
        created_testimonial = await db_manager.create_testimonial(new_testimonial.dict())
        return Testimonial(**created_testimonial)
    except Exception as e:
        logger.error(f"Error creating testimonial: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/testimonials/{testimonial_id}/approve")
async def approve_testimonial(testimonial_id: str):
    """Approve a testimonial (admin only)"""
    try:
        approved = await db_manager.approve_testimonial(testimonial_id)
        if not approved:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        return {"message": "Testimonial approved successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error approving testimonial: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Contact Endpoints
@api_router.post("/contact", response_model=ContactInquiry)
async def submit_contact_form(inquiry: ContactInquiryCreate):
    """Submit a contact form inquiry"""
    try:
        contact_inquiry = ContactInquiry(**inquiry.dict())
        created_inquiry = await db_manager.create_contact_inquiry(contact_inquiry.dict())
        return ContactInquiry(**created_inquiry)
    except Exception as e:
        logger.error(f"Error creating contact inquiry: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/contact-info")
async def get_contact_info():
    """Get business contact information"""
    try:
        content = await db_manager.get_site_content("contact_info")
        if not content:
            # Return default contact info if not found
            return {
                "address": "123 Main Street, Downtown District, City 12345",
                "phone": "(555) 123-CAFE",
                "email": "hello@cafepronto.com",
                "hours": {
                    "weekdays": "Monday - Friday: 6:00 AM - 9:00 PM",
                    "weekends": "Saturday - Sunday: 7:00 AM - 10:00 PM"
                }
            }
        return content["content"]
    except Exception as e:
        logger.error(f"Error fetching contact info: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Catering Endpoints
@api_router.post("/catering-request", response_model=CateringRequest)
async def submit_catering_request(request: CateringRequestCreate):
    """Submit a catering service request"""
    try:
        catering_request = CateringRequest(**request.dict())
        created_request = await db_manager.create_catering_request(catering_request.dict())
        return CateringRequest(**created_request)
    except Exception as e:
        logger.error(f"Error creating catering request: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Site Content Endpoints
@api_router.get("/content/{section}")
async def get_site_content(section: str):
    """Get content for a specific section"""
    try:
        content = await db_manager.get_site_content(section)
        if not content:
            raise HTTPException(status_code=404, detail="Content section not found")
        return content["content"]
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching site content: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.put("/content/{section}")
async def update_site_content(section: str, content: SiteContentCreate):
    """Update content for a specific section (admin only)"""
    try:
        updated_content = await db_manager.update_site_content(section, content.dict())
        if not updated_content:
            raise HTTPException(status_code=500, detail="Failed to update content")
        return updated_content["content"]
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating site content: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Seed endpoint for initial data loading
@api_router.post("/seed")
async def seed_database():
    """Seed the database with initial data"""
    try:
        from seed_data import seed_database
        await seed_database()
        return {"message": "Database seeded successfully"}
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to seed database: {str(e)}")

# Include the router in the main app
app.include_router(api_router)

# Shutdown event
@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8001, reload=True)
