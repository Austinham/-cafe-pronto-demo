from motor.motor_asyncio import AsyncIOMotorClient
import os
from typing import List
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

# Database connection will be set externally
db = None

def set_database(database):
    global db
    db = database

class DatabaseManager:
    def __init__(self, database=None):
        self.db = database if database is not None else db
    
    # Menu Items
    async def create_menu_item(self, item_data: dict) -> dict:
        try:
            result = await self.db.menu_items.insert_one(item_data)
            item_data['_id'] = str(result.inserted_id)
            return item_data
        except Exception as e:
            logger.error(f"Error creating menu item: {e}")
            raise
    
    async def get_menu_items(self, category: str = None, featured_only: bool = False) -> List[dict]:
        try:
            query = {"available": True}
            if category:
                query["category"] = category
            if featured_only:
                query["featured"] = True
            
            cursor = self.db.menu_items.find(query)
            items = await cursor.to_list(length=100)
            
            # Convert ObjectId to string for JSON serialization
            for item in items:
                item['_id'] = str(item['_id'])
            
            return items
        except Exception as e:
            logger.error(f"Error fetching menu items: {e}")
            return []
    
    async def get_menu_item_by_id(self, item_id: str) -> dict:
        try:
            item = await self.db.menu_items.find_one({"id": item_id})
            if item:
                item['_id'] = str(item['_id'])
            return item
        except Exception as e:
            logger.error(f"Error fetching menu item: {e}")
            return None
    
    async def update_menu_item(self, item_id: str, update_data: dict) -> dict:
        try:
            update_data["updated_at"] = datetime.utcnow()
            result = await self.db.menu_items.update_one(
                {"id": item_id}, 
                {"$set": update_data}
            )
            if result.modified_count:
                return await self.get_menu_item_by_id(item_id)
            return None
        except Exception as e:
            logger.error(f"Error updating menu item: {e}")
            return None
    
    async def delete_menu_item(self, item_id: str) -> bool:
        try:
            result = await self.db.menu_items.delete_one({"id": item_id})
            return result.deleted_count > 0
        except Exception as e:
            logger.error(f"Error deleting menu item: {e}")
            return False
    
    # Testimonials
    async def create_testimonial(self, testimonial_data: dict) -> dict:
        try:
            result = await self.db.testimonials.insert_one(testimonial_data)
            testimonial_data['_id'] = str(result.inserted_id)
            return testimonial_data
        except Exception as e:
            logger.error(f"Error creating testimonial: {e}")
            raise
    
    async def get_testimonials(self, approved_only: bool = True) -> List[dict]:
        try:
            query = {}
            if approved_only:
                query["approved"] = True
            
            cursor = self.db.testimonials.find(query).sort("created_at", -1)
            testimonials = await cursor.to_list(length=50)
            
            for testimonial in testimonials:
                testimonial['_id'] = str(testimonial['_id'])
            
            return testimonials
        except Exception as e:
            logger.error(f"Error fetching testimonials: {e}")
            return []
    
    async def approve_testimonial(self, testimonial_id: str) -> bool:
        try:
            result = await self.db.testimonials.update_one(
                {"id": testimonial_id}, 
                {"$set": {"approved": True}}
            )
            return result.modified_count > 0
        except Exception as e:
            logger.error(f"Error approving testimonial: {e}")
            return False
    
    # Contact Inquiries
    async def create_contact_inquiry(self, inquiry_data: dict) -> dict:
        try:
            result = await self.db.contact_inquiries.insert_one(inquiry_data)
            inquiry_data['_id'] = str(result.inserted_id)
            return inquiry_data
        except Exception as e:
            logger.error(f"Error creating contact inquiry: {e}")
            raise
    
    async def get_contact_inquiries(self) -> List[dict]:
        try:
            cursor = self.db.contact_inquiries.find().sort("created_at", -1)
            inquiries = await cursor.to_list(length=100)
            
            for inquiry in inquiries:
                inquiry['_id'] = str(inquiry['_id'])
            
            return inquiries
        except Exception as e:
            logger.error(f"Error fetching contact inquiries: {e}")
            return []
    
    # Catering Requests
    async def create_catering_request(self, request_data: dict) -> dict:
        try:
            result = await self.db.catering_requests.insert_one(request_data)
            request_data['_id'] = str(request_data.inserted_id)
            return request_data
        except Exception as e:
            logger.error(f"Error creating catering request: {e}")
            raise
    
    async def get_catering_requests(self) -> List[dict]:
        try:
            cursor = self.db.catering_requests.find().sort("created_at", -1)
            requests = await cursor.to_list(length=100)
            
            for request in requests:
                request['_id'] = str(request['_id'])
            
            return requests
        except Exception as e:
            logger.error(f"Error fetching catering requests: {e}")
            return []
    
    # Site Content
    async def get_site_content(self, section: str) -> dict:
        try:
            content = await self.db.site_content.find_one({
                "section": section, 
                "active": True
            })
            if content:
                content['_id'] = str(content['_id'])
            return content
        except Exception as e:
            logger.error(f"Error fetching site content: {e}")
            return None
    
    async def update_site_content(self, section: str, content_data: dict) -> dict:
        try:
            content_data["updated_at"] = datetime.utcnow()
            result = await self.db.site_content.update_one(
                {"section": section},
                {"$set": content_data},
                upsert=True
            )
            return await self.get_site_content(section)
        except Exception as e:
            logger.error(f"Error updating site content: {e}")
            return None

# Global database manager instance
db_manager = DatabaseManager()