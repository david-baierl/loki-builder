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

#[tauri::command]
pub fn get_definitions(_handle: tauri::AppHandle, request: REQUEST) -> RESPONSE {
    IpcResponse::new(FeatureDefinition::new())
}
