"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { motion, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronRight, Newspaper } from "lucide-react";

export default function HomePage() {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [articlesByCategory, setArticlesByCategory] = useState<any>({});
  const [error, setError] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const categories = [
    { key: "general", name: "General", color: "from-purple-500 to-pink-500" },
    { key: "world", name: "World News", color: "from-blue-500 to-teal-500" },
    {
      key: "business",
      name: "Business",
      color: "from-green-500 to-yellow-500",
    },
    { key: "sports", name: "Sports", color: "from-red-500 to-orange-500" },
    {
      key: "entertainment",
      name: "Entertainment",
      color: "from-indigo-500 to-purple-500",
    },
    {
      key: "technology",
      name: "Technology",
      color: "from-blue-500 to-indigo-500",
    },
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const fetchedArticles: any = {};
      try {
        for (const category of categories) {
          const response = await fetch(`/api/${category.key}`);
          if (!response.ok)
            throw new Error(`Failed to fetch ${category.name}.`);
          const data = await response.json();
          fetchedArticles[category.key] = data.articles;
        }
        setArticlesByCategory(fetchedArticles);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    /* eslint-disable react-hooks/exhaustive-deps */
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-accent">
      <Header />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50"
        style={{ scaleX }}
      />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-destructive bg-destructive/20 p-4 rounded-md mb-6"
          >
            {error}
          </motion.p>
        )}

        {categories.map((category, index) => (
          <CategorySection
            key={category.key}
            category={category}
            articles={articlesByCategory[category.key] || []}
            index={index}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}

function CategorySection({
  category,
  articles,
  index,
}: {
  // eslint-enable @typescript-eslint/no-explicit-any
  category: any; // eslint-enable @typescript-eslint/no-explicit-any ;
  articles: any[];
  index: number;
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const displayedArticles = articles.slice(0, 6);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="mb-16"
      ref={ref}
    >
      <motion.div
        className="flex items-center gap-2 mb-6"
        whileHover={{ x: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Newspaper
          className={`h-8 w-8 text-${category.color.split("-")[1]}-500`}
        />
        <h2
          className={`text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${category.color}`}
        >
          {category.name}
        </h2>
        <ChevronRight
          className={`h-6 w-6 text-${category.color.split("-")[1]}-500`}
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* eslint-disable @typescript-eslint/no-explicit-any */}
        {displayedArticles.map((article: any, articleIndex: number) => (
          <motion.div
            key={articleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.2 + articleIndex * 0.1,
            }}
            className={`
              ${
                articleIndex === 0
                  ? "col-span-1 sm:col-span-2 lg:col-span-3"
                  : ""
              }
              ${
                articleIndex === 1 || articleIndex === 2
                  ? "col-span-1 sm:col-span-1 lg:col-span-1"
                  : ""
              }
              ${articleIndex > 2 ? "col-span-1" : ""}
            `}
          >
            <ArticleCard
              article={article}
              variant={
                articleIndex === 0
                  ? "featured"
                  : articleIndex <= 2
                  ? "medium"
                  : "small"
              }
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
