"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const emptyCategory = {
  title: "",
  description: "",
  icon: "",
  showInMenu: true,
  featured: false,
  seoTitle: "",
  seoDescription: "",
  status: "enabled",
  image: "/images/placeholder.png",
};

export default function CategoryForm({ category }) {
  const router = useRouter();
  const [formData, setFormData] = useState(category ? { ...emptyCategory, ...category } : emptyCategory);
  const [imagePreview, setImagePreview] = useState(category?.image || emptyCategory.image);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isEditing = Boolean(category?._id);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    if (name === "image") setImagePreview(value || emptyCategory.image);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(isEditing ? `/api/categories/${category._id}` : "/api/categories", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to save category.");
      router.push("/dashboard/categories");
      router.refresh();
    } catch (submitError) {
      setError(submitError.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">{isEditing ? "Edit Category" : "Add Category"}</h1>
          <Link href="/dashboard/categories" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Cancel</Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 rounded-xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
          {error && <div className="border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

          <section className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">Title *</label>
              <input id="title" name="title" required value={formData.title} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label htmlFor="icon" className="mb-1 block text-sm font-medium text-gray-700">Icon</label>
              <div className="flex gap-2">
                <input id="icon" name="icon" value={formData.icon} onChange={handleChange} placeholder="Icon name or SVG URL" className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent" />
                <a href="https://tabler-icons.io/" target="_blank" rel="noreferrer" className="shrink-0 rounded-lg border border-accent px-3 py-2 text-sm font-medium text-accent hover:bg-accent-light">Select Icon</a>
              </div>
            </div>
          </section>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent" />
          </div>

          <section className="grid gap-4 border-t border-gray-100 pt-6 sm:grid-cols-2">
            <label className="flex items-center gap-3 text-sm text-gray-700"><input type="checkbox" name="showInMenu" checked={formData.showInMenu} onChange={handleChange} className="h-4 w-4 accent-accent" />Show in menu</label>
            <label className="flex items-center gap-3 text-sm text-gray-700"><input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="h-4 w-4 accent-accent" />Featured</label>
          </section>

          <section className="grid gap-6 border-t border-gray-100 pt-6 md:grid-cols-2">
            <div>
              <label htmlFor="seoTitle" className="mb-1 block text-sm font-medium text-gray-700">SEO title</label>
              <input id="seoTitle" name="seoTitle" value={formData.seoTitle} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent" />
            </div>
            <div>
              <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700">Status</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent"><option value="enabled">Enabled</option><option value="disabled">Disabled</option></select>
            </div>
          </section>

          <div>
            <label htmlFor="seoDescription" className="mb-1 block text-sm font-medium text-gray-700">SEO description</label>
            <textarea id="seoDescription" name="seoDescription" rows="3" value={formData.seoDescription} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent" />
          </div>

          <section className="border-t border-gray-100 pt-6">
            <label htmlFor="image" className="mb-1 block text-sm font-medium text-gray-700">Image</label>
            <input id="image" name="image" value={formData.image} onChange={handleChange} placeholder="/images/placeholder.png" className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent" />
            <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-600" />
            <p className="mt-2 text-xs text-gray-500">Recommended size: 350 x 350. The file chooser previews the image; provide its hosted path above before saving.</p>
            <div className="mt-4 flex h-40 w-40 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-2"><img src={imagePreview} alt="Category preview" className="max-h-full max-w-full object-contain" /></div>
          </section>

          <div className="flex justify-end border-t border-gray-100 pt-6"><button type="submit" disabled={loading} className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-accent-hover disabled:opacity-50">{loading ? "Saving..." : "Save Category"}</button></div>
        </form>
      </div>
    </main>
  );
}
