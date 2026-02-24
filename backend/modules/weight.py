# DENSITY DATABASE (kg/cm³)
DENSITY_DB = {
    "Aluminium": 2700 / 1_000_000,
    "Brass": 8500 / 1_000_000,
    "Copper": 8960 / 1_000_000,
    "Iron": 7870 / 1_000_000,
    "Steel": 7850 / 1_000_000,
    "ceramic": 2400 / 1_000_000,
    "glass": 2500 / 1_000_000,
    "paper": 800 / 1_000_000,
    "plastic": 950 / 1_000_000,
    "wood": 700 / 1_000_000
}

# OBJECT FILL FACTOR DATABASE
OBJECT_FILL_FACTOR = {
    "Bottle": 0.07,
    "Dumbbell": 0.95,
    "Chair": 0.40,
    "Laptop": 0.60,
    "Refrigerator": 0.15,
    "Table": 0.50,
    "default": 0.65
}

# WEIGHT ESTIMATION FUNCTION

def estimate_weight(volume_cm3, material, object_name):
    """
    Estimate object weight using:
    - Volume (cm³)
    - Material density
    - Object fill factor
    
    Returns:
        weight_kg (float)
    """

    # Get Density
    density = DENSITY_DB.get(material)

    if density is None:
        raise ValueError(f"Material '{material}' not found in DENSITY_DB.")

    # Get Fill Factor
    fill_factor = OBJECT_FILL_FACTOR.get(
        object_name,
        OBJECT_FILL_FACTOR["default"]
    )

    # Compute Effective Volume
    effective_volume = volume_cm3 * fill_factor

    # Weight Estimation
    weight_kg = effective_volume * density

    return round(weight_kg, 3)