use tauri::{command, AppHandle};

use crate::{
    ipc::{IpcRequest, IpcResponse},
    models::FeatureDefinition,
};

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
pub fn get_definitions(_handle: AppHandle, request: REQUEST) -> RESPONSE {
    IpcResponse {
        data: FeatureDefinition::new(),
    }
}
