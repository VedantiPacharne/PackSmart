import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { motion } from 'motion/react';
import { 
  Layers, 
  Box, 
  Weight, 
  ChevronRight, 
  Leaf, 
  Droplet,
  Shield,
  Check,
  X,
  Package
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type MaterialsPageProps = {
  appData: any;
  setAppData: (data: any) => void;
  setCurrentPage: (page: string) => void;
  scrollToTop: () => void;
  scrollLockPosition: number;
  isInputFocused: boolean;
};

export function MaterialsPageNew({ appData, setAppData, setCurrentPage, scrollToTop }: MaterialsPageProps) {
  let scrollLockPosition = 0;
  let isInputFocused = false;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-purple-100 text-purple-700 border-0">
            <Layers className="w-3 h-3 mr-1" />
            Step 3 of 6
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Material Identification & Weight Estimation
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered material analysis with environmental impact assessment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left: Object Preview with Bounding Box */}
          <Card className="border border-gray-200 shadow-lg bg-white rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Box className="w-5 h-5 text-purple-600" />
                <span>Object Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                {appData.topViewImage && (
                  <ImageWithFallback 
                    src={appData.topViewImage.url}
                    alt="Object for material analysis"
                    className="w-full h-80 object-cover rounded-xl"
                  />
                )}
                {/* Bounding Box */}
                <div className="absolute inset-8 border-4 border-purple-500 rounded-lg">
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-purple-500 rounded-full"></div>
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-purple-500 rounded-full"></div>
                  <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-purple-500 rounded-full"></div>
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-purple-500 rounded-full"></div>
                </div>
                <Badge className="absolute top-4 left-4 bg-purple-500 border-0 text-white">
                  <Check className="w-3 h-3 mr-1" />
                  Material Detected
                </Badge>
              </div>

              {/* Weight Card */}
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-teal-50 shadow-sm">
                <CardContent className="p-6 text-center">
                  <Weight className="w-10 h-10 mx-auto mb-3 text-green-600" />
                  <p className="text-sm text-gray-600 mb-2">Estimated Weight</p>
                  <div className="flex items-end justify-center space-x-2">
                    <span className="text-5xl font-bold text-gray-900">{appData.estimatedWeight}</span>
                    <span className="text-2xl text-gray-600 mb-2">kg</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Based on material density analysis</p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Right: Material Properties Detection Panel */}
          <div className="space-y-4">
            <Card className="border border-gray-200 shadow-lg bg-white rounded-2xl">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-purple-600" />
                  <span>Material Properties</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Material Type */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <Box className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Material Type</p>
                        <p className="text-lg font-bold text-gray-900">{appData.materialProperties.materialType}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Material Category */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-700">Category</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-0">
                      {appData.materialProperties.category}
                    </Badge>
                  </div>
                </div>

                {/* Density */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Droplet className="w-5 h-5 text-cyan-600" />
                      <span className="text-sm font-semibold text-gray-700">Density</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{appData.materialProperties.density} kg/m³</span>
                  </div>
                </div>

                {/* Surface Type */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Box className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-semibold text-gray-700">Surface Type</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{appData.materialProperties.surfaceType}</span>
                  </div>
                </div>

                {/* Fragility Level */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-semibold text-gray-700">Fragility Level</span>
                    </div>
                    <Badge className={
                      appData.materialProperties.fragility === 'Low' ? 'bg-green-100 text-green-700 border-0' :
                      appData.materialProperties.fragility === 'Medium' ? 'bg-yellow-100 text-yellow-700 border-0' :
                      'bg-red-100 text-red-700 border-0'
                    }>
                      {appData.materialProperties.fragility}
                    </Badge>
                  </div>
                </div>

                {/* Recyclability */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Leaf className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-semibold text-gray-700">Recyclability</span>
                    </div>
                    <Badge className={appData.materialProperties.recyclable ? 'bg-green-100 text-green-700 border-0' : 'bg-gray-100 text-gray-700 border-0'}>
                      {appData.materialProperties.recyclable ? (
                        <><Check className="w-3 h-3 mr-1" /> Yes</>
                      ) : (
                        <><X className="w-3 h-3 mr-1" /> No</>
                      )}
                    </Badge>
                  </div>
                </div>

                {/* Environmental Impact - Eco Score */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Environmental Impact</p>
                        <p className="text-sm font-bold text-gray-900">Eco Score</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-green-600">{appData.materialProperties.ecoScore}/100</span>
                  </div>
                  <Progress value={appData.materialProperties.ecoScore} className="h-3 bg-white" />
                  <p className="text-xs text-gray-600 mt-2">Higher score indicates better environmental sustainability</p>
                </div>

                {/* Confidence Score */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">AI Confidence Score</span>
                    <span className="text-2xl font-bold text-blue-600">{appData.materialProperties.confidenceScore}%</span>
                  </div>
                  <Progress value={appData.materialProperties.confidenceScore} className="h-3 bg-white" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Optional Real Weight Input */}
        <Card className="border border-gray-200 shadow-lg bg-white rounded-2xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Weight className="w-5 h-5 text-gray-600" />
              <span>Override Weight (Optional)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-md mx-auto">
              <Label htmlFor="real-weight" className="text-sm font-semibold text-gray-700 mb-3 block">
                Enter Actual Weight if Known
              </Label>
              <input
                id="real-weight"
                type="number"
                inputMode="decimal"
                step="0.01"
                placeholder="e.g., 0.38 kg"
                value={appData.realWeight}
                onFocus={(e) => {
                  scrollLockPosition = window.scrollY;
                  isInputFocused = true;
                  e.preventDefault();
                  e.stopPropagation();
                  window.scrollTo({ top: scrollLockPosition, behavior: 'instant' });
                  setTimeout(() => window.scrollTo({ top: scrollLockPosition, behavior: 'instant' }), 0);
                }}
                onBlur={() => {
                  isInputFocused = false;
                }}
                onChange={(e) => {
                  const currentScroll = scrollLockPosition;
                  setAppData((prev: any) => ({ ...prev, realWeight: e.target.value }));
                  window.scrollTo({ top: currentScroll, behavior: 'instant' });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                onMouseDown={() => {
                  scrollLockPosition = window.scrollY;
                }}
                className="w-full px-4 py-3 text-center text-lg font-semibold border-2 border-gray-300 focus:border-blue-500 rounded-xl focus:outline-none"
              />
              <p className="text-xs text-gray-500 text-center mt-2">
                If provided, this value will be used for packaging calculations
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            size="lg"
            onClick={() => {
              setCurrentPage('packaging');
              scrollToTop();
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-xl shadow-xl"
          >
            Generate Packaging Recommendation
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
