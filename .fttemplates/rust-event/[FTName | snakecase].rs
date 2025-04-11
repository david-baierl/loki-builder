use tauri::{AppHandle, Emitter};

use crate::models::IpcEvent;

// ---------------------------------------
// payload
// ---------------------------------------

type PAYLOAD = String;

// ---------------------------------------
// implementation
// ---------------------------------------

pub fn [FTName | snakecase](app: &AppHandle, data: PAYLOAD) -> Result<(), tauri::Error> {
    app.emit("[FTName | snakecase]", IpcEvent { data })
}
