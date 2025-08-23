# BridgeTech Console - Frontend

This is a React application built with Vite and TypeScript, converted from Next.js.

## Features

- **React 19** with TypeScript
- **Vite** for fast development and building
- **React Router** for client-side routing
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Shadcn/ui** components

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── custom/         # Custom components
│   └── ui/            # Shadcn/ui components
├── pages/              # Page components
│   ├── auth/          # Authentication pages
│   └── dashboard/     # Dashboard pages
├── layout/            # Layout components
├── store/             # Redux store and slices
├── types/             # TypeScript type definitions
├── constants/         # Application constants
├── hooks/             # Custom React hooks
├── lib/               # Utility libraries
└── utils/             # Utility functions
```

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Routing

The application uses React Router for client-side routing:

- `/log-in` - Login page
- `/dashboard` - Dashboard overview
- `/dashboard/users` - Users management
- `/dashboard/apartments` - Apartments management
- `/dashboard/bills` - Bills management
- `/dashboard/meters` - Meters management
- `/dashboard/settings` - Settings page
- `/dashboard/platform-settings` - Platform settings
- `/dashboard/sentry-logs` - Sentry logs

## State Management

Redux Toolkit is used for state management with the following slices:

- `auth` - Authentication state
- `users` - Users data
- `apartments` - Apartments data
- `bills` - Bills data
- `meters` - Meters data

## Conversion Notes

This application was converted from Next.js to React with Vite. Key changes include:

- Replaced Next.js App Router with React Router
- Converted Next.js specific components (`useRouter`, `usePathname`, etc.) to React Router equivalents
- Removed Next.js specific files (`middleware.ts`, `app/` directory)
- Updated all navigation to use React Router's `Link` and `useNavigate`
- Maintained all existing functionality and UI components

## Technologies Used

- React 19
- TypeScript
- Vite
- React Router DOM
- Redux Toolkit
- React Redux
- Tailwind CSS
- Lucide React
- Shadcn/ui
- React CountUp
