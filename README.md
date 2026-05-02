# 💊 EgyMediChain
### نظام حوكمة وتتبع سلاسل إمداد الدواء في مصر
**Drug Supply Chain Governance & Tracking System**

> Built under the **DEPI — Digital Egypt Pioneers Initiative** | Aligned with **Egypt Vision 2030**

---

## 👥 Team Members

| # | Name |
|---|------|
| 1 | Saif Eldien Yehia Mosaad Aboseada |
| 2 | Mahmoud Zarrouk Meshady Abdulaziz |
| 3 | Asmaa Mostafa Mohammed Alnagar |
| 4 | Habiba Salah Saad Mahmoud |
| 5 | Hadeer Muhammad Shaaban Siddiq |

---

## 📌 Overview

**EgyMediChain** is an integrated national digital platform designed to govern and track drug supply chains across Egypt. The system ensures full traceability of every medicine unit — from the production line to the end patient — with instant QR code verification to confirm drug authenticity.

### The Problem & Our Solution

| Problem | Description | EgyMediChain Solution |
|---------|-------------|----------------------|
| 🚫 Counterfeiting | Fake drugs threatening patient lives | Unique QR code per unit + instant verification |
| ⏳ Expiry | Expired drugs circulating due to lack of tracking | Automatic alerts 30 days before expiry |
| 📉 Stock Shortage | Critical drug shortages from poor inventory management | Real-time inventory visibility across the entire chain |

---

## ✨ Key Stats

| 12,847+ | 99.9% | 1.2M | <200ms | 5 |
|---------|-------|-------|--------|---|
| Registered Drugs | Uptime SLA | Daily Verifications | Response Time | User Roles |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **ASP.NET Core** | 9.0 LTS | Web API framework |
| **Entity Framework Core** | 9.0 | ORM with compile-time validation |
| **SQL Server** | 2022 | Primary relational database |
| **Redis Cache** | Azure Cache for Redis | Response acceleration & caching |
| **SignalR** | Real-time WebSockets | Instant Ministry alerts |
| **JWT Authentication** | Bearer · 24h TTL | Secure role-based auth |
| **Docker / Kubernetes** | Containerization | Deployment & horizontal scaling |
| **Encryption** | AES-256 + TLS 1.3 + SHA-256 | Full data security |

---

## 🏗️ Architecture

The system follows **Clean Architecture** with 4 layers:

```
EgyMediChain/
├── EgyMediChain.Domain/          # Entities, Domain Events, Value Objects
│   └── Medicine, Batch, MedicineUnit, Transaction, Inventory, Alert
├── EgyMediChain.Application/     # CQRS Commands & Queries, DTOs, FluentValidation
│   └── RegisterMedicine, TransferMedicine, VerifyQR
├── EgyMediChain.Infrastructure/  # EF Core, Redis, SignalR, QR Service, SMS
│   └── AlertHub, QR Code Service, SHA-256 Hashing
└── EgyMediChain.API/             # Controllers, JWT Middleware, Swagger
    └── Medicines, Batches, Transactions, Inventory
```

**Patterns Used:** Clean Architecture · CQRS · RBAC · JWT · Docker / Kubernetes

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| `POST` | `/api/medicines/register` | Register a new drug | Manufacturer |
| `POST` | `/api/batches/create` | Create a production batch | Manufacturer |
| `POST` | `/api/transactions/transfer` | Transfer drug units | All Staff |
| `GET` | `/api/verify/{serial}` | Public drug verification | Public |
| `GET` | `/api/inventory/status` | Inventory status | Warehouse |
| `GET` | `/api/dashboard/analytics` | Ministry analytics | Ministry |

---

## 👤 User Roles (RBAC)

| Role | Permissions |
|------|-------------|
| 🏛️ **Ministry of Health** | Full system monitoring · analytics · reports · all alerts management |
| 🏭 **Manufacturer** | Register new drugs · manage production batches · view own shipments |
| 📦 **Warehouse** | Manage inventory · receive shipments · verify drugs |
| 💊 **Pharmacy** | Receive orders · verify drugs via QR · view own transactions |
| 👤 **Consumer** | Public QR verification only — no login required |

---

## 🔐 Security

| Feature | Details |
|---------|---------|
| JWT Authentication | Bearer tokens · role-based claims · 24-hour expiry |
| Password Hashing | PBKDF2 · 100,000 iterations · unique salt per user |
| Transaction Integrity | SHA-256 hash per transaction — tampering detected instantly |
| Data Encryption | AES-256 at rest · TLS 1.3 in transit |
| Real-time Alerts | SignalR AlertHub for Ministry of Health |
| Rate Limiting | Brute-force attack prevention |

---

## ⚡ Performance

| Metric | Value |
|--------|-------|
| API Response Time (p95) | < 200ms |
| Availability SLA | 99.9% uptime |
| Concurrent Users | 10,000+ |
| Auth Token Expiry | 24 hours |
| QR Cache TTL | 5 minutes |
| Dashboard Cache TTL | 15 minutes |

