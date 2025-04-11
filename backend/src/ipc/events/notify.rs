use tauri::{AppHandle, Emitter};

use crate::models::IpcEvent;

// ---------------------------------------
// payload
// ---------------------------------------

type PAYLOAD = f64;

// ---------------------------------------
// implementation
// ---------------------------------------

pub fn notify(app: &AppHandle, data: PAYLOAD) -> Result<(), tauri::Error> {
    app.emit("notify", IpcEvent { data })
}
