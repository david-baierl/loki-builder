use tauri::{command, AppHandle};

use crate::models::{FeatureDefinition, IpcRequest, IpcResponse};

// ---------------------------------------
// request
// ---------------------------------------

type REQUEST = IpcRequest<String>;

// ---------------------------------------
// response
// ---------------------------------------

type RESPONSE = IpcResponse<FeatureDefinition>;

// ---------------------------------------
// implementation
// ---------------------------------------

#[command]
pub async fn get_definitions(_app: AppHandle, request: REQUEST) -> Result<RESPONSE, tauri::Error> {
    let data = FeatureDefinition::new();

    Ok(IpcResponse { data })
}
