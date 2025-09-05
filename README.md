# Project Status Dashboard

A modern, real-time project status monitoring dashboard built with Next.js 15 and TypeScript. This platform provides transparent visibility into development projects, their current status, and progress updates.

## Overview

This dashboard displays and manages three categories of projects:

- **Active Projects**: Live and operational projects with live URLs
- **Pending Projects**: Currently in development with progress tracking
- **Inactive Projects**: Completed, paused, or archived projects

## Features

### Core Functionality

- **Real-time Status Monitoring**: Live project status updates with visual indicators
- **Project Categorization**: Organized view of active, pending, and inactive projects
- **Progress Tracking**: Visual progress bars for projects in development
- **Tech Stack Display**: Detailed technology stack information with tooltips
- **Global Search**: Search across all projects by title, description, client, or technology
- **Responsive Design**: Mobile-first design that works across all devices

### User Experience

- **Smooth Animations**: Framer Motion powered entrance and transition animations
- **Dark Mode Support**: System-aware theme switching with manual override
- **Performance Optimized**: Fast loading with optimized components and images
- **Social Integration**: Quick access to social media profiles and portfolio

### Technical Features

- **TypeScript**: Full type safety across the application
- **Component Architecture**: Reusable, maintainable component structure
- **Data Management**: Structured data layer with TypeScript interfaces
- **Modern UI**: Clean, professional interface built with Tailwind CSS

## Technology Stack

### Frontend Framework

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript 5**: Full type safety and modern JavaScript features

### Styling & UI

- **Tailwind CSS 4**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth interactions
- **Iconify React**: Comprehensive icon system

### Development Tools

- **PostCSS**: CSS processing and optimization
- **ESLint**: Code linting and quality assurance
- **Node.js**: Runtime environment

## Project Structure

```
status-poyraz/
├── app/                    # Next.js app directory
│   ├── active/            # Active projects page
│   ├── pending/           # Pending projects page
│   ├── inactive/          # Inactive projects page
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Layout components
│   │   ├── navbar.tsx    # Navigation with search
│   │   └── footer.tsx    # Footer component
│   └── shared/           # Shared components
│       └── statusCard.tsx # Project status card
├── data/                 # Data layer
│   ├── active.ts         # Active projects data
│   ├── pending.ts        # Pending projects data
│   └── inactive.ts       # Inactive projects data
├── public/               # Static assets
│   └── logo.png          # Application logo
└── package.json          # Dependencies and scripts
```

## Data Structure

### Project Interfaces

Each project type has a specific TypeScript interface:

**Active Projects**

- Live URL for accessing the project
- Full tech stack information
- Client and project type details
- Last updated timestamp

**Pending Projects**

- Progress percentage (0-100)
- Development stage tracking
- Expected completion timeline
- Technology stack in use

**Inactive Projects**

- Project completion status
- Archive information
- Historical data preservation

### Status Categories

1. **Active (Live & Active)**: Projects that are live and operational
2. **Pending (In Development)**: Projects currently being developed
3. **Inactive (Completed/Paused)**: Projects that are finished or on hold

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/poyrazavsever/status-poyraz.git
cd status-poyraz
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Usage

### Adding New Projects

1. Navigate to the appropriate data file (`data/active.ts`, `data/pending.ts`, or `data/inactive.ts`)
2. Add a new project object following the TypeScript interface
3. The project will automatically appear in the dashboard

### Updating Project Status

Move projects between status categories by:

1. Removing from current data file
2. Adding to target data file with appropriate interface
3. Updating status-specific properties (progress, liveUrl, etc.)

### Customizing Themes

The application supports:

- Light mode
- Dark mode
- System preference detection
- Manual theme switching via navbar

## Performance Optimizations

- **Component Lazy Loading**: Dynamic imports for better performance
- **Image Optimization**: Next.js automatic image optimization
- **CSS Purging**: Tailwind CSS removes unused styles
- **TypeScript Compilation**: Optimized build process
- **Responsive Images**: Adaptive image serving

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Author

**Poyraz Avsever**

- Website: [poyrazavsever.com](https://poyrazavsever.com)
- GitHub: [@poyrazavsever](https://github.com/poyrazavsever)
- LinkedIn: [poyrazavsever](https://www.linkedin.com/in/poyrazavsever/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Live Demo

Visit the live dashboard: [Status Dashboard](https://status.poyrazavsever.com)
