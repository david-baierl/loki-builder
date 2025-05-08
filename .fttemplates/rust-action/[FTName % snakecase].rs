use tauri::{command, AppHandle};

use crate::models::{IpcRequest, IpcResponse};

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
pub async fn [FTName | snakecase](app: AppHandle, request: REQUEST) -> Result<RESPONSE, tauri::Error> {
    Ok(IpcResponse { data: request.data })
}
