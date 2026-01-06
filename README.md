# Trackman Scorecard Reader

A modern React application that uses Google Gemini AI (Vision) to extract golf scores from Trackman scorecard photos and calculate analytics.

https://github.com/user-attachments/assets/edf3c327-b10f-4bb2-be79-f794f56e34b6

## Features

- **AI-Powered OCR**: Uses Gemini 2.0/1.5 Flash to accurately parse complex scorecard grids.
- **Stableford Analytics**: Automatically calculates score counts (Birdies, Pars, Bogeys, etc.).
- **Multi-Player Support**: Handles scorecards with multiple players and provides tabbed results.
- **Copy Summary**: One-click summary copy for sharing results.
- **Responsive Design**: Optimized for both Desktop (stable wide layout) and Mobile (full-width stack).
- **Secure**: API Key is stored locally in your browser and never sent to a backend.

## Tech Stack

- **Frontend**: React + Vite
- **AI Integration**: Google Generative AI SDK
- **Styling**: Vanilla CSS (Custom UI Overhaul)
- **Deployment**: GitHub Pages

## Getting Started

1. **Clone the repo**
2. **Install dependencies**: `npm install`
3. **Start dev server**: `npm run dev`
4. **Setup API Key**: Obtain a free Gemini API Key from [AI Studio](https://aistudio.google.com/app/apikey) and enter it in the app settings.

## License

MIT
