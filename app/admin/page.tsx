import { getAllBlogs } from "@/lib/db";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, CheckCircle2, XCircle, FileText } from "lucide-react";
import { deleteBlogAction, togglePublishAction } from "@/app/actions/blog";
import { format } from "date-fns";

export default async function AdminDashboard() {
  const blogs = await getAllBlogs(); // fetches all, including drafts

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your blog posts, drafts, and publications.</p>
        </div>
        <Link href="/admin/blogs/new" className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 transition">
          <PlusCircle size={16} />
          Create Post
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {blogs.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground flex flex-col items-center">
            <FileText size={48} className="mb-4 opacity-20" />
            <p>No blog posts found. Create your first post!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-medium">Title</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground truncate max-w-[300px]">{blog.title}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[300px]">/{blog.slug}</p>
                    </td>
                    <td className="px-6 py-4">
                      <form action={togglePublishAction.bind(null, blog.id, blog.published)}>
                        <button type="submit" className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${blog.published === 1 ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'}`}>
                          {blog.published === 1 ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                          {blog.published === 1 ? 'Published' : 'Draft'}
                        </button>
                      </form>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {format(new Date(blog.created_at), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/blogs/${blog.id}/edit`} className="p-2 text-muted-foreground hover:text-violet-600 hover:bg-violet-500/10 rounded-md transition">
                          <Edit size={16} />
                        </Link>
                        <form action={deleteBlogAction.bind(null, blog.id)}>
                          <button type="submit" className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-500/10 rounded-md transition" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
