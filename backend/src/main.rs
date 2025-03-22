// -------------------------------------------------------
// header
// -------------------------------------------------------

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(all(not(debug_assertions), target_os = "windows"), windows_subsystem = "windows")]

// --- modules --- //

mod api;
mod errors;
mod models;

// --- exports --- //

pub use errors::{Error, Result};

// -------------------------------------------------------
// main
// -------------------------------------------------------

#[tokio::main]
#[cfg_attr(mobile, tauri::mobile_entry_point)]
async fn main() -> Result<()> {

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_os::init())
        .invoke_handler(tauri::generate_handler![api::greet, api::get_definitions,])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}
