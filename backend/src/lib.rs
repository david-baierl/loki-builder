// -------------------------------------------------------
// header
// -------------------------------------------------------

// --- modules --- //

mod errors;
mod ipc;
mod models;

// --- exports --- //

pub use errors::{Error, Result};

// -------------------------------------------------------
// main
// -------------------------------------------------------

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() -> Result<()> {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_os::init())
        .invoke_handler(tauri::generate_handler![
            ipc::actions::greet,
            ipc::actions::get_definitions,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
