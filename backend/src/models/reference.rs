use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Serialize, Deserialize, Clone, TS)]
#[ts(untagged)]
pub enum FeatureReference {

    Key(String),

    #[ts(skip)]
    Wildcast(String),

    KeyList(Vec<String>),
}
