use serde::{Deserialize, Serialize};
use ts_rs::TS;

// ---------------------------------------
// event
// ---------------------------------------

#[derive(Serialize, Clone, TS)]
#[ts(export)]
pub struct IpcEvent<T> {
    pub data: T,
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
}
