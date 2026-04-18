"use client";

import { useState, useRef } from "react";
import { createBlogAction, updateBlogAction } from "@/app/actions/blog";
import type { DbBlog } from "@/lib/db";
import { Loader2, ArrowLeft, Image as ImageIcon, Bold, Italic, Link as LinkIcon, List, Heading2, Quote } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function BlogForm({ blog }: { blog?: DbBlog }) {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(blog?.content || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    setContent(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 10);
  };

  const handleImageInsert = () => {
    const url = prompt("Enter the image URL:");
    if (!url) return;
    const alt = prompt("Enter image description (alt text):") || "Image";
    insertText(`\n![${alt}](${url})\n`);
  };

  const ToolbarButton = ({ icon: Icon, onClick, title }: any) => (
    <button 
      type="button" 
      onClick={onClick} 
      onMouseDown={(e) => e.preventDefault()}
      title={title} 
      className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition border border-transparent hover:border-border"
    >
      <Icon size={16} />
    </button>
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      if (blog?.id) {
        await updateBlogAction(blog.id, formData);
      } else {
        await createBlogAction(formData);
      }
      router.push("/admin");
    } catch (err: any) {
      console.error(err);
      setLoading(false);
      alert("Failed to save blog post.");
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin" className="p-2 border border-border rounded-xl hover:bg-muted transition text-muted-foreground">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{blog ? "Edit Post" : "Create New Post"}</h1>
          <p className="text-muted-foreground mt-1">{blog ? "Make changes to your post" : "Write something amazing"}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 rounded-xl border border-border bg-card space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Title</label>
            <input name="title" required defaultValue={blog?.title} className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-violet-500 outline-none transition" placeholder="Post title..." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Slug (Optional)</label>
            <input name="slug" defaultValue={blog?.slug} className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-violet-500 outline-none transition" placeholder="e.g. my-awesome-post" />
            <p className="text-xs text-muted-foreground">Leave blank to auto-generate from title.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Excerpt</label>
            <textarea name="excerpt" defaultValue={blog?.excerpt || ""} className="w-full h-24 p-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-violet-500 outline-none transition resize-none" placeholder="A short description for the blog listing..." />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold">Content (Markdown Supported)</label>
              <div className="flex items-center gap-1 bg-background border border-border rounded-lg p-1">
                <ToolbarButton icon={Bold} title="Bold" onClick={() => insertText("**", "**")} />
                <ToolbarButton icon={Italic} title="Italic" onClick={() => insertText("*", "*")} />
                <ToolbarButton icon={Heading2} title="Heading" onClick={() => insertText("## ")} />
                <div className="w-px h-4 bg-border mx-1" />
                <ToolbarButton icon={Quote} title="Quote" onClick={() => insertText("> ")} />
                <ToolbarButton icon={List} title="List" onClick={() => insertText("- ")} />
                <div className="w-px h-4 bg-border mx-1" />
                <ToolbarButton icon={LinkIcon} title="Link" onClick={() => insertText("[", "](url)")} />
                <ToolbarButton icon={ImageIcon} title="Insert Image" onClick={handleImageInsert} />
              </div>
            </div>
            <textarea 
              ref={textareaRef}
              name="content" 
              required 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[400px] p-4 font-mono text-sm shadow-inner rounded-lg border border-border bg-background focus:ring-2 focus:ring-violet-500 outline-none transition resize-y" 
              placeholder="Write your post content here in Markdown..." 
            />
          </div>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card space-y-6 shadow-sm">
          <h3 className="font-semibold text-lg border-b border-border pb-3">SEO & Media</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold">Cover Image URL</label>
            <input name="image_url" defaultValue={blog?.image_url || ""} type="url" className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-violet-500 outline-none transition" placeholder="https://..." />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Meta Title</label>
            <input name="meta_title" defaultValue={blog?.meta_title || ""} className="w-full h-11 px-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-violet-500 outline-none transition" placeholder="SEO Title" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Meta Description</label>
            <textarea name="meta_desc" defaultValue={blog?.meta_desc || ""} className="w-full h-24 p-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-violet-500 outline-none transition resize-none" placeholder="SEO Description..." />
          </div>

          <div className="flex items-center gap-3 pt-3">
            <input type="checkbox" name="published" value="true" defaultChecked={blog?.published === 1} className="w-5 h-5 rounded border-border accent-violet-600 focus:ring-violet-500" id="published" />
            <label htmlFor="published" className="font-semibold cursor-pointer text-foreground">Publish immediately</label>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Link href="/admin" className="px-6 py-2.5 rounded-lg font-medium border border-border bg-background hover:bg-muted transition">
            Cancel
          </Link>
          <button disabled={loading} type="submit" className="flex items-center justify-center gap-2 px-8 py-2.5 rounded-lg font-medium shadow-md bg-violet-600 text-white hover:bg-violet-700 transition disabled:opacity-70">
            {loading && <Loader2 size={16} className="animate-spin" />}
            {blog ? "Save Changes" : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
