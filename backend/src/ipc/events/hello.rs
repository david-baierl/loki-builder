use tauri::{AppHandle, Emitter};

use crate::ipc::IpcEvent;

pub fn hello(app: AppHandle, message: IpcEvent<String>) {
    app.emit("hello", message).unwrap();
}
