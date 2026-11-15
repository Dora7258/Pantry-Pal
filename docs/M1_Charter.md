Project Name - Pantry Pal  
Team Name - 5 idiots   
Member  
Than Htet Linn  / Lian Thawn Khai     / Thu Ta  / Myat Mon Su   /     Thin Thazin              
6931503017  /  6931503009           /  6931503019    /  6931503094     /      6931503018      

PROBLEM: People who regularly buy and store groceries at home often forget about 
items that are approaching their expiration dates. As a result, food may 
expire before it is used, causing unnecessary food waste and money loss. 

Who exactly has it: Parents, working adults, and people who regularly purchase and store 
groceries for themselves or their household. 

Why it matters / what it costs them today:They may waste money by throwing away expired 
food and spend extra time manually checking expiration dates, and having problems after eating 
expired food.  

GATE 1 — REACHABLE USERS 
1. [Mya] — Parent / household grocery buyer — Family member — [2,9,2026] 
2. [Hanna] — Working adult — Family friend / neighbor — [3,9,2026] 
3. [Cindy] — Household grocery shopper — Friend / neighbor — [1,9,2026]
   
GATE 2 — MVP SHAPE 

| ID | Functional Requirement | Description |
|---|---|---|
| FR-1 | Account & Premium | Users can register, log in, and access Free or Premium features. |
| FR-2 | Manage Grocery Items | Users can add, edit, delete, and mark grocery items as used. |
| FR-3 | Calculate Expiration Date | The system estimates expiration dates based on the grocery category and purchase date. |
| FR-4 | Expiration Notifications | The system sends reminders before grocery items expire. |
| FR-5 | Display Active Items | The system displays active grocery items for users to manage. |
| FR-6 | Expiring / Expired Items | The system separates and displays items that are expiring soon or have already expired. |
| FR-7 | Premium Receipt or Item Scanning | Premium users can scan receipts or grocery items to add them to the application. |
| FR-8 | Auto Category Detection | The system automatically detects and assigns categories to scanned grocery items. |
| FR-9 | Custom Reminder Settings | Premium users can customize their expiration reminder settings. |
| FR-10 | Expired History | Free users can view expired item history for 7 days, while Premium users have unlimited history. |
| FR-11 | Premium Usage Summary | Premium users can view usage summaries daily, weekly, and monthly. |

FR with a real rule/decision: 
FR-3 — The system shall calculate and display the estimated expiration date based on the grocery 
category and purchased date. 
FR-7 — Premium users can scan unlimited receipts. 
FR-10 — Free users can view expired grocery history for 7 days; Premium users can view unlimited 
history. 
FR-11: Premium users can view daily, weekly, and monthly usage summaries. The monthly summary 
resets at the end of each month. 

Data that must persist: 
User accounts, grocery details, expiration dates, item status, reminders, subscriptions, scan usage, expired history, 
and usage summaries.  

Gate 3 — Access: 
Required resources include databases, date/time functions, notification systems, receipt/OCR services, development 
tools, APIs, and third-party libraries. The team will check availability and licensing before use. 

PROCESS & TEAM  Chosen SDLC: Agile — Develop the system in short iterations, test with users, and improve 
based on feedback. Start with grocery tracking and expiration alerts, then add advanced features gradually.  
