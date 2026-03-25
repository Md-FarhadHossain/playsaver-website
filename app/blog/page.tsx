import { getAllBlogs } from "@/lib/db";
import Link from "next/link";
import { format } from "date-fns";

export const metadata = {
  title: "Blog - PlaySaver",
  description: "Read the latest tips, tricks, and updates from the PlaySaver team.",
};

export default async function BlogPage() {
  const blogs = await getAllBlogs(true); // only published

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 md:pt-36">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="flex items-center gap-4 mb-8">
           <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">
             &larr; Back to Home
           </Link>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            The PlaySaver <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Insights, updates, and strategies to help you reclaim your time and watch smarter.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-xl">Check back soon for our first post!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link href={`/blog/${blog.slug}`} key={blog.id} className="group flex flex-col rounded-2xl border border-border/60 bg-card overflow-hidden hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300 hover:-translate-y-1">
                {blog.image_url ? (
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <img src={blog.image_url} alt={blog.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="h-48 w-full bg-gradient-to-br from-rose-500/20 to-orange-500/20 flex flex-col items-center justify-center text-white p-6 text-center">
                    <span className="text-4xl opacity-50 mb-2">📰</span>
                    <span className="font-semibold text-lg opacity-80 line-clamp-2">{blog.title}</span>
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-grow">
                  <time className="text-sm font-medium text-rose-600 dark:text-rose-400 mb-2">
                    {format(new Date(blog.created_at), 'MMMM d, yyyy')}
                  </time>
                  <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-rose-500 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-muted-foreground line-clamp-3 mb-4 flex-grow">
                    {blog.excerpt || blog.content.substring(0, 150) + "..."}
                  </p>
                  <div className="mt-auto font-medium text-sm text-foreground flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read article <span aria-hidden="true">&rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
