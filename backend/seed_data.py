from database import db_manager
from models import MenuItem, Testimonial, SiteContent
import asyncio
import logging

logger = logging.getLogger(__name__)

# Seed data based on current mock data
MENU_ITEMS = [
    # Coffee Items
    {
        "name": "Signature Espresso",
        "description": "Our house blend with rich, bold flavors",
        "price": 4.50,
        "category": "Coffee",
        "image": "https://images.unsplash.com/photo-1593443320739-77f74939d0da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxsYXR0ZXxlbnwwfHx8fDE3NTQzMzY0NjF8MA&ixlib=rb-4.1.0&q=85",
        "featured": True,
        "available": True
    },
    {
        "name": "Caramel Macchiato",
        "description": "Espresso with steamed milk and caramel drizzle",
        "price": 5.25,
        "category": "Coffee",
        "image": "https://images.unsplash.com/photo-1559001724-fbad036dbc9e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxsYXR0ZXxlbnwwfHx8fDE3NTQzMzY0NjF8MA&ixlib=rb-4.1.0&q=85",
        "featured": True,
        "available": True
    },
    {
        "name": "Vanilla Latte",
        "description": "Smooth espresso with vanilla and steamed milk",
        "price": 4.75,
        "category": "Coffee",
        "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwzfHxsYXR0ZXxlbnwwfHx8fDE3NTQzMzY0NjF8MA&ixlib=rb-4.1.0&q=85",
        "featured": False,
        "available": True
    },
    {
        "name": "Cappuccino",
        "description": "Classic Italian espresso with frothed milk",
        "price": 4.25,
        "category": "Coffee",
        "image": "https://images.unsplash.com/photo-1608070734668-e74dc3dda037?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHw0fHxsYXR0ZXxlbnwwfHx8fDE3NTQzMzY0NjF8MA&ixlib=rb-4.1.0&q=85",
        "featured": False,
        "available": True
    },
    {
        "name": "Americano",
        "description": "Bold espresso shots with hot water",
        "price": 3.75,
        "category": "Coffee",
        "image": "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
        "featured": False,
        "available": True
    },
    {
        "name": "Mocha",
        "description": "Espresso with chocolate and whipped cream",
        "price": 5.00,
        "category": "Coffee",
        "image": "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg",
        "featured": False,
        "available": True
    },
    
    # Smoothie Items
    {
        "name": "Mango Paradise",
        "description": "Fresh mango, pineapple, and coconut milk",
        "price": 6.75,
        "category": "Smoothies",
        "image": "https://images.unsplash.com/photo-1627308594190-a057cd4bfac8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxzbW9vdGhpZSUyMGJvd2x8ZW58MHx8fHwxNzU0MzM2NDY4fDA&ixlib=rb-4.1.0&q=85",
        "featured": True,
        "available": True
    },
    {
        "name": "Berry Blast",
        "description": "Mixed berries, banana, and yogurt",
        "price": 6.50,
        "category": "Smoothies",
        "image": "https://images.unsplash.com/photo-1590301157284-ab2f8707bdc1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxzbW9vdGhpZSUyMGJvd2x8ZW58MHx8fHwxNzU0MzM2NDY4fDA&ixlib=rb-4.1.0&q=85",
        "featured": False,
        "available": True
    },
    {
        "name": "Green Goddess",
        "description": "Spinach, apple, cucumber, and lime",
        "price": 7.00,
        "category": "Smoothies",
        "image": "https://images.unsplash.com/photo-1557568951-a691f75c810f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwzfHxzbW9vdGhpZSUyMGJvd2x8ZW58MHx8fHwxNzU0MzM2NDY4fDA&ixlib=rb-4.1.0&q=85",
        "featured": False,
        "available": True
    },
    {
        "name": "Tropical Fusion",
        "description": "Pineapple, mango, and passion fruit",
        "price": 6.75,
        "category": "Smoothies",
        "image": "https://images.unsplash.com/photo-1621797350487-c8996f886ab1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHxzbW9vdGhpZSUyMGJvd2x8ZW58MHx8fHwxNzU0MzM2NDY4fDA&ixlib=rb-4.1.0&q=85",
        "featured": False,
        "available": True
    },
    {
        "name": "Protein Power",
        "description": "Banana, peanut butter, and protein powder",
        "price": 7.25,
        "category": "Smoothies",
        "image": "https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxzbW9vdGhpZXxlbnwwfHx8fDE3NTQzMzU2ODl8MA&ixlib=rb-4.1.0&q=85",
        "featured": False,
        "available": True
    },
    {
        "name": "Antioxidant Boost",
        "description": "Acai, blueberries, and pomegranate",
        "price": 7.50,
        "category": "Smoothies",
        "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxzbW9vdGhpZXxlbnwwfHx8fDE3NTQzMzU2ODl8MA&ixlib=rb-4.1.0&q=85",
        "featured": False,
        "available": True
    },
    
    # Cheesecake Items
    {
        "name": "Classic NY Cheesecake",
        "description": "Creamy cheesecake with graham cracker crust",
        "price": 5.25,
        "category": "Cheesecakes",
        "image": "https://images.unsplash.com/photo-1716579866950-54abe7d4286f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxjaGVlc2VjYWtlJTIwc2xpY2V8ZW58MHx8fHwxNzU0MzM2NDczfDA&ixlib=rb-4.1.0&q=85",
        "featured": True,
        "available": True
    },
    {
        "name": "Strawberry Swirl",
        "description": "Vanilla cheesecake with fresh strawberry ribbons",
        "price": 5.75,
        "category": "Cheesecakes",
        "image": "https://images.unsplash.com/photo-1716579870046-878e4d3f7c28?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxjaGVlc2VjYWtlJTIwc2xpY2V8ZW58MHx8fHwxNzU0MzM2NDczfDA&ixlib=rb-4.1.0&q=85",
        "featured": False,
        "available": True
    },
    {
        "name": "Chocolate Decadence",
        "description": "Rich chocolate cheesecake with cocoa crust",
        "price": 6.00,
        "category": "Cheesecakes",
        "image": "https://images.unsplash.com/photo-1707528903686-91cbbe2f2985?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxjaGVlc2VjYWtlJTIwc2xpY2V8ZW58MHx8fHwxNzU0MzM2NDczfDA&ixlib=rb-4.1.0&q=85",
        "featured": False,
        "available": True
    },
    {
        "name": "Blueberry Lemon",
        "description": "Tangy lemon cheesecake with blueberry compote",
        "price": 5.75,
        "category": "Cheesecakes",
        "image": "https://images.unsplash.com/photo-1710362778452-07fabf048bb1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHw0fHxjaGVlc2VjYWtlJTIwc2xpY2V8ZW58MHx8fHwxNzU0MzM2NDczfDA&ixlib=rb-4.1.0&q=85",
        "featured": False,
        "available": True
    },
    {
        "name": "Salted Caramel",
        "description": "Creamy cheesecake with salted caramel topping",
        "price": 6.25,
        "category": "Cheesecakes",
        "image": "https://images.pexels.com/photos/9009967/pexels-photo-9009967.jpeg",
        "featured": False,
        "available": True
    },
    {
        "name": "Seasonal Special",
        "description": "Ask about our rotating seasonal flavor",
        "price": 6.50,
        "category": "Cheesecakes",
        "image": "https://images.pexels.com/photos/29653155/pexels-photo-29653155.jpeg",
        "featured": False,
        "available": True
    }
]

