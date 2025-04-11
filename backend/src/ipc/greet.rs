use crate::ipc::{IpcRequest, IpcResponse};

// ---------------------------------------
// request
// ---------------------------------------

type REQUEST = IpcRequest<String>;

// ---------------------------------------
// response
// ---------------------------------------

type RESPONSE = IpcResponse<String>;

// ---------------------------------------
// implementation
// ---------------------------------------

#[tauri::command]
pub fn greet(_handle: tauri::AppHandle, name: REQUEST) -> RESPONSE {
    IpcResponse::new(format!(
        "Hello, {}! You've been greeted from Rust!",
        name.data
    ))
}
