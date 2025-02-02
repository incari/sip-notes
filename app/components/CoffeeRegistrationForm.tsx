"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore, type Coffee } from "@/lib/store";
import ImageUploadProcessor from "./ImageUploadProcessor";
import { useToast } from "@/hooks/use-toast";

interface CoffeeRegistrationFormProps {
  initialCoffee?: Coffee;
}

export default function CoffeeRegistrationForm({
  initialCoffee,
}: CoffeeRegistrationFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const addCoffee = useStore((state) => state.addCoffee);
  const updateCoffee = useStore((state) => state.updateCoffee);

  const [coffee, setCoffee] = useState<Partial<Coffee>>(
    initialCoffee || {
      name: "",
      roastery: "",
      country: "",
      region: "",
      farmName: "",
      variety: "",
      processingMethod: "",
      altitude: "",
      harvestYear: "",
      roastLevel: "",
      flavorNotes: "",
      certification: "",
      price: "",
      currency: "USD",
      weight: "250",
    }
  );

  const [image, setImage] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCoffee({ ...coffee, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setCoffee({ ...coffee, [name]: value });
  };

  const handleExtractedData = (data: Partial<Coffee>) => {
    setCoffee((current) => ({ ...current, ...data }));
  };

  const handleImageUpload = (file: File) => {
    setImage(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coffee.name) {
      toast({
        title: "Error",
        description: "Coffee name is required",
        variant: "destructive",
      });
      return;
    }

    const coffeeData = { ...coffee };
    if (image) {
      coffeeData.image = image;
    }

    if (initialCoffee) {
      updateCoffee(initialCoffee.id, coffeeData);
    } else {
      addCoffee(coffeeData as Coffee);
    }

    toast({
      title: "Success",
      description: `Coffee ${initialCoffee ? "updated" : "added"} successfully`,
    });
    router.push("/");
  };

  return (
    <div className="space-y-6">
      <ImageUploadProcessor
        onDataExtracted={handleExtractedData}
        onImageUpload={handleImageUpload}
      />

      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">
            {initialCoffee ? "Edit Coffee" : "Add New Coffee"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Coffee Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={coffee.name}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="roastery"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Roastery / Producer
                </Label>
                <Input
                  id="roastery"
                  name="roastery"
                  value={coffee.roastery}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="country"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Country
                </Label>
                <Input
                  id="country"
                  name="country"
                  value={coffee.country}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="region"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Region
                </Label>
                <Input
                  id="region"
                  name="region"
                  value={coffee.region}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="farmName"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Farm Name
                </Label>
                <Input
                  id="farmName"
                  name="farmName"
                  value={coffee.farmName}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="variety"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Variety
                </Label>
                <Input
                  id="variety"
                  name="variety"
                  value={coffee.variety}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="processingMethod"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Processing Method
                </Label>
                <Select
                  name="processingMethod"
                  onValueChange={(value) =>
                    handleSelectChange("processingMethod", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select processing method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="washed">Washed</SelectItem>
                    <SelectItem value="natural">Natural</SelectItem>
                    <SelectItem value="honey">Honey</SelectItem>
                    <SelectItem value="anaerobic">Anaerobic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="altitude"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Altitude (MASL)
                </Label>
                <Input
                  id="altitude"
                  name="altitude"
                  type="number"
                  value={coffee.altitude}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="harvestYear"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Harvest Year
                </Label>
                <Input
                  id="harvestYear"
                  name="harvestYear"
                  type="number"
                  value={coffee.harvestYear}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="roastLevel"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Roast Level
                </Label>
                <Select
                  name="roastLevel"
                  onValueChange={(value) =>
                    handleSelectChange("roastLevel", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select roast level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="medium-light">Medium-Light</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="medium-dark">Medium-Dark</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="certification"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Certification
                </Label>
                <Input
                  id="certification"
                  name="certification"
                  value={coffee.certification}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Price
                </Label>
                <div className="mt-1 flex space-x-2">
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={coffee.price}
                    onChange={handleChange}
                    className="flex-grow"
                  />
                  <Select
                    name="currency"
                    value={coffee.currency}
                    onValueChange={(value) =>
                      handleSelectChange("currency", value)
                    }
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label
                  htmlFor="weight"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Weight (g)
                </Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  value={coffee.weight}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="flavorNotes"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Flavor Notes
              </Label>
              <Textarea
                id="flavorNotes"
                name="flavorNotes"
                value={coffee.flavorNotes}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
            >
              {initialCoffee ? "Update Coffee" : "Add Coffee"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
