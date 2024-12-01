"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Upload, Loader2, Camera } from "lucide-react"
import Image from "next/image"
import { CameraCapture } from "@/components/camera-capture"
import { analyzeImage } from "@/lib/gemini"

interface Results {
  faceShape: string
  recommendations: string[]
  styling: string[]
}

export default function StyleAdvisor() {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Results | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const { toast } = useToast()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = (imageData: string) => {
    setImage(imageData)
    setShowCamera(false)
  }

  const analyzePhoto = async () => {
    if (!image) return

    setLoading(true)
    try {
      const results = await analyzeImage(image)
      setResults(results)
      
      toast({
        title: "Analysis Complete",
        description: "We've analyzed your photo and generated personalized recommendations.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="container py-6 md:py-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">AI Style Advisor</h1>
        
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <Card className="p-4 md:p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full aspect-square relative border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden">
                {image ? (
                  <Image
                    src={image}
                    alt="Uploaded photo"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <Upload className="mx-auto h-10 w-10 md:h-12 md:w-12 text-muted-foreground" />
                    <p className="mt-2 text-sm md:text-base text-muted-foreground">
                      Upload your photo or take a picture
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 w-full max-w-xs">
                <Button
                  variant="outline"
                  onClick={() => setShowCamera(true)}
                  className="flex-1"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
                <div className="relative flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
              </div>
              
              {image && (
                <Button
                  onClick={analyzePhoto}
                  disabled={loading}
                  className="w-full max-w-xs"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Analyzing..." : "Analyze Photo"}
                </Button>
              )}
            </div>
          </Card>

          <Card className="p-4 md:p-6">
            {results ? (
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h3 className="text-base md:text-lg font-semibold mb-2">Your Face Shape</h3>
                  <p className="text-sm md:text-base">{results.faceShape}</p>
                </div>
                
                <div>
                  <h3 className="text-base md:text-lg font-semibold mb-2">Recommended Hairstyles</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
                    {results.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-base md:text-lg font-semibold mb-2">Styling Tips</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
                    {results.styling.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-sm md:text-base text-muted-foreground">
                Upload a photo to get personalized recommendations
              </div>
            )}
          </Card>
        </div>
      </div>

      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </>
  )
}