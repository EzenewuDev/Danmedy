# DanMedy — AI-Powered Telemedicine Platform 🏥💡

DanMedy is a world-class, premium Next.js 16 application built to revolutionize healthcare accessibility. Our platform gives patients direct digital access to board-certified doctors, live real-time vital sign monitoring, AI-assisted diagnosis, and secure real-time messaging. 

Built with the newest web technologies, DanMedy boasts a beautiful "Glassmorphism" aesthetic with seamless light and dark mode support, and robust role-based authentication using Clerk.

---

## 🌟 Key Features

### 1. 📅 Instant Appointment Booking (`/appointments`)
A beautifully designed, step-by-step booking flow allowing patients to:
- Browse available specialists across various departments (Cardiology, Pediatrics, General Medicine, Neurology, Orthopedics).
- Pick specific available dates and times using an interactive calendar.
- Securely schedule virtual or in-person checkups.

### 2. 💓 Live Vital Sign Monitoring (`/vitals`)
A specialized patient dashboard showcasing real-time health metrics including:
- **Heart Rate (BPM)** with an animated, live-drawing ECG graph.
- **Blood Oxygen (SpO2)** and **Body Temperature** metrics.
- Multi-day trend charts tracking vitals over the last 7 days.
- AI-driven health evaluations summarizing the patient's current statistics.

### 3. 💬 Real-Time Doctor Chat (`/chat`)
A premium messaging layout similar to modern team collaboration tools:
- Engage in direct 1-on-1 conversations with doctors.
- Quick-tap interactive illness prompts ("I have a headache", etc.).
- AI-suggested responses and automated bot replies demonstrating interactivity.

### 4. 🌙 Professional Dark & Light Mode
- Complete integration with `next-themes` and `Tailwind CSS v4`.
- Dynamic color variables adjusting seamlessly depending on system preference or user toggle.
- Fluid transitions combining professional whites/grays for light mode, and deep cyan/slate aesthetic for dark mode.

### 5. 🔐 Secure Authentication (Clerk)
- Protected routes using Next.js Clerk middleware and custom, themed auth pages.
- Standalone `/sign-in` and `/sign-up` experiences designed to match DanMedy's glossy aesthetic instead of bland default templates.
- Role-based separation keeping patients and administrators secure.

### 6. 🛠️ Dedicated Admin Dashboard (`/admin`)
- Secure backend environment accessible only to authenticated users.
- Live patient registration pipeline connected to the Next.js API Routes and a structured SQLite database using Prisma.
- Comprehensive user table with search functionality, recent patient data, and patient management actions.

---

## 🚀 Tech Stack

- **Framework:** [Next.js v16](https://nextjs.org/) (App Directory routing structure)
- **UI & Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State & Theme Management:** React Hooks, `next-themes`
- **Authentication:** [Clerk](https://clerk.dev/)
- **Database & ORM:** [Prisma](https://www.prisma.io/) ORM, SQLite (local development)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** Custom CSS Animations & GSAP (stubbed for future enhancements)

---

## 📂 Project Structure

```text
danmedy-react/
├── prisma/
│   └── schema.prisma         # Database schema for Patients, Appointments, Vitals
├── public/                   # Static assets
└── src/
    ├── app/                  # Next.js App Router (Pages & APIs)
    │   ├── api/              # Backend routes (patients, appointments, vitals)
    │   ├── admin/            # Secure admin dashboard layout & pages
    │   ├── appointments/     # Appointment booking page 
    │   ├── chat/             # Doctor chat messaging interface
    │   ├── sign-in/          # Themed Clerk sign in route
    │   ├── sign-up/          # Themed Clerk sign up route
    │   ├── vitals/           # Vital tracking and ECG charts
    │   ├── globals.css       # Core Tailwind configuration and global styles
    │   └── layout.js         # Inter/SpaceGrotesk fonts, ClerkProvider, ThemeProvider
    └── components/           # Reusable UI Components
        ├── Hero.jsx          # Frontpage hero section
        ├── Navbar.jsx        # Premium responsive navigation with ThemeToggle
        ├── ThemeToggle.jsx   # Light/Dark mode switcher
        ├── Dashboard.jsx     # Landing page mock-dashboard visualization component
        ├── Workflow.jsx      # Homepage feature section
        ├── Footer.jsx        # Site footer
        └── ...
```

---

## 💻 Running the Project Locally

To run the application locally on your machine, follow these steps:

### Prerequisites
Make sure you have Node.js (v18 or higher) and npm installed.

### 1. Install Dependencies
Navigate into the project repository and install everything needed:
```bash
cd danmedy-react
npm install
```

### 2. Configure Environment Variables
You will need your Clerk Publishable & Secret keys to run the server. Rename `.env.example` to `.env.local` (or create a new `.env.local` file at the root of `danmedy-react/`) and add:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Prisma Database string
DATABASE_URL="file:./dev.db"
```

### 3. Initialize the Database
Generate the Prisma client and push the schema to create your local SQLite file:
```bash
npx prisma generate
npx prisma db push
```

### 4. Start the Development Server
```bash
npm run dev
```
The application will securely launch on `http://localhost:3000`.

---

## 🎨 Design Philosophy
DanMedy was designed specifically to bridge the gap between heavy, unappealing legacy medical software and consumer-facing, state-of-the-art tech. 
- **Professionalism meets Futurism:** We use modern glass-like transparent surfaces (glassmorphism) over deep gradients.
- **Micro-interactions:** Custom hover states, drawing ECG SVG paths, and pulsing heart icons create a space that feels active and "live". 
- **Accessibility:** With custom `next-themes` implementation, the UI dynamically changes text colors (using Tailwind's `dark:` variant) so contrast is always high, regardless of preference.

---

## 🛠 Next Steps & Future Roadmap
- Integration of actual real-time WebSockets via `Socket.io` or `Pusher` for the `/chat` interface.
- Complete implementation of the Patient Dashboard portal to view historical appointments.
- Transactional email integration using `Resend` to confirm booked appointments. 
- Expansion of the Prisma Database to capture structured chat messaging history.

---
*Built with passion to elevate modern telehealth.*
