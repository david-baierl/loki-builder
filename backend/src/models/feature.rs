use serde::{Deserialize, Serialize};
use ts_rs::TS;

use super::{FeatureOptions, FeatureReference};

#[derive(Serialize, Deserialize, TS)]
#[ts(untagged)]
pub enum Feature {
    Reference(FeatureReference),
    Options(FeatureOptions),
    // inline definition
    // Definition(Box<Definition>),
}
