# ProcurementRadar API

API-gestützter Datenservice für öffentliche Ausschreibungen in Deutschland. Unterstützt KMU bei der Auftragsakquise durch automatisierte Datenaufbereitung und Analysen.

## Features

- **Kern-Datensatz**: Tägliche Updates aller relevanten Vergabeverfahren (OCDS-Format)
- **Premium-Analysen**: Preis-Benchmarking, Bieter-/Konkurrenz-Graph, Matching-Score
- **REST API**: Vollständiger API-Zugang für Pro/Enterprise-Kunden
- **E-Mail Alerts**: Automatische Benachrichtigungen bei neuen passenden Ausschreibungen

## Datenquellen

- [Open.NRW Vergabemarktplatz](https://open.nrw/dataset/ausschreibungen_des_vergabemarktplatzes_nrw_1587477165)
- [Bekanntmachungsservice Bund](https://www.bescha.bund.de/DE/ElektronischerEinkauf/Datenservice_Oeffentlicher_Einkauf)
- OCDS (Open Contracting Data Standard) Feeds

Lizenz: Datenlizenz Deutschland – Namensnennung 2.0

## Tech Stack

- **Backend**: Node.js / Express
- **Database**: PostgreSQL
- **Search**: PostgreSQL FTS / Meilisearch
- **ETL**: Node.js Cronjobs
- **Auth**: JWT / API Keys

## Quick Start

```bash
# Install dependencies
npm install

# Setup database
createdb procurement_radar
npm run db:migrate

# Configure environment
cp .env.example .env
# Edit .env with your settings

# Start development server
npm run dev
```

## Project Structure

```
procurement-radar-api/
├── src/
│   ├── api/           # REST API routes
│   ├── config/        # Configuration
│   ├── etl/           # Data pipeline (Extract, Transform, Load)
│   ├── models/        # Database models
│   └── services/      # Business logic
├── database/
│   └── schema.sql     # PostgreSQL schema
├── docs/              # API documentation
└── tests/             # Test files
```

## API Endpoints

### Auth
- `POST /auth/login` - Authenticate user
- `POST /auth/register` - Register new account
- `GET /auth/me` - Get current user

### Tenders (Ausschreibungen)
- `GET /api/tenders` - List tenders with filters
- `GET /api/tenders/:id` - Get tender details

### Awards (Zuschläge)
- `GET /api/awards` - List awards with filters
- `GET /api/awards/:id` - Get award details

### Analytics (Premium)
- `GET /api/analytics/benchmark` - Price benchmarking
- `GET /api/analytics/competitors` - Competitor analysis

## Environment Variables

See `.env.example` for all available configuration options.

## License

Proprietary - All rights reserved

## Attribution

Datenquellen: Open.NRW, Beschaffungsamt des BMI, EU TED
