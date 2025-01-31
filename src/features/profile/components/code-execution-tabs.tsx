import {
  ChevronRight,
  Clock,
  Code,
  Link,
  ListVideo,
  Loader2,
  LucideProps,
  Star,
} from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import Image from "next/image";
import { motion } from "framer-motion";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import CodeBlock from "./code-block";
import StarButton from "@/components/star-button";

export interface Executions {
  _id: Id<"codeExecutions">;
  _creationTime: number;
  output?: string | undefined;
  error?: string | undefined;
  userId: string;
  language: string;
  code: string;
}

export interface StarredSnippets {
  _id: Id<"snippets">;
  _creationTime: number;
  userId: string;
  language: string;
  code: string;
  title: string;
  userName: string;
}

export const TABS = [
  {
    id: "executions",
    label: "Code Executions",
    icon: ListVideo,
  },
  {
    id: "starred",
    label: "Starred Snippets",
    icon: Star,
  },
];

export const TabButton = ({
  id,
  icon,
  label,
  activeTab,
  onClick,
}: {
  id: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  activeTab: string;
  onClick: () => void;
}) => {
  const Icon = icon;

  return (
    <button
      key={id}
      onClick={onClick}
      className={`group flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 relative overflow-hidden ${
        activeTab === id ? "text-blue-400" : "text-gray-400 hover:text-gray-300"
      }`}
    >
      {activeTab === id && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-blue-500/10 rounded-lg"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.6,
          }}
        />
      )}

      <Icon className="w-4 h-4 relative z-10" />
      <span className="text-sm font-medium relative z-10">{label}</span>
    </button>
  );
};

export const ExecutionsList = ({
  executions,
  onLoadMore,
  isLoading,
  executionStatus,
}: {
  executions: Executions[];
  onLoadMore: () => void;
  isLoading: boolean;
  executionStatus: string;
}) => {
  return (
    <div className="space-y-6">
      {executions?.map((execution) => (
        <div
          key={execution._id}
          className="group rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-md hover:shadow-blue-500/50"
        >
          <div className="flex items-center justify-between p-4 bg-black/30 border border-gray-800/50 rounded-t-xl">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-20 group-hover:opacity-30 transition-opacity" />
                <Image
                  src={"/" + execution.language + ".png"}
                  alt=""
                  className="rounded-lg relative z-10 object-cover"
                  width={40}
                  height={40}
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">
                    {execution.language.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">
                    {new Date(execution._creationTime).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      execution.error
                        ? "bg-red-500/10 text-red-400"
                        : "bg-green-500/10 text-green-400"
                    }`}
                  >
                    {execution.error ? "Error" : "Success"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-black/20 rounded-b-xl border border-t-0 border-gray-800/50">
            <CodeBlock code={execution.code} language={execution.language} />

            {(execution.output || execution.error) && (
              <div className="mt-4 p-4 rounded-lg bg-black/40">
                <h4 className="text-sm font-medium text-gray-400 mb-2">
                  Output
                </h4>
                <pre
                  className={`text-sm ${
                    execution.error ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {execution.error || execution.output}
                </pre>
              </div>
            )}
          </div>
        </div>
      ))}

      {isLoading ? (
        <div className="text-center py-12">
          <Loader2 className="w-12 h-12 text-gray-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">
            Loading code executions...
          </h3>
        </div>
      ) : (
        executions.length === 0 && (
          <div className="text-center py-12">
            <Code className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">
              No code executions yet
            </h3>
            <p className="text-gray-500">
              Start coding to see your execution history!
            </p>
          </div>
        )
      )}

      {/* Load More Button */}
      {executionStatus === "CanLoadMore" && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            className="px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg flex items-center gap-2 
                          transition-colors"
          >
            Load More
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export const StarredSnippetsList = ({
  snippet,
}: {
  snippet: StarredSnippets;
}) => {
  return (
    <div className="group relative">
      <Link href={`/snippets/${snippet._id}`}>
        <div
          className="bg-black/20 rounded-xl border border-gray-800/50 hover:border-gray-700/50 
                            transition-all duration-300 overflow-hidden h-full group-hover:transform
                          group-hover:scale-[1.02]"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-20 group-hover:opacity-30 transition-opacity" />
                  <Image
                    src={`/${snippet.language}.png`}
                    alt={`${snippet.language} logo`}
                    className="relative z-10"
                    width={40}
                    height={40}
                  />
                </div>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-sm">
                  {snippet.language}
                </span>
              </div>
              <div
                className="absolute top-6 right-6 z-10"
                onClick={(e) => e.preventDefault()}
              >
                <StarButton snippetId={snippet._id} />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-white mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors">
              {snippet.title}
            </h2>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {new Date(snippet._creationTime).toLocaleDateString()}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="bg-black/30 rounded-lg p-4 overflow-hidden">
              <pre className="text-sm text-gray-300 font-mono line-clamp-3">
                {snippet.code}
              </pre>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
