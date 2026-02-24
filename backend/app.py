import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from config import DevelopmentConfig

# Import your pipeline
from pipeline import run_pipeline

# Import model loading functions
from modules.detection import load_model
from modules.material import load_material_model

# ---------------- GLOBAL FASTAPI APP ----------------
app = FastAPI(title="SmartPack AI Backend")

# ---------------- ENABLE CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- HELPER FUNCTION ----------------
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in DevelopmentConfig.ALLOWED_EXTENSIONS


# ---------------- STARTUP EVENT (LOAD MODELS ONCE) ----------------
@app.on_event("startup")
def load_models():
    print("Loading Detection Model...")
    load_model()

    print("Loading Material Model...")
    load_material_model()

    print("All models loaded successfully!")


# ---------------- ROOT ENDPOINT ----------------
@app.get("/")
def health_check():
    return {
        "status": "running",
        "message": "SmartPack AI Backend is online!"
    }


# ---------------- MAIN PREDICTION ENDPOINT ----------------
@app.post("/api/analyze")
async def analyze_package(
    front_image: UploadFile = File(...),
    top_image: UploadFile = File(...),
    real_width_cm: float = Form(...)
):

    # 1️⃣ Validate file types
    if not allowed_file(front_image.filename):
        raise HTTPException(
            status_code=400,
            detail="Front image file type not allowed."
        )

    if not allowed_file(top_image.filename):
        raise HTTPException(
            status_code=400,
            detail="Top image file type not allowed."
        )

    # 2️⃣ Validate real width
    if real_width_cm <= 0:
        raise HTTPException(
            status_code=400,
            detail="Real width must be greater than zero."
        )

    # 3️⃣ Save uploaded files temporarily
    upload_folder = DevelopmentConfig.UPLOAD_FOLDER
    os.makedirs(upload_folder, exist_ok=True)

    front_path = os.path.join(upload_folder, front_image.filename)
    top_path = os.path.join(upload_folder, top_image.filename)

    with open(front_path, "wb") as buffer:
        buffer.write(await front_image.read())

    with open(top_path, "wb") as buffer:
        buffer.write(await top_image.read())

    try:
        # 4️⃣ Run full SmartPack pipeline
        result = run_pipeline(front_path, top_path, real_width_cm)

        # 5️⃣ Clean up temp files
        os.remove(front_path)
        os.remove(top_path)

        return {
            "status": "success",
            "data": result
        }

    except Exception as e:
        # Cleanup in case of failure
        if os.path.exists(front_path):
            os.remove(front_path)
        if os.path.exists(top_path):
            os.remove(top_path)

        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )