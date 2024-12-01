import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Scissors, Camera, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Salon background"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">Discover Your Perfect Style</h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Experience the future of hairstyling with our AI-powered style advisor. Upload your photo and get personalized recommendations based on your face shape and features.
          </p>
          <Button size="lg" asChild>
            <Link href="/style-advisor">Try AI Style Advisor</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Card className="p-4 md:p-6 flex flex-col items-center text-center">
              <Camera className="h-10 w-10 md:h-12 md:w-12 mb-3 md:mb-4 text-primary" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Upload Your Photo</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Take or upload a clear photo of your face to get started
              </p>
            </Card>
            <Card className="p-4 md:p-6 flex flex-col items-center text-center">
              <Sparkles className="h-10 w-10 md:h-12 md:w-12 mb-3 md:mb-4 text-primary" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Our AI analyzes your facial features and structure
              </p>
            </Card>
            <Card className="p-4 md:p-6 flex flex-col items-center text-center">
              <Scissors className="h-10 w-10 md:h-12 md:w-12 mb-3 md:mb-4 text-primary" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Get Recommendations</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Receive personalized hairstyle suggestions that complement your features
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}