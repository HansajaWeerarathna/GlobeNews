

const MAX_CACHE_SIZE = 50; // Maximum articles in cache
const MAX_FETCHES = 5; // Maximum number of "Load More" clicks
const FETCH_INTERVAL = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

const cache: {/* eslint-disable @typescript-eslint/no-explicit-any */
  [key: string]: { articles: any[]; lastFetched: number; fetchCount: number };
} = {};

export async function GET(
  req: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const resolvedParams = await params; // Await params
  const { category } = resolvedParams; // Now you can access category
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const now = Date.now();

  const apiKey = process.env.GNEWS_API_KEY;

  // Initialize cache if not present
  if (!cache[category]) {
    cache[category] = { articles: [], lastFetched: 0, fetchCount: 0 };
  }

  const categoryCache = cache[category];

  // Periodic update: Fetch the latest 10 articles every 2 hours
  if (now - categoryCache.lastFetched >= FETCH_INTERVAL && page === 1) {
    try {
      const apiUrl = `https://gnews.io/api/v4/top-headlines?topic=${category}&lang=en&apikey=${apiKey}&max=9`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch latest articles for category: ${category}`
        );
      }
      const data = await response.json();

      // Prepend latest articles to the cache
      categoryCache.articles = [...data.articles, ...categoryCache.articles];

      // Trim the cache to the maximum size
      if (categoryCache.articles.length > MAX_CACHE_SIZE) {
        categoryCache.articles = categoryCache.articles.slice(
          0,
          MAX_CACHE_SIZE
        );
      }

      categoryCache.lastFetched = now; // Update last fetched timestamp
    } catch (error) {
      console.error(
        `Error fetching latest articles for category ${category}:`,
        error
      );
    }
  }

  // Handle "Load More" functionality
  if (page > MAX_FETCHES) {
    return new Response(
      JSON.stringify({ articles: [], loadMoreDisabled: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const startIndex = (page - 1) * 10;
  const endIndex = page * 10;

  // Serve articles for the requested page
  const articlesToServe = categoryCache.articles.slice(startIndex, endIndex);
  if (articlesToServe.length === 0) {
    return new Response(
      JSON.stringify({ articles: [], loadMoreDisabled: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  categoryCache.fetchCount = Math.max(categoryCache.fetchCount, page); // Track fetch count

  return new Response(
    JSON.stringify({
      articles: articlesToServe,
      loadMoreDisabled: categoryCache.fetchCount >= MAX_FETCHES,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
