"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function ImageGallery({ images, onClose, onRemove }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Create object URLs for the images
  const imageUrls = images.map((image) => URL.createObjectURL(image))

  return (
    <div className="fixed inset-0 bg-black/70 z-[5000] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Upload Media</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-2/3 p-4 flex items-center justify-center bg-gray-100">
            {images.length > 0 && (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={imageUrls[selectedIndex] || "/placeholder.svg"}
                  alt={`Preview ${selectedIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
                <div className="absolute bottom-4 right-4">
                  <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {selectedIndex + 1} of {images.length}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="w-1/3 p-4 overflow-y-auto border-l">
            <div className="grid grid-cols-2 gap-2">
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className={`relative aspect-[16/9] cursor-pointer rounded-md overflow-hidden border-2 ${selectedIndex === index ? "border-primary" : "border-transparent"}`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <img
                    src={url || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-black"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemove(index)
                      if (selectedIndex >= images.length - 1) {
                        setSelectedIndex(Math.max(0, images.length - 2))
                      }
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex justify-end">
          <button onClick={onClose} className="btn btnMedium btnDark">
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
