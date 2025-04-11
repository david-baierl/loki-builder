use serde::{Deserialize, Serialize};
use ts_rs::TS;

// ---------------------------------------
// status codes
// ---------------------------------------

#[derive(Serialize, TS)]
enum StatusCode {
    OK,
    // Error,
}

// ---------------------------------------
// request
// ---------------------------------------

#[derive(Deserialize, TS)]
#[ts(export)]
pub struct IpcRequest<T> {
    pub data: T,
}

// ---------------------------------------
// response
// ---------------------------------------

#[derive(Serialize, TS)]
#[ts(export)]
pub struct IpcResponse<T> {
    pub data: T,
    code: StatusCode,
}

impl<T> IpcResponse<T> {
    pub fn new(data: T) -> Self {
        IpcResponse {
            data,
            code: StatusCode::OK,
        }
    }
}
