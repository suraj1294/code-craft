"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavigationHeader from "@/components/navigation-header";
import ProfileHeader from "@/features/profile/components/profile-header";
import ProfileHeaderSkeleton from "@/features/profile/components/profile-header-skeleton";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useGetStarSnippets from "@/features/profile/api/useGetStarSnippets";
import useGetUserStats from "@/features/profile/api/useGetUserStats";
import {
  ExecutionsList,
  StarredSnippetsList,
  TabButton,
  TABS,
} from "@/features/profile/components/code-execution-tabs";
import useGetUserExecutions from "@/features/profile/api/useGetUserExecutions";
import useGetUserData from "@/features/profile/api/useGetUserData";

function ProfilePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"executions" | "starred">(
    "executions"
  );

  const { userStats } = useGetUserStats(user?.id ?? "");
  const { starredSnippets } = useGetStarSnippets();
  const { executions, executionStatus, isLoadingExecutions, loadMore } =
    useGetUserExecutions(user?.id ?? "", 5);
  const userData = useGetUserData(user?.id ?? "");

  const handleLoadMore = () => {
    if (executionStatus === "CanLoadMore") loadMore(5);
  };

  if (!user && isLoaded) return router.push("/");

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavigationHeader />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Profile Header */}
        {userStats && userData && (
          <ProfileHeader
            userStats={userStats}
            userData={userData}
            user={user!}
          />
        )}
        {(userStats === undefined || !isLoaded) && <ProfileHeaderSkeleton />}
        {/* Main content */}
        <div
          className="bg-linear-to-br from-[#12121a] to-[#1a1a2e] rounded-3xl shadow-2xl 
        shadow-black/50 border border-gray-800/50 backdrop-blur-xl overflow-hidden"
        >
          {/* Tabs */}
          <div className="border-b border-gray-800/50">
            <div className="flex space-x-1 p-4">
              {TABS.map((tab) => (
                <TabButton
                  key={tab.id}
                  id={tab.id}
                  icon={tab.icon}
                  label={tab.label}
                  activeTab={activeTab}
                  onClick={() =>
                    setActiveTab(tab.id as "executions" | "starred")
                  }
                />
              ))}
            </div>
          </div>
          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {/* ACTIVE TAB IS EXECUTIONS: */}
              {activeTab === "executions" && (
                <ExecutionsList
                  executions={executions}
                  isLoading={isLoadingExecutions}
                  executionStatus={executionStatus}
                  onLoadMore={handleLoadMore}
                />
              )}
              {/* ACTIVE TAB IS STARS: */}
              {activeTab === "starred" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {starredSnippets?.map((snippet) => (
                    <StarredSnippetsList key={snippet._id} snippet={snippet} />
                  ))}

                  {(!starredSnippets || starredSnippets.length === 0) && (
                    <div className="col-span-full text-center py-12">
                      <Star className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-400 mb-2">
                        No starred snippets yet
                      </h3>
                      <p className="text-gray-500">
                        Start exploring and star the snippets you find useful!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
