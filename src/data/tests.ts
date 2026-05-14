export interface Question {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
}

export interface SkillTest {
  skill_id: string;
  questions: Question[];
}

export const MOCK_TESTS: Record<string, SkillTest> = {
  'html-basics': {
    skill_id: 'html-basics',
    questions: [
      {
        id: 'q1',
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyperlink and Text Markup Language', 'Home Tool Markup Language'],
        correct_answer: 'Hyper Text Markup Language',
      },
      {
        id: 'q2',
        question: 'Which tag is used for the largest heading?',
        options: ['<h6>', '<head>', '<h1>', '<header>'],
        correct_answer: '<h1>',
      },
      {
        id: 'q3',
        question: 'What is the correct HTML element for inserting a line break?',
        options: ['<break>', '<br>', '<lb>', '<b>'],
        correct_answer: '<br>',
      },
      {
        id: 'q4',
        question: 'Which tag is used to define an unordered list?',
        options: ['<ul>', '<ol>', '<li>', '<list>'],
        correct_answer: '<ul>',
      },
      {
        id: 'q5',
        question: 'What is the correct HTML for creating a hyperlink?',
        options: ['<a>http://example.com</a>', '<a url="http://example.com">Example</a>', '<a href="http://example.com">Example</a>', '<link src="http://example.com">Example</link>'],
        correct_answer: '<a href="http://example.com">Example</a>',
      }
    ]
  },
  'css-basics': {
    skill_id: 'css-basics',
    questions: [
      {
        id: 'q1',
        question: 'What does CSS stand for?',
        options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
        correct_answer: 'Cascading Style Sheets',
      },
      {
        id: 'q2',
        question: 'Which HTML attribute is used to define inline styles?',
        options: ['class', 'font', 'styles', 'style'],
        correct_answer: 'style',
      },
      {
        id: 'q3',
        question: 'Which property is used to change the background color?',
        options: ['color', 'bgcolor', 'background-color', 'bg-color'],
        correct_answer: 'background-color',
      },
      {
        id: 'q4',
        question: 'How do you add a comment in a CSS file?',
        options: ['// this is a comment', '/* this is a comment */', '<!-- this is a comment -->', '\' this is a comment'],
        correct_answer: '/* this is a comment */',
      },
      {
        id: 'q5',
        question: 'Which property is used to change the text color of an element?',
        options: ['text-color', 'fgcolor', 'color', 'font-color'],
        correct_answer: 'color',
      }
    ]
  },
  'git-version-control': {
    skill_id: 'git-version-control',
    questions: [
      {
        id: 'q1',
        question: 'Which command is used to save your changes to the local repository?',
        options: ['git push', 'git commit', 'git add', 'git save'],
        correct_answer: 'git commit',
      },
      {
        id: 'q2',
        question: 'How do you create a new branch and switch to it immediately?',
        options: ['git branch new-branch', 'git checkout -b new-branch', 'git switch new-branch', 'git new branch'],
        correct_answer: 'git checkout -b new-branch',
      }
    ]
  },
  'apis-rest': {
    skill_id: 'apis-rest',
    questions: [
      {
        id: 'q1',
        question: 'Which HTTP method is typically used to create a new resource?',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        correct_answer: 'POST',
      },
      {
        id: 'q2',
        question: 'What does a 404 status code indicate?',
        options: ['Internal Server Error', 'Unauthorized', 'Not Found', 'Bad Request'],
        correct_answer: 'Not Found',
      }
    ]
  }
};
