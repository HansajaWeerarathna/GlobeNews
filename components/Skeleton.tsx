import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function ArticleSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Skeleton className="h-6 w-3/4 rounded" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Skeleton className="h-4 w-full rounded" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Skeleton className="h-4 w-5/6 rounded" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between items-center"
        >
          <Skeleton className="h-4 w-1/4 rounded" />
          <Skeleton className="h-8 w-1/4 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}
