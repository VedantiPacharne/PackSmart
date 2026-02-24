import os
import json
import torch
import torch.nn as nn
import torch.nn.functional as F
import cv2
import numpy as np
from torchvision import models, transforms

# =========================================
# CONFIG (adjust if needed)
# =========================================
MODEL_PATH = "../models/efficientnetb4_best_model.pth"
# CLASS_NAMES_PATH = "backend/models/class_names.json"

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

_model = None
_class_names = None


# =========================================
# LOAD MODEL (ONLY ONCE)
# =========================================
def load_material_model():
    global _model, _class_names

    if _model is None:

        # Load class names
        _class_names = ['Aluminium', 'Brass', 'Copper', 'Iron', 'Steel', 'ceramic', 'glass', 'paper', 'plastic', 'wood']

        num_classes = len(_class_names)

        model = models.efficientnet_b4(weights=None)
        model.classifier[1] = nn.Linear(
            model.classifier[1].in_features,
            num_classes
        )

        checkpoint = torch.load(MODEL_PATH, map_location=device)

        state_dict = checkpoint.get("model_state_dict", checkpoint)

        # Remove 'module.' if exists
        cleaned_state_dict = {}
        for k, v in state_dict.items():
            if k.startswith("module."):
                k = k[7:]
            cleaned_state_dict[k] = v

        model.load_state_dict(cleaned_state_dict, strict=False)
        model.to(device)
        model.eval()

        _model = model

    return _model, _class_names


# =========================================
# IMAGE TRANSFORM
# =========================================
transform = transforms.Compose([
    transforms.ToPILImage(),
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


# =========================================
# MATERIAL PREDICTION FUNCTION
# =========================================
def predict_material(image_path):
    """
    Input: Cropped object image path
    Output: Dict {material, confidence}
    """

    model, class_names = load_material_model()

    image = cv2.imread(image_path)
    if image is None:
        raise ValueError("Image not found")

    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    input_tensor = transform(image_rgb).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(input_tensor)
        probs = F.softmax(output, dim=1)

    probs = probs.cpu().numpy()[0]
    top_index = int(np.argmax(probs))

    return {
        "material": class_names[top_index]
    }