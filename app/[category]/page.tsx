"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import Skeleton from "@/components/Skeleton";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const [category, setCategory] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [loadMoreDisabled, setLoadMoreDisabled] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      const resolvedParams = await params;
      setCategory(resolvedParams.category);
    };

    fetchCategory();
  }, [params]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/${category}?page=${page}`);
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Failed to fetch articles.");

        setArticles((prevArticles) => [...prevArticles, ...data.articles]);
        setLoadMoreDisabled(data.loadMoreDisabled || false);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchArticles();
    }
  }, [category, page]);

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {category.replace("-", " ")}
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} variant="small" />
          ))}
          {loading &&
            Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
        </div>
        {!loading && !loadMoreDisabled && (
          <button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load More
          </button>
        )}
        {loadMoreDisabled && (
          <p className="text-gray-500 mt-4">No more articles to load.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
