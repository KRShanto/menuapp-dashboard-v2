import { EmptyComp } from "./EmptyComp";
import { Header } from "./Header";


export default function MainContent() {
  return (
    <div className="flex-1 bg-gray-800 p-6">
      <Header />
      <EmptyComp />
    </div>
  );
}