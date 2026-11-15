```mermaid
%%{init: {"flowchart": {"curve": "linear"}}}%%
flowchart LR
    User["O<br/>/|#92;<br/>/ #92;<br/>User"]

    subgraph SB["Pantry Pal - System Boundary"]
        REG([Register]) -->|include| FILL([Fill out registration])

        MACC([Manage Account])
        MACC -.->|extend| PREM([Manage Premium Subscription])
        MACC -.->|extend| DEL([Delete Account])
        MACC -.->|extend| EDITACC([Edit Account])
        PREM -->|include| UPG([View/Upgrade plan])

        MGI([Manage Grocery Items])
        MGI -->|include| ADD([Add Grocery Item])
        MGI -.->|extend| EDITG([Edit Grocery Item])
        MGI -.->|extend| DELG([Delete Grocery Items])
        MGI -.->|extend| USED([Mark Item as used])
        ADD -->|include| ENTER([Enter Item details])
        ADD -.->|extend| SCAN([Scan Item or Receipt - Premium])
        SCAN -->|include| ACCESS([Check scan access])
        SCAN -->|include| REVIEW([Review/confirm items])

        REM([Receive Expiration Reminder])
        REM -.->|extend| APPLY([Apply reminder setting - Premium])
        REM -->|include| CHAN([Choose Notification Channel])

        INV([View Grocery Inventory])
        INV -->|include| ACTIVE([View Active Items])
        INV -.->|extend| SEARCH([Search Items])
        ACTIVE -.->|extend| SORT([Sort Items])

        EXP([View Expiring groceries])
        EXP -->|include| SOON([View Expiring Soon])
        EXP -.->|extend| EXPIRED([View Expired Item])
        SOON -.->|extend| DETAILS([View Item Details])

        USAGE([View Usage Summary])
        USAGE -.->|extend| DAILY([View Daily Usage Summary])
        USAGE -.->|extend| WEEKLY([View Weekly Usage Summary])
        USAGE -.->|extend| MONTHLY([View Monthly Usage Summary])

        CATDET([Automatic Category Detection])
        CHECK([Check Upcoming Expiration]) -->|include| SEND([Send Notification])
    end

    CAL[["<<system>> Calendar Service"]]
    AI[["<<system>> AI Service"]]
    APP[["<<system>> In-App Service"]]
    NOTIF[["<<system>> Notification Service"]]

    User --- REG & MACC & MGI & REM & INV & EXP & USAGE

    %% hidden links: pull the two system-driven use cases toward the right edge of the border
    DETAILS ~~~ CATDET
    ACTIVE ~~~ CHECK

    %% services (all in the same far-right column, outside the border)
    ENTER --- CAL
    EDITG --- CAL
    SCAN --- AI
    CATDET --- APP
    CHECK --- NOTIF

    %% hidden links: push every service past the border, AI above In-App
    REVIEW ~~~ CAL
    REVIEW ~~~ AI
    SEND ~~~ NOTIF

    %% invisible links: line up the services in one column (AI above In-App)
    ADD ~~~ CATDET
    ADD ~~~ CHECK

    style User fill:none,stroke:none
```
