# HealthInsurance Hub

A comprehensive web application for searching insurance branches and medical centers with multi-insurance support per medical center.

## Project Structure

```
.
├── backend/
│   ├── main.py
│   ├── config.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── database/
│   │   ├── __init__.py
│   │   ├── connection.py
│   │   ├── models.py
│   │   └── seed.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── excel_processor.py
│   │   ├── geocoding.py
│   │   └── search.py
│   └── api/
│       ├── __init__.py
│       └── v1/
│           ├── __init__.py
│           ├── admin/
│           │   ├── __init__.py
│           │   ├── upload.py
│           │   └── process.py
│           └── public/
│               ├── __init__.py
│               ├── centers.py
│               ├── insurance.py
│               └── search.py
└── frontend/
    ├── app/
    │   ├── (public)/
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   └── search/
    │   │       └── page.tsx
    │   ├── (admin)/
    │   │   ├── layout.tsx
    │   │   └── upload/
    │   │       └── page.tsx
    │   ├── api/
    │   │   └── route.ts
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   ├── ui/
    │   │   └── button.tsx
    │   ├── search/
    │   │   ├── InsuranceFilter.tsx
    │   │   ├── ServiceFilter.tsx
    │   │   ├── LocationSearch.tsx
    │   │   └── ResultsList.tsx
    │   └── layout/
    │       └── Header.tsx
    ├── lib/
    │   ├── api.ts
    │   └── utils.ts
    ├── styles/
    │   └── globals.css
    ├── .env.example
    ├── package.json
    ├── tsconfig.json
    ├── next.config.js
    └── tailwind.config.js
```

## Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```
   cp .env.example .env
   # Edit .env file with your actual values
   ```

5. Run the application:
   ```
   uvicorn main:app --reload
   ```

## Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   # Edit .env file with your actual values
   ```

4. Run the application:
   ```
   npm run dev
   ```

## Database Seeding

To seed the database with initial data:

```
cd backend
python -m database.seed
```

## API Endpoints

### Public Endpoints
- `GET /api/v1/public/centers` - Get medical centers
- `GET /api/v1/public/insurance` - Get insurance companies
- `GET /api/v1/public/search` - Search medical centers

### Admin Endpoints
- `POST /api/v1/admin/insurance/upload` - Upload insurance Excel file
- `POST /api/v1/admin/process` - Process data

## Features

- Multi-insurance support per medical center
- Location-based search capabilities
- Excel file processing for insurance data
- Responsive UI with mobile and desktop support
- MongoDB integration with geospatial queries
- Admin authentication for data upload