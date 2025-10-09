import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Image as ImageIcon, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PredictionResult {
  blood_group: string;
  confidence: string;
}

const FileUploadZone = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select an image file (PNG, JPG, JPEG, WEBP).",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setResult(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    toast({
      title: "Image Selected",
      description: "Fingerprint image ready for analysis.",
    });
  };

  const handlePredict = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    
    try {
      // Create FormData to send the image file
      const formData = new FormData();
      formData.append('image', selectedFile);

      // Make API call to Flask backend
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Handle successful prediction
      setResult({
        blood_group: result.blood_group,
        confidence: result.confidence
      });

      toast({
        title: "Prediction Complete",
        description: `Blood group ${result.blood_group} predicted with ${result.confidence} confidence.`,
      });

    } catch (error: any) {
      console.error('Prediction error:', error);
      
      let errorMessage = "An error occurred during analysis. Please try again.";
      
      // Handle specific error cases
      if (error.message.includes('Failed to fetch')) {
        errorMessage = "Unable to connect to the AI model server. Please ensure the Flask backend is running on port 5000.";
      } else if (error.message.includes('HTTP error')) {
        errorMessage = "Server error occurred. Please check the Flask backend logs.";
      }

      toast({
        title: "Prediction Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 theme-transition">
      {/* Upload Zone */}
      <Card className="medical-card p-8 hover-lift theme-transition card-enter">
        <div
          className={`upload-zone ${isDragOver ? 'dragover' : ''} theme-transition`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          {!selectedFile ? (
            <div className="space-y-4">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Upload your fingerprint image to get started
                </h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your fingerprint image here or
                </p>
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="bg-primary/10 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Choose File
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Image Selected</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
              {previewUrl && (
                <div className="mt-4 card-enter">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mx-auto max-h-32 rounded-lg shadow-sm"
                  />
                </div>
              )}
              <Button
                onClick={resetUpload}
                variant="outline"
                size="sm"
              >
                Choose Different Image
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Predict Button */}
      {selectedFile && !result && (
        <Button
          onClick={handlePredict}
          disabled={isProcessing}
          className="predict-button w-full text-lg py-6 text-primary-foreground theme-transition"
        >
          {isProcessing ? "Analyzing Fingerprint..." : "Predict Blood Group"}
        </Button>
      )}

      {/* Results */}
      {result && (
        <Card className="medical-card p-6 hover-lift theme-transition card-enter">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="h-6 w-6" />
              <h3 className="text-xl font-semibold">Prediction Complete</h3>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">
                {result.blood_group}
              </div>
              <div className="text-muted-foreground">
                Confidence: <span className="font-semibold text-foreground">{result.confidence}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                This prediction is based on advanced AI analysis of your fingerprint pattern.
                For medical purposes, please confirm with laboratory testing.
              </p>
              <Button
                onClick={resetUpload}
                variant="outline"
                className="w-full"
              >
                Analyze Another Image
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default FileUploadZone;