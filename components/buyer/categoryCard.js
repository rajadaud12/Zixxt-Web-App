import Link from "next/link"
import Image from "next/image"

export default function CategoryCard({ category }) {
  return (
    <div className="bg-gray-50 rounded-3xl p-6 text-left shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-blue-400 inline-flex items-center justify-center w-12 h-12 rounded-full mb-4">
        <Image
          src={category.icon || "/placeholder.svg"}
          alt={category.title}
          width={24}
          height={24}
        />
      </div>
      <h3 className="font-bold text-xl mb-1">{category.title}</h3>
      <p className="text-gray-500 text-sm mb-4">{category.description}</p>
      <Link href={category.link} className="inline-flex items-center text-sm font-medium">
        View {category.title}
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  )
}