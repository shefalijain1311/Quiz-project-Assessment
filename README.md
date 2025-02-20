# Interactive Quiz Platform

A modern, interactive quiz application built with React and TypeScript that features real-time feedback, timer-based questions, and persistent progress tracking.

![Interactive Quiz Platform]

## Features

### Core Functionality
- **Interactive Quiz Interface**
  - Multiple choice questions with instant feedback
  - Visual feedback for correct/incorrect answers
  - Progress tracking during quiz
  - 30-second timer per question

### User Experience
- **Multiple Attempts**
  - Unlimited quiz attempts
  - Complete attempt history
  - Score tracking and statistics
  - Timer-based performance metrics

### Data Persistence
- **IndexedDB Integration**
  - Automatic saving of quiz attempts
  - Persistent storage of scores and timing
  - Complete attempt history tracking

### Technical Features
- Modern React with TypeScript
- Responsive design with Tailwind CSS
- Efficient state management
- Performance optimized
- Clean, modular architecture

## Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/shefalijain1311/Quiz-project-Assessment.git
   cd interactive-quiz-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - The application will automatically reload if you change any source files

## Project Structure

```
src/
├── components/         # React components
│   ├── QuizQuestion   # Question display and interaction
│   ├── QuizTimer      # Countdown timer
│   └── QuizHistory    # Attempt history display
├── data/              # Quiz questions and static data
├── lib/               # Utilities and database handling
└── App.tsx            # Main application component
```

## Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: IndexedDB
- **Build Tool**: Vite

## Features in Detail

### Quiz Flow
1. Users start the quiz
2. Each question has a 30-second timer
3. Instant feedback on answer selection
4. Final score display upon completion
5. Option to retry the quiz

### Progress Tracking
- Score calculation
- Time tracking per question
- Historical attempt records
- Performance statistics

### Data Storage
- Automatic saving of attempts
- Persistent storage using IndexedDB
- Complete history retention

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
