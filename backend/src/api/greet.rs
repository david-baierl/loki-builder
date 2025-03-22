#[tauri::command]
pub fn greet(_handle: tauri::AppHandle, name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
