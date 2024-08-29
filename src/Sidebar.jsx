import { UserButton, useUser } from "@clerk/clerk-react";

function Sidebar({ isOpen, onClose }) {
  const { user } = useUser();

  const fullName = user ? `${user.firstName} ${user.lastName}` : user?.username;

  return (
    <div
      className={`bg-gray-800 text-white w-64 min-w-[16rem] p-4 h-screen flex flex-col justify-between fixed top-0 left-0 z-30 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0`}
    >
      <div>
        <h1 className="text-2xl font-bold mb-4">AI Chat App</h1>
        <nav>{/* Add navigation items here in the future */}</nav>
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <UserButton afterSignOutUrl="/" />
          <span className="text-sm font-medium">{fullName}</span>
        </div>
      </div>
      <button
        className="md:hidden absolute top-4 right-4 text-white"
        onClick={onClose}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

export default Sidebar;
