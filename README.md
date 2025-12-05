# DinFlow - Smart Expense Tracking

A modern, responsive personal finance web app built with React, TypeScript, and Tailwind CSS.

## Features

- **Smart Budgeting**: Set monthly income and savings goals
- **Expense Tracking**: Quickly add and categorize expenses
- **Visual Analytics**: Beautiful charts and spending insights
- **Savings Goals**: Track progress towards financial targets
- **Privacy First**: All data stored locally on your device
- **Mobile Optimized**: Perfect for on-the-go expense tracking

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons
- **Local Storage** - Data persistence

## Installation

### Prerequisites

- **Node.js**: Version 16 or higher ([Download Node.js](https://nodejs.org/))
- **npm** or **yarn**: Usually comes with Node.js
- **A text editor or IDE** (VS Code recommended)
- **A web browser** (Chrome, Firefox, Safari, or Edge)

### Step-by-Step Installation & Setup Guide

#### Step 1: Extract the Project Files
1. Download the project files from the source
2. Extract the compressed folder to your desired location on your computer
3. You should now have a folder named `dinflow-app` (or similar)

#### Step 2: Open Terminal/Command Prompt
- **On Windows**: 
  - Press `Win + R`, type `cmd`, and press Enter
  - Or search for "Command Prompt" in the Start menu
- **On macOS**: 
  - Press `Cmd + Space`, type `terminal`, and press Enter
- **On Linux**: 
  - Open your terminal application from the applications menu

#### Step 3: Navigate to Project Directory
```bash
cd path/to/dinflow-app
```
Replace `path/to/dinflow-app` with the actual path where you extracted the files.

**Example paths:**
- Windows: `cd C:\Users\YourName\Desktop\dinflow-app`
- macOS/Linux: `cd ~/Desktop/dinflow-app`

#### Step 4: Verify Node.js Installation
Before proceeding, verify that Node.js and npm are installed:
```bash
node --version
npm --version
```
You should see version numbers (e.g., `v18.0.0` for Node.js and `9.0.0` for npm).

#### Step 5: Install Project Dependencies
Run the following command to install all required packages:
```bash
npm install
```
This will download and install all dependencies listed in `package.json`. This may take a few minutes depending on your internet speed. You'll see a lot of text output—this is normal!

**What's being installed:**
- React and React DOM
- React Router for navigation
- Tailwind CSS for styling
- Vite for development and building
- TypeScript for type checking
- And other supporting libraries

#### Step 6: Start the Development Server
Once installation completes, start the development server:
```bash
npm run dev
```
You should see output similar to:
```
VITE v5.0.0  ready in XXX ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

#### Step 7: Open in Your Browser
1. Open your web browser (Chrome, Firefox, Safari, Edge, etc.)
2. Navigate to: `http://localhost:3000/`
3. The DinFlow app should now load!
4. If it doesn't open automatically, you may need to copy and paste the URL manually

#### Step 8: Start Using DinFlow
1. Click **"Get Started"** on the welcome page
2. Click **"Sign In"** to proceed (no real authentication required)
3. Enter any email address and proceed
4. Set your **monthly income** (e.g., $4000)
5. Choose your **savings percentage** (e.g., 20%)
6. View your dashboard and start tracking expenses!

## Project Structure

```
dinflow-app/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── BottomNav.tsx
│   │   ├── DinoDino.tsx
│   │   └── AddExpenseModal.tsx
│   ├── pages/            # Page components
│   │   ├── Welcome.tsx
│   │   ├── Auth.tsx
│   │   ├── Setup.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Reports.tsx
│   │   ├── Goals.tsx
│   │   └── Profile.tsx
│   ├── contexts/         # React Context providers
│   │   └── AppContext.tsx
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Usage

### First Time Setup

1. Click "Get Started" on the welcome screen
2. Enter your email (no real authentication required)
3. Set your monthly income
4. Choose your savings percentage
5. Start tracking expenses!

### Adding Expenses

1. Click the blue "+" button in the bottom navigation
2. Enter the amount spent
3. Select a category
4. Add an optional description
5. Click "Add Expense"

### Viewing Reports

Navigate to the Reports tab to see:
- Spending by category
- Monthly totals
- Visual pie chart and bar chart

### Managing Your Profile

Visit the Profile tab to:
- View financial overview
- Check spending statistics
- Update budget settings
- Reset app data

## Features in Detail

### Dashboard
- Quick overview of budget status
- Savings progress tracking
- Recent expense list
- Real-time budget calculations

### Reports
- Category-based spending analysis
- Visual pie charts
- Monthly/weekly views
- Spending trends

### Goals (not functional)
- Monthly savings goal tracking
- Future goal planning (Emergency fund, Vacation, etc.)
- Savings tips and recommendations
- Progress visualization

### Profile
- Financial overview
- Spending statistics
- Settings management
- Data reset options

## Data Persistence

All data is stored locally in your browser's Local Storage. This means:
- ✅ Your data never leaves your device
- ✅ No server or account required
- ✅ Instant access and updates
- ⚠️ Clearing browser data will reset the app

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: {
    DEFAULT: '#22C55E',  // Main green
    dark: '#16A34A',
    light: '#4ADE80',
  },
}


## License

This project is created for educational purposes.


##Author
Jose Araya


**DinFlow** - Smart expense tracking made simple 
