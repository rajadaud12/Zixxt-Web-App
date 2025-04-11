import { H1, H2, S1 } from "../components/utils/typography"
import { Button } from "../components/utils/button"
import { DropdownSearchBar } from "../components/utils/input"
import { DesignShowcase } from "../components/design-showcase"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <H2 className="text-black">Design System</H2>
            <nav className="hidden md:flex space-x-6">
              <a href="#colors" className="text-textLight hover:text-primary">
                Colors
              </a>
              <a href="#typography" className="text-textLight hover:text-primary">
                Typography
              </a>
              <a href="#buttons" className="text-textLight hover:text-primary">
                Buttons
              </a>
              <a href="#inputs" className="text-textLight hover:text-primary">
                Inputs
              </a>
              <a href="#tabs" className="text-textLight hover:text-primary">
                Tabs
              </a>
              <a href="#dropdowns" className="text-textLight hover:text-primary">
                Dropdowns
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block w-64">
              <DropdownSearchBar />
            </div>
            <Button variant="primary" size="small">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section */}
          <section className="text-center space-y-4 py-12">
            <H1>Welcome to our platform</H1>
            <S1 className="text-textLight max-w-2xl mx-auto">
              A comprehensive design system with buttons, search bars, input fields, tabs, typography, and colors.
            </S1>
            <div className="flex justify-center space-x-4 mt-8">
              <Button variant="primary" size="large">
                Get Started
              </Button>
              <Button variant="default" size="large">
                Learn More
              </Button>
            </div>
          </section>

          {/* Design Showcase */}
          <DesignShowcase />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <H2 className="text-black mb-4">Design System</H2>
              <p className="text-textLight">A comprehensive collection of UI components built with Tailwind CSS.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-textLight hover:text-primary">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-textLight hover:text-primary">
                    Components
                  </a>
                </li>
                <li>
                  <a href="#" className="text-textLight hover:text-primary">
                    Examples
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-textLight hover:text-primary">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-textLight hover:text-primary">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-textLight hover:text-primary">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Subscribe</h3>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Button variant="primary" size="small">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-textLight">
            <p>&copy; 2023 Design System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
