import EditorPanel from "@/features/code-editor/components/editor-panel";
import HeaderSection from "@/features/code-editor/components/header-section";
import OutputPanel from "@/features/code-editor/components/output-panel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto p-4">
        <HeaderSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EditorPanel />
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}
