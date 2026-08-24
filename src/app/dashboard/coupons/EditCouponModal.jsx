"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditCouponModal({ isOpen, onClose, coupon }) {
  const router = useRouter();

  const [couponType, setCouponType] = useState("code");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discountValue: "",
    startsAt: "",
    expiresAt: "",
    code: "",
    couponUrl: "",
    terms: "",
    isActive: true,
    isFeatured: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (coupon && isOpen) {
      setCouponType(coupon.type || "code");
      setFormData({
        title: coupon.title || "",
        description: coupon.description || "",
        discountValue: coupon.discount || "",
        startsAt: coupon.startsAt ? coupon.startsAt.split("T")[0] : "",
        expiresAt: coupon.expiresAt ? coupon.expiresAt.split("T")[0] : "",
        code: coupon.code || "",
        couponUrl: coupon.couponUrl || "",
        terms: coupon.terms || "",
        isActive: coupon.isActive ?? true,
        isFeatured: coupon.isFeatured ?? false,
      });
      setError("");
    }
  }, [coupon, isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.title.trim()) {
      setError("Title is required.");
      setIsLoading(false);
      return;
    }
    if (!formData.description.trim()) {
      setError("Description is required.");
      setIsLoading(false);
      return;
    }
    if (!formData.discountValue.trim()) {
      setError("Discount Value is required.");
      setIsLoading(false);
      return;
    }
    if (couponType === "code" && !formData.code.trim()) {
      setError("Coupon Code is required for Code Expose coupons.");
      setIsLoading(false);
      return;
    }
    if (couponType === "link" && !formData.couponUrl.trim()) {
      setError("Deal Link is required for Embedded Link coupons.");
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        type: couponType,
        title: formData.title,
        description: formData.description,
        discount: formData.discountValue,
        terms: formData.terms,
        isActive: formData.isActive,
        isFeatured: formData.isFeatured,
      };

      if (formData.startsAt) payload.startsAt = formData.startsAt;
      if (formData.expiresAt) payload.expiresAt = formData.expiresAt;

      if (couponType === "code") {
        payload.code = formData.code;
        payload.couponUrl = "";
      } else {
        payload.couponUrl = formData.couponUrl;
        payload.code = "";
      }

      const res = await fetch(`/api/coupons/${coupon._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update coupon");
      }
      
      router.refresh();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !coupon) return null;

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-2xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Edit Coupon
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 hover:opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none transition-opacity"
                onClick={onClose}
                disabled={isLoading}
              >
                <span className="bg-transparent text-gray-700 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            
            {error && (
              <div className="mx-6 mt-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md text-sm sticky top-0 z-10 shadow-sm">
                {error}
              </div>
            )}
            
            <div className="relative p-6 pt-4 flex-auto max-h-[65vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store (Uneditable)</label>
                  <input
                    type="text"
                    disabled
                    value={coupon.store ? coupon.store.name : "Unknown Store"}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Type</label>
                  <select
                    name="couponType"
                    value={couponType}
                    onChange={(e) => setCouponType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#835674] focus:border-[#835674] text-gray-900 bg-white"
                  >
                    <option value="code">Code Expose</option>
                    <option value="link">Embedded Link</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#835674] focus:border-[#835674] text-gray-900"
                    placeholder="e.g. 20% Off All Orders"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    name="description"
                    rows="2"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#835674] focus:border-[#835674] text-gray-900"
                    placeholder="Brief description of the deal..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value *</label>
                  <input
                    type="text"
                    name="discountValue"
                    value={formData.discountValue}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#835674] focus:border-[#835674] text-gray-900"
                    placeholder="e.g. 20%, 15€, FREE SHIPPING"
                  />
                </div>

                {couponType === "code" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code *</label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#835674] rounded-md shadow-sm focus:outline-none focus:ring-[#835674] focus:border-[#835674] text-gray-900 bg-pink-50/30"
                      placeholder="e.g. SAVE20"
                    />
                  </div>
                )}

                {couponType === "link" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deal Link / Coupon URL *</label>
                    <input
                      type="url"
                      name="couponUrl"
                      value={formData.couponUrl}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-blue-50/50"
                      placeholder="https://example.com/deal"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions</label>
                  <textarea
                    name="terms"
                    rows="2"
                    value={formData.terms}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#835674] focus:border-[#835674] text-gray-900"
                    placeholder="Optional conditions..."
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startsAt"
                      value={formData.startsAt}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#835674] focus:border-[#835674] text-gray-900"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="date"
                      name="expiresAt"
                      value={formData.expiresAt}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#835674] focus:border-[#835674] text-gray-900"
                    />
                  </div>
                </div>

                <div className="flex gap-6 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#835674] border-gray-300 rounded focus:ring-[#835674]"
                    />
                    <span className="text-sm text-gray-700">Is Active</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#835674] border-gray-300 rounded focus:ring-[#835674]"
                    />
                    <span className="text-sm text-gray-700">Featured (Pin to top)</span>
                  </label>
                </div>
              </form>
            </div>
            
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b bg-gray-50">
              <button
                className="text-gray-500 hover:text-gray-800 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 transition-all"
                type="button"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="bg-[#835674] hover:bg-[#6c4660] text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 transition-all disabled:opacity-50"
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Update Coupon"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-30 fixed inset-0 z-40 bg-black backdrop-blur-sm"></div>
    </>
  );
}
