import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

interface ArticleCardProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  article: any;
  variant: "featured" | "medium" | "small";
}

export default function ArticleCard({ article, variant }: ArticleCardProps) {
  const imageUrl = article.image;

  const cardVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    },
  };

  if (variant === "featured") {
    return (
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        className="group relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg overflow-hidden shadow-lg"
      >
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px]">
          <Image
            src={imageUrl}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-300 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 p-6 sm:p-8 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-medium mb-2 bg-yellow-400 text-black px-3 py-1 rounded-full inline-block"
            >
              Featured
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 line-clamp-3"
            >
              {article.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm md:text-base text-gray-200 mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3"
            >
              {article.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-between items-center"
            >
              <span className="text-xs sm:text-sm text-gray-300 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
              <motion.a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-400 hover:text-black transition-colors duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read More
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "medium") {
    return (
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        className="group bg-card rounded-lg overflow-hidden shadow-lg h-full flex flex-col"
      >
        <div className="relative h-48 sm:h-56">
          <Image
            src={imageUrl}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="p-4 sm:p-6 flex flex-col flex-grow">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 line-clamp-2 flex-grow"
          >
            {article.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-muted-foreground mb-4 line-clamp-2"
          >
            {article.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-between items-center mt-auto"
          >
            <span className="text-xs text-muted-foreground flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
            <motion.a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium hover:bg-primary/90 transition-colors duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More
              <ArrowRight className="w-3 h-3 ml-1" />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="group bg-card rounded-lg overflow-hidden shadow-lg h-full flex flex-col"
    >
      <div className="relative h-32">
        <Image
          src={imageUrl}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base font-semibold mb-2 line-clamp-2 flex-grow"
        >
          {article.title}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center mt-auto"
        >
          <span className="text-xs text-muted-foreground flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <motion.a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-primary hover:underline flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Read More
            <ArrowRight className="w-3 h-3 ml-1" />
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}
