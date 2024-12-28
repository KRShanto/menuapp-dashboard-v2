import { useState } from "react";
import SidebarFooter from "../sidebar/SidebarFooter";
import { Check } from "lucide-react";

export default function SettingsLang() {
  const [selectedLang, setSelectedLang] = useState("eng");
  async function onSubmit(data: FormData) {
    console.log("Form Submitted", data);
  }

  return (
    <div className="h-[85%]">
      <div className="text-2xl mt-2  mb-4 ml-3">Select Yout Language</div>
      <div className="flex justify-center">
        <div className="h-[2px] w-[94%] bg-white mb-4" />
      </div>
      {/* @ts-ignore */}
      <form action={onSubmit} className="h-[97%] p-3">
        <div className="h-[95%]">
          <div className="relative mt-4 flex items-center justify-between">
            <label className="" htmlFor="eng">
              English
            </label>
            <div className="relative">
              <input
                type="radio"
                id="eng"
                name="language"
                value="eng"
                checked={selectedLang === "eng"}
                onChange={() => setSelectedLang("eng")}
                className="w-6 h-6 appearance-none rounded-full bg-black border border-gray-600"
              />
              {selectedLang === "eng" && (
                <Check className="absolute inset-0 m-auto h-4 w-4 text-white -top-1" />
              )}
            </div>
          </div>
          <div className="relative mt-4 flex items-center justify-between">
            <label htmlFor="arabic">عربي</label>
            <div className="relative">
              <input
                type="radio"
                id="arabic"
                name="language"
                value="arabic"
                checked={selectedLang === "arabic"}
                onChange={() => setSelectedLang("arabic")}
                className="w-6 h-6 appearance-none rounded-full bg-black border border-gray-600"
              />
              {selectedLang === "arabic" && (
                <Check className="absolute inset-0 m-auto h-4 w-4 text-white -top-1" />
              )}
            </div>
          </div>
        </div>
        <SidebarFooter successBtnText="Add" />
      </form>
    </div>
  );
}
