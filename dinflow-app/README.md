# DinFlow - Smart Expense Tracking

A modern, responsive personal finance web app built with React, TypeScript, and Tailwind CSS.

## Features

- 📊 **Smart Budgeting**: Set monthly income and savings goals
- 💰 **Expense Tracking**: Quickly add and categorize expenses
- 📈 **Visual Analytics**: Beautiful charts and spending insights
- 🎯 **Savings Goals**: Track progress towards financial targets
- 🔒 **Privacy First**: All data stored locally on your device
- 📱 **Mobile Optimized**: Perfect for on-the-go expense tracking

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons
- **Local Storage** - Data persistence

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Extract the project files
2. Navigate to the project directory:
   ```bash
   cd dinflow-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

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
- Visual pie charts

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

### Goals
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
```

### Categories

Edit `src/types/index.ts` to modify expense categories:

```typescript
export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  // Add your categories here
] as const;
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is a portfolio/demo project. Feel free to fork and customize for your own use!

## License

MIT License - feel free to use this project for learning or personal use.

## Acknowledgments

- Design inspired by modern fintech apps
- Icons by Lucide React
- Built with love using React and Tailwind CSS

---

**DinFlow** - Smart expense tracking made simple 🦕💰
