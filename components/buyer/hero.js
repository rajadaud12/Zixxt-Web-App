import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Your All In One Platform For Services, Education, And Software
            </h1>
            <p className="text-textLight text-lg">
              A Unified Hub Offering Endless Possibilities In Services, Education, And Software
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/get-started"
                className="flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 font-semibold px-6 py-3 min-w-[120px]"
              >
                Get Started
              </Link>
              <Link
                href="/sign-in"
                className="flex items-center justify-center rounded-full bg-white text-text border border-border hover:bg-btnbg font-semibold px-6 py-3 min-w-[120px]"
              >
                Sign In
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/images/hero-image.png"
              alt="Platform Illustration"
              width={600}
              height={500}
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