TESTIMONIALS = [
    {
        "name": "Sarah Johnson",
        "rating": 5,
        "comment": "The best coffee in town! Quick service without compromising on quality. Their catering service made our office event perfect.",
        "location": "Downtown Regular",
        "approved": True
    },
    {
        "name": "Mike Chen",
        "rating": 5,
        "comment": "Amazing smoothies and the cheesecakes are to die for. The staff is always friendly and the atmosphere is so welcoming.",
        "location": "Coffee Enthusiast",
        "approved": True
    },
    {
        "name": "Emily Davis",
        "rating": 5,
        "comment": "Cafe Pronto has become my daily stop. Consistent quality, fast service, and the perfect place to work or relax.",
        "location": "Daily Customer",
        "approved": True
    }
]

SITE_CONTENT = [
    {
        "section": "contact_info",
        "content": {
            "address": "123 Main Street, Downtown District, City 12345",
            "phone": "(555) 123-CAFE",
            "email": "hello@cafepronto.com",
            "hours": {
                "weekdays": "Monday - Friday: 6:00 AM - 9:00 PM",
                "weekends": "Saturday - Sunday: 7:00 AM - 10:00 PM"
            }
        },
        "active": True
    },
    {
        "section": "about",
        "content": {
            "title": "About Cafe Pronto",
            "description": "At Cafe Pronto, we believe great coffee shouldn't keep you waiting. Since 2018, we've been serving the finest coffee, smoothies, and desserts with lightning-fast service. Our expert baristas ensure every cup meets our high standards while our efficient service gets you back to your day quickly.",
            "features": [
                "Premium coffee beans sourced globally",
                "Expert baristas with years of experience", 
                "Fast service without compromising quality",
                "Full catering services available",
                "Fresh ingredients used daily"
            ]
        },
        "active": True
    }
]

async def seed_database():
    """Seed the database with initial data"""
    try:
        logger.info("Starting database seeding...")
        
        # Clear existing data
        await db_manager.db.menu_items.delete_many({})
        await db_manager.db.testimonials.delete_many({})
        await db_manager.db.site_content.delete_many({})
        
        # Seed menu items
        logger.info("Seeding menu items...")
        for item_data in MENU_ITEMS:
            item = MenuItem(**item_data)
            await db_manager.create_menu_item(item.dict())
        
        # Seed testimonials
        logger.info("Seeding testimonials...")
        for testimonial_data in TESTIMONIALS:
            testimonial = Testimonial(**testimonial_data)
            await db_manager.create_testimonial(testimonial.dict())
        
        # Seed site content
        logger.info("Seeding site content...")
        for content_data in SITE_CONTENT:
            content = SiteContent(**content_data)
            await db_manager.db.site_content.insert_one(content.dict())
        
        logger.info("Database seeding completed successfully!")
        
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
        raise

if __name__ == "__main__":
    asyncio.run(seed_database())