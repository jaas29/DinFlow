# DinFlow Setup Guide

## Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
cd dinflow-app
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
Navigate to: `http://localhost:3000`

That's it! 🎉

---

## Detailed Setup Instructions

### Prerequisites

Before you begin, ensure you have:
- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

To check if you have these installed:
```bash
node --version
npm --version
```

If not installed, download Node.js from: https://nodejs.org/

### Installation Steps

1. **Extract the Project**
   - Unzip the `dinflow-app` folder to your desired location

2. **Open Terminal/Command Prompt**
   - On Mac: Open Terminal
   - On Windows: Open Command Prompt or PowerShell
   - Navigate to the project folder:
     ```bash
     cd path/to/dinflow-app
     ```

3. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install all required packages (React, TypeScript, Tailwind, etc.)
   
   ⏱️ This may take 1-3 minutes depending on your internet connection.

4. **Start the Development Server**
   ```bash
   npm run dev
   ```
   
   You should see output like:
   ```
   VITE v5.0.8  ready in 500 ms
   
   ➜  Local:   http://localhost:3000/
   ➜  Network: use --host to expose
   ```

5. **Open in Browser**
   - Open your browser
   - Go to `http://localhost:3000`
   - You should see the DinFlow welcome screen!

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.

To preview the production build locally:
```bash
npm run preview
```

---

## Troubleshooting

### Issue: "npm: command not found"
**Solution**: Install Node.js from https://nodejs.org/

### Issue: Port 3000 is already in use
**Solution**: The dev server will automatically use the next available port (3001, 3002, etc.)

### Issue: Module not found errors
**Solution**: Delete `node_modules` folder and `package-lock.json`, then run:
```bash
npm install
```

### Issue: Blank white screen
**Solution**: 
1. Open browser console (F12)
2. Check for errors
3. Clear browser cache
4. Restart dev server

---

## Project Features

### 🎯 What Can You Do?

1. **Onboarding Flow**
   - Welcome screen with app features
   - Simple auth simulation
   - Two-step setup (income + savings goal)

2. **Dashboard**
   - View total budget
   - Track savings goal
   - Monitor spending
   - See recent expenses
   - Quick budget overview

3. **Add Expenses**
   - Tap the blue "+" button
   - Enter amount
   - Select category
   - Add description
   - Instant tracking

4. **Reports & Analytics**
   - Visual spending charts
   - Category breakdowns
   - Monthly overview
   - Spending patterns

5. **Goals Tracking**
   - Monthly savings progress
   - Future goals (Emergency, Vacation, etc.)
   - Savings tips
   - Progress visualization

6. **Profile Management**
   - View statistics
   - Update budget settings
   - Reset app data
   - Manage categories

---

## Customization Guide

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#22C55E',  // Change this!
    dark: '#16A34A',
    light: '#4ADE80',
  },
}
```

### Adding Expense Categories

Edit `src/types/index.ts`:

```typescript
export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Your New Category',  // Add here!
] as const;
```

### Modifying Text/Copy

All text is in the page components:
- `src/pages/Welcome.tsx` - Welcome screen
- `src/pages/Dashboard.tsx` - Main dashboard
- `src/pages/Reports.tsx` - Analytics
- etc.

---

## File Structure Explained

```
dinflow-app/
│
├── src/
│   ├── components/           # Reusable UI pieces
│   │   ├── BottomNav.tsx    # Bottom navigation bar
│   │   ├── DinoDino.tsx     # Mascot component
│   │   └── AddExpenseModal.tsx  # Expense form modal
│   │
│   ├── pages/               # Full page components
│   │   ├── Welcome.tsx      # Landing page
│   │   ├── Auth.tsx         # Login/signup
│   │   ├── Setup.tsx        # Onboarding
│   │   ├── Dashboard.tsx    # Main dashboard
│   │   ├── Reports.tsx      # Analytics
│   │   ├── Goals.tsx        # Savings goals
│   │   └── Profile.tsx      # User profile
│   │
│   ├── contexts/            # State management
│   │   └── AppContext.tsx   # Global app state
│   │
│   ├── types/               # TypeScript types
│   │   └── index.ts         # Type definitions
│   │
│   ├── App.tsx              # Main component with routing
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
│
├── index.html               # HTML template
├── package.json             # Dependencies & scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
└── tsconfig.json            # TypeScript config
```

---

## Tech Stack Details

### Core Technologies
- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS

### Key Libraries
- **react-router-dom** - Client-side routing
- **lucide-react** - Beautiful icons
- **Local Storage API** - Data persistence

### Why These Choices?
- ⚡ **Vite**: Instant hot module reload
- 🎨 **Tailwind**: Rapid UI development
- 📘 **TypeScript**: Catch errors before runtime
- 💾 **Local Storage**: No backend needed

---

## Development Tips

### Hot Reload
Any changes you make to the code will automatically refresh in the browser!

### Browser DevTools
Press **F12** to open developer tools:
- **Console**: See logs and errors
- **Application**: View Local Storage data
- **Network**: Monitor API calls (none in this app)

### Recommended VS Code Extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

### Code Organization
- Keep components small and focused
- Use TypeScript for type safety
- Follow the existing file structure
- Comment complex logic

---

## Deployment Options

### 1. Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### 2. Netlify
```bash
npm run build
# Drag & drop the 'dist' folder to Netlify
```

### 3. GitHub Pages
```bash
npm run build
# Push 'dist' folder to gh-pages branch
```

### 4. Static File Hosting
```bash
npm run build
# Upload 'dist' folder to any web server
```

---

## FAQs

**Q: Is my data safe?**
A: Yes! All data is stored locally in your browser. Nothing is sent to any server.

**Q: Can I use this on my phone?**
A: Absolutely! The app is fully responsive and works great on mobile browsers.

**Q: Can I export my data?**
A: Currently, data stays in Local Storage. You could add export functionality by modifying the code.

**Q: How do I update my budget after setup?**
A: Go to Profile → Update Budget, or click through setup again.

**Q: Can I have multiple users?**
A: This version supports single-user mode. Each browser stores one user's data.

**Q: What happens if I clear my browser data?**
A: Your DinFlow data will be erased. Local Storage gets cleared with browser data.

---

## Next Steps After Setup

1. ✅ Complete the onboarding flow
2. ✅ Add your first expense
3. ✅ Explore the Reports tab
4. ✅ Set up future goals
5. ✅ Customize the colors to your liking!

---

## Support & Resources

- **Issues?** Check the Troubleshooting section above
- **Want to customize?** See the Customization Guide
- **Need React help?** Visit https://react.dev
- **Tailwind docs?** Visit https://tailwindcss.com

---

## Credits

Built with ❤️ using:
- React + TypeScript
- Vite build tool
- Tailwind CSS
- Lucide React icons

**Happy budgeting! 💰🦕**