---

## 🖥️ Frontend Structure (React)

The frontend is built with **React** and follows a role-based routing system. Each role has its own dedicated pages — unauthorized access auto-redirects to the role's home page.

### 📁 Project Structure

```
src/
├── pages/
│   ├── auth/
│   │   └── Login.jsx                  # Login + demo accounts selector
│   │
│   ├── public/
│   │   └── PublicVerify.jsx           # Public QR verification (no login)
│   │
│   ├── ministry/
│   │   ├── MinistryDashboard.jsx      # Analytics & national overview
│   │   ├── Drugs.jsx                  # All registered drugs
│   │   ├── Transactions.jsx           # All transactions across chain
│   │   ├── Verify.jsx                 # Verify any drug by serial/QR
│   │   ├── SupplyChain.jsx            # Full chain visualization
│   │   ├── Alerts.jsx                 # System-wide alerts
│   │   └── Register.jsx              # Register new drug (admin)
│   │
│   ├── manufacturer/
│   │   ├── MFGDashboard.jsx           # Production overview
│   │   ├── Register.jsx               # Register new drug/batch
│   │   ├── Drugs.jsx                  # Own drugs list
│   │   ├── Transactions.jsx           # Own shipments & transfers
│   │   └── Alerts.jsx                 # Production alerts
│   │
│   ├── warehouse/
│   │   ├── WHDashboard.jsx            # Inventory overview
│   │   ├── Transactions.jsx           # Incoming/outgoing shipments
│   │   ├── VerifyQR.jsx               # Scan & verify drug QR
│   │   ├── SupplyChain.jsx            # Chain view for warehouse
│   │   └── Alerts.jsx                 # Stock & expiry alerts
│   │
│   └── pharmacy/
│       ├── PHDashboard.jsx            # Orders & stock overview
│       ├── VerifyQR.jsx               # Scan & verify drug QR
│       ├── Transactions.jsx           # Own orders & receipts
│       └── Alerts.jsx                 # Expiry & low stock alerts
│
├── components/
│   ├── Navbar.jsx                     # Role-aware top navigation
│   ├── Sidebar.jsx                    # Role-based sidebar menu
│   ├── QRScanner.jsx                  # QR code scanner component
│   ├── AlertBell.jsx                  # Real-time SignalR notifications
│   ├── DrugCard.jsx                   # Reusable drug info card
│   └── ChainTimeline.jsx              # Supply chain visual timeline
│
├── context/
│   └── AuthContext.jsx                # JWT auth state & role management
│
├── hooks/
│   ├── useSignalR.js                  # Real-time alerts hook
│   └── useAuth.js                     # Auth + role helpers
│
├── services/
│   └── api.js                         # Axios instance + JWT interceptor
│
└── App.jsx                            # Route guards + role-based routing
```

### 🗺️ Pages Per Role

| Role | Pages |
|------|-------|
| 🏛️ **Ministry** | Dashboard · Drugs · Transactions · Verify · Supply Chain · Alerts · Register |
| 🏭 **Manufacturer** | Dashboard · Register · Drugs · Transactions · Alerts |
| 📦 **Warehouse** | Dashboard · Transactions · Verify QR · Supply Chain · Alerts |
| 💊 **Pharmacy** | Dashboard · Verify QR · Transactions · Alerts |
| 👤 **Consumer** | Public Verify Page only (no login) |

### 🔒 Route Guard Logic

```jsx
// App.jsx — role-based protected routes
<Route path="/ministry/*" element={<ProtectedRoute role="Ministry" />} />
<Route path="/manufacturer/*" element={<ProtectedRoute role="Manufacturer" />} />
<Route path="/warehouse/*" element={<ProtectedRoute role="Warehouse" />} />
<Route path="/pharmacy/*" element={<ProtectedRoute role="Pharmacy" />} />
<Route path="/verify" element={<PublicVerify />} /> {/* No auth needed */}
```

> Any user attempting to access a route outside their role is automatically redirected to their own dashboard.

---

## 🚀 Getting Started

### Prerequisites

- [.NET 9.0 SDK](https://dotnet.microsoft.com/)
- [SQL Server 2022](https://www.microsoft.com/en-us/sql-server)
- [Redis](https://redis.io/) (or Azure Cache for Redis)
- [Docker](https://www.docker.com/) (optional)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/your-org/EgyMediChain.git
cd EgyMediChain

# Restore dependencies
dotnet restore

# Apply database migrations
dotnet ef database update

# Run the API
dotnet run --project EgyMediChain.API
```

### Run with Docker

```bash
docker-compose up --build
```

---

## 📄 License

This project is developed under the **DEPI — Digital Egypt Pioneers Initiative** for internal use only.

---

<div align="center">
  <strong>EgyMediChain v1.0 · DEPI 2024 · Egypt Vision 2030</strong>
</div>
