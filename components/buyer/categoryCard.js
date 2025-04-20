import Link from "next/link"
import Image from "next/image"

export default function CategoryCard({ category }) {
  return (
    <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-secondary inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 mx-auto">
        <Image
          src={category.icon || "/placeholder.svg?height=32&width=32"}
          alt={category.title}
          width={32}
          height={32}
        />
      </div>
      <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
      <p className="text-textLight text-sm">{category.description}</p>
      <Link href={category.link} className="text-primary text-sm mt-4 inline-block">
        View {category.title} →
      </Link>
    </div>
  )
}
