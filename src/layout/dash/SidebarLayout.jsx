import { Search } from 'lucide-react';
import ChatHistory from './components/ChatHistory';
import ProfileSettings from './components/ProfileSettings';

const SidebarLayout = () => {
  const isPaidUser = false;
  // Actual chat history data mimicking real conversations
  const chatsHistory = [
    {
      id: 1,
      name: 'Python Code Debug',
      preview: 'How to fix this pandas error?',
      initial: 'P',
      active: true,
      time: '10 min ago',
      category: 'Programming',
    },
    {
      id: 2,
      name: 'Travel Itinerary Tokyo Trip',
      preview: '3-day trip to Tokyo recommendations',
      initial: 'T',
      active: false,
      time: '2 hours ago',
      category: 'Planning',
    },
    {
      id: 3,
      name: 'React vs Vue',
      preview: 'Comparison for new project',
      initial: 'R',
      active: false,
      time: 'Yesterday',
      category: 'Programming',
    },
    {
      id: 4,
      name: 'Recipe Ideas',
      preview: 'Vegetarian dinner for 6 people',
      initial: 'R',
      active: false,
      time: 'Mar 12',
      category: 'Cooking',
    },
    {
      id: 5,
      name: 'Investment Advice',
      preview: 'Stock market analysis for beginners',
      initial: 'I',
      active: false,
      time: 'Mar 11',
      category: 'Finance',
    },
    {
      id: 6,
      name: 'Book Summary',
      preview: 'Atomic Habits key takeaways',
      initial: 'B',
      active: false,
      time: 'Mar 10',
      category: 'Learning',
    },
    {
      id: 7,
      name: 'Workout Plan',
      preview: 'Home exercises without equipment',
      initial: 'W',
      active: false,
      time: 'Mar 9',
      category: 'Fitness',
    },
    {
      id: 8,
      name: 'JavaScript Promises',
      preview: 'Async/await examples explained',
      initial: 'J',
      active: false,
      time: 'Mar 8',
      category: 'Programming',
    },
    {
      id: 9,
      name: 'SEO Strategy',
      preview: 'Improve website ranking tips',
      initial: 'S',
      active: false,
      time: 'Mar 7',
      category: 'Marketing',
    },
    {
      id: 10,
      name: 'Budget Planning',
      preview: 'Monthly expense tracker setup',
      initial: 'B',
      active: false,
      time: 'Mar 6',
      category: 'Finance',
    },
    {
      id: 11,
      name: 'Photoshop Tips',
      preview: 'Remove background from image',
      initial: 'P',
      active: false,
      time: 'Mar 5',
      category: 'Design',
    },
    {
      id: 12,
      name: 'Language Learning',
      preview: 'Spanish vocabulary for travel',
      initial: 'L',
      active: false,
      time: 'Mar 4',
      category: 'Education',
    },
    {
      id: 13,
      name: 'Data Analysis',
      preview: 'Python matplotlib visualization',
      initial: 'D',
      active: false,
      time: 'Mar 3',
      category: 'Programming',
    },
    {
      id: 14,
      name: 'Home Garden',
      preview: 'Beginner gardening tips',
      initial: 'H',
      active: false,
      time: 'Mar 2',
      category: 'Hobbies',
    },
    {
      id: 15,
      name: 'Resume Writing',
      preview: 'Software engineer resume tips',
      initial: 'R',
      active: false,
      time: 'Mar 1',
      category: 'Career',
    },
  ];

  return (
    <div className="sticky top-0 flex h-screen w-80 flex-col border-r border-gray-200 bg-gray-50 font-sans">
      {/* Header */}
      <div className="flex justify-center border-b border-gray-200 p-5">
        <img src="/img/logo-white.png" alt="New Chat" className="w-44" />
      </div>
      {isPaidUser ? (
        <>
          {/* New Chat Button */}
          <div className="p-4">
            <button className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700">
              + New Chat
            </button>
          </div>

          {/* Search */}
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Search chats"
                className="w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Your Chats Section */}
          <div className="flex-1 overflow-hidden">
            <h3 className="mb-3 px-5 text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Your chats
            </h3>
            <div className="h-[460px] overflow-y-auto px-4">
              <div className="space-y-2">
                {chatsHistory.map((chat) => (
                  <ChatHistory key={chat.id} chat={chat} />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="text-center">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">Upgrade your plan</h2>
            <p className="mb-6 text-sm text-gray-600">
              Unlock features and enjoy access by upgrading to a premium plan.
            </p>
            <button className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700">
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* User Profile & Settings */}
      <ProfileSettings />
    </div>
  );
};

export default SidebarLayout;
