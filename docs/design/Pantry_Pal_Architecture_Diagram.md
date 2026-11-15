## Architecture diagram

The user works through the client app, which talks to the backend API. The API routes each request to the module for that group of use cases, and the modules store their data in the database. A scheduler checks upcoming expirations and sends notifications on its own. Calendar, AI, In-App and Notification services are external and may be unavailable or require configuration.

```mermaid
%%{init: {"flowchart": {"curve": "linear"}}}%%
flowchart LR
    User(["User"]) --- CLIENT["Client App"]
    CLIENT --- API["Backend API<br/>Auth and routing"]

    subgraph MODULES["Backend Modules"]
        ACC["Account<br/>Register, Edit, Delete, Premium"]
        ITEMS["Grocery Items<br/>Add, Edit, Delete, Mark used"]
        SCAN["Scan - Premium<br/>Check access, Review"]
        CAT["Automatic Category Detection"]
        INV["Inventory<br/>Active, Search, Sort"]
        EXP["Expiring Groceries<br/>Soon, Expired, Details"]
        USAGE["Usage Summary<br/>Daily, Weekly, Monthly"]
        REM["Expiration Reminder<br/>Setting, Channel"]
    end

    API --- ACC
    API --- ITEMS
    API --- SCAN
    API --- INV
    API --- EXP
    API --- USAGE
    API --- REM
    ITEMS --- CAT

    API --- DB[("Database")]
    DB --- SCHED["Scheduler<br/>Check Upcoming Expiration,<br/>Send Notification"]

    subgraph EXT["External Services"]
        CAL[["Calendar Service"]]
        AI[["AI Service"]]
        APP[["In-App Service"]]
        NOTIF[["Notification Service"]]
    end

    ITEMS --- CAL
    SCAN --- AI
    CAT --- APP
    SCHED --- NOTIF
```

Each backend module is one use case group from the use case diagram. Each external service connects only where it does in that diagram: Calendar to item entry and editing, AI to scanning, In-App to category detection, and Notification to the expiration check. Scan and Reminder settings are Premium features, so the Account module checks the user's plan before allowing them.
