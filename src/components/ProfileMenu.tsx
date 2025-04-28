import React from "react";
import AdminLogoutButton from "@/components/AdminLogoutButton";

interface ProfileMenuProps {
  user: { name?: string; email?: string };
  open: boolean;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ user, open, anchorRef, onClose }) => {
  if (!open) return null;
  const userName = user?.name || user?.email || "Utilisateur";
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 animate-fadeInUp p-2" ref={anchorRef}>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <div className="rounded-full bg-primary/10 text-primary font-bold w-10 h-10 flex items-center justify-center text-lg">
          {userName[0]?.toUpperCase()}
        </div>
        <div>
          <div className="font-semibold text-gray-900 text-base">{userName.toUpperCase()}</div>
        </div>
      </div>
      <a href="/profile" className="block w-full text-left px-4 py-2 mt-1 mb-1 rounded-lg text-primary font-medium hover:bg-primary/5 transition-colors text-sm flex items-center gap-2">
        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        Mon profil
      </a>
      <div className="px-4 py-2">
        <AdminLogoutButton className="w-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-lg py-2 font-semibold transition-colors text-sm flex items-center justify-center gap-2" />
      </div>
    </div>
  );
};

export default ProfileMenu;
