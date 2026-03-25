import { getBlogBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog || !blog.published) return { title: "Not Found" };
  
  return {
    title: blog.meta_title || `${blog.title} - PlaySaver`,
    description: blog.meta_desc || blog.excerpt || blog.title,
    openGraph: {
      images: blog.image_url ? [{ url: blog.image_url }] : [],
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog || !blog.published) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <article className="mx-auto max-w-3xl px-6">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-10 transition-colors">
          <ArrowLeft size={16} />
          Back to all posts
        </Link>
        
        <header className="mb-12">
          <time className="text-sm font-semibold tracking-wider text-rose-600 uppercase dark:text-rose-400">
            {format(new Date(blog.created_at), 'MMMM d, yyyy')}
          </time>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl leading-[1.1]">
            {blog.title}
          </h1>
        </header>

        {blog.image_url && (
          <div className="mb-12 overflow-hidden rounded-2xl shadow-xl w-full">
            <img src={blog.image_url} alt={blog.title} className="w-full h-auto object-cover max-h-[500px]" />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert prose-rose max-w-none prose-headings:font-bold prose-a:text-rose-600 dark:prose-a:text-rose-400">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {blog.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
