from modules.detection import detect_front_object, detect_top_object
from modules.dimensions import get_real_dimensions
from modules.material import predict_material
from modules.weight import estimate_weight
from modules.packaging import get_packaging_recommendation
from modules.bom import generate_bom

def run_pipeline(front_image_path, top_image_path, real_width_cm):
    """
    Complete pipeline:
    1. Front detection (YOLO)
    2. Top detection (Contour)
    3. Pixel → Real dimension conversion
    4. Material prediction using cropped front image
    """

    if real_width_cm <= 0:
        raise ValueError("Real width must be greater than zero")

    # ---------------- FRONT DETECTION ----------------
    front_data = detect_front_object(front_image_path)

    # ---------------- TOP DETECTION ----------------
    top_data = detect_top_object(top_image_path)

    # ---------------- REAL DIMENSION CALCULATION ----------------
    real_dimensions = get_real_dimensions(
        width_front_px=front_data["width_px"],
        height_front_px=front_data["height_px"],
        width_top_px=top_data["width_top_px"],
        height_top_px=top_data["height_top_px"],
        real_width_cm=real_width_cm
    )

    # ---------------- MATERIAL PREDICTION ----------------
    material_data = predict_material(front_data["crop_image_path"], front_data["object_name"] )

    # ---------------- WEIGHT ESTIMATION ----------------
    weight = estimate_weight(real_dimensions["volume_cm3"], material_data["materials"][0]["name"], front_data["object_name"])

    # ---------------- WEIGHT ESTIMATION ----------------
    packaging = get_packaging_recommendation(material_data["object_category"], material_data["fragility"],weight, real_dimensions["length_cm"], real_dimensions["width_cm"], real_dimensions["height_cm"])
    
    bom_result = generate_bom(packaging["packaging_material"], packaging["adjusted_dimensions"], packaging["protection_layer"])
    bom = bom_result["bom"]
    grand_total = bom_result["grand_total"]
    # ---------------- STRUCTURED OUTPUT ----------------
    return {
        "front_bbox_image_path": front_data["bbox_image_path"],
        "object_name": front_data["object_name"],
        "object_confidence": front_data["confidence"],
        "real_dimensions": real_dimensions,
        "material": material_data,
        "weight": weight,
        "packaging": packaging,
        "bom": bom,
        "grand_total": grand_total
    }
