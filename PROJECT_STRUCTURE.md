# Vizhaa Project Structure Documentation

## Overview
This document outlines the reorganized file and folder structure for the Vizhaa event management platform. All names are descriptive and self-explanatory for better understanding and maintenance.

## New Directory Structure

```
src/app/
├── auth/                           # Authentication related pages
│   ├── role-selection/            # User role selection (Organizer/Supplier)
│   ├── user-login/               # User login with forgot password
│   ├── organizer-registration/   # Event organizer signup
│   └── supplier-registration/    # Service supplier signup
│
├── user-dashboard/               # Main user dashboard (post-login landing)
│
├── dashboards/                   # Role-specific dashboards
│   ├── event-organizer/         # Event organizer dashboard
│   └── service-supplier/        # Service supplier dashboard
│
├── pages/                        # Public pages
│   ├── home/                    # Platform home page
│   ├── how-it-works/           # How the platform works
│   └── contact-us/             # Contact information
│
├── shared-components/            # Reusable components
│   ├── layout/                  # Header, Footer, Navigation
│   ├── ui/                     # Buttons, Cards, Modals
│   └── forms/                  # Form components
│
├── api/                         # API routes
│   ├── auth/                   # Authentication endpoints
│   ├── organizer/              # Organizer-specific endpoints
│   └── supplier/               # Supplier-specific endpoints
│
└── contexts/                    # React contexts
    └── ProfileContext.tsx       # User profile context
```

## Page Flow and Navigation

### 1. Entry Point
- **File**: `src/app/page.tsx`
- **Function**: `AuthenticationRedirectPage()`
- **Purpose**: Checks authentication and redirects appropriately
- **Routes**:
  - Authenticated → `/user-dashboard`
  - Not authenticated → `/auth/role-selection`

### 2. Authentication Flow
- **Role Selection**: `/auth/role-selection` → Choose Organizer or Supplier
- **Registration**: 
  - `/auth/organizer-registration` → Event organizer signup
  - `/auth/supplier-registration` → Service supplier signup
- **Login**: `/auth/user-login` → User login with forgot password

### 3. Post-Authentication
- **User Dashboard**: `/user-dashboard` → Main landing page for authenticated users
- **Role-Specific Dashboards**:
  - Event Organizers → `/dashboards/event-organizer`
  - Service Suppliers → `/dashboards/service-supplier`

### 4. Public Pages
- **Home**: `/pages/home` → Platform information and features
- **How It Works**: `/pages/how-it-works` → Process explanation
- **Contact**: `/pages/contact-us` → Contact information and support

## Component Naming Conventions

### Page Components
- `AuthenticationRedirectPage` - Main entry point
- `UserRoleSelectionPage` - Role selection
- `UserLoginPage` - Login functionality
- `UserDashboardPage` - Main dashboard
- `EventOrganizerDashboard` - Organizer-specific dashboard
- `ServiceSupplierDashboard` - Supplier-specific dashboard

### Shared Components
- `AppHeader` - Main navigation header
- `AppFooter` - Site footer
- `UserNavigation` - Authenticated user navigation
- `LoginForm` - Login form component
- `RegistrationForm` - Registration form component

## File Naming Standards

### Pages
- `page.tsx` - Main page component
- `layout.tsx` - Layout wrapper
- `loading.tsx` - Loading component
- `error.tsx` - Error boundary

### Components
- Use PascalCase for component files
- Use descriptive names indicating purpose
- Group related components in folders

### API Routes
- `route.ts` - API endpoint handler
- Use RESTful naming conventions
- Group by feature/entity

## Key Features of New Structure

### 1. Clear Separation of Concerns
- Authentication pages grouped together
- Dashboards separated by user role
- Public pages in dedicated folder
- Shared components centralized

### 2. Descriptive Naming
- All folder and file names are self-explanatory
- Component names indicate their purpose
- No ambiguous abbreviations

### 3. Scalable Architecture
- Easy to add new pages/features
- Components can be easily reused
- Clear hierarchy for navigation

### 4. Developer Friendly
- Easy to locate specific functionality
- Consistent naming patterns
- Logical grouping of related files

## Migration Notes

### Updated Routes
- `/` → Authentication redirect
- `/signup/main` → `/auth/role-selection`
- `/login` → `/auth/user-login`
- `/landing` → `/user-dashboard`
- `/home` → `/pages/home`
- `/howwork` → `/pages/how-it-works`
- `/contact` → `/pages/contact-us`
- `/event-organizers` → `/dashboards/event-organizer`
- `/supplier-dashboard` → `/dashboards/service-supplier`

### Component Updates
All routing references need to be updated to use the new paths. The main changes are in:
- Navigation components
- Router.push() calls
- Link href attributes
- Middleware redirects

## Benefits of New Structure

1. **Improved Maintainability**: Clear organization makes code easier to maintain
2. **Better Collaboration**: Team members can easily understand the structure
3. **Enhanced Scalability**: Easy to add new features and pages
4. **Reduced Confusion**: Descriptive names eliminate guesswork
5. **Professional Standards**: Follows industry best practices for project organization

## Next Steps

1. Update all routing references in existing components
2. Move existing components to appropriate folders
3. Update import statements throughout the project
4. Test all navigation flows
5. Update documentation and README files