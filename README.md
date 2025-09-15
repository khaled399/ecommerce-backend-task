# E-commerce Backend

## Technical Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: express-validator
- **API**: RESTful endpoints

## Architecture
- **Layered Architecture**: Controllers handle HTTP requests, services contain business logic, and models define data structure
- **Type Safety**: Full TypeScript support for better developer experience and error prevention
- **Environment Configuration**: Uses dotenv for environment variables
- **Error Handling**: Centralized error handling middleware for consistent API responses

## Key Features
- Product management with stock control
- Atomic transactions for inventory management
- Input validation and sanitization
- CORS enabled for frontend integration
- Structured error responses

## Development
1. Install dependencies: `npm install`
2. Set up environment variables in `.env`
3. Run database migrations: `npx prisma migrate dev`
4. Start development server: `npm run dev`

## API Documentation
API documentation is available via the Postman collection in the root directory.
