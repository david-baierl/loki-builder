use crate::models::FeatureDefinition;

#[tauri::command]
// #[specta::specta]
pub fn get_definitions(_handle: tauri::AppHandle) -> FeatureDefinition {
    FeatureDefinition::new()
}
