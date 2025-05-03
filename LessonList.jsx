import React from 'react';

const lessons = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React, including components, props, and state management.",
    duration: "45 min",
    level: "Beginner",
    category: "Web Development"
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Deep dive into modern JavaScript features, async programming, and design patterns.",
    duration: "60 min",
    level: "Advanced",
    category: "Programming"
  },
  {
    id: 3,
    title: "CSS Grid Layout",
    description: "Master CSS Grid for creating complex, responsive layouts with ease.",
    duration: "30 min",
    level: "Intermediate",
    category: "Web Design"
  },
  {
    id: 4,
    title: "Node.js Fundamentals",
    description: "Learn server-side JavaScript with Node.js, including Express and MongoDB integration.",
    duration: "90 min",
    level: "Intermediate",
    category: "Backend"
  },
  {
    id: 5,
    title: "UI/UX Design Principles",
    description: "Understand the core principles of user interface and user experience design.",
    duration: "45 min",
    level: "Beginner",
    category: "Design"
  }
];

const LessonList = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Available Lessons
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Explore our comprehensive collection of programming lessons
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
            All Lessons
          </button>
          <button className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition-colors border border-gray-300">
            Web Development
          </button>
          <button className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition-colors border border-gray-300">
            Programming
          </button>
          <button className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-100 transition-colors border border-gray-300">
            Design
          </button>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                    {lesson.category}
                  </span>
                  <span className="text-sm text-gray-500">{lesson.duration}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {lesson.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {lesson.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {lesson.level}
                  </span>
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Start Lesson →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Previous
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              1
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-indigo-100">
              2
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </button>
            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default LessonList; 