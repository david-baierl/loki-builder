use tauri::{command, AppHandle};

use crate::ipc::{events, IpcEvent, IpcRequest, IpcResponse};

#[command]
pub fn greet(app: AppHandle, request: IpcRequest<String>) -> IpcResponse<String> {
    events::hello(
        app,
        IpcEvent {
            data: request.data.clone(),
        },
    );

    IpcResponse {
        data: format!("Hello, {}! You've been greeted from Rust!", request.data),
    }
}
