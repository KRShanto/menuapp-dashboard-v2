import SidebarFooter from "../sidebar/SidebarFooter";

export default function ManagerAdd() {
  return (
    // @ts-ignore

    <form className="h-[90%] p-3">
      <div className="h-[95%]">
        <div className="relative mt-4">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="name"
          >
            Username
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
          />
        </div>
        <div className="relative mt-5">
          <label
            className="absolute -top-3 left-2 z-20 text-nowrap bg-[#2B2A2C] px-2 text-sm text-foreground/70"
            htmlFor="category"
          >
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-md border border-foreground/70 bg-transparent p-2 px-3 placeholder-foreground/70 outline-none"
          />
        </div>
      </div>
      <SidebarFooter successBtnText="Add" />
    </form>
  );
}
