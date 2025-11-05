import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Package, 
  Upload, 
  Scan, 
  Layers, 
  Box, 
  FileText, 
  DollarSign, 
  User, 
  ArrowLeft,
  Eye,
  Camera,
  RotateCcw,
  Download,
  Share,
  Check,
  Zap,
  Shield,
  Sparkles
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { Separator } from './components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

type Screen = 
  | 'splash'
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'upload'
  | 'analysis'
  | 'material'
  | 'recommendation'
  | 'design'
  | 'bom'
  | 'quotation'
  | 'profile';

type UploadedImage = {
  url: string;
  name: string;
};

type AnalysisData = {
  objectName: string;
  dimensions: {
    length: number;
    breadth: number;
    height: number;
  };
  volume: number;
  weight: number;
};

type MaterialData = {
  material: string;
  confidence: number;
  properties: string[];
};

type PackagingRecommendation = {
  boxMaterial: string;
  boxSize: string;
  thickness: string;
  features: string[];
  cost: number;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    objectName: 'Smartphone',
    dimensions: { length: 15.2, breadth: 7.4, height: 0.8 },
    volume: 89.8,
    weight: 174
  });
  const [materialData, setMaterialData] = useState<MaterialData>({
    material: 'Metal & Glass',
    confidence: 94,
    properties: ['Fragile', 'High Value', 'Electronic']
  });
  const [recommendation, setRecommendation] = useState<PackagingRecommendation>({
    boxMaterial: 'Corrugated Cardboard',
    boxSize: '18 x 10 x 5 cm',
    thickness: '3mm',
    features: ['Shock Absorption', 'Moisture Resistant', 'Tamper Evident'],
    cost: 2.45
  });

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedImage({
      url,
      name: file.name
    });
    navigateToScreen('analysis');
  };

  const SplashScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg">
          <Package className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">SmartPack AI</h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          AI-Powered Smart Packaging Assistant for Automated Box Design
        </p>
        
        <div className="flex items-center justify-center space-x-6 mb-8">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">Fast</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">Reliable</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">Smart</span>
          </div>
        </div>
        
        <Button 
          onClick={() => navigateToScreen('login')}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg"
        >
          Get Started
        </Button>
      </motion.div>
    </div>
  );

  const LoginScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Package className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <p className="text-gray-600">Sign in to your account</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="Enter your email"
                className="rounded-xl border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="Enter your password"
                className="rounded-xl border-gray-200"
              />
            </div>
            <Button 
              onClick={() => navigateToScreen('dashboard')}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl"
            >
              Sign In
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full rounded-xl border-gray-200"
              onClick={() => navigateToScreen('dashboard')}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </Button>
            <div className="text-center">
              <Button 
                variant="ghost" 
                className="text-blue-600 hover:text-blue-700"
                onClick={() => navigateToScreen('signup')}
              >
                Don't have an account? Sign up
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  const SignupScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Package className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <p className="text-gray-600">Get started with SmartPack AI</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName"
                  placeholder="John"
                  className="rounded-xl border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName"
                  placeholder="Doe"
                  className="rounded-xl border-gray-200"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="john@example.com"
                className="rounded-xl border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="Create a strong password"
                className="rounded-xl border-gray-200"
              />
            </div>
            <Button 
              onClick={() => navigateToScreen('dashboard')}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl"
            >
              Create Account
            </Button>
            <div className="text-center">
              <Button 
                variant="ghost" 
                className="text-blue-600 hover:text-blue-700"
                onClick={() => navigateToScreen('login')}
              >
                Already have an account? Sign in
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  const DashboardScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">SmartPack AI</h1>
                <p className="text-sm text-gray-500">Dashboard</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateToScreen('profile')}
              className="rounded-lg"
            >
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Start designing smart packaging solutions with AI</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Upload,
              title: 'Upload Image',
              description: 'Start by uploading an image of your product',
              screen: 'upload' as Screen,
              color: 'from-blue-500 to-blue-600'
            },
            {
              icon: Scan,
              title: 'Object Analysis',
              description: 'AI-powered object detection and measurement',
              screen: 'analysis' as Screen,
              color: 'from-green-500 to-green-600'
            },
            {
              icon: Layers,
              title: 'Material Analysis',
              description: 'Identify material properties and characteristics',
              screen: 'material' as Screen,
              color: 'from-purple-500 to-purple-600'
            },
            {
              icon: Box,
              title: 'Packaging Recommendation',
              description: 'Get optimal packaging solutions',
              screen: 'recommendation' as Screen,
              color: 'from-orange-500 to-orange-600'
            },
            {
              icon: Eye,
              title: 'Box Design',
              description: 'Visualize your packaging in 2D and 3D',
              screen: 'design' as Screen,
              color: 'from-pink-500 to-pink-600'
            },
            {
              icon: FileText,
              title: 'BOM & Quotation',
              description: 'Generate materials list and cost estimation',
              screen: 'bom' as Screen,
              color: 'from-indigo-500 to-indigo-600'
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 shadow-md group"
                onClick={() => navigateToScreen(item.screen)}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Recent Projects</span>
                <Badge variant="secondary">3</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Smartphone Packaging', date: '2 hours ago', status: 'Completed' },
                  { name: 'Headphones Box Design', date: '1 day ago', status: 'In Progress' },
                  { name: 'Watch Packaging', date: '3 days ago', status: 'Completed' }
                ].map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div>
                      <p className="font-medium text-gray-900">{project.name}</p>
                      <p className="text-sm text-gray-500">{project.date}</p>
                    </div>
                    <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );

  const UploadScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header title="Upload Image" onBack={() => navigateToScreen('dashboard')} />
      
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Upload Product Image</h2>
                <p className="text-gray-600 mb-8">Upload a clear image of your product for AI analysis</p>

                <div className="border-2 border-dashed border-blue-200 rounded-xl p-12 mb-6 bg-blue-50/50 hover:bg-blue-50 transition-colors">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">Drag and drop your image here</p>
                    <p className="text-gray-500 mb-4">or</p>
                    <Button 
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            handleImageUpload(file);
                          }
                        };
                        input.click();
                      }}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg"
                    >
                      Browse Files
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                  <span>JPG, PNG up to 10MB</span>
                  <span>•</span>
                  <span>Best results with clear, well-lit images</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-blue-500" />
                <span>Camera Options</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 rounded-xl border-gray-200 hover:border-blue-300"
                  onClick={() => {
                    // Simulate camera capture
                    setUploadedImage({
                      url: 'https://images.unsplash.com/photo-1551650992-ee4fd47df41f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzU4MTY3MzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                      name: 'smartphone.jpg'
                    });
                    navigateToScreen('analysis');
                  }}
                >
                  <div className="text-center">
                    <Camera className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <span>Take Photo</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 rounded-xl border-gray-200 hover:border-blue-300"
                  onClick={() => navigateToScreen('analysis')}
                >
                  <div className="text-center">
                    <Upload className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <span>Upload from Gallery</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );

  const AnalysisScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header title="Object Analysis" onBack={() => navigateToScreen('upload')} />
      
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <ProgressIndicator currentStep={2} totalSteps={6} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  <span>Uploaded Image</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uploadedImage && (
                  <div className="relative">
                    <ImageWithFallback 
                      src={uploadedImage.url}
                      alt="Uploaded product"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 border-2 border-green-400 rounded-lg"></div>
                    <Badge className="absolute top-2 left-2 bg-green-500">
                      Object Detected
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Scan className="w-5 h-5 text-green-500" />
                  <span>Analysis Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Detected Object</Label>
                  <p className="text-lg font-semibold text-gray-900">{analysisData.objectName}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Length</Label>
                    <p className="text-lg font-semibold text-blue-600">{analysisData.dimensions.length} cm</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Breadth</Label>
                    <p className="text-lg font-semibold text-blue-600">{analysisData.dimensions.breadth} cm</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Height</Label>
                    <p className="text-lg font-semibold text-blue-600">{analysisData.dimensions.height} cm</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Volume</Label>
                    <p className="text-lg font-semibold text-purple-600">{analysisData.volume} cm³</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium text-gray-700">Estimated Weight</Label>
                  <p className="text-lg font-semibold text-orange-600">{analysisData.weight}g</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Analysis Complete!</h3>
                  <p className="text-green-600">Your product has been successfully analyzed. Proceeding to material classification.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigateToScreen('upload')}
              className="rounded-lg"
            >
              Re-upload Image
            </Button>
            <Button 
              onClick={() => navigateToScreen('material')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg"
            >
              Continue to Material Analysis
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const MaterialScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header title="Material Classification" onBack={() => navigateToScreen('analysis')} />
      
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <ProgressIndicator currentStep={3} totalSteps={6} />

          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="w-5 h-5 text-purple-500" />
                <span>Material Analysis Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Layers className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Material Detected</h3>
                <p className="text-xl text-purple-600 font-semibold">{materialData.material}</p>
              </div>

              <div className="text-center">
                <Label className="text-sm font-medium text-gray-700 block mb-2">AI Confidence</Label>
                <div className="flex items-center justify-center space-x-4">
                  <Progress value={materialData.confidence} className="flex-1 max-w-xs" />
                  <span className="text-lg font-semibold text-green-600">{materialData.confidence}%</span>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-lg font-medium text-gray-900 block mb-4">Material Properties</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {materialData.properties.map((property, index) => (
                    <Badge key={index} variant="secondary" className="justify-center py-2 text-sm">
                      {property}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Packaging Considerations</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Requires protective packaging due to fragile nature</li>
                  <li>• Anti-static materials recommended for electronics</li>
                  <li>• Shock-absorbing inserts needed</li>
                  <li>• Moisture protection recommended</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigateToScreen('analysis')}
              className="rounded-lg"
            >
              Back to Analysis
            </Button>
            <Button 
              onClick={() => navigateToScreen('recommendation')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg"
            >
              Get Packaging Recommendation
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const RecommendationScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header title="Packaging Recommendation" onBack={() => navigateToScreen('material')} />
      
      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <ProgressIndicator currentStep={4} totalSteps={6} />

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Recommended Packaging Solution</h2>
            <p className="text-gray-600">Based on your product analysis, here's our AI-powered recommendation</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-xl border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <Check className="w-5 h-5" />
                  <span>Recommended Solution</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Box Material</Label>
                  <p className="text-lg font-semibold text-gray-900">{recommendation.boxMaterial}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Optimal Size</Label>
                  <p className="text-lg font-semibold text-blue-600">{recommendation.boxSize}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Wall Thickness</Label>
                  <p className="text-lg font-semibold text-purple-600">{recommendation.thickness}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Estimated Cost</Label>
                  <p className="text-2xl font-bold text-green-600">₹{recommendation.cost}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 block mb-2">Key Features</Label>
                  <div className="space-y-2">
                    {recommendation.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Alternative Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    material: 'Bubble Wrap Envelope',
                    size: '20 x 12 x 2 cm',
                    cost: 1.85,
                    features: ['Lightweight', 'Water Resistant']
                  },
                  {
                    material: 'Rigid Cardboard Box',
                    size: '20 x 12 x 6 cm',
                    cost: 3.20,
                    features: ['Extra Protection', 'Premium Look']
                  }
                ].map((option, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{option.material}</h4>
                      <span className="text-lg font-semibold text-gray-700">₹{option.cost}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{option.size}</p>
                    <div className="flex flex-wrap gap-1">
                      {option.features.map((feature, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-orange-100">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Box className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-orange-800 mb-2">Why This Recommendation?</h3>
                  <ul className="text-orange-700 space-y-1 text-sm">
                    <li>• Optimal protection for fragile electronics</li>
                    <li>• Cost-effective material selection</li>
                    <li>• Environmentally friendly corrugated cardboard</li>
                    <li>• Perfect size ratio (20% buffer space for protection)</li>
                    <li>• Suitable for standard shipping methods</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigateToScreen('material')}
              className="rounded-lg"
            >
              Back to Material Analysis
            </Button>
            <Button 
              onClick={() => navigateToScreen('design')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg"
            >
              Proceed to Design
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const DesignScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header title="Box Design" onBack={() => navigateToScreen('recommendation')} />
      
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <ProgressIndicator currentStep={5} totalSteps={6} />

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Box Design Preview</h2>
            <p className="text-gray-600">2D layout and 3D visualization of your packaging</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span>2D Flat Layout</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-8 min-h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-64 h-48 border-2 border-dashed border-gray-400 rounded-lg relative mx-auto mb-4">
                      <div className="absolute inset-4 border border-gray-300"></div>
                      <div className="absolute top-2 left-2 text-xs text-gray-500">Top</div>
                      <div className="absolute bottom-2 left-2 text-xs text-gray-500">Bottom</div>
                      <div className="absolute top-1/2 left-1 text-xs text-gray-500 -rotate-90">Side</div>
                      <div className="absolute top-1/2 right-1 text-xs text-gray-500 rotate-90">Side</div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs text-gray-600 font-medium">
                        18cm × 10cm × 5cm
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Unfolded box template with cut lines</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-purple-500" />
                  <span>3D Interactive Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 min-h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg mx-auto mb-4 relative transform rotate-12 shadow-lg">
                      <div className="absolute inset-2 border-2 border-orange-400 rounded-md"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-orange-700">
                        3D Box
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Interactive 3D model</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="rounded-lg"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Rotate View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Dimensions</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <div className="text-2xl font-bold text-blue-600">18 × 10 × 5</div>
                <div className="text-sm text-gray-600">cm (L × W × H)</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Material</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <div className="text-lg font-semibold text-green-600">Corrugated</div>
                <div className="text-sm text-gray-600">3mm thickness</div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Weight</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-2">
                <div className="text-2xl font-bold text-purple-600">45g</div>
                <div className="text-sm text-gray-600">Empty box</div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Design Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Standard Brown', color: 'bg-amber-600' },
                  { name: 'White Premium', color: 'bg-gray-100 border' },
                  { name: 'Black Luxury', color: 'bg-gray-900' },
                  { name: 'Custom Print', color: 'bg-gradient-to-r from-blue-500 to-purple-500' }
                ].map((option, index) => (
                  <div key={index} className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                    <div className={`w-16 h-12 ${option.color} rounded-md mx-auto mb-2`}></div>
                    <p className="text-sm font-medium text-gray-700">{option.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                className="rounded-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download 2D Template
              </Button>
              <Button 
                variant="outline" 
                className="rounded-lg"
              >
                <Share className="w-4 h-4 mr-2" />
                Share Design
              </Button>
            </div>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={() => navigateToScreen('recommendation')}
                className="rounded-lg"
              >
                Back to Recommendation
              </Button>
              <Button 
                onClick={() => navigateToScreen('bom')}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg"
              >
                Generate BOM & Quote
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const BOMScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header title="Bill of Materials" onBack={() => navigateToScreen('design')} />
      
      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <ProgressIndicator currentStep={6} totalSteps={6} />

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Bill of Materials</h2>
            <p className="text-gray-600">Detailed breakdown of materials and components</p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-green-500" />
                <span>Material Specifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Material</TableHead>
                    <TableHead>Dimensions (cm)</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Cost</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Box Base</TableCell>
                    <TableCell>Corrugated Cardboard 3mm</TableCell>
                    <TableCell>18.0 × 10.0</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>₹0.45</TableCell>
                    <TableCell>₹0.45</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Box Top</TableCell>
                    <TableCell>Corrugated Cardboard 3mm</TableCell>
                    <TableCell>18.0 × 10.0</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>₹0.45</TableCell>
                    <TableCell>₹0.45</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Side Panels (Long)</TableCell>
                    <TableCell>Corrugated Cardboard 3mm</TableCell>
                    <TableCell>18.0 × 5.0</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>₹0.25</TableCell>
                    <TableCell>₹0.50</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Side Panels (Short)</TableCell>
                    <TableCell>Corrugated Cardboard 3mm</TableCell>
                    <TableCell>10.0 × 5.0</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>₹0.15</TableCell>
                    <TableCell>₹0.30</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Protective Insert</TableCell>
                    <TableCell>Foam Padding</TableCell>
                    <TableCell>17.0 × 9.0 × 1.0</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>₹0.35</TableCell>
                    <TableCell>₹0.35</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Adhesive Tape</TableCell>
                    <TableCell>Paper Tape</TableCell>
                    <TableCell>50cm length</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>₹0.08</TableCell>
                    <TableCell>₹0.08</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Material Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Corrugated Cardboard</span>
                  <span className="font-semibold">856 cm²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Foam Padding</span>
                  <span className="font-semibold">153 cm²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Adhesive Tape</span>
                  <span className="font-semibold">50 cm</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Weight</span>
                  <span className="text-blue-600">45g</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100">
              <CardHeader>
                <CardTitle className="text-green-800">Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 text-sm">100% Recyclable Materials</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 text-sm">Biodegradable Components</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 text-sm">Minimal Plastic Usage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-green-700 text-sm">Carbon Footprint: Low</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigateToScreen('design')}
              className="rounded-lg"
            >
              Back to Design
            </Button>
            <Button 
              onClick={() => navigateToScreen('quotation')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg"
            >
              Generate Quotation
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const QuotationScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header title="Quotation" onBack={() => navigateToScreen('bom')} />
      
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Packaging Quotation</h2>
            <p className="text-gray-600">Detailed cost breakdown and pricing</p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">SmartPack AI Quotation</CardTitle>
                  <p className="text-blue-100">Quote #SP-2024-001</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-100">Date: {new Date().toLocaleDateString()}</p>
                  <p className="text-blue-100">Valid until: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Product Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Product:</span>
                      <span className="ml-2 font-medium">Smartphone Packaging</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Dimensions:</span>
                      <span className="ml-2 font-medium">18 × 10 × 5 cm</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Material:</span>
                      <span className="ml-2 font-medium">Corrugated Cardboard</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Quantity:</span>
                      <span className="ml-2 font-medium">100 units</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Materials Cost (100 units)</span>
                      <span className="font-medium">₹213.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Manufacturing & Assembly</span>
                      <span className="font-medium">₹45.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Quality Control</span>
                      <span className="font-medium">₹12.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Design & Setup</span>
                      <span className="font-medium">₹25.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center font-medium">
                      <span>Subtotal</span>
                      <span>₹295.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Tax (8.5%)</span>
                      <span>₹25.08</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Shipping</span>
                      <span>₹15.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center text-xl font-bold text-green-600">
                      <span>Total</span>
                      <span>₹335.08</span>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      Per unit: ₹3.35
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Additional Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { service: 'Custom Printing', price: '+₹45.00', desc: 'Logo and branding' },
                      { service: 'Express Delivery', price: '+₹25.00', desc: '2-3 business days' },
                      { service: 'Premium Materials', price: '+₹38.00', desc: 'Upgrade to premium cardboard' },
                      { service: 'Assembly Service', price: '+₹22.00', desc: 'Pre-assembled boxes' }
                    ].map((item, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-gray-900">{item.service}</span>
                          <span className="text-blue-600 font-semibold">{item.price}</span>
                        </div>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Terms & Conditions</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Payment due within 30 days of invoice date</li>
                    <li>• Prices valid for 30 days from quote date</li>
                    <li>• Minimum order quantity: 50 units</li>
                    <li>• Production time: 5-7 business days</li>
                    <li>• Free revision included, additional revisions $15 each</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigateToScreen('bom')}
              className="rounded-lg"
            >
              Back to BOM
            </Button>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                className="rounded-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button 
                variant="outline" 
                className="rounded-lg"
              >
                <Share className="w-4 h-4 mr-2" />
                Share Quote
              </Button>
              <Button 
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg"
              >
                Accept Quote
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const ProfileScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header title="Profile & Settings" onBack={() => navigateToScreen('dashboard')} />
      
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">John Doe</h2>
                  <p className="text-gray-600">john.doe@example.com</p>
                  <Badge className="mt-2">Premium Member</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Account Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Projects Created</span>
                  <span className="font-semibold text-blue-600">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Quotations Generated</span>
                  <span className="font-semibold text-green-600">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Savings</span>
                  <span className="font-semibold text-purple-600">₹1,245</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Member Since</span>
                  <span className="font-semibold">Jan 2024</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start rounded-lg"
                  onClick={() => navigateToScreen('upload')}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Start New Project
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-lg">
                  <FileText className="w-4 h-4 mr-2" />
                  View Saved Quotations
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-lg">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Billing & Invoices
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-lg">
                  <User className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: 'Smartphone Packaging',
                    date: '2 hours ago',
                    status: 'Completed',
                    cost: '₹335.08'
                  },
                  {
                    name: 'Headphones Box Design',
                    date: '1 day ago',
                    status: 'Quote Generated',
                    cost: '₹142.50'
                  },
                  {
                    name: 'Watch Packaging',
                    date: '3 days ago',
                    status: 'Completed',
                    cost: '₹89.25'
                  },
                  {
                    name: 'Electronics Bundle',
                    date: '1 week ago',
                    status: 'Completed',
                    cost: '₹456.80'
                  }
                ].map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{project.name}</h4>
                      <p className="text-sm text-gray-600">{project.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={project.status === 'Completed' ? 'default' : 'secondary'}
                        className="mb-1"
                      >
                        {project.status}
                      </Badge>
                      <p className="text-sm font-semibold text-green-600">{project.cost}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start rounded-lg text-red-600 border-red-200 hover:bg-red-50">
                Export All Data
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start rounded-lg text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => navigateToScreen('login')}
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );

  const Header = ({ title, onBack }: { title: string; onBack: () => void }) => (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );

  const ProgressIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">{currentStep} of {totalSteps}</span>
        </div>
        <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Upload</span>
          <span>Analysis</span>
          <span>Material</span>
          <span>Recommendation</span>
          <span>Design</span>
          <span>Quote</span>
        </div>
      </CardContent>
    </Card>
  );

  // Render the current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen />;
      case 'signup':
        return <SignupScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'upload':
        return <UploadScreen />;
      case 'analysis':
        return <AnalysisScreen />;
      case 'material':
        return <MaterialScreen />;
      case 'recommendation':
        return <RecommendationScreen />;
      case 'design':
        return <DesignScreen />;
      case 'bom':
        return <BOMScreen />;
      case 'quotation':
        return <QuotationScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderScreen()}
    </div>
  );
}