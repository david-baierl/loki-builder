use tauri::{command, AppHandle};

use crate::{
    ipc::events,
    models::{IpcRequest, IpcResponse},
};

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

#[command]
pub async fn greet(app: AppHandle, request: REQUEST) -> Result<RESPONSE, tauri::Error> {
    events::hello(&app, request.data.clone())?;

    Ok(IpcResponse {
        data: format!("Hello, {}! You've been greeted from Rust!", request.data),
    })
}
