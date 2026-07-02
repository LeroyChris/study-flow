export const BULLET_COLORS = [
    'bg-emerald-500',
    'bg-blue-500',
    'bg-amber-500',
    'bg-rose-500',
    'bg-violet-500',
    'bg-cyan-500',
    'bg-orange-500',
    'bg-pink-500',
  ];

  const SEED_DECKS = [
    {
      id: 'seed-1',
      title: 'JavaScript Basics',
      description: 'Core JavaScript concepts for web development',
      category: 'Web Development',
      colorIndex: 0,
      createdAt: '2026-06-15T00:00:00.000Z',
      updatedAt: '2026-06-15T00:00:00.000Z',
      cards: [
        { id: 'sc-1', question: 'What is a variable?', answer: 'A container for storing data values.' },
        { id: 'sc-2', question: 'What is a function?', answer: 'A reusable block of code that performs a task.' },
        { id: 'sc-3', question: 'What is an array?', answer: 'An ordered collection of values.' },
        { id: 'sc-4', question: 'What does typeof return?', answer: 'A string indicating the data type of a value.' },
      ],
    },
    {
      id: 'seed-2',
      title: 'React Fundamentals',
      description: 'Key concepts for building React applications',
      category: 'Frontend',
      colorIndex: 1,
      createdAt: '2026-06-15T01:00:00.000Z',
      updatedAt: '2026-06-15T01:00:00.000Z',
      cards: [
        { id: 'sc-5', question: 'What is JSX?', answer: 'A syntax extension for JavaScript that looks similar to HTML.' },
        { id: 'sc-6', question: 'What is a component?', answer: 'A reusable piece of UI.' },
        { id: 'sc-7', question: 'What are props?', answer: 'Read-only inputs passed to a component.' },
        { id: 'sc-8', question: 'What is useState?', answer: 'A hook that lets you add state to function components.' },
      ],
    },
    {
      id: 'seed-3',
      title: 'Data Science Terms',
      description: 'Common terminology used in data science and ML',
      category: 'Data Science',
      colorIndex: 2,
      createdAt: '2026-06-15T02:00:00.000Z',
      updatedAt: '2026-06-15T02:00:00.000Z',
      cards: [
        { id: 'sc-9', question: 'What is supervised learning?', answer: 'Training a model on labeled data.' },
        { id: 'sc-10', question: 'What is overfitting?', answer: 'When a model learns noise instead of the signal.' },
        { id: 'sc-11', question: 'What is a dataset?', answer: 'A collection of data used for training or analysis.' },
      ],
    },
  ];

  export { SEED_DECKS };