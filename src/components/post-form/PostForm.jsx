import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { districts } from "../../components/Location";
import Swal from "sweetalert2";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      rate: post?.rate || "",
      dateAD: post?.dateAD || "",
      category: post?.category || "",
      phoneNo: post?.phoneNo || "",
      location: post?.location || "Nepal",
    },
  });

  const navigate = useNavigate();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [currentUsername, setCurrentUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await appwriteService.getCurrentUser();
      if (user) {
        setCurrentUsername(user.name || user.email);
        setUserId(user.$id);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (post?.previewImages?.length) {
      console.log("Preview images received:", post.previewImages);
      setImagePreviews(post.previewImages);
    }
  }, [post]);

  const formatDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  const handleDateADChange = (e) => {
    const adDate = e.target.value;
    setValue("dateAD", formatDate(adDate));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const generateSlug = (title) => {
    const lowerTitle = title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    return `${lowerTitle}-${Date.now()}`;
  };

  const submit = async (data) => {
    try {
      if (imageFiles.length === 0) {
        Swal.fire("Image Required", "Please upload at least one image.", "warning");
        return;
      }

      const slug = generateSlug(data.title);
      let uploadedImageIds = post?.featuredImage || [];

      for (let image of imageFiles) {
        try {
          const imageId = await appwriteService.uploadFile(image);
          if (imageId) uploadedImageIds.push(imageId);
        } catch (err) {
          console.error("Image upload failed for:", image.name);
        }
      }

      const postData = {
        ...data,
        rate: parseFloat(data.rate),
        slug,
        userId,
        username: currentUsername,
        postedBy: currentUsername,
        status: "active",
        featuredImage: uploadedImageIds,
      };

      const dbPost = post
        ? await appwriteService.updatePost(post.$id, postData)
        : await appwriteService.createPost(postData);

      console.log("Post data to be submitted:", postData);

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } catch (err) {
      console.error("Post submission failed:", err);
      Swal.fire("Error", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50 p-4">
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left Section */}
        <div className="flex flex-col">
          <Input
            label="Title"
            placeholder="Enter post title"
            className="mb-4"
            {...register("title", { required: true })}
          />

          <Input
            label="Rate (Rs)"
            type="number"
            step="0.01"
            className="mb-4"
            {...register("rate", {
              required: "Rate is required",
              min: { value: 0, message: "Must be positive" },
            })}
          />
          {errors.rate && <p className="text-red-500 text-sm">{errors.rate.message}</p>}

          <Input
            label="Valid Till (AD)"
            type="date"
            className="mb-4"
            value={watch("dateAD")}
            onChange={handleDateADChange}
            required
          />

          <label className="text-gray-700 font-medium mb-2">Category</label>
          <select
            {...register("category", { required: true })}
            className="border border-gray-300 rounded-lg p-2 mb-4"
          >
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science">Science</option>
            <option value="Biography">Biography</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Children's Books">Children's Books</option>
          </select>

          <Input
            label="Phone Number"
            type="tel"
            placeholder="10-digit phone number"
            className="mb-4"
            {...register("phoneNo", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid format",
              },
            })}
          />
          {errors.phoneNo && <p className="text-red-500 text-sm">{errors.phoneNo.message}</p>}
        </div>

        {/* Right Section */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">Location</label>
          <select
            {...register("location", { required: true })}
            defaultValue={post?.location || "Nepal"}
            className="border border-gray-300 rounded-lg p-2 mb-4"
          >
            {districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>

          <label className="text-gray-700 font-medium mb-2">Post Content</label>
          <textarea
            {...register("content", { required: true })}
            rows={6}
            placeholder="Write a detailed description here..."
            className="border border-gray-300 rounded-lg p-3 mb-4 resize-none"
          />

          {/* Featured Images Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Featured Images</label>
            <div className="flex items-center gap-3 flex-wrap mb-3">
              {imagePreviews.map((src, idx) => (
                <div key={idx} className="relative w-24 h-24">
                  <img src={src} alt="Preview" className="w-full h-full object-cover rounded-md" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    &times;
                  </button>
                </div>
              ))}

              <label
                htmlFor="imageUpload"
                className="w-24 h-24 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-md text-3xl font-bold text-gray-500 cursor-pointer hover:border-blue-500 hover:text-blue-500 transition-all duration-200"
                title="Click to add images"
              >
                +
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <Button type="submit" className="bg-blue-600 text-white py-2 rounded-lg">
            {post ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
