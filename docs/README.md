# Pantry Pal
### Grocery Expiration Tracking and Food Waste Management Application

**Team:** 5 Idiots | **Group:** Group 2 | **Course:** Introduction to Software Engineering (M3 Final Prototype + Demo)

## 1. Project Overview

Pantry Pal is a grocery expiration tracking and food waste management app that helps users organise their groceries, see what is about to expire, and use food before it is wasted.

Users record grocery items, get expiration reminders, check a calendar of expiry dates, and review their expired-item history. Premium users also get receipt scanning, automatic category detection, custom reminder periods, extended history, and a usage summary.

## 2. Project Objectives

- Help users organise and manage their grocery items.
- Track expiration dates so food is not forgotten.
- Provide timely expiration reminders and notifications.
- Show expiry dates clearly through a pantry list and a calendar view.
- Help users understand their habits through a used-vs-wasted usage summary (Premium).
- Reduce household food waste.

## 3. Clickable Prototype: Screens

The prototype is a clickable web app with four main areas in the bottom navigation:

| Screen | What it does |
|---|---|
| **Login / Sign up** | Email and password login (with show/hide password). Accounts persist when the user logs in again. |
| **Pantry** | List of grocery items. Add, edit, delete and mark items as used. Filter tabs for Active, Expiring and Expired items. |
| **Calendar** | Month view of expiry dates, with a month picker to jump between months. |
| **Notifications** | Upcoming and overdue expiration reminders. |
| **Profile** | Account details, Free/Premium status, Premium upgrade, reminder settings, and the usage summary and history for Premium users. |

Other behaviour in the prototype: undo toast after deleting or marking an item, category icons on items, and a receipt scan flow with a review list before items are saved (Premium).

## 4. Functional Requirements and Where to Find Them (Golden Thread)

| ID | Feature | Description | Prototype screen |
|---|---|---|---|
| FR-1 | Account Management and Premium Upgrade | Manage user accounts and access Premium subscriptions. | Login / Sign up, Profile |
| FR-2 | Grocery Item Management | Add, edit, delete, and mark grocery items as used. | Pantry |
| FR-3 | Automatic Expiration Estimation | Automatically estimate expiration dates for grocery items. | Pantry (Add item) |
| FR-4 | Expiration Reminders | Notify users about upcoming expiration dates. | Notifications |
| FR-5 | Active Grocery Items | Display currently active grocery items. | Pantry (Active tab) |
| FR-6 | Expiring and Expired Items | Display items that are close to or past their expiration date. | Pantry (Expiring / Expired tabs), Calendar |
| FR-7 | Receipt and Item Scanning | Scan receipts and items to add groceries (Premium). | Pantry (Scan receipt), review list |
| FR-8 | Automatic Category Detection | Automatically detect grocery item categories (Premium). | Pantry (Add item / Scan) |
| FR-9 | Custom Reminder Settings | Let Premium users set the reminder period (1 to 30 days). | Profile (Reminder settings) |
| FR-10 | Expired Grocery History | Keep records of expired grocery items. | Profile / Pantry (History) |
| FR-11 | Premium Usage Summary | Daily, weekly and monthly summary of groceries used and wasted (Premium). | Profile (Usage summary) |

## 5. Free and Premium Features

### Free Users
- Add, edit, delete and manage grocery items.
- Expiration reminders with the default 3-day reminder period.
- Expired grocery history for 7 days.

### Premium Users
- Receipt and grocery item scanning with a review list before saving.
- Automatic category detection.
- Custom reminder periods (1 to 30 days).
- Expired grocery history without the 7-day limit while the subscription is active.
- Usage summary (daily, weekly, monthly) of groceries used and wasted.

## 6. Development Methodology

We follow the Agile SDLC with short iterations:

- Requirements gathering and analysis (M1 Team Charter, M2 SRS).
- System design and diagrams.
- Prototype building, review and feedback.
- Testing and continuous improvement.

## 7. Technologies Used

- **Readdy**: AI web-app builder used to design and generate the clickable prototype screens.
- **Local device storage**: prototype data (accounts and pantry items) is stored on the device in this version.
- **Hatchable**: hosting for the live prototype.
- **GitHub**: version control, collaboration, and project documents.
- **Planned (future work)**: Supabase / Readdy Backend for cloud accounts, per-user data, and an AI-vision receipt extraction function.

## 8. How to Access the Prototype

### Option 1: Online
Live prototype: **[add your live prototype link here]**

### Option 2: Run Locally
1. Clone or download this repository.
2. Open the project folder.
3. Open `index.html` in a web browser.
4. Sign up with any email and password, then explore the Pantry, Calendar, Notifications and Profile screens.

## 9. Repository Structure

```text
Pantry-Pal/
│
├── README.md
├── index.html            (prototype entry point)
├── ...                   (other prototype source files)
│
├── docs/
│   ├── team-charter.pdf
│   ├── srs.pdf
│   ├── final-report.pdf
│   ├── ai-use-statement.md
│   │
│   └── design/
│       ├── system-architecture.png
│       ├── use-case-diagram.png
│       ├── sequence-diagram.png
│       └── data-model.png
│
└── slides/
    └── demo-slides.pdf
```

## 10. Use of AI (AI-First Process)

We used AI tools throughout the project: **Claude** for writing and refining requirements, documents and prompts, and **Readdy** to generate and adjust the prototype screens. We reviewed and edited all AI output ourselves. The full details are in [`docs/ai-use-statement.md`](docs/ai-use-statement.md).

## 11. Team Information

**Team Name:** 5 Idiots
**Group:** Group 2

| Member | Student ID |
|---|---|
| Than Htet Linn | 6931503017 |
| Lian Thawn Khai | 6931503009 |
| Thu Ta | 6931503019 |
| Myat Mon Su | 6931503094 |
| Thin Thazin | 6931503018 |

## 12. Project Documentation

- M1: Team Charter
- M2: Software Requirements Specification (SRS)
- System design and diagrams (`docs/design/`)
- Final project report
- AI-Use Statement
- Demo slides

## 13. Project Purpose

Pantry Pal encourages responsible grocery management and helps users reduce avoidable food waste by combining inventory tracking, expiry reminders, a calendar view, and Premium insights.

**Developed by Group 2, 5 Idiots**
