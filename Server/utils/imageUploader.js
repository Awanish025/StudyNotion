const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (File, folder, height, quality) => {
  const options = { folder, resource_type: "auto" };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }

  // Use chunked upload for videos / large files > 20MB to prevent timeouts
  if (File.size && File.size > 20 * 1024 * 1024) {
    return await cloudinary.uploader.upload_large(File.tempFilePath, {
      ...options,
      chunk_size: 6000000,
    });
  }

  return await cloudinary.uploader.upload(File.tempFilePath, options);
};
