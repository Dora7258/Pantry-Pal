
# Pantry Pal – Final Report

**Date:** 8 November 2026

**Team:** 5 Idiots (Group 2)

**Course:** Introduction to Software Engineering (15031001)

**Team Members:**
- Than Htet Linn
- Lian Thawn Khai
- Thu Ta
- Myat Mon Su
- Thin Thazin

---

## 1. Introduction and Problem

Pantry Pal is a grocery expiration tracking app for parents, working adults and anyone who stores groceries at home. People forget what they own and when it expires, so food is wasted, money is lost, and expired food may be eaten. Our survey shows how common this is.

### Survey Results

| Survey Question | Percentage of Respondents |
|---|---:|
| Think food waste causes unnecessary spending | 61.2% |
| Have thrown away expired food | 59.2% |
| Forget expiration dates | 54.4% |
| Forget groceries they already have | 53.4% |

**Source:** Pantry Pal team survey (demo slides).

---

## 2. Objectives and Scope

The app helps users organise groceries, track expiry dates, get reminders, see dates in a list and a calendar, and (Premium) review used versus wasted food, to reduce household food waste.

### Out of Scope

- Online shopping
- Delivery
- Nutrition tracking
- Spoilage detection
- Supermarket integration
- Messaging

---

## 3. Requirements

The SRS (v1.0.1) defines 11 functional requirements (FR), each a user story with testable acceptance criteria, traced to a problem and a test case (TC-01 to TC-11) in the Golden Thread matrix.

### Functional Requirements

| FR | Feature | Plan |
|---|---|---|
| **FR-1** | Account management and Premium upgrade | Free |
| **FR-2** | Add, edit, delete and mark items as used | Free |
| **FR-3** | Automatic expiry estimate from category and purchase date | Free |
| **FR-4** | Expiration reminders (default 3 days) | Free |
| **FR-5** | Active items list | Free |
| **FR-6** | Expiring and expired items | Free |
| **FR-7** | Receipt and item scanning with a review list | Premium |
| **FR-8** | Automatic category detection | Premium |
| **FR-9** | Custom reminder period (1 to 30 days) | Premium |
| **FR-10** | Expired history (7 days Free, unlimited Premium) | Free / Premium |
| **FR-11** | Usage summary: daily, weekly, monthly | Premium |

### Non-Functional Requirements

The 11 non-functional requirements are also testable, for example:

- Saving data within 2 seconds.
- A first-time user adding an item within 60 seconds.
- 99% availability.

---

## 4. Design and Prototype

### Design Artefacts

The design artefacts include:

- A use-case diagram (Household Member as the actor, 14 use cases).
- A sequence diagram covering:
  - Login
  - Add grocery
  - View and edit
  - Reminders
  - Mark as used
  - Usage summary

### Final Prototype

The final prototype is a clickable, responsive web app with the following screens:

- Pantry
- Calendar
- Notifications
- Profile

### Key System Rules

**Expiration Date Calculation**

Expiry is estimated from a category shelf life. For example:

- Meat: 3 days
- Dairy: 7 days
- Frozen: 90 days

The estimated expiration date stays editable.

**Expiring Soon**

Items show as Expiring Soon within 3 days.

**Mark as Used**

When marking an item as used:
- The system asks how much was used.
- The remaining quantity stays active.
- The system offers an undo option.

### Premium Features

Premium (simulated, $1.99 per month) adds:

- Receipt scanning with a review list.
- Custom reminders.
- Usage summary, which resets monthly.

### Security

- Passwords need at least 8 characters.
- Passwords are stored as salted SHA-256 hashes.

---

## 5. Process and Technologies

### Agile Development Process

We followed Agile in short iterations:

1. Charter (M1)
2. SRS (M2)
3. Design
4. Prototype (M3)
5. Testing

The prototype grew from v1.0 to the final version.

### Prototype Improvements

| Version | Features |
|---|---|
| **v1.0** | Barcode scanning, three tabs, plain-text passwords |
| **Final Version** | Receipt scanning, calendar, Notifications screen, hashed passwords |

### Technologies and Tools

| Tool / Technology | Purpose |
|---|---|
| Readdy | Prototype screens |
| HTML | Website structure |
| CSS | Website styling |
| JavaScript | Website functionality |
| Browser Local Storage | Data storage |
| Hatchable | Hosting |
| GitHub Pages | Hosting |
| GitHub | Version control |

---

## 6. Use of AI

We used ChatGPT, Claude, Gemini, Perplexity and Readdy AI, recorded in a dated AI usage log.

### AI Usage in Requirements

AI suggested FRs, NFRs and use cases.

We:
- Changed the actor to Household Member.
- Fixed FR and use-case links.
- Removed unnecessary details.
- Used AI to check our files against the FRs.

### AI Usage in Prototype Development

AI suggested:
- UI layouts.
- HTML code.
- CSS code.
- JavaScript code.

AI also explained coding errors.

We tested everything, rewrote code that failed and reviewed it together.

---

## 7. Limitations, Future Work and Conclusion

### Limitations

This is a prototype with the following limitations:

1. Data is stored on the device only, so there is no sync and the per-user security requirement is only partly met.
2. Receipt scanning needs a server with an AI key; otherwise, sample items are shown.
3. The Premium upgrade takes no payment.
4. TC-01 to TC-11 results are not recorded here.

### Future Work

The next steps are:

- Cloud accounts (Supabase or Readdy Backend).
- AI receipt extraction.
- Timed usability tests.

### Conclusion

All 11 requirements trace from a stated problem to a built feature, giving a working base for real households.
