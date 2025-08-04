from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# Menu Item Models
class MenuItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    price: float
    category: str  # "Coffee", "Smoothies", "Cheesecakes"
    image: str
    featured: bool = False
    available: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class MenuItemCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image: str
    featured: bool = False
    available: bool = True

class MenuItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    image: Optional[str] = None
    featured: Optional[bool] = None
    available: Optional[bool] = None

# Testimonial Models
class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    rating: int = Field(..., ge=1, le=5)
    comment: str
    location: str
    approved: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TestimonialCreate(BaseModel):
    name: str
    rating: int = Field(..., ge=1, le=5)
    comment: str
    location: str

# Contact Models
class ContactInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    inquiry_type: str = "general"  # "general", "catering", "feedback"
    status: str = "new"  # "new", "responded", "resolved"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactInquiryCreate(BaseModel):
    name: str
    email: str
    message: str
    inquiry_type: str = "general"

# Catering Request Models
class CateringRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    event_date: str
    guest_count: int
    event_type: str
    requirements: str
    status: str = "new"  # "new", "quoted", "confirmed", "completed"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class CateringRequestCreate(BaseModel):
    name: str
    email: str
    phone: str
    event_date: str
    guest_count: int
    event_type: str
    requirements: str

# Site Content Models
class SiteContent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    section: str  # "hero", "about", "contact_info"
    content: dict
    active: bool = True
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class SiteContentCreate(BaseModel):
    section: str
    content: dict
    active: bool = True

# Response Models
class MenuItemsResponse(BaseModel):
    items: List[MenuItem]
    total: int

class TestimonialsResponse(BaseModel):
    testimonials: List[Testimonial]
    total: int