import { LiaUserEditSolid } from "react-icons/lia";
import { IoLanguageOutline } from "react-icons/io5";
import { useSidebar } from "@/components/ui/sidebar";

export default function Settings() {
  const { setOpen, open } = useSidebar();

  return (
    <div>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 -z-1"></div>
      )}
      <div className="text-3xl font-semibold  ">Settings</div>
      <div className="mt-8 flex gap-4 ">
        <button
          className="bg-navbgprimary  text-primary-color py-12 px-16  rounded-lg flex flex-col items-center"
          onClick={() => setOpen(true, "SETTINGS_UPDATE")}
        >
          <LiaUserEditSolid size={38} />
          <span>Update Profile</span>
        </button>
        <button
          className="bg-navbgprimary text-primary-color py-12 px-16 rounded-lg flex flex-col items-center"
          onClick={() => setOpen(true, "SETTINGS_LANG")}
        >
          <IoLanguageOutline size={38} />
          <span>Language Settings</span>
        </button>
      </div>
    </div>
  );
}
