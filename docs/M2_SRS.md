**Team Members**

Than Htet Linn     6931503017  
Lian Thawn Khai 6931503009  
Thu Ta                  6931503019  
Myat Mon Su       6931503094  
Thin Thazin          6931503018

**Software Requirements Specification**

Introduction to Software Engineering (15031001) · Week 3 · Requirements & Specification

| Field | This example |
| :---- | :---- |
| Team name | 5 Idiots  |
| Project title | Pantry Pal Application— A grocery expiration and food waste management application  |
| SDLC chosen in M1 \+ reason | Agile — develop features in short iterations, test with users, and continuously improve the system based on feedback. |
| Date / version | November / v1.0.1  |
| GitHub repo | [https\://github.com/Dora7258/Pantry-Pal.git](https://github.com/Dora7258/Pantry-Pal.git) |

# **1\. Introduction**

## **1.1 Purpose and scope**

The purpose of this application is to help users manage their groceries and reduce food waste by keeping track of food items and their expiration dates. Users can add grocery items, record their expiration dates, and receive notifications before items expire. The application also helps users identify which groceries should be used first, so they can avoid forgetting food in the refrigerator or pantry, reduce unnecessary spending, and minimize food waste. The initial version focuses on grocery tracking, expiration alerts, and inventory management, with additional features such as recipe suggestions and food waste tracking added later.

## **1.2 Users and stakeholders**

| Name / role | Kind | What they need | What they fear / forbid |
| :---- | :---- | :---- | :---- |
| Household member  | primary user | View and manage shared grocery items and know which items should be used first  | Accidentally deleting or changing another person's grocery information  |
| Application administrator  | institution or supplier | Manage the application, monitor system performance, and maintain user data  | Data loss, system errors, or unauthorized access to user information  |

# 

# **2\. Overall description**

## **2.1 Product context — what it does / does not**

## The Grocery Management Application helps users keep track of their groceries and expiration dates. Users can add, edit, and delete grocery items, record expiration dates, receive alerts before items expire, and view items that need to be used soon. The MVP focuses on preventing users from forgetting about groceries and reducing food waste. Additional advanced features are outside the scope of the MVP.

| IN SCOPE (MVP this term) | OUT OF SCOPE (explicit promise) |
| :--- | :--- |
| **FR-1 —** Create / edit / delete account and upgrade to Premium | Group chat or messaging |
| **FR-2 —** Add / edit / delete / mark as used grocery items | Online grocery shopping or purchasing directly through the app |
| **FR-3 —** Automatically calculate and display the estimated expiration date based on the grocery category and purchased date | Automatic grocery delivery services |
| **FR-4 —** Expiration date reminders / notifications | Nutrition, calorie, or health tracking |
| **FR-5 —** Display active items | Automatic detection of whether food is spoiled or safe to eat |
| **FR-6 —** Show items that expire soon and already expired | Integration with supermarkets or grocery stores |
| **FR-7 —** Premium receipt or item scanning | |
| **FR-8 —** Automatic category detection | |
| **FR-9 —** Premium custom reminder settings | |
| **FR-10 —** Expired grocery history (Free for 7 days, unlimited for Premium) | |
| **FR-11 —** Premium usage summary (daily, weekly, and monthly) | |
## 

## **2.2 Assumptions and constraints**

* **Assumption:** Users have a smartphone and can access the application.

* **Assumption:** Users will enter accurate grocery information, especially the purchased date and expiration date.

* **Constraint:** The application supports basic grocery information such as item name, quantity, purchase date, and expiration date.

* **Constraint:** The system will not automatically determine whether food is spoiled; it only tracks the information provided by the user.

* **Constraint:** The project must be completed within the assigned development period and available team resources.

# **3\. Functional requirements**

As a `<role>`, I want `<goal>`, so that `<benefit>`. 

### **FR-1 — Create / edit / delete account/ upgrade to Premium**

**User story:**As a user, I want to create, edit, delete my account, and subscribe to Premium, so that I can manage my account and access Premium features.

**Pain this traces to:** Users need to manage their account information and may want to access additional features through a Premium subscription. 

1. Given the user enters the required account information, when they create the account, the account is saved and can be used to access the application.  
2. Given an existing account, when the user edits or deletes  their account information, the updated information is saved and displayed.  
3. Given an existing account, when the user chooses to subscribe to Premium, the account's subscription status is updated to Premium and Premium features become available.  
4. Given a free account, when the user chooses to upgrade to premium subscription, the account status is changed to premium and premium features are available.

### **FR-2 \- Manage grocery items**  

### 

### **User story:** As a user, I want to add, edit, delete, and mark grocery items as used, so that I can keep my grocery inventory up to date. 

**Pain this traces to:** Users may forget what groceries they have purchased and when they expire. Manually managing many grocery items can also take too much time. 

1. The system allows the user to add grocery items manually, including the grocery name, category, quantity, and purchased date.  
2. The system allows the user to edit or delete existing grocery items.  
3. The system allows the user to mark a grocery item as used, removing it from the active inventory while keeping its status as used.

**FR-3 — Automatically calculate and display the estimated expiration date based on the grocery category and purchased date** 

**User story:** As a user, I want Pantry Pal to estimate the expiration date of my groceries based on their category and purchased date, and quantity so that I do not have to calculate it myself.

**Pain this traces to:** Users may find it difficult to remember or estimate expiration dates for different types of groceries.

1. The system identifies the selected grocery category and purchased date.  
2. The system calculates an estimated expiration date using the predefined shelf-life period for the selected category.  
3. The system displays the estimated expiration date and allows the user to edit it before saving.

## 

## **FR-4 — Expiration reminders / notifications**

**User story:** As a user, I want to receive reminders before my groceries expire, so that I can use them in time.

**Pain this traces to:** Users may forget upcoming expiration dates and only notice that food has expired after it is too late.

1. The system identifies grocery items that are approaching their expiration dates before 3 days.( Default for free users, and Premium users use the period set in FR-9)  
2. The system sends a notification according to the user's selected reminder setting.  
3. The notification identifies the grocery item and its expiration date.

**FR-5 — Display active items** 

**User story:** As a user, I want to see my active grocery items in one place, so that I can keep track of what I currently have. 

**Pain this traces to:**Users may forget which groceries they currently have, especially when items are stored in different places. 

1. The system displays all grocery items that are currently active.  
2. The system displays relevant information such as the item name, category, quantity, and expiration date.  
3. The system removes an item from the active inventory when the user deletes it or marks it as used.

### **FR-6 — Show items that expire soon and already expired** 

**User story:** As a user, I want to see which groceries are expiring soon or have already expired, so that I can prioritize which items need attention. 

**Pain this traces to:** Users may use newer groceries first while older groceries remain unused and eventually expire.

1. The system identifies groceries that are approaching their expiration dates.(within 3 days for normal user, or within premium user’s custom reminder period)  
2. Items that are expiring soon or already expired are displayed according to their expiration status.  
3. The user can distinguish between **expiring-soon** and **expired** items.

### **FR-7 — Premium receipt or items scanning**

**User story:** As a Premium user, I want to scan a grocery receipt or item, so that I can add multiple grocery items without entering them one by one.

**Pain this traces to:** Manually adding many grocery items after shopping can take too much time.

1. The system allows Premium users to scan a grocery item or receipt using the device camera.  
2. The system extracts and displays the detected grocery items for the user to review and confirm.  
3. The system adds the confirmed grocery items to the grocery inventory.

### **FR-8 — Automatic category detection** 

**User story:** As a premium user, I want the system to automatically detect grocery categories, so that I do not have to categorize each grocery item manually.

**Pain this traces to:** Categorizing many grocery items individually can take additional time after shopping.

1. The system identifies a suggested category for each detected grocery item.  
2. The system displays the suggested category for the user to review and confirm.  
3. The system saves the confirmed category with the grocery item.

## 

## **FR-9 — Premium custom reminder settings**

**User story:** As a Premium user, I want to customize when I receive expiration reminders, so that I can choose a reminder time that suits my needs.

**Pain this traces to:** Different users may need different amounts of time to use their groceries before they expire.

1. The system allows Premium users to select a preferred reminder period before expiration.  
2. The system saves the user's selected reminder setting.  
3. The system sends expiration notifications according to the selected reminder setting.

## **FR-10 —  Expired grocery history**

**User story:** As a user, I want to view my expired grocery history, so that I can review groceries that have expired in the past.

**Pain this traces to:** Users may want to review previously expired groceries to understand their food-waste patterns.

1. The system allows Free users to view expired grocery history from the **past 7 days**.  
2. The system allows Premium users to view their expired grocery history **without the 7-day limit**.  
3. The system displays information such as the grocery name, expiration date, and expired date.

**FR-11 — Premium usage summary**

**User story:** As a Premium user, I want to view a daily, weekly, and monthly summary of the groceries I used and wasted, so that I can understand my food-waste habits and use my groceries before they expire.

**Pain this traces to:** Users may want to understand how much food they use on time and how much they waste, but a list of past items does not clearly show their food-waste patterns.

1. The system allows only Premium users to view the usage summary in daily, weekly, and monthly views. Free users see a message that this is a Premium feature, with an **Upgrade to Premium** option.  
2. The system displays the number of **expired items**, **items used before expiring**, and **items used after expiring** for the selected period, based on the date each item was marked as used. It shows these counts in a bar chart, or a message when there is no data.  
3. The system resets the three counts to **0 at the end of each month** and displays the next reset date.

# **4\. Non-functional requirements**

Forbidden words unless quantified: fast, easy, user-friendly, smart, secure. NFR-(security/privacy) is required for M2 — every SRS must have at least one.

| ID | Kind | Statement (testable) | How we will check |
| :---- | :---- | :---- | :---- |
| NFR-1 | performance | The system shall save account and grocery-item information within 2 seconds after valid submission and process a valid receipt scan within 5 seconds. | Measure the saving and receipt-processing time over 3 trials.   |
| NFR-2 | usability  | A first-time Free user shall be able to add a grocery item manually within 60 seconds without assistance, and a first-time Premium user shall be able to scan and confirm a receipt within 60 seconds without assistance.    | Conduct separate timed tests with first-time Free and Premium users.   |
| NFR-3 | reliability  | The system shall retain each user's account information, grocery information, subscription status, receipt-scan usage, reminder settings, and expired-history information after the application and usage-summary information (including the date each item was marked as used) after the application is closed and reopened.  | Add information, perform a receipt scan, close the application, reopen it, and verify that the data remains.  |
| NFR-4 | security / privacy  | A user shall only be able to access and modify their own account, grocery inventory, view their own subscription information,  expired-history information, and usage summary information.  | Log in as one user and attempt to access another user's information.  |
| NFR-5 | availability  | The system shall be available at least 99% of the time, excluding planned maintenance.  | Monitor system availability over a defined testing period and calculate the percentage of uptime.  |
| NFR-6 | compatibility  | The application shall function correctly on supported Android and iOS devices and different supported screen sizes.  | Test the application on multiple supported devices and screen sizes.  |
| NFR-7  | Notification reliability  | The system shall deliver expiration notifications according to the default reminder setting for Free users and the selected custom reminder setting for Premium users.  | Test notifications using both Free and Premium accounts with their respective reminder settings  |
| NFR-8 | maintainability  | The system shall use a modular structure so that account, grocery, scanning, and notification functions can be maintained independently.  | Review the system structure and verify that the major functions are separated into appropriate modules.  |
| NFR-9 | data accuracy  | The system shall correctly calculate the estimated expiration date based on the grocery category and purchased date, and Premium automatic category detection shall correctly display the detected category for user confirmation.  | Enter test grocery categories and purchase dates, compare the estimated expiration dates with expected results, and test Premium category detection using sample receipts.  |
| NFR-10 | error handling  | The system shall display a clear error message when required or invalid account/grocery information is entered.  | Enter missing and invalid information and verify that an appropriate error message is displayed.  |
| NFR \- 11 | Data Accuracy  | The system shall count each grocery item in exactly one category (expired, used before expiring, or used after expiring) in the usage summary for the selected period, and shall reset these counts to 0 at the end of each month.  | Mark test items as used before and after their expiration dates and let others expire, compare the daily, weekly, and monthly counts with the expected results, then simulate the end of the month and verify the counts are 0\.  |

# **5\. Use cases**

## **Use-case list**

| Use case | Actor | Related FR | Brief success story |
| :---- | :---- | :---- | :---- |
| UC-1 Register | Household Member | FR-1 | The household members create their account |
| UC-2  Manage account  | Household Member | FR-1 | The household members create, edit, or delete their account, save or remove the account information accordingly.  |
| UC-3 Manage grocery items  | Household Member  | FR-2,FR-3 | The household member manually adds, edits, deletes, or marks a grocery item as used, and the inventory is updated accordingly. The system also estimates the expiration date from the grocery category and purchased date. |
| UC-4 Scan Item or Receipt | Household Member  | FR-7,FR-2, FR-8 | The household member scans a receipt or item to add multiple grocery items instead of entering them manually.  |
| UC-5 Check Scan Access  | Household Member  | FR-7 | The system checks the user's subscription and Premium users may continue scanning, while Free users are shown an upgrade option.  |
| UC-6 Review / Confirm Scanned Items  | Household Member  | FR-8, FR-2 | The system displays the detected grocery items, and the household member reviews and confirms them before adding them to the inventory.  |
| UC-7 Automatic Category Detection  | Household Member  | FR-8 | The system automatically identifies and assigns a category to a grocery item.  |
| UC-8 Receive Expiration Reminder  | Household Member  | FR-4 | The system checks upcoming expiration dates and sends a reminder to the household member.  |
| UC-9 Customize Reminder Settings  | Household Member  | FR-9 | A premium user selects their preferred reminder timing and notification settings.  |
| UC-10 View Grocery Inventory  | Household Member  | FR-5 | The household member opens the inventory and sees all currently active groceries, including their names and expiration dates.  |
| UC-11 View Expiring / Expired Items   | Household Member  | FR-6  | The household member views groceries that are expiring soon or have already expired and identifies which items need attention.  |
| UC-12 View Expired Grocery History  | Household Member  | FR-10 | The system shows expired grocery history according to the user's subscription: 7 days for free users and unlimited for premium users during the subscribed period.  |
| UC-13 Upgrade to Premium  | Household Member  | FR-1 | A free household member upgrades their account to Premium, and the system changes the subscription status to enable Premium features (receipt scanning, custom reminder settings, and unlimited expired grocery history for subscribed period and usage summary). |
| UC-14 View Usage Summary  | Household Member  | FR-11  | A Premium household member opens the usage summary and selects a daily, weekly, or monthly view to see the number of expired items, items used before expiring, and items used after expiring. Free members are shown an upgrade option instead.  |

## 

# **6\. Out of scope**

1. Online grocery shopping or purchasing directly through the app.  
2. Automatic grocery delivery services.  
3. Nutrition, calorie, or health tracking.  
4. Automatic detection of whether food is spoiled or safe to eat.  
5. Integration with supermarkets or grocery stores.  
6. Sharing or messaging with other users.

# 

# **7\. Traceability matrix (Golden Thread)**

| Problem / pain | Requirement (FR) | Solution / design | Feature built | Test |
| :---- | :---- | :---- | :---- | :---- |
| Users need to manage their personal information, and account securely, and basic services take time to process  managing items. | **FR-1** Create, edit, delete account, and upgrade to Premium | • User account entity• Registration form• Authentication• Account management • Premium Subscription  | • Registration page • Login page • Account Settings | TC-01: Register, log in, edit account details and verify Premium access.  |
| Users forget what groceries they have and may waste food or consume expired food.  | **FR-2** Add, edit, and delete grocery items and mark them as used.  | • Grocery item entity• Expiration date field• CRUD operations• Item status (active/used) ( Ch 5 & 7\) | • Pantry Dashboard • Add/Edit Grocery page | TC-02: Add, edit, delete and mark grocery items as used.  |
| Users may find it difficult to remember or estimate expiration dates for different types of groceries.  | **FR-3** Automatically calculate and display the estimated expiration date based on the grocery category and purchased date. | • Category-based shelf-life period • Calculate expiration date using purchase date • Allow date editing | • Add/Edit Grocery page  | TC-03: Select a grocery category and purchase date; verify the estimated expiration date.  |
| Users may forget about groceries until they expire, which can lead to food waste and possible health risks from consuming expired food.  | **FR-4** Send expiration  alerts/ notifications.  | • Expiration-date checking • Reminder settings • Notification service  | • Reminders page • Notification interface  | TC-04: Check whether expiration reminders follow the configured reminder period.   |
| Users may not remember what groceries they currently have at home.  | **FR-5** Display all active grocery items with details.  | • Query active items • Display grocery name and expiration date • Display item status | • Pantry Dashboard • Active Items section   | TC-05: Add grocery items and verify that all active items appear with correct details.  |
| Users may overlook groceries that are about to expire or have already expired.  | **FR-6** Show items that are expiring soon and already expired.  | • Filter items by expiration date • Identify expiring-soon items • Identify expired items • Sort by expiration date  | • Pantry Dashboard • Expiring Soon section • Expired Items section | TC-06: Test different expiration dates and verify the correct item status.  |
| Manually adding many grocery items after shopping can take too much time.  | **FR- 7** Premium receipt scanning | • Camera scan •Premium-only access check •Review and confirm screen | • Premium Features page • Scan Receipt page  | TC-07: Scan a sample receipt and verify that detected items are displayed for confirmation  |
| Categorizing many grocery items individually can take additional time after shopping | **FR-8** Automatic category detection | • Automatic category detection • Suggested category per item • Confirm/edit category  | • Scan Review page • Add/Edit Grocery page  | TC-08: Check whether detected grocery items receive appropriate category suggestions.  |
| Different users may need different amounts of time to use their groceries before they expire | **FR-9** Premium custom reminder settings | •Reminder-period setting •Saved user preference  •Notification service | • Premium Features page • Reminder Settings page  | TC-09: Change the reminder period and verify that the selected setting is saved.  |
| Users may want to review previously expired groceries to understand their food-waste patterns. | **FR-10** Expired grocery history(Free: past 7 days, Premium:Unlimited) | • Expired-item history query • 7-day limit for Free users • Unlimited history for Premium users  | • Grocery History page • Premium History section  | TC-10: Check expired-item history access for Free and Premium accounts.  |
| Users may want to understand how much food they use on time and how much they waste  | **FR-11** Premium usage summary (daily, weekly and monthly).  | • Usage statistics calculation • Daily, weekly and monthly summaries • Bar chart visualization • Monthly count reset  | • Usage Summary page • Premium Features page  | TC-11: Verify daily, weekly and monthly usage counts using sample grocery records.  |

# 

# **8\. AI usage log**

| *Date* | *Tool / model* | *What we asked* | *What AI produced* | *What we changed / verified* | *What we learned* |
| :---- | :---- | :---- | :---- | :---- | :---- |
| *22 Aug 2026 29 Aug 2026 18 Sep 2026 22 Sep 2026 10 Oct 2026 2 Nov 2026* | *Chat GPT/ Claude/ Perplexity  Chat GPT/ Claude/Gemini, Reddy AI  Claude AI ChatGPT Claude AI/ ChatGPT* | *Help us to modify the requirements and use cases for a Pantry Pal System, including functional requirements, non-functional requirements.  To check our use case diagram and requirements  To build our application  To upgrade our application* | *AI suggested FRs, NFRs, and a detailed for managing groceries, expiration dates, reminders, and scanning. It showed the things that are not matched and errors in the file. It gave us the file which features do not match with our FRs. It gave us the version which is the same as the old version.* | *We reviewed the suggestions, changed the actor to Household Member, corrected the FR and use-case relationships, removed unnecessary details, and verified that manual entry belongs to grocery management  We reviewed and checked whether it is the correct suggestion or not and fixed it if needed We reviewed and changed it to get the version which matches with FRS.. We reviewed and changed to get which is to add more features.*  | *We learned how to distinguish FRs from NFRs, connect FRs to use cases, and use include/extend relationships appropriately.*  |

# **9\. Self-Check**

* **Every FR is a user story with a benefit** — all 10 **FRs** include a “so that” clause connected to a real grocery-management problem.  
* **Every FR has acceptance criteria you could actually test** — each FR has clear and testable acceptance criteria.  
* **No FR is vague** — the FRs use specific actions such as create, add, edit, delete, display, and notify.  
* **NFRs exist, including security / privacy** — NFRs cover performance, usability, reliability, security/privacy, compatibility, data accuracy, and error handling.  
* **Every FR traces back to a stated problem** — each FR includes a **“Pain this traces to”** statement explaining the problem it addresses.  
* **Scope and out-of-scope are stated** — the project scope and features that are not included are clearly defined.  
* **Use-case list matches the FR list** — there are **13 use cases**, covering all 11 FRs, with **Household Member** as the main actor.  
* **AI log is honest** — the AI usage log shows what we asked AI to help with and what we reviewed and changed.
