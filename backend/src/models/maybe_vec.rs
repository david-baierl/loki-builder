use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Serialize, Deserialize, Clone, TS)]
#[ts(untagged)]
pub enum MaybeVec<T> {
    One(T),
    Vec(Vec<T>),
}
