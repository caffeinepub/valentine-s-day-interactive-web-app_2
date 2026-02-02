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
- **"No" Button**: Simple static button without orbital movement or position changes
- **Text Behavior**: Displays funny rejection messages like "Pleaseee 😭" or "Don't break my heart 💘" when "No" button is interacted with
- **Initial Layout**: Both buttons start and remain positioned side by side horizontally at the same vertical level

### Visual Effects
- Floating hearts background animation using existing `FloatingHearts` component
- Confetti or heart explosion animation on "Yes" click
- Smooth transitions and playful animations with CSS fade-in and bounce effects
- Animated hearts beside the title text
- Basic message display transitions that maintain readability

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
- Simple button interactions without complex positioning logic
- Integration with existing `FloatingHearts` background component
