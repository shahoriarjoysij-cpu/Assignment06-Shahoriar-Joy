# FitLog

FitLog is a responsive workout library and workout planning web application built with Next.js, React, TypeScript, and Tailwind CSS.

The application allows users to browse workouts, view detailed workout information, create a daily workout plan, save workouts for later, and track completed exercises.

## Live Demo

[View Live Demo](https://assignment06-shahoriar-joy.vercel.app/)

## GitHub Repository

[View Source Code](https://github.com/shahoriarjoysij-cpu/Assignment06-Shahoriar-Joy)

## Features

- Responsive workout library
- 12 workouts loaded from an external REST API
- Workout cards with images and muscle group tags
- Workout equipment information
- Workout duration, calories, and rating
- Detailed workout information page
- Sets and reps information
- Step-by-step workout instructions
- Add workouts to Today's Plan
- Save workouts for later
- Live Plan and Saved counters
- Maximum 5 workouts in Today's Plan
- Mark workouts as completed
- Remove workouts from Today's Plan
- Remove saved workouts
- Toast notifications for user actions
- LocalStorage support for persistent data
- Sort workouts by Duration, Calories, or Rating
- Responsive design for mobile, tablet, and desktop
- Custom loading screen
- Custom 404 page
- Responsive navigation
- Footer with project information

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- REST API
- LocalStorage

## API

FitLog uses an external workout API to load workout data.

### Primary API

All Workouts:

https://api.abcz.workers.dev/api/fitlog

Single Workout:

https://api.abcz.workers.dev/api/fitlog/:id

### Alternative API

All Workouts:

https://api.api-store.workers.dev/api/fitlog

Single Workout:

https://api.api-store.workers.dev/api/fitlog/:id

## Main Routes

| Route | Description |
|---|---|
| `/` | Workout Library |
| `/workout/[id]` | Workout Details |
| `/my-plan` | Today's Plan and Saved Workouts |

## Workout Library

The home page contains a workout library with all available workouts.

Each workout card includes:

- Workout image
- Muscle group tags
- Workout name
- Equipment
- Duration
- Calories
- Rating

Users can sort the workout list using:

- Duration
- Calories
- Rating

Clicking a workout card opens its detailed workout page.

## Workout Details

Each workout detail page provides:

- Workout image
- Workout name
- Description
- Muscle group tags
- Equipment
- Difficulty
- Sets
- Reps
- Duration
- Calories
- Rating
- Step-by-step instructions

Users can also:

- Add the workout to Today's Plan
- Save the workout for later

## My Plan

The My Plan page contains two tabs:

### Today's Plan

Users can view their selected workouts and see:

- Total exercises
- Total minutes
- Total calories

Each planned workout includes:

- Workout image
- Workout name
- Muscle groups
- Duration
- Calories
- Rating
- View Details
- Mark as Done
- Remove

Today's Plan has a maximum limit of five workouts.

### Saved

Users can save workouts and access them later from the Saved tab.

Saved workouts can also be viewed or removed.

## LocalStorage

FitLog uses browser LocalStorage to keep user data after page reloads.

The following data is stored:

- `fitlog-plan`
- `fitlog-saved`

This allows Today's Plan and Saved Workouts to remain available after refreshing the browser.

## Responsive Design

FitLog is designed to work across different screen sizes:

- Mobile
- Tablet
- Desktop

The layout automatically adapts for different devices, including:

- Responsive navigation
- Responsive hero section
- Responsive workout grid
- Responsive workout details
- Responsive My Plan cards
- Responsive footer

## Loading and Error Handling

The application includes:

- Loading animation while workout data is being fetched
- Error message when workout data cannot be loaded
- Custom 404 page for invalid routes

## Project Structure

```text
fitlog/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── my-plan/
│   │   └── page.tsx
│   └── workout/
│       ├── page.tsx
│       └── [id]/
│           └── page.tsx
│
├── components/
│   ├── DetailActions.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HomeLibrary.tsx
│   ├── Navbar.tsx
│   ├── PlanProvider.tsx
│   ├── Toast.tsx
│   └── WorkoutCard.tsx
│
├── lib/
│   └── api.ts
│
├── public/
│   └── banner.png
│
├── README.md
├── package.json
└── tsconfig.json