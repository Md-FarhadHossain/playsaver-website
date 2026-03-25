"use server";

import { requireAdmin } from "@/lib/admin";
import { createBlog, updateBlog, deleteBlog } from "@/lib/db";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";

export async function createBlogAction(formData: FormData) {
  const session = await requireAdmin();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = (formData.get("excerpt") as string) || null;
  const image_url = (formData.get("image_url") as string) || null;
  const meta_title = (formData.get("meta_title") as string) || null;
  const meta_desc = (formData.get("meta_desc") as string) || null;
  const published = formData.get("published") === "true" ? 1 : 0;

  const currentSlug = formData.get("slug") as string;
  const slug = currentSlug || slugify(title, { lower: true, strict: true });

  await createBlog({
    id: uuidv4(),
    title,
    slug,
    content,
    excerpt,
    image_url,
    meta_title,
    meta_desc,
    author_id: session.sub,
    published,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  revalidatePath("/blog");
  revalidatePath("/admin");
  return { success: true };
}

export async function updateBlogAction(id: string, formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = (formData.get("excerpt") as string) || null;
  const image_url = (formData.get("image_url") as string) || null;
  const meta_title = (formData.get("meta_title") as string) || null;
  const meta_desc = (formData.get("meta_desc") as string) || null;
  const published = formData.get("published") === "true" ? 1 : 0;
  
  const currentSlug = formData.get("slug") as string;
  const slug = currentSlug || slugify(title, { lower: true, strict: true });

  await updateBlog({
    id,
    title,
    slug,
    content,
    excerpt,
    image_url,
    meta_title,
    meta_desc,
    published,
  });

  revalidatePath("/blog");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteBlogAction(id: string) {
  await requireAdmin();
  await deleteBlog(id);
  revalidatePath("/blog");
  revalidatePath("/admin");
}

export async function togglePublishAction(id: string, currentStatus: number) {
  await requireAdmin();
  await updateBlog({ id, published: currentStatus === 1 ? 0 : 1 });
  revalidatePath("/blog");
  revalidatePath("/admin");
}
