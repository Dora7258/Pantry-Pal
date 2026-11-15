
# Pantry Pal — Project Charter

## Project Information

**Project Name:** Pantry Pal

**Team Name:** 5 idiots

### Team Members

| No. | Member Name | Student ID |
|---|---|---|
| 1 | Than Htet Linn | 6931503017 |
| 2 | Lian Thawn Khai | 6931503009 |
| 3 | Thu Ta | 6931503019 |
| 4 | Myat Mon Su | 6931503094 |
| 5 | Thin Thazin | 6931503018 |

---

## Problem

People who regularly buy and store groceries at home often forget about items that are approaching their expiration dates. As a result, food may expire before it is used, causing unnecessary food waste and money loss.

### Who Exactly Has This Problem?

Parents, working adults, and people who regularly purchase and store groceries for themselves or their household.

### Why It Matters / What It Costs Them Today

They may waste money by throwing away expired food and spend extra time manually checking expiration dates, and have problems after eating expired food.

---

## Gate 1 — Reachable Users

| No. | Name | User Type | Relationship | Interview Date |
|---|---|---|---|---|
| 1 | Mya | Parent / Household Grocery Buyer | Family Member | 2/9/2026 |
| 2 | Hanna | Working Adult | Family Friend / Neighbor | 3/9/2026 |
| 3 | Cindy | Household Grocery Shopper | Friend / Neighbor | 1/9/2026 |

---

## Gate 2 — MVP Shape

### Functional Requirements (FR)

| Requirement | Description |
|---|---|
| **FR-1** | Account & Premium |
| **FR-2** | Manage grocery items |
| **FR-3** | Calculate expiration date |
| **FR-4** | Expiration notifications |
| **FR-5** | Display active items |
| **FR-6** | Expiring / expired items |
| **FR-7** | Premium receipt or items scanning |
| **FR-8** | Auto category detection |
| **FR-9** | Custom reminder settings |
| **FR-10** | Expired history (7 days Free / Premium unlimited) |

### FR with a Real Rule / Decision

**FR-3 — Calculate Expiration Date**

The system shall calculate and display the estimated expiration date based on the grocery category and purchased date.

**FR-7 — Premium Receipt Scanning**

Premium users can scan unlimited receipts.

**FR-10 — Expired Grocery History**

Free users can view expired grocery history for 7 days; Premium users can view unlimited history.

### Data That Must Persist

- User information
- Grocery information
- Expiration dates
- Item status
- Reminder settings
- Subscription status
- Receipt scan usage
- Expired grocery history

---

## Gate 3 — Access

| Required Resources |
|---|
| Database |
| Date & time function |
| Notification system |
| Receipt / OCR service |
| User data |
| Development tools |
| Development software license |
| Database license |
| Notification / API license |
| Third-party libraries |
| External data |

We can get some of these resources from GitHub, free libraries, and Google.

---

## Process & Team

### Chosen SDLC: Agile

Develop the system in short iterations, test each feature with users, and improve it based on their feedback.

Start with grocery tracking and expiration alerts, then gradually add features such as receipt scanning, automatic category detection, custom reminders, and expired grocery history.
