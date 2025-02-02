/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { createWorker } from "tesseract.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload } from "lucide-react";

import type { Coffee } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProcessorProps {
  onDataExtracted: (data: Partial<Coffee>) => void;
  onImageUpload: (file: File) => void;
}

export default function ImageUploadProcessor({
  onDataExtracted,
  onImageUpload,
}: ImageUploadProcessorProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const [previewUrl, setPreviewUrl] = useState<string>();

  // Function to extract coffee data from OCR text
  const extractCoffeeData = (text: string): Partial<Coffee> => {
    const lines = text.split("\n").map((line) => line.trim());
    const data: Partial<Coffee> = {};

    // Helper function to find value after colon or in line
    const getValue = (line: string) => {
      const parts = line.split(":");
      return parts.length > 1 ? parts[1].trim() : line.trim();
    };

    // Extract name from prominent text or first line
    const possibleNames = lines.filter(
      (line) =>
        line.length > 0 &&
        !line.includes(":") &&
        !line.match(/^\d/) &&
        !line.toLowerCase().includes("coffee")
    );
    if (possibleNames.length > 0) {
      data.name = possibleNames[0];
    }

    // Improved country detection
    const countryLine = lines.find(
      (line) =>
        line.toUpperCase().includes("COLOMBIA") ||
        line.toUpperCase().includes("COSTA RICA") ||
        line.toUpperCase().includes("KENYA") ||
        line.toUpperCase().includes("BRASIL") ||
        line.toUpperCase().includes("BRAZIL")
    );
    if (countryLine) {
      const countries = ["COLOMBIA", "COSTA RICA", "KENYA", "BRASIL", "BRAZIL"];
      const found = countries.find((country) =>
        countryLine.toUpperCase().includes(country)
      );
      data.country = found || countryLine;
    }

    // Extract region (after "Region:" or "Región:")
    const regionLine = lines.find(
      (line) =>
        line.toLowerCase().includes("region:") ||
        line.toLowerCase().includes("región:")
    );
    if (regionLine) {
      data.region = getValue(regionLine);
    }

    // Extract altitude (looking for numbers followed by msnm or masl)
    const altitudeLine = lines.find(
      (line) =>
        line.toLowerCase().includes("altitud") ||
        line.toLowerCase().includes("altitude") ||
        line.toLowerCase().includes("msnm") ||
        line.toLowerCase().includes("masl")
    );
    if (altitudeLine) {
      const match = altitudeLine.match(/\d{3,4}/);
      if (match) {
        data.altitude = match[0];
      }
    }

    // Extract processing method
    const processLine = lines.find(
      (line) =>
        line.toLowerCase().includes("proceso:") ||
        line.toLowerCase().includes("process:") ||
        line.toLowerCase().includes("lavado") ||
        line.toLowerCase().includes("natural") ||
        line.toLowerCase().includes("honey") ||
        line.toLowerCase().includes("fermentado")
    );
    if (processLine) {
      const process = getValue(processLine);
      // Map Spanish terms to English
      const processMap: { [key: string]: string } = {
        lavado: "washed",
        natural: "natural",
        honey: "honey",
        fermentado: "fermented",
      };
      data.processingMethod = processMap[process.toLowerCase()] || process;
    }

    // Extract variety
    const varietyLine = lines.find(
      (line) =>
        line.toLowerCase().includes("varietal:") ||
        line.toLowerCase().includes("variety:") ||
        line.toLowerCase().includes("variedades:")
    );
    if (varietyLine) {
      data.variety = getValue(varietyLine);
    }

    // Extract producer/farm/roastery
    const producerLine = lines.find(
      (line) =>
        line.toLowerCase().includes("productor:") ||
        line.toLowerCase().includes("producer:") ||
        line.toLowerCase().includes("finca:") ||
        line.toLowerCase().includes("farm:")
    );
    if (producerLine) {
      data.roastery = getValue(producerLine);
    }

    // Extract flavor notes (usually after descriptive text or with commas)
    const flavorLine = lines.find(
      (line) =>
        (line.includes(",") && !line.includes(":")) ||
        line.toLowerCase().includes("notas:") ||
        line.toLowerCase().includes("notes:") ||
        line.toLowerCase().includes("sabor:") ||
        line.toLowerCase().includes("flavor:")
    );
    if (flavorLine) {
      data.flavorNotes = getValue(flavorLine);
    }

    console.log("Extracted data:", data); // Add this for debugging
    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const processImage = async (file: File) => {
    /*    setIsProcessing(true)
    try {
      const imageUrl = URL.createObjectURL(file)
      const worker = await createWorker()
      await worker.loadLanguage("eng+spa")
      await worker.initialize("eng+spa")

      // Configure Tesseract for better results
      await worker.setParameters({
        tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,/:()-& ",
        preserve_interword_spaces: "1",
      })

      const {
        data: { text },
      } = await worker.recognize(imageUrl)
      await worker.terminate()

      console.log("OCR Text:", text) // Add this for debugging

      if (!text || text.trim() === "") {
        throw new Error("No text could be extracted from the image")
      }

      const extractedData = extractCoffeeData(text)

      if (Object.keys(extractedData).length === 0) {
        throw new Error("No coffee data could be extracted from the image")
      }

      onDataExtracted(extractedData)
      onImageUpload(file)

      toast({
        title: "Success",
        description: "Coffee details extracted successfully!",
      })
    } catch (error) {
      console.error("OCR Error:", error) // Log the full error object
      let errorMessage = "An unknown error occurred"
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        title: "Error",
        description: `Failed to process image: ${errorMessage}. Please try again or fill the form manually.`,
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    } */
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      processImage(file);
    }
  };

  const handleCapture = async () => {
    /* try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      // Implementation for camera capture would go here
      // For now, we'll just show a message
      toast({
        title: "Camera Capture",
        description: "Camera capture feature coming soon!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to access camera. Please try file upload instead.",
        variant: "destructive",
      }) */
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Coffee Package Image</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => document.getElementById("file-upload")?.click()}
            disabled={isProcessing}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleCapture}
            disabled={isProcessing}
          >
            <Camera className="mr-2 h-4 w-4" />
            Take Photo
          </Button>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isProcessing}
          />
        </div>
        {previewUrl && (
          <div className="relative aspect-square w-full max-w-md mx-auto">
            <img
              src={previewUrl || "/placeholder.svg"}
              alt="Preview"
              className="rounded-lg object-contain w-full h-full"
            />
          </div>
        )}
        {isProcessing && (
          <div className="text-center text-muted-foreground">
            Processing image... This may take a few seconds.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
