/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Sprout,
  MapPin,
  Cloud,
  Droplets,
  Wind,
  Upload,
  Camera,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import Card from "../components/Card";
import CardContent from "../components/CardContent";
import CardHeader from "../components/CardHeader";
import CardTitle from "../components/CardTitle";
import CardDescription from "../components/CardDescription";
import getWeatherData from "../util/getWeatherData";
import { reverseGeocode } from "../util/reverseGeocode";
import type { CurrentForecast } from "../util/transformWeatherData";


const irrigationRecommendations = "Moderate irrigation needed. Soil moisture is adequate. Consider light watering in the evening.";

// Mock crop analysis results
const getMockAnalysis = (filename: string) => ({
  cropType: "Tomato",
  health: "Good",
  confidence: 92,
  issues: [],
  recommendations: [
    "Crop appears healthy with good leaf color",
    "Continue current watering schedule",
    "Monitor for early blight in humid conditions",
    "Consider adding organic mulch for moisture retention",
  ],
});

const Dashboard = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState<string>("");
  const [weather, setWeather] = useState<CurrentForecast>();
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const fileInputRef = useRef<any>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const detectLocation = () => {
    setLoadingLocation(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const geoLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(geoLocation);
          
          const fetchWeather = async () => {
            if (!location) return;
            const weatherData = await getWeatherData(
              location.latitude,
              location.longitude
            );
            const addressData = await reverseGeocode(
              geoLocation.latitude,
              geoLocation.longitude
            );

            setAddress(`${addressData.city}, ${addressData.state}, ${addressData.country}`);

            setWeather(weatherData!.currentForecast);
            setLoadingLocation(false);
          };

          fetchWeather();
        },
        (error) => {
          console.error("Error detecting location:", error);
          setLoadingLocation(false);
        }
      );
    }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Create image preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      setAnalyzing(true);

      // Simulate analysis delay
      setTimeout(() => {
        setAnalysisResult(getMockAnalysis(file.name));
        setAnalyzing(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </button>
              </Link>
              <div className="flex items-center gap-2">
                <Sprout className="h-6 w-6 text-primary" />
                <span className="text-xl font-semibold">SmartCrop</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, Farmer</h1>
          <p className="text-muted-foreground">
            Get real-time weather insights and crop analysis to optimize your
            farming
          </p>
        </div>

        {/* Weather Section */}
        <div className="mb-8">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-primary" />
                Weather & Irrigation
              </CardTitle>
              <CardDescription>
                Real-time weather data and irrigation recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!weather ? (
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Detect your location to get weather-based irrigation advice
                  </p>
                  <button
                    onClick={detectLocation}
                    disabled={loadingLocation}
                    className="px-8 py-3 text-lg text-white bg-primary hover:bg-primary/90 rounded-md cursor-pointer has-[>svg]:px-4 inline-flex justify-center items-center"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    {loadingLocation ? "Detecting..." : "Detect Location"}
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{address}</span>
                    </div>
                    <span>{weather.day}</span>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-primary">
                          {weather.temperature}°C
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Temperature
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6 text-center">
                        <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                        <div className="text-xl font-semibold">
                          {weather.humidity}%
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Humidity
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6 text-center">
                        <Wind className="h-6 w-6 text-cyan-500 mx-auto mb-2" />
                        <div className="text-xl font-semibold">
                          {weather.windSpeed} km/h
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Wind Speed
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6 text-center">
                        <Cloud className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                        <div className="text-xl font-semibold">
                          {weather.precipitation}mm
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Rainfall
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-primary/10 border-primary border rounded-lg p-4 mt-4">
                    <Droplets className="h-4 w-4 text-primary" />
                    <div className="text-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed">
                      <strong>Irrigation Advice:</strong>{" "}
                      {irrigationRecommendations}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Crop Analysis Section */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Crop Analysis
            </CardTitle>
            <CardDescription>
              Upload a photo of your crop for instant health analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!uploadedFile ? (
              <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Upload a crop photo for AI-powered analysis
                </p>
                <label htmlFor="file-upload">
                  <button
                    onClick={handleClick}
                    className="px-8 py-3 text-lg text-white bg-primary hover:bg-primary/90  rounded-md cursor-pointer has-[>svg]:px-4"
                  >
                    <span className="inline-flex justify-center items-center">
                      <Camera className="h-4 w-4 mr-2" />
                      Upload Photo
                    </span>
                  </button>
                </label>
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            ) : (
              <div>
                {analyzing ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
                    <p className="text-muted-foreground">
                      Analyzing your crop...
                    </p>
                  </div>
                ) : analysisResult ? (
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">
                          {analysisResult.cropType}
                        </h3>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-green-600 font-medium">
                            {analysisResult.health}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({analysisResult.confidence}% confidence)
                          </span>
                        </div>
                      </div>
                      <button
                        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
                        onClick={() => {
                          setUploadedFile(null);
                          setAnalysisResult(null);
                        }}
                      >
                        Upload New
                      </button>
                    </div>

                    {/* Image Preview and Analysis Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {/* Image Preview */}
                      <Card className="overflow-hidden">
                        <CardContent className="p-5 grid place-items-center">
                          <img
                            src={imagePreview}
                            alt="Uploaded crop"
                            className="w-full h-auto object-cover rounded-lg m-auto"
                          />
                        </CardContent>
                      </Card>

                      <Card className="bg-accent/10">
                        <CardContent className="pt-6">
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Sprout className="h-4 w-4 text-primary" />
                            Recommendations
                          </h4>
                          <ul className="space-y-2">
                            {analysisResult.recommendations.map(
                              (rec: string, index: number) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2"
                                >
                                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                  <span className="text-sm">{rec}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    {analysisResult.issues.length > 0 && (
                      <div className="mt-4 border-orange-500">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <div className="text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed">
                          <strong>Issues Detected:</strong>{" "}
                          {analysisResult.issues.join(", ")}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
