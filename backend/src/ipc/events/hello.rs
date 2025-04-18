use tauri::{AppHandle, Emitter};

use crate::models::IpcEvent;

// ---------------------------------------
// payload
// ---------------------------------------

type PAYLOAD = String;

// ---------------------------------------
// implementation
// ---------------------------------------

pub fn hello(app: &AppHandle, data: PAYLOAD) -> Result<(), tauri::Error> {
    app.emit("hello", IpcEvent { data })
}
