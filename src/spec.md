# Valentine's Day Interactive Web App

## Overview
A playful, romantic web application where users can ask their girlfriend to be their Valentine through an interactive and humorous interface.

## Core Features

### Main Interface
- Fullscreen centered display with romantic heading "Hey Pallavi!" with animated hearts beside the title
- Two primary buttons: "Yes" and "No" positioned side by side horizontally at the same vertical level
- Romantic background with floating hearts animation using CSS
- Mobile-responsive design

### Interactive Behavior
- **"Yes" Button**: Triggers confetti/heart explosion animation and displays success message
- **"No" Button**: Moves in a precise circular orbit around the "Yes" button when clicked or hovered, using smooth polar coordinate-based motion with easing
- **Orbital Motion Constraints**: The "No" button orbits within a safe radius that ensures both buttons remain fully visible within the viewport at all times, even on smaller screens or during window resizes
- **Smooth Animation**: Orbital movement uses smooth transitions with proper easing functions to create fluid circular motion centered on the "Yes" button
- **Message Positioning System**: Each funny rejection message has a unique fixed on-screen position that is randomly generated once when the app loads and stored in a map or array structure
- **Message Display Logic**: When a specific message is shown during orbital movement, it displays near its pre-assigned coordinates relative to the container, ensuring it stays fully visible within screen boundaries and close to the "No" button without overlapping or going off-screen
- **Text Behavior**: Displays funny rejection messages like "Pleaseee 😭" or "Don't break my heart 💘" during orbital movement with smooth transitions between message positions
- **Initial Layout**: Both buttons start positioned side by side horizontally at the same vertical level

### Visual Effects
- Floating hearts background animation using existing `FloatingHearts` component
- Confetti or heart explosion animation on "Yes" click
- Smooth transitions and playful animations with CSS fade-in and bounce effects
- Precise circular orbital movement animation for the "No" button around the "Yes" button with viewport-aware boundaries
- Animated hearts beside the title text
- Smooth message positioning transitions that maintain readability and screen boundary compliance

### Audio (Optional)
- Soft background soundtrack with toggle on/off functionality

### Success State
- Sweet success message display after "Yes" is clicked
- Placeholder for future image customization

### Footer Requirements
- No footer branding or references to any external services
- Clean interface without any company names, links, or attribution text
- Footer area should be minimal or completely absent

## Technical Requirements
- Frontend-only application (no backend data persistence needed)
- All game state stored in frontend
- Responsive design for mobile and desktop
- CSS animations for visual effects
- Smooth animation transitions using polar coordinates or easing functions for circular motion
- Viewport-aware boundary calculations to ensure both buttons stay fully visible during orbital animation
- Dynamic radius adjustment based on screen size to maintain safe orbital boundaries
- Message coordinate mapping system that assigns unique fixed positions to each message on app load
- Position validation logic to ensure messages remain within screen boundaries and near the "No" button
- Integration with existing `FloatingHearts` background component
