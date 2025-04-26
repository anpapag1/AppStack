"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { categories } from "@/data/categories"

interface CategoryFilterProps {
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export function CategoryFilter({ selectedCategory, setSelectedCategory }: CategoryFilterProps) {
  return (
    <div className="bg-card rounded-lg p-4 border">
      <h2 className="font-semibold mb-4">Categories</h2>
      <ScrollArea className="h-[calc(100vh-250px)]">
        <div className="space-y-1">
          <Button
            variant={selectedCategory === "all" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setSelectedCategory("all")}
          >
            All Categories
          </Button>

          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedCategory(category.id)}
            >
              <category.icon className="mr-2 h-4 w-4" />
              {category.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
