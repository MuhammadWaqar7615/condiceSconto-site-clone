"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const emptySlider = {
  title: "",
  description: "",
  discount: "",
  logo: "/images/placeholder.png",
  link: "#",
  featured: false,
  seoTitle: "",
  seoDescription: "",
  status: "enabled",
  image: "/images/placeholder.png",
};

export default function SliderForm({ slider }) {
  const router = useRouter();
  const isEditing = Boolean(slider?._id);
  const [formData, setFormData] = useState(slider ? { ...emptySlider, ...slider } : emptySlider);
  const [preview, setPreview] = useState(slider?.image || emptySlider.image);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    if (name === "image") setPreview(value || emptySlider.image);
  };

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(isEditing ? `/api/sliders/${slider._id}` : "/api/sliders", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to save slider.");
      router.push("/dashboard/sliders");
      router.refresh();
    } catch (submitError) {
      setError(submitError.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between gap-4"><h1 className="text-2xl font-bold text-gray-800">{isEditing ? "Edit Slider" : "Add Slider"}</h1><Link href="/dashboard/sliders" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Cancel</Link></div>
        <form onSubmit={handleSubmit} className="space-y-8 rounded-xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
          {error && <div className="border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
          <div className="grid gap-6 md:grid-cols-2"><div><label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">Title *</label><input id="title" name="title" required value={formData.title} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent" /></div><div><label htmlFor="discount" className="mb-1 block text-sm font-medium text-gray-700">Discount</label><input id="discount" name="discount" value={formData.discount} onChange={handleChange} placeholder="245€ or 20%" className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent" /></div></div>
          <div><label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">Description</label><textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent" /></div>
          <div className="grid gap-6 md:grid-cols-2"><div><label htmlFor="logo" className="mb-1 block text-sm font-medium text-gray-700">Logo path</label><input id="logo" name="logo" value={formData.logo} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent" /></div><div><label htmlFor="link" className="mb-1 block text-sm font-medium text-gray-700">Link</label><input id="link" name="link" value={formData.link} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent" /></div></div>
          <label className="flex items-center gap-3 text-sm text-gray-700"><input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="h-4 w-4 accent-accent" />Featured</label>
          <div className="grid gap-6 border-t border-gray-100 pt-6 md:grid-cols-2"><div><label htmlFor="seoTitle" className="mb-1 block text-sm font-medium text-gray-700">SEO title</label><input id="seoTitle" name="seoTitle" value={formData.seoTitle} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent" /></div><div><label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700">Status</label><select id="status" name="status" value={formData.status} onChange={handleChange} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent"><option value="enabled">Enabled</option><option value="disabled">Disabled</option></select></div></div>
          <div><label htmlFor="seoDescription" className="mb-1 block text-sm font-medium text-gray-700">SEO description</label><textarea id="seoDescription" name="seoDescription" rows="3" value={formData.seoDescription} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent" /></div>
          <section className="border-t border-gray-100 pt-6"><label htmlFor="image" className="mb-1 block text-sm font-medium text-gray-700">Image path *</label><input id="image" name="image" required value={formData.image} onChange={handleChange} className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent" /><input type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-gray-600" /><p className="mt-2 text-xs text-gray-500">Choose an image to preview. Save a hosted/public image path above.</p><div className="mt-4 flex h-40 w-full max-w-md items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-2"><img src={preview} alt="Slider preview" className="max-h-full max-w-full object-contain" /></div></section>
          <div className="flex justify-end border-t border-gray-100 pt-6"><button type="submit" disabled={loading} className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-accent-hover disabled:opacity-50">{loading ? "Saving..." : "Save Slider"}</button></div>
        </form>
      </div>
    </main>
  );
}
