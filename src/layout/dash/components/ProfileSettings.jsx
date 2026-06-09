import { HelpCircle, LogOut, Settings, User } from 'lucide-react';

const ProfileSettings = () => {
  return (
    <div className="mt-auto border-t border-gray-200 px-4 py-2">
      {/* User Profile */}
      <div className="flex items-center p-2.5">
        <User className="mr-3 h-8 w-8 rounded-full border border-gray-400 bg-blue-900 p-1 text-gray-100" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-gray-800">Nayem Islam</div>
          <div className="truncate text-xs text-gray-500">inaeem707@gmail.com</div>
        </div>
      </div>

      {/* Settings Menu */}
      <div className="space-y-1">
        <div className="flex cursor-pointer items-center rounded-lg p-2.5 transition-colors duration-150 hover:bg-gray-100">
          <Settings className="mr-3 h-5 w-5 text-gray-600" />
          <span className="text-sm text-gray-700">Settings</span>
        </div>
        <div className="flex cursor-pointer items-center rounded-lg p-2.5 transition-colors duration-150 hover:bg-gray-100">
          <HelpCircle className="mr-3 h-5 w-5 text-gray-600" />
          <span className="text-sm text-gray-700">Help & Support</span>
        </div>
        <div className="flex cursor-pointer items-center rounded-lg p-2.5 transition-colors duration-150 hover:bg-gray-100">
          <LogOut className="mr-3 h-5 w-5 text-gray-600" />
          <span className="text-sm text-gray-700">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
