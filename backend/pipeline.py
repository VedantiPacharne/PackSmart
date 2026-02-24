from modules.detection import detect_front_object, detect_top_object
from modules.dimensions import get_real_dimensions
from modules.material import predict_material
from modules.weight import estimate_weight

def run_pipeline(front_image_path, top_image_path):
    """
    Complete pipeline:
    1. Front detection (YOLO)
    2. Top detection (Contour)
    3. Pixel → Real dimension conversion
    4. Material prediction using cropped front image
    """

    # ---------------- FRONT DETECTION ----------------
    front_data = detect_front_object(front_image_path)

    # ---------------- TOP DETECTION ----------------
    top_data = detect_top_object(top_image_path)

    real_width_cm = float(input("Enter width: "))
    if real_width_cm <= 0:
        raise ValueError("Real width must be greater than zero")

    # ---------------- REAL DIMENSION CALCULATION ----------------
    real_dimensions = get_real_dimensions(
        width_front_px=front_data["width_px"],
        height_front_px=front_data["height_px"],
        width_top_px=top_data["width_top_px"],
        height_top_px=top_data["height_top_px"],
        real_width_cm=real_width_cm
    )

    # ---------------- MATERIAL PREDICTION ----------------
    material_data = predict_material(front_data["crop_image_path"])

    # ---------------- WEIGHT ESTIMATION ----------------
    weight = estimate_weight(real_dimensions["volume_cm3"], material_data, front_data["object_name"])

    # ---------------- STRUCTURED OUTPUT ----------------
    return {
        "front_bbox_image_path": front_data["bbox_image_path"],
        "top_bbox_image_path": top_data["bbox_image_path"],
        "real_dimensions": real_dimensions,
        "material": material_data,
        "crop_image_path": front_data["crop_image_path"],
        "weight": weight
    }
