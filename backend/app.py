import os
import json
from flask import Flask, jsonify, request, abort, send_from_directory
from flask_cors import CORS
from config import DevelopmentConfig # Import the config class

# --- ML Imports ---
from ultralytics import YOLO          # For object detection (YOLOv8)
import torch                          # PyTorch for MiDaS
import cv2                            # OpenCV for image manipulation (will be needed later)
from PIL import Image                 # Pillow for image processing

# GLOBAL VARIABLES to hold the loaded models
YOLO_MODEL = None 
MIDAS_MODEL = None 

# Helper function to check allowed file extensions (from config.py)
def allowed_file(filename):
    """Checks if the file extension is allowed."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in DevelopmentConfig.ALLOWED_EXTENSIONS

# --- Application Factory Pattern ---
def create_app(config_class=DevelopmentConfig):
    """Creates the Flask application instance and loads models."""
    global YOLO_MODEL, MIDAS_MODEL # Allows us to modify the global variables
    
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize CORS to allow requests from the frontend
    CORS(app)

    # Ensure the upload folder exists
    upload_path = os.path.join(app.root_path, app.config['UPLOAD_FOLDER'])
    os.makedirs(upload_path, exist_ok=True)
    
    # Check for GPU availability (important for performance, though we are using CPU for stability)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Running on device: {device}")
    
    # ----------------------------------------------------
    # MODEL LOADING LOGIC - RUNS ONLY ONCE AT STARTUP
    # ----------------------------------------------------
    
    # --- 1. YOLO MODEL LOADING (Custom Weights ONLY) ---
    try:
        # Define the path to the custom model file directly in the 'backend' directory (app.root_path)
        model_filename = 'custom_yolo_weights.pt' # Standardized name
        model_path = os.path.join(app.root_path, model_filename)
        
        print(f"Loading custom YOLO model from: {model_path}...")
        
        if not os.path.exists(model_path):
            # If the custom model is not found, we raise an error and set YOLO_MODEL to None.
            # This prevents loading the generic YOLOv8n model.
            raise FileNotFoundError(f"Custom weights not found. Please place '{model_filename}' in the '{app.root_path}' directory.")
            
        # Load the custom model if the file exists
        YOLO_MODEL = YOLO(model_path) 
        print("Custom YOLO model loaded successfully!")
        
    except FileNotFoundError as e:
        print(f"CRITICAL ERROR: {e}")
        YOLO_MODEL = None # Set to None, the app continues but the analysis route will fail (503)
    except Exception as e:
        print(f"Error loading YOLO model: {e}")
        YOLO_MODEL = None 

    # --- 2. MiDaS MODEL LOADING (Pretrained) ---
    try:
        print("Loading MiDaS depth estimation model...")
        
        # Load the MiDaS model using its GitHub repository. 
        # We use the DPT_Hybrid model for a good balance of speed and accuracy.
        MIDAS_MODEL = torch.hub.load("intel-isl/MiDaS", "MiDaS_small", force_reload=False) 
        
        # Move model to device (CPU/GPU) and set to evaluation mode
        MIDAS_MODEL.to(device).eval() 
        print("MiDaS model loaded successfully!")
        
    except Exception as e:
        print(f"Error loading MiDaS model: {e}")
        MIDAS_MODEL = None
        
    # ----------------------------------------------------


    # --- Routes (API Endpoints) ---

    @app.route('/', methods=['GET'])
    def index():
        """Simple health check endpoint."""
        # Status now clearly indicates that custom weights are required for YOLO
        yolo_status = "loaded (Custom)" if YOLO_MODEL else "failed (custom weights required)"
            
        midas_status = "loaded" if MIDAS_MODEL else "failed (check network/dependencies)"
        
        return jsonify({
            "status": "running", 
            "message": "PackSmart Backend is online!",
            "yolo_model": yolo_status,
            "midas_model": midas_status
        })

    # The main route for file upload and analysis
    @app.route('/api/analyze', methods=['POST'])
    def analyze_package():
        """Handles file upload and runs detection/depth analysis."""
        
        # 1. CHECK MODEL STATUS
        if not YOLO_MODEL or not MIDAS_MODEL:
            abort(503, description="One or more ML models failed to load. Check server logs.")

        # 2. CHECK FILE UPLOAD (File handling logic remains the same)
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        # 3. VALIDATE FILE
        if not allowed_file(file.filename):
            return jsonify({"error": "File type not allowed. Must be png, jpg, jpeg, or gif"}), 400

        # 4. SAVE FILE TEMPORARILY
        filename = file.filename
        upload_path = os.path.join(app.root_path, app.config['UPLOAD_FOLDER'], filename)
        file.save(upload_path)
        print(f"File saved to {upload_path}")

        # 5. RUN YOLO & MIDAS DETECTION
        try:
            # --- YOLO DETECTION ---
            yolo_results = YOLO_MODEL(upload_path, save=False, conf=0.5, verbose=False)
            detection_count = len(yolo_results[0].boxes)
            
            # --- MiDaS DEPTH ESTIMATION PLACEHOLDER ---
            # NOTE: The actual MiDaS processing logic needs to be fully implemented 
            # in a later step. This is just a placeholder.
            depth_analysis_result = "MiDaS model loaded, inference logic pending."
            
            # Clean up the uploaded image (good practice)
            os.remove(upload_path)

            return jsonify({
                "status": "success",
                "message": f"Analysis complete. Found {detection_count} objects.",
                "yolo_detections_found": detection_count,
                "depth_analysis": depth_analysis_result,
            })

        except Exception as e:
            if os.path.exists(upload_path): 
                os.remove(upload_path) 
            print(f"Error during ML inference: {e}")
            return jsonify({"error": f"Internal server error during analysis: {e}"}), 500


    return app

# Initialize the application instance
if __name__ == '__main__':
    app = create_app(DevelopmentConfig)
    app.run(host='0.0.0.0', port=5000)