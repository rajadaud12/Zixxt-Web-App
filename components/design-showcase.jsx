"use client"
import { useState } from "react"
import { H1, H2, S1, S2, B1, B2, B3, B4, C1, C2, C3, Label } from "./utils/typography"
import { Button } from "./utils/button"
import { Input, SearchInput, SearchBar, DropdownSearchBar  } from "./utils/input"
import { Tabs } from "./utils/tabs"
import { Dropdown } from "./utils/dropdown"

export function DesignShowcase() {
  // For testing dropdown search bar
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false)

  // Colors data
  const colors = [
    { name: "Border", class: "bg-border text-textLight" },
    { name: "Black", class: "bg-black text-white" },
    { name: "Primary", class: "bg-primary text-white" },
    { name: "Secondary", class: "bg-secondary text-textLight" },
    { name: "Main Text", class: "bg-text text-white" },
    { name: "Light Text", class: "bg-textLight text-white" },
    { name: "Success", class: "bg-success text-white" },
    { name: "Failure", class: "bg-failure text-white" },
    { name: "Btns", class: "bg-btnbg text-textLight" },
  ]

  // Tabs data
  const tabsData = [
    {
      id: "software",
      label: "Software",
      content: <div className="p-4 bg-btnbg rounded">Software content goes here</div>,
    },
    {
      id: "services",
      label: "Services",
      content: <div className="p-4 bg-btnbg rounded">Services content goes here</div>,
    },
    {
      id: "courses",
      label: "Courses",
      content: <div className="p-4 bg-btnbg rounded">Courses content goes here</div>,
    },
  ]

  return (
    <div className="space-y-16">
      {/* Colors Section */}
      <section id="colors" className="space-y-6">
        <H2>Colors</H2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {colors.map((color) => (
            <div key={color.name} className="space-y-2">
              <div className={`${color.class} p-6 rounded-lg flex items-center justify-center h-24`}>
                <span className="font-medium">{color.name}</span>
              </div>
              <p className="text-center text-sm">{color.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Section */}
      <section id="typography" className="space-y-6">
        <H2>Typography - Albert Sans</H2>
        <div className="space-y-6">
          <div className="space-y-2">
            <H1>H1. Headline (28px)</H1>
            <div className="text-sm text-textLight">Semi Bold, 28px, Line 34px</div>
          </div>

          <div className="space-y-2">
            <H2>H2. Headline (24px)</H2>
            <div className="text-sm text-textLight">Semi Bold, 24px, Line 28px</div>
          </div>

          <div className="space-y-2">
            <S1>S1. Subtitle (18px)</S1>
            <div className="text-sm text-textLight">Semi Bold, 18px, Line 28px</div>
          </div>

          <div className="space-y-2">
            <S2>S2. Subtitle (16px)</S2>
            <div className="text-sm text-textLight">Semi Bold, 16px, Line 24px</div>
          </div>

          <div className="space-y-2">
            <B1>B1. Body (16px) - Regular weight paragraph text for general content.</B1>
            <div className="text-sm text-textLight">Regular, 16px, Line 24px</div>
          </div>

          <div className="space-y-2">
            <B2>B2. Body (16px) - Medium weight for slightly emphasized content.</B2>
            <div className="text-sm text-textLight">Medium, 16px, Line 24px</div>
          </div>

          <div className="space-y-2">
            <B3>B3. Body (14px) - Regular weight for secondary content.</B3>
            <div className="text-sm text-textLight">Regular, 14px, Line 20px</div>
          </div>

          <div className="space-y-2">
            <B4>B4. Body (14px) - Medium weight for emphasized secondary content.</B4>
            <div className="text-sm text-textLight">Medium, 14px, Line 20px</div>
          </div>

          <div className="space-y-2">
            <C1>C1. Caption (12px) - Regular weight for small text like captions.</C1>
            <div className="text-sm text-textLight">Regular, 12px, Line 16px</div>
          </div>

          <div className="space-y-2">
            <C2>C2. Caption (12px) - Medium weight for emphasized small text.</C2>
            <div className="text-sm text-textLight">Medium, 12px, Line 16px</div>
          </div>

          <div className="space-y-2">
            <C3>C3. Caption (10px) - Medium weight for very small text.</C3>
            <div className="text-sm text-textLight">Medium, 10px, Line 14px</div>
          </div>

          <div className="space-y-2">
            <Label>LABEL (12px) - Medium weight for form labels and small headers.</Label>
            <div className="text-sm text-textLight">Medium, 12px, Line 16px</div>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      <section id="buttons" className="space-y-6">
        <H2>Buttons</H2>

        {/* Button Variants */}
        <div className="space-y-4">
          <S2>Button Variants</S2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="dark">Dark</Button>
            <Button variant="link">Link</Button>
            <Button variant="primary-link">Primary Link</Button>
          </div>
        </div>

        {/* Button Sizes */}
        <div className="space-y-4">
          <S2>Button Sizes</S2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="tiny">Tiny</Button>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
            <Button size="giant">Giant</Button>
          </div>
        </div>

        {/* Button with Icon */}
        <div className="space-y-4">
          <S2>Button with Icon</S2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="default"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
              }
            >
              With Icon
            </Button>

            <Button
              variant="primary"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 6V12L16 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
              }
            >
              With Icon
            </Button>
          </div>
        </div>

        {/* Button States */}
        <div className="space-y-4">
          <S2>Button States</S2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Button variant="default">Normal</Button>
              <p className="text-sm text-textLight">Normal</p>
            </div>
            <div className="space-y-2">
              <Button variant="default" className="bg-btnbg">
                Hover
              </Button>
              <p className="text-sm text-textLight">Hover</p>
            </div>
            <div className="space-y-2">
              <Button variant="default" className="ring-2 ring-primary/20">
                Focus
              </Button>
              <p className="text-sm text-textLight">Focus</p>
            </div>
            <div className="space-y-2">
              <Button variant="default" disabled className="opacity-50 cursor-not-allowed">
                Disabled
              </Button>
              <p className="text-sm text-textLight">Disabled</p>
            </div>
          </div>
        </div>

        {/* Button Styles from Design */}
        <div className="space-y-4 mt-8">
          <S2>Button Styles from Design</S2>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <B2>Normal State</B2>
              <div className="space-y-4">
                <button className="px-4 py-2 rounded-full border border-border bg-white text-text">btn</button>

                <button className="px-4 py-2 rounded-full border border-border bg-white text-text flex items-center">
                  <span className="mr-2">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                  </span>
                  logo btn
                </button>

                <button className="px-4 py-2 rounded-full bg-primary text-white">btn</button>

                <button className="px-4 py-2 rounded-full bg-black text-white">btn</button>

                <span className="text-text">Home</span>
              </div>
            </div>

            <div className="space-y-4">
              <B2>Hover State</B2>
              <div className="space-y-4">
                <button className="px-4 py-2 rounded-full border border-border bg-btnbg text-text">btn</button>

                <button className="px-4 py-2 rounded-full border border-border bg-btnbg text-text flex items-center">
                  <span className="mr-2">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                  </span>
                  logo btn
                </button>

                <button className="px-4 py-2 rounded-full bg-primary text-white shadow-lg">btn</button>

                <button className="px-4 py-2 rounded-full bg-black text-white opacity-90">btn</button>

                <span className="text-primary">Home</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inputs Section */}
      <section id="inputs" className="space-y-6">
        <H2>Inputs</H2>

        {/* Text Input */}
        <div className="space-y-4">
          <S2>Text Input</S2>
          <Input label="Email" placeholder="Enter email address" />
        </div>

        {/* Input States */}
        <div className="space-y-4">
          <S2>Input States</S2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input placeholder="Normal state" />
              <p className="text-sm text-textLight">Normal</p>
            </div>
            <div className="space-y-2">
              <Input placeholder="Focus state" className="ring-2 ring-primary/20 border-primary" />
              <p className="text-sm text-textLight">Focus</p>
            </div>
            <div className="space-y-2">
              <Input placeholder="Error state" className="border-failure focus:border-failure" />
              <p className="text-sm text-textLight">Error</p>
            </div>
            <div className="space-y-2">
              <Input placeholder="Disabled state" disabled className="bg-btnbg opacity-70" />
              <p className="text-sm text-textLight">Disabled</p>
            </div>
          </div>
        </div>

        {/* Search Inputs */}
        <div className="space-y-4">
          <S2>Search Inputs</S2>
          <div className="space-y-4">
            <SearchInput />
            <SearchInput buttonText="Search" />
            <SearchBar className="max-w-xl" />
            <div className="max-w-xl">
              <S2 className="mb-2 mt-4">Dropdown Search Bar</S2>
              <DropdownSearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section id="tabs" className="space-y-6">
        <H2>Tabs</H2>
        <div className="max-w-2xl">
          <Tabs tabs={tabsData} defaultTab="software" />
        </div>
      </section>

      {/* Dropdowns Section */}
      <section id="dropdowns" className="space-y-6">
        <H2>Dropdowns</H2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <S2>Default Dropdown</S2>
            <div className="max-w-xs">
              <Dropdown options={["Service", "Product", "Support", "Contact"]} defaultValue="Service" />
            </div>
          </div>
          <div className="space-y-4">
            <S2>Small Dropdown</S2>
            <div className="max-w-[120px]">
              <Dropdown options={["All", "Software", "Services", "Courses"]} defaultValue="All" variant="small" />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <S2>Responsive Dropdowns</S2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="w-full">
              <Dropdown options={["Small Width", "Option 2", "Option 3"]} defaultValue="Small Width" />
            </div>
            <div className="w-full md:col-span-2">
              <Dropdown options={["Large Width", "Option 2", "Option 3"]} defaultValue="Large Width" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
